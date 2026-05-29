/* Gemini API wrapper — generates bio for a given style + language */

(function () {
  function buildPrompt(d, style, lang) {
    const styleHint = RG_STYLES.find(s => s.id === style)?.promptHint || "";
    const langInfo  = RG_LANGS.find(l => l.id === lang) || RG_LANGS[0];

    // Summarize user data cleanly
    const fam = d.famType === "conservative" ? "Conservative"
             : d.famType === "moderate"     ? "Moderate"
             : d.famType === "liberal"      ? "Liberal" : "—";
    const traits = (d.traits || []).join(", ") || "—";
    const partner = `${d.partnerAge?.[0] ?? 22}–${d.partnerAge?.[1] ?? 30} years, ${d.locPref || "Same country"}`;
    const marital = d.marital || "Never married";

    const profile = [
      `Name: ${d.name || "—"}`,
      `Gender: ${d.gender || "—"}`,
      `Age: ${d.age || "—"}`,
      `Marital status: ${marital}`,
      `Height: ${d.height || "—"}`,
      `Complexion: ${d.complexion || "(unspecified)"}`,
      `City: ${d.city || "—"}`,
      `Maslak / sect: ${d.maslak || "—"}`,
      `Namaz: ${d.namaz || "—"}`,
      `Quran: ${d.quran || "—"}${d.hafiz ? " (Hafiz-e-Quran)" : ""}`,
      d.gender === "girl" ? `Hijab/Parda: ${d.hijab || "—"}` : null,
      `Partner Deen preference: ${d.partnerDeen || "—"}`,
      `Degree: ${d.degree || "—"}`,
      `Institution: ${d.institution || "—"}`,
      `Profession: ${d.profession || "—"}`,
      `Employment: ${d.employment || "—"}`,
      `Income hint: ${d.income ? `Rs. ${d.income * 100}k/month` : "(prefer not to say)"}`,
      `Father: ${d.fatherStatus || "—"}${d.fatherProf ? `, ${d.fatherProf}` : ""}`,
      `Mother: ${d.motherStatus || "—"}${d.motherProf ? `, ${d.motherProf}` : ""}`,
      `Siblings: ${d.brothers || 0} brother(s), ${d.sisters || 0} sister(s)`,
      `Family type: ${fam}`,
      `Residence: ${d.residence || "—"}`,
      `Biradari/Caste: ${d.biradariSkip ? "(prefer not to say)" : (d.biradari || "—")}`,
      `Personality traits: ${traits}`,
      `Partner preference: ${partner}`,
      d.note ? `Additional note: ${d.note}` : null,
    ].filter(Boolean).join("\n");

    return [
      `You are writing a real rishta (Pakistani/Indian Muslim matrimonial) bio that a real family member would write — NOT an AI-generated essay.`,
      ``,
      `Language: ${langInfo.label}. ${langInfo.note}`,
      ``,
      `IMPORTANT — same factual content across all languages:`,
      `This bio MUST contain the EXACT same facts/details/structure as the bio for the same person in other languages.`,
      `Only the LANGUAGE changes. The information, order, tone, and length stay the same.`,
      `Do NOT add facts in one language that aren't in another.`,
      ``,
      `STYLE: ${styleHint}`,
      ``,
      `PROFILE:`,
      profile,
      ``,
      `STRICT RULES — follow exactly:`,
      `1. LENGTH: 80–130 words MAX. Keep it tight. Do NOT write long essay-style paragraphs.`,
      `2. SOUND HUMAN: Write the way a real person would naturally introduce themselves to a family — simple, warm, direct sentences. Avoid stiff, formal, AI-sounding phrasing.`,
      `3. SHORT PARAGRAPHS: 2–4 short paragraphs only. Each paragraph 2–3 sentences max. Separate paragraphs with a blank line.`,
      `4. NO FILLER: No flowery clichés, no over-explaining, no repeating facts. One fact, one mention.`,
      `5. Open with a brief salaam (1 line). Close with a short respectful line (e.g. JazakAllah Khair / shukriya / thank you).`,
      `6. First person — the candidate is speaking.`,
      `7. Do NOT invent facts. If a field is "—" or "(unspecified)", just skip it silently — do NOT write "not specified" or "—" in the bio.`,
      `8. Output ONLY the bio body. No preamble, no commentary, no markdown fences, no headings unless the style explicitly requires them.`,
      ``,
      lang === "urdu"
        ? `Language detail: Write in proper Urdu (Nastaliq vocabulary). RTL. Use natural conversational Urdu — NOT heavy literary Urdu. No English words mixed in unless commonly used (e.g. profession names).`
        : lang === "roman"
        ? `Language detail: Use Roman Urdu the way Pakistanis actually type on WhatsApp — "Alhamdulillah", "InshaAllah", "Mashallah", "ghar", "walidain". Simple and readable.`
        : `Language detail: Clear, natural English. Keep Islamic phrases (Assalam-u-Alaikum, Alhamdulillah, InshaAllah) where natural — don't force them.`,
    ].join("\n");
  }

  async function generateBio({ data, style, lang, signal }) {
    const key = window.RG_CONFIG.GEMINI_API_KEY;
    const model = window.RG_CONFIG.GEMINI_MODEL;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const prompt = buildPrompt(data, style, lang);

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.75,
          topP: 0.92,
          maxOutputTokens: 480,
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
      // Quota / rate-limit — friendly message
      if (resp.status === 429) {
        throw new Error(
          "Abhi free Gemini AI ka quota khatam ho gaya hai (busy time). " +
          "Thodi der baad dobara try karein, ya apni Gemini API key add karein. " +
          "Ek minute ruk ke 'Try again' dabayein."
        );
      }
      if (resp.status === 403) {
        throw new Error("Gemini API key invalid hai ya restrict ki hui hai. Settings mein key check karein.");
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
    // Clean potential markdown fences
    return text.replace(/^```[a-z]*\n?/i, "").replace(/```$/m, "").trim();
  }

  window.RG_Gemini = { generateBio, buildPrompt };
})();
