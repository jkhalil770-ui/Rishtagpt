export const STYLES = [
  {
    id: "traditional",
    label: "Traditional",
    sub: "Respectful · family-oriented",
    emoji: "🕌",
  },
  {
    id: "modern",
    label: "Modern",
    sub: "Clean · contemporary",
    emoji: "✨",
  },
  {
    id: "professional",
    label: "Professional",
    sub: "Career-forward · concise",
    emoji: "💼",
  },
  {
    id: "poetic",
    label: "Poetic",
    sub: "Eloquent · literary",
    emoji: "🪶",
  },
  {
    id: "detailed",
    label: "Detailed",
    sub: "Thorough · comprehensive",
    emoji: "📜",
  },
];

export const LANGS = [
  { id: "urdu",  label: "Urdu Script", direction: "rtl", note: "Use formal Urdu script (Nastaliq style). Use proper Urdu vocabulary, not transliterated English." },
  { id: "roman", label: "Roman Urdu",  direction: "ltr", note: "Use Roman Urdu — Urdu words written in English alphabet. Mix in common English words where natural (e.g. 'profession', 'family')." },
  { id: "en",    label: "English",     direction: "ltr", note: "Use clear, fluent English. Include common Islamic phrases (Assalam-u-Alaikum, InshaAllah, JazakAllah Khair) where natural." },
];

export function buildPrompt(d, langId) {
  const langInfo  = LANGS.find(l => l.id === langId) || LANGS[0];

  const fam = d.famType === "conservative" ? "Conservative"
           : d.famType === "moderate"     ? "Moderate"
           : d.famType === "liberal"      ? "Liberal" : "—";
  const traits = (d.traits || []).join(", ") || "—";
  const partner = `${d.partnerAgeMax || 35} years max, ${d.locPref || "Same country"}`;
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
    `Income hint: ${d.income ? `Rs. ${(d.income * 100).toLocaleString()},000/month` : "(prefer not to say)"}`,
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
    `You are a professional matrimonial matchmaking copywriter.`,
    `You must write a real rishta bio that a real family member or candidate would write — NOT an AI-generated essay.`,
    `You must analyze the candidate's profile data and output a structured JSON object containing stylized bios and profile analysis metadata.`,
    ``,
    `Language of output: ${langInfo.label}. ${langInfo.note}`,
    ``,
    `PROFILE DATA:`,
    profile,
    ``,
    `STRICT JSON FORMAT REQUIRED:`,
    `You MUST respond with a raw JSON object matching the following structure EXACTLY. Do not wrap the JSON in markdown code blocks or add any other text. Output ONLY the raw JSON string.`,
    `{`,
    `  "headline": "A short, elegant, contemporary profile headline for the candidate (max 10 words, e.g. 'Faith, Family, and Ambition in Balance' or 'Simple Values, Clear Goals').",`,
    `  "firstImpressions": [An array of 4 to 6 concise, elegant first-impression trait strings based on their background, e.g. 'Well-Spoken', 'Dignified', 'Grounded', 'Ambitious', 'Polite'],`,
    `  "traits": [An array of 3 to 5 uppercase personality snapshot trait strings matching the personality of the candidate, e.g. 'CALM', 'RESPONSIBLE', 'FAMILY ORIENTED', 'AMBITION DRIVEN', 'PATIENT'],`,
    `  "scores": {`,
    `    "familyValues": An integer from 60 to 95 reflecting their family values alignment based on data,`,
    `    "communicationStyle": An integer from 60 to 95 reflecting their communication/social capability,`,
    `    "professionalStability": An integer from 60 to 95 reflecting their career path & income status,`,
    `    "lifestyleBalance": An integer from 60 to 95 reflecting their lifestyle and hobbies harmony,`,
    `    "religiousCommitment": An integer from 60 to 95 reflecting their namaz/Quran/Deen commitment,`,
    `    "responsibility": An integer from 60 to 95 reflecting their age/maturity/social status`,
    `  },`,
    `  "beforeAfter": {`,
    `    "before": [An array of exactly 3 short bullet points summarizing the raw, unpolished factual inputs provided by the user in the form],`,
    `    "after": [An array of exactly 3 matching short bullet points highlighting the sophisticated, dignified wording and emotional presentation upgrades performed by the AI]`,
    `  },`,
    `  "traditional": "A warm, respectful traditional bio in 1st person (120-150 words). Uses Assalam-u-Alaikum, dua phrases, naturally mentions family values, parents' status, biradari.",`,
    `  "modern": "A clean, modern, balanced bio in 1st person (120-150 words). Confident and warm. Avoids overly traditional phrasing but keeps Islamic references natural.",`,
    `  "professional": "A structured, career-led bio in 1st person (120-150 words). Bullet-style highlights where possible. Professional, goal-oriented, and confident.",`,
    `  "poetic": "An eloquent, literary bio in 1st person (120-150 words). Incorporates a small tasteful couplet or poetic phrase in the language (sher, kalam, or lyrical line).",`,
    `  "detailed": "A thorough, comprehensive, well-structured bio in 1st person (120-150 words) organized with section highlights for Deen, Career, and Partner expectations.",`,
    `  "familyApproval": "An ultra-traditional, formal, highly respectful and conservative bio written in 1st person (120-150 words) that immediately appeals to traditional family elders, grandparents, and parents."`,
    `}`,
    ``,
    `STRICT BIO RULES — follow exactly for all 6 bios:`,
    `1. LENGTH: Each of the 6 bio fields MUST be 120–150 words. Keep it tight but complete.`,
    `2. SOUND HUMAN: Write the way a real person would naturally introduce themselves — simple, warm, direct sentences. Avoid stiff, formal, AI-sounding phrasing.`,
    `3. SHORT PARAGRAPHS: 2–3 short paragraphs only. Each paragraph 2–3 sentences max. Separate paragraphs with \\n\\n.`,
    `4. NO FILLER: No flowery clichés, no repeating facts.`,
    `5. Open with a brief respectful salaam. Close with a short respectful line (e.g. JazakAllah Khair / shukriya).`,
    `6. First person speaking (I / me).`,
    `7. Do NOT invent facts. If a field is "—" or unspecified, skip it silently.`,
  ].join("\n");
}
