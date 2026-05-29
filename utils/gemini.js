import { buildPrompt } from "./generatePrompt";

export async function generateBio({ data, lang, signal }) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const model = "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const prompt = buildPrompt(data, lang);

  const systemInstruction = 
    "You are a professional matrimonial matchmaking copywriter. Output a raw JSON object containing 6 distinct bio styles, scoring insights between 60 and 95, first-impression badges, personality traits, and before-and-after comparisons. Output ONLY the raw JSON string — no markdown code fences (like ```json), no extra labels, and no surrounding text.";

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
    signal,
  });

  if (!resp.ok) {
    const errText = await resp.text();
    if (resp.status === 429) {
      throw new Error(
        "Abhi free Gemini AI ka quota khatam ho gaya hai (busy time). " +
        "Thodi der baad dobara try karein, ya apni Gemini API key add karein. " +
        "Ek minute ruk ke 'Try again' dabayein."
      );
    }
    if (resp.status === 403) {
      throw new Error("Gemini API key invalid hai ya restrict ki hui hai. .env.local mein key check karein.");
    }
    if (resp.status >= 500) {
      throw new Error("Gemini server abhi busy hai. Thodi der baad 'Try again' dabayein.");
    }
    throw new Error(`Gemini API error ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const json = await resp.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  // Clean potential markdown code fences or headers added by Gemini
  const cleanJsonText = text.replace(/^```[a-z]*\n?/i, "").replace(/```$/m, "").trim();
  
  try {
    const parsed = JSON.parse(cleanJsonText);
    return parsed;
  } catch (parseError) {
    console.error("JSON parsing failed. Raw response text was:", cleanJsonText);
    throw new Error("Dhamaka! AI response parse karne mein masla hua. Thodi der baad dobara try karein.");
  }
}
