import { buildPrompt } from "./generatePrompt";

export async function generateBio({ data, style, lang, signal }) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const model = "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const prompt = buildPrompt(data, style, lang);

  const systemInstruction = 
    "You are a professional Pakistani rishta bio writer. Write culturally warm, dignified, and emotionally resonant bios. Understand Pakistani family values, Islamic culture, and rishta traditions deeply. Never use generic phrases. Output ONLY the bio text — no headings, no labels, no extra text. Write naturally as if a respected family elder composed it.";

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        temperature: 0.75,
        topP: 0.92,
        maxOutputTokens: 600,
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
  return text.replace(/^```[a-z]*\n?/i, "").replace(/```$/m, "").trim();
}
