export const STYLES = [
  {
    id: "traditional",
    label: "Traditional",
    sub: "Respectful · family-oriented",
    emoji: "🕌",
    promptHint: "Write in a respectful, traditional Pakistani/Indian Muslim rishta tone. Use salaam, dua phrases, mention family values, parents' status, biradari naturally. Conservative but warm.",
  },
  {
    id: "modern",
    label: "Modern",
    sub: "Clean · contemporary",
    emoji: "✨",
    promptHint: "Write in a clean, modern, balanced tone — confident and warm. Avoid overly traditional phrasing but keep Islamic references natural.",
  },
  {
    id: "poetic",
    label: "Poetic",
    sub: "Eloquent · literary",
    emoji: "🪶",
    promptHint: "Write with literary elegance — use one short couplet or poetic phrase appropriate to the language (Urdu sher, Roman-Urdu kalam, or English lyrical). Keep it tasteful, not over the top.",
  },
  {
    id: "professional",
    label: "Professional",
    sub: "Career-forward · concise",
    emoji: "💼",
    promptHint: "Write a concise, structured bio that leads with profession, achievements, and clear partner expectations. Bullet-style structure where possible. Confident.",
  },
  {
    id: "detailed",
    label: "Detailed",
    sub: "Comprehensive · thorough",
    emoji: "📜",
    promptHint: "Write a thorough, well-organized bio with clear sections: Personal, Deen, Education & Career, Family, Personality, Partner Preference. Use small section headings.",
  },
];

export const LANGS = [
  { id: "urdu",  label: "Urdu Script", direction: "rtl", note: "Use formal Urdu script (Nastaliq style). Use proper Urdu vocabulary, not transliterated English." },
  { id: "roman", label: "Roman Urdu",  direction: "ltr", note: "Use Roman Urdu — Urdu words written in English alphabet. Mix in common English words where natural (e.g. 'profession', 'family')." },
  { id: "en",    label: "English",     direction: "ltr", note: "Use clear, fluent English. Include common Islamic phrases (Assalam-u-Alaikum, InshaAllah, JazakAllah Khair) where natural." },
];

export function buildPrompt(d, styleId, langId) {
  const styleHint = STYLES.find(s => s.id === styleId)?.promptHint || "";
  const langInfo  = LANGS.find(l => l.id === langId) || LANGS[0];

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
    `1. LENGTH: 120–180 words. Keep it tight but complete. Do NOT write long essay-style paragraphs.`,
    `2. SOUND HUMAN: Write the way a real person would naturally introduce themselves to a family — simple, warm, direct sentences. Avoid stiff, formal, AI-sounding phrasing.`,
    `3. SHORT PARAGRAPHS: 2–4 short paragraphs only. Each paragraph 2–3 sentences max. Separate paragraphs with a blank line.`,
    `4. NO FILLER: No flowery clichés, no over-explaining, no repeating facts. One fact, one mention.`,
    `5. Open with a brief salaam (1 line). Close with a short respectful line (e.g. JazakAllah Khair / shukriya / thank you).`,
    `6. First person — the candidate is speaking.`,
    `7. Do NOT invent facts. If a field is "—" or "(unspecified)", just skip it silently — do NOT write "not specified" or "—" in the bio.`,
    `8. Output ONLY the bio body. No preamble, no commentary, no markdown fences, no headings unless the style explicitly requires them.`,
    ``,
    langId === "urdu"
      ? `Language detail: Write in proper Urdu (Nastaliq vocabulary). RTL. Use natural conversational Urdu — NOT heavy literary Urdu. No English words mixed in unless commonly used (e.g. profession names).`
      : langId === "roman"
      ? `Language detail: Use Roman Urdu the way Pakistanis actually type on WhatsApp — "Alhamdulillah", "InshaAllah", "Mashallah", "ghar", "walidain". Simple and readable.`
      : `Language detail: Clear, natural English. Keep Islamic phrases (Assalam-u-Alaikum, Alhamdulillah, InshaAllah) where natural — don't force them.`,
  ].join("\n");
}
