import { NextResponse } from "next/server";
import { buildPrompt } from "@/utils/generatePrompt";

// In-memory global cache for generated bios (FIFO eviction)
const serverBioCache = new Map();
const MAX_CACHE_SIZE = 500;

// Active promises map to deduplicate concurrent requests for identical payloads
const activeServerPromises = new Map();

// Concurrency queue to restrict parallel calls to Gemini and prevent key rate limits
class ConcurrencyQueue {
  constructor(maxConcurrency = 2) {
    this.maxConcurrency = maxConcurrency;
    this.currentConcurrency = 0;
    this.queue = [];
  }

  async run(task) {
    if (this.currentConcurrency >= this.maxConcurrency) {
      console.log(`[Server Queue] Concurrent limit reached. Request waiting. Queue length: ${this.queue.length + 1}`);
      await new Promise((resolve) => {
        this.queue.push(resolve);
      });
    }

    this.currentConcurrency++;
    try {
      return await task();
    } finally {
      this.currentConcurrency--;
      if (this.queue.length > 0) {
        const nextResolve = this.queue.shift();
        nextResolve();
      }
    }
  }
}

const serverQueue = new ConcurrencyQueue(2); // Allow max 2 concurrent executions

// Global active API key index tracking
let currentKeyIndex = 0;
const keyCooldowns = {};

// Resolves Gemini private keys from env or fallback keys
function resolveKeys() {
  const envKeys = process.env.GEMINI_API_KEYS;
  if (envKeys) {
    return envKeys.split(",").map(k => k.trim()).filter(Boolean);
  }
  console.warn("[Server AI Gateway] GEMINI_API_KEYS environment variable is not defined!");
  return [];
}

// Selects the next available key that is not on cooldown
function getActiveKey(keys) {
  const now = Date.now();
  for (let i = 0; i < keys.length; i++) {
    const idx = (currentKeyIndex + i) % keys.length;
    const cooldownTime = keyCooldowns[idx] || 0;
    if (now > cooldownTime) {
      currentKeyIndex = idx;
      return { apiKey: keys[idx], keyIndex: idx };
    }
  }
  // Cooldown fallback: use the key that will exit cooldown soonest
  let oldestIndex = 0;
  let minCooldown = Infinity;
  for (let i = 0; i < keys.length; i++) {
    const cooldownTime = keyCooldowns[i] || 0;
    if (cooldownTime < minCooldown) {
      minCooldown = cooldownTime;
      oldestIndex = i;
    }
  }
  currentKeyIndex = oldestIndex;
  return { apiKey: keys[oldestIndex], keyIndex: oldestIndex };
}

// Fetch helper wrapper with strict 20-second timeout
async function fetchGeminiWithTimeout(apiKey, prompt, systemInstruction, timeoutMs = 20000) {
  const model = "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.78,
          topP: 0.94,
          maxOutputTokens: 1800,
          responseMimeType: "application/json"
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
        ],
      }),
    });

    clearTimeout(timer);

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Gemini status ${resp.status}: ${text}`);
    }

    const json = await resp.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("Empty response payload from Gemini");
    }

    const cleanJsonText = text.replace(/^```[a-z]*\n?/i, "").replace(/```$/m, "").trim();
    const parsed = JSON.parse(cleanJsonText);
    return parsed;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// Executes request using private key rotation, exponential retries, and key cooldowns
async function fetchGeminiWithFailover(prompt, systemInstruction) {
  const keys = resolveKeys();
  if (keys.length === 0) {
    throw new Error("No Gemini API keys configured. Set GEMINI_API_KEYS.");
  }
  const retryDelays = [0, 1000, 2000, 4000]; // Delays between attempt rounds (1s, 2s, 4s)
  const maxAttempts = 4;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    // 1. Apply retry delay if this is a secondary attempt round
    if (retryDelays[attempt - 1] > 0) {
      console.log(`[Server AI Gateway] Delaying attempt ${attempt} for ${retryDelays[attempt - 1]}ms...`);
      await new Promise(r => setTimeout(r, retryDelays[attempt - 1]));
    }

    // 2. Rotate keys within this attempt round (instant failover)
    let keysTriedInThisRound = 0;
    while (keysTriedInThisRound < keys.length) {
      const { apiKey, keyIndex } = getActiveKey(keys);
      keysTriedInThisRound++;

      const reqId = `srv_${Math.random().toString(36).substring(2, 11)}`;
      const maskedKey = apiKey ? `${apiKey.substring(0, 12)}...${apiKey.substring(apiKey.length - 6)}` : "None";
      const startTime = Date.now();

      console.log(`[Server AI Gateway] ${reqId} | Attempt ${attempt}/${maxAttempts} | Key #${keyIndex + 1} (${maskedKey})`);

      try {
        const result = await fetchGeminiWithTimeout(apiKey, prompt, systemInstruction, 20000);
        const duration = Date.now() - startTime;
        
        // Structured Logging: Success
        console.log(JSON.stringify({
          type: "AI_GATEWAY_LOG",
          requestId: reqId,
          activeKeyIndex: keyIndex + 1,
          attempt,
          responseTimeMs: duration,
          success: true
        }));

        return result; // Successful resolution, return result
      } catch (err) {
        const duration = Date.now() - startTime;
        
        // Structured Logging: Failure
        console.warn(JSON.stringify({
          type: "AI_GATEWAY_LOG",
          requestId: reqId,
          activeKeyIndex: keyIndex + 1,
          attempt,
          responseTimeMs: duration,
          success: false,
          failureReason: err.message
        }));

        lastError = err;

        // Place the failing key on cooldown (60 seconds)
        keyCooldowns[keyIndex] = Date.now() + 60000;

        // Rotate global key index
        currentKeyIndex = (keyIndex + 1) % keys.length;

        // If there are untried keys, proceed to the next iteration of the while loop instantly (0s delay)
        if (keysTriedInThisRound < keys.length) {
          console.log(`[Server AI Gateway] Failover triggered: Rotating to Key #${currentKeyIndex + 1} instantly.`);
        }
      }
    }
  }

  throw lastError || new Error("All API attempts and failover keys exhausted.");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { data, lang, mockSuccess } = body;

    if (mockSuccess) {
      console.log("[Server AI Gateway] Mock Success mode active. Returning static bio payload.");
      return NextResponse.json({
        headline: "Simple Values, Clear Goals & Balanced Life",
        firstImpressions: ["Dignified", "Grounded", "Ambitious", "Polite"],
        traits: ["CALM", "RESPONSIBLE", "FAMILY ORIENTED", "PATIENT"],
        scores: {
          familyValues: 88,
          communicationStyle: 82,
          professionalStability: 85,
          lifestyleBalance: 80,
          religiousCommitment: 90,
          responsibility: 87
        },
        beforeAfter: {
          before: [
            "Age 27, Software Engineer, lives in Lahore.",
            "Sunni Muslim, prays 5 times, family oriented.",
            "Looking for a balanced partner with good education."
          ],
          after: [
            "A well-settled 27-year-old Software Engineer based in the heart of Lahore.",
            "Dedicated to religious values, observing daily prayers, and deeply rooted in family morals.",
            "Seeking an educated companion who values compatibility and shares a balanced outlook on life."
          ]
        },
        traditional: "Assalamu Alaikum. I am a 27-year-old Software Engineer, 5'10\" tall, with a fair complexion. Alhamdulillah, I am grounded in my Sunni Islamic values, observing daily prayers and regular Quran recitation. Personality-wise, I describe myself as a calm, responsible, and patient individual who values simple family connections.\n\nI graduated with a Bachelors in Computer Science from FAST NUCES and currently work as a salaried Software Engineer in Lahore. I am passionate about my career and strive to achieve professional excellence while maintaining a balanced life.\n\nMy father is a retired Govt Officer and my mother is a dedicated housewife. I have two brothers and one sister. We are a moderate, close-knit family. I am looking for an educated partner under 30 who appreciates family values and is keen on building a warm home together. JazakAllah Khair.",
        modern: "Assalamu Alaikum. I'm a 27-year-old Software Engineer from Lahore, blending modern ambitions with strong traditional roots. I observe my prayers and value personal growth, kindness, and respect. I believe in mutual understanding and look forward to a partner who values both Deen and Dunya.\n\nHaving studied Computer Science at FAST NUCES, I now work as a Software Engineer. My work keeps me driven, but I make sure to prioritize what matters most—my faith and family.\n\nWe are a moderate Rajput family based in Lahore. My father served as a Govt Officer, and my mother runs our home. I have three siblings. I am looking for a partner who is educated, family-oriented, and ready to walk this journey of life side by side.",
        professional: "Assalamu Alaikum. Professional Software Engineer, 27, based in Lahore. Balanced in life and faith, observing daily prayers. Calm, structured thinker with clear family-oriented values.\n\nBachelors in CS from FAST NUCES. Currently working full-time in the software industry. Aiming to build a stable professional career and a secure future.\n\nFamily background: Father is a retired Govt Officer, mother is a homemaker. We have a moderate, well-educated family structure. Seeking an educated professional partner who appreciates career goals and family values.",
        poetic: "Assalamu Alaikum. In the journey of life, I seek a path guided by faith, intellect, and peace. I am a 27-year-old Software Engineer who finds solace in daily prayers and family ties.\n\nFAST NUCES graduate, now writing software and designing systems in Lahore. Striving to make my career a reflection of dedication and hard work.\n\nWe are a moderate, warm family from Lahore. My parents have raised us with high values. Looking for a gentle soul, an educated companion who brings harmony, light, and warmth to our lives.",
        detailed: "Assalamu Alaikum. General Details: 27 years old, 5'10\" tall, Sunni maslak, observes 5 times prayers. Grounded in Deen and committed to family principles.\n\nEducation & Career: Completed Bachelors in Computer Science from FAST NUCES. Employed as a Software Engineer in Lahore with stable income.\n\nFamily & Partner Expectations: Residing in own house in Lahore. Father is a retired Govt Officer, mother is a housewife. Seeking an educated, pious partner who values family unity and Deen.",
        familyApproval: "Assalamu Alaikum. Respectfully introducing our 27-year-old son, who is working as a Software Engineer. He is 5'10\" tall, fair, and observes daily prayers. He has been raised with strong Islamic and family values, showing deep respect for elders.\n\nHe completed his degree from FAST NUCES and has a stable job in Lahore. He is responsible and focused on his duties.\n\nOur family belongs to the Rajput biradari, living in our own house in Lahore. We are looking for a simple, educated, and well-mannered girl from a respectable family who will respect family values. InshaAllah."
      });
    }

    if (!data || !lang) {
      return NextResponse.json({ error: "Missing required parameters: data or lang." }, { status: 400 });
    }

    const cacheKey = `${JSON.stringify(data)}_${lang}`;

    // 1. Check Global Server-side Cache
    if (serverBioCache.has(cacheKey)) {
      console.log(`[Server AI Gateway] Global Cache Hit for lang: ${lang}.`);
      return NextResponse.json(serverBioCache.get(cacheKey));
    }

    // 2. Prevent concurrent duplicate requests via promise deduplication
    let activePromise = activeServerPromises.get(cacheKey);
    if (!activePromise) {
      const prompt = buildPrompt(data, lang);
      const systemInstruction = 
        "You are a professional matrimonial matchmaking copywriter. Output a raw JSON object containing 6 distinct bio styles, scoring insights between 60 and 95, first-impression badges, personality traits, and before-and-after comparisons. Output ONLY the raw JSON string — no markdown code fences (like ```json), no extra labels, and no surrounding text.";

      // Wrap prompt execution in the Server Concurrency Queue & register in activeServerPromises
      activePromise = serverQueue.run(() => fetchGeminiWithFailover(prompt, systemInstruction))
        .then((result) => {
          // Update cache on success
          serverBioCache.set(cacheKey, result);
          if (serverBioCache.size > MAX_CACHE_SIZE) {
            const oldestKey = serverBioCache.keys().next().value;
            serverBioCache.delete(oldestKey);
          }
          return result;
        })
        .finally(() => {
          activeServerPromises.delete(cacheKey);
        });

      activeServerPromises.set(cacheKey, activePromise);
    } else {
      console.log(`[Server AI Gateway] Concurrent Deduplication: Reusing pending promise for lang: ${lang}`);
    }

    const result = await activePromise;
    return NextResponse.json(result);

  } catch (error) {
    console.error("[Server API Route Error]:", error);
    
    // Mask technical errors from the client, returning a friendly Urdu message
    return NextResponse.json({
      error: "AI aapki bio likhne mein thoda waqt le raha hai (busy time). Aap ek dafa 'Try Again' par click karein ya humare servers par load kam hone ka intezar karein."
    }, { status: 503 });
  }
}
