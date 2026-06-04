import { NextResponse } from "next/server";

// Global cache for compatibility checks
const compCache = new Map();
const MAX_CACHE_SIZE = 500;

// Active promises to deduplicate concurrent requests
const activeCompPromises = new Map();

// Concurrency queue to restrict parallel calls
class ConcurrencyQueue {
  constructor(maxConcurrency = 2) {
    this.maxConcurrency = maxConcurrency;
    this.currentConcurrency = 0;
    this.queue = [];
  }

  async run(task) {
    if (this.currentConcurrency >= this.maxConcurrency) {
      console.log(`[Compatibility Queue] Concurrent limit reached. Request waiting. Queue length: ${this.queue.length + 1}`);
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

const compQueue = new ConcurrencyQueue(2);

// Global active API key index tracking
let currentKeyIndex = 0;
const keyCooldowns = {};

// Resolves Gemini private keys from env
function resolveKeys() {
  const envKeys = process.env.GEMINI_API_KEYS;
  if (envKeys) {
    return envKeys.split(",").map(k => k.trim()).filter(Boolean);
  }
  return [];
}

// Selects the next available key
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
          temperature: 0.75,
          topP: 0.93,
          maxOutputTokens: 1500,
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
  const retryDelays = [0, 1000, 2000, 4000];
  const maxAttempts = 4;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (retryDelays[attempt - 1] > 0) {
      console.log(`[Compatibility Gateway] Delaying attempt ${attempt} for ${retryDelays[attempt - 1]}ms...`);
      await new Promise(r => setTimeout(r, retryDelays[attempt - 1]));
    }

    let keysTriedInThisRound = 0;
    while (keysTriedInThisRound < keys.length) {
      const { apiKey, keyIndex } = getActiveKey(keys);
      keysTriedInThisRound++;

      const reqId = `comp_${Math.random().toString(36).substring(2, 11)}`;
      const maskedKey = apiKey ? `${apiKey.substring(0, 12)}...${apiKey.substring(apiKey.length - 6)}` : "None";
      const startTime = Date.now();

      console.log(`[Compatibility Gateway] ${reqId} | Attempt ${attempt}/${maxAttempts} | Key #${keyIndex + 1} (${maskedKey})`);

      try {
        const result = await fetchGeminiWithTimeout(apiKey, prompt, systemInstruction, 20000);
        const duration = Date.now() - startTime;
        
        console.log(JSON.stringify({
          type: "COMPATIBILITY_GATEWAY_LOG",
          requestId: reqId,
          activeKeyIndex: keyIndex + 1,
          attempt,
          responseTimeMs: duration,
          success: true
        }));

        return result;
      } catch (err) {
        const duration = Date.now() - startTime;
        
        console.warn(JSON.stringify({
          type: "COMPATIBILITY_GATEWAY_LOG",
          requestId: reqId,
          activeKeyIndex: keyIndex + 1,
          attempt,
          responseTimeMs: duration,
          success: false,
          failureReason: err.message
        }));

        lastError = err;
        keyCooldowns[keyIndex] = Date.now() + 60000;
        currentKeyIndex = (keyIndex + 1) % keys.length;

        if (keysTriedInThisRound < keys.length) {
          console.log(`[Compatibility Gateway] Failover triggered: Rotating to Key #${currentKeyIndex + 1} instantly.`);
        }
      }
    }
  }

  throw lastError || new Error("All API attempts and failover keys exhausted.");
}

function buildPrompt(profileA, profileB) {
  return `You are a professional matrimonial matchmaking expert and relationship copywriter.
Analyze the following two profiles for matrimonial compatibility:

PROFILE A:
- Name: ${profileA.name || "Candidate A"}
- Age: ${profileA.age || "—"}
- Profession/Education: ${profileA.profession || "—"}
- Religious Sect & Habits: ${profileA.religiousOutlook || "—"}
- Lifestyle & Core Values: ${profileA.lifestyle || "—"}
- Family Background & Priorities: ${profileA.familyValues || "—"}

PROFILE B:
- Name: ${profileB.name || "Candidate B"}
- Age: ${profileB.age || "—"}
- Profession/Education: ${profileB.profession || "—"}
- Religious Sect & Habits: ${profileB.religiousOutlook || "—"}
- Lifestyle & Core Values: ${profileB.lifestyle || "—"}
- Family Background & Priorities: ${profileB.familyValues || "—"}

STRICT JSON FORMAT REQUIRED:
Return a raw JSON object matching the following structure EXACTLY. Output ONLY the raw JSON string — no markdown code fences, no extra labels, and no surrounding text.

{
  "compatibilityHeadline": "A custom Playfair Display headline summarizing their compatibility (max 10 words, e.g. 'Strong Foundation For A Meaningful Future' or 'Complementary Paths, Shared Faith' or 'Balanced Potential With Warm Communication')",
  "compatibilityStatus": "Must be one of: 'Excellent Match', 'Strong Match', 'Promising Match', 'Needs Further Discussion'",
  "scores": {
    "familyValues": An integer from 60 to 95 reflecting family alignment,
    "communication": An integer from 60 to 95 reflecting communication style,
    "education": An integer from 60 to 95 reflecting educational harmony,
    "lifestyle": An integer from 60 to 95 reflecting lifestyle compatibility,
    "careerGoals": An integer from 60 to 95 reflecting career/future path alignment,
    "religiousOutlook": An integer from 60 to 95 reflecting Deen alignment
  },
  "strengths": [
    An array of exactly 3 short bullet strings (max 8 words each) highlighting key strengths, e.g., "✓ Shared Deen & namaz commitment", "✓ High educational alignment", "✓ Shared long-term goals"
  ],
  "discussionAreas": [
    An array of exactly 3 short bullet strings (max 8 words each) presenting discussion points respectfully and constructively, e.g. "• Aligning career timelines", "• Discussing joint family settings", "• Nuances of lifestyle pacing"
  ],
  "firstImpressions": [
    An array of 4 to 6 concise personality snapshot badges that apply to the couple together (e.g. 'Mature', 'Grounded', 'Calm', 'Balanced', 'Warm', 'Resilient')
  ],
  "summary": "A highly detailed, elegant, respectful, and insightful relationship compatibility summary paragraph (approx 100-120 words). Write it in a dignified, supportive, and literary tone. Focus on how their strengths balance out and how they can navigate any differences beautifully."
}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { profileA, profileB, mockSuccess } = body;

    if (mockSuccess) {
      console.log("[Compatibility Gateway] Mock Success mode active. Returning static compatibility payload.");
      return NextResponse.json({
        compatibilityHeadline: "Strong Foundation For A Meaningful Future",
        compatibilityStatus: "Strong Match",
        scores: {
          familyValues: 89,
          communication: 82,
          education: 90,
          lifestyle: 78,
          careerGoals: 85,
          religiousOutlook: 88
        },
        strengths: [
          "✓ Deeply shared Deen & Namaz values",
          "✓ Alignment on career development",
          "✓ Similar moderate lifestyle priorities"
        ],
        discussionAreas: [
          "• Nuances of future joint-family structure",
          "• Lifestyle pacing during early years",
          "• Balancing workload with home priorities"
        ],
        firstImpressions: ["Mature", "Grounded", "Intellectual", "Dignified", "Grateful"],
        summary: "Ahmed and Zara show high promise for a stable, growth-oriented life together. Both bring strong professional backgrounds balanced by an active commitment to daily prayers and family moral values. While their core values align beautifully, discussing joint family structures and balancing dual-career timelines during early years will enhance their communication. Overall, their strengths complement each other, creating a strong potential for a meaningful and respectful future."
      });
    }

    if (!profileA || !profileB) {
      return NextResponse.json({ error: "Missing required parameters: profileA or profileB." }, { status: 400 });
    }

    const cacheKey = `${JSON.stringify(profileA)}_${JSON.stringify(profileB)}`;

    // 1. Check Cache
    if (compCache.has(cacheKey)) {
      console.log("[Compatibility Gateway] Cache Hit!");
      return NextResponse.json(compCache.get(cacheKey));
    }

    // 2. Promise Deduplication
    let activePromise = activeCompPromises.get(cacheKey);
    if (!activePromise) {
      const prompt = buildPrompt(profileA, profileB);
      const systemInstruction = 
        "You are an expert matrimonial matchmaker. Output ONLY a clean, valid raw JSON object matching the requested schema. No markdown wrapping.";

      activePromise = compQueue.run(() => fetchGeminiWithFailover(prompt, systemInstruction))
        .then((result) => {
          compCache.set(cacheKey, result);
          if (compCache.size > MAX_CACHE_SIZE) {
            const oldestKey = compCache.keys().next().value;
            compCache.delete(oldestKey);
          }
          return result;
        })
        .finally(() => {
          activeCompPromises.delete(cacheKey);
        });

      activeCompPromises.set(cacheKey, activePromise);
    } else {
      console.log("[Compatibility Gateway] Reusing active request.");
    }

    const result = await activePromise;
    return NextResponse.json(result);

  } catch (error) {
    console.error("[Compatibility Gateway Error]:", error);
    return NextResponse.json({
      error: "AI aapki compatibility check karne mein thoda waqt le raha hai (busy time). Aap ek dafa 'Try Again' par click karein ya humare servers par load kam hone ka intezar karein."
    }, { status: 503 });
  }
}
