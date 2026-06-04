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
  { 
    id: "urdu",  
    label: "Urdu Script", 
    direction: "rtl", 
    note: "Use highly dignified, polite, and elegant literary Urdu script (Nastaliq style). Use rich Urdu vocabulary, not raw English words written in Urdu script (e.g. use 'Sho'ba' instead of 'Profession', 'Taleem' instead of 'Education'). Use respectful honorifics like 'Alhamdulillah', 'MashaAllah', 'Aap', and end with a beautiful, heartfelt dua. Make it sound deeply cultured, family-grounded, and emotionally rich." 
  },
  { 
    id: "roman", 
    label: "Roman Urdu",  
    direction: "ltr", 
    note: "Use natural, fluent Roman Urdu (Urdu written in English letters) just like highly educated families speak. Use proper spelling (e.g. 'shadi', 'khandan', 'namaz', 'Deen', 'MashaAllah', 'Alhamdulillah', 'InshaAllah'). Mix in professional and formal English words elegantly (like 'career-oriented', 'balanced lifestyle', 'family values', 'respect') to sound polished and modern, but keep the core emotional tone warm, personal, and highly respectful." 
  },
  { 
    id: "en",    
    label: "English",     
    direction: "ltr", 
    note: "Use flawless, sophisticated, and contemporary global English. Incorporate a warm, positive, and deeply respectful tone. Integrate common Islamic phrases (like 'Assalamu Alaikum', 'InshaAllah', 'Alhamdulillah', 'JazakAllah Khair') with seamless elegance. Ensure it portrays a brilliant blend of professional ambition, high family values, and grounded religious beliefs." 
  },
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
    `Income hint: ${
      !d.income || d.income === 0 ? "(prefer not to say)"
      : d.income >= 8 ? "Rs. 200,000+/month"
      : `Rs. ${(d.income * 25).toLocaleString()},000/month`
    }`,
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
    `  "traditional": "A warm, respectful traditional bio in 1st person. Uses Assalam-u-Alaikum, dua phrases, naturally mentions family values, parents' status, biradari. Deeply grounded in cultural respect.",`,
    `  "modern": "A clean, modern, balanced bio in 1st person. Confident, modern, and warm. Avoids overly traditional phrasing but keeps Islamic references natural and speaks of a contemporary lifestyle.",`,
    `  "professional": "A structured, career-led bio in 1st person. Bullet-style highlights where possible. Professional, goal-oriented, confident, showcasing intellect and ambition.",`,
    `  "poetic": "An eloquent, literary bio in 1st person. Incorporates a small tasteful couplet or poetic phrase in the language (sher, kalam, or lyrical line) that touches the heart and matches the character.",`,
    `  "detailed": "A thorough, comprehensive, well-structured bio in 1st person organized with clear section highlights for Deen, Career, and Partner expectations.",`,
    `  "familyApproval": "An ultra-traditional, formal, highly respectful and conservative bio written in 1st person that immediately appeals to traditional family elders, grandparents, and parents, highlighting family sharafat and obedience."`,
    `}`,
    ``,
    `STRICT BIO RULES — follow exactly for all 6 bios:`,
    `1. LENGTH & STRUCTURE: Each of the 6 bio fields MUST be 120–150 words total and structured in EXACTLY 3 short paragraphs (separated with \\n\\n):`,
    `   - Paragraph 1 (Self & Deen): Warm opening salaam. Elegant introduction of name, height, character, religious values (namaz/Quran), and personality.`,
    `   - Paragraph 2 (Career & Ambition): A polished reflection of education, degree, institution, professional achievements, and work goals.`,
    `   - Paragraph 3 (Family Background & Partner Expectation): Respectful details about parents, family setup, what kind of life partner is desired, closing with a beautiful, heartfelt dua/shukriya.`,
    `2. SOUND HUMAN: Write the way a real, sophisticated person would naturally introduce themselves — simple, warm, direct, and emotionally mature sentences. Avoid stiff, robotic, AI-sounding phrasing.`,
    `3. NO FILLER: No flowery clichés, no repeating facts.`,
    `4. First person speaking (I / me).`,
    `5. Do NOT invent facts. If a field is "—" or unspecified, skip it silently.`,
  ].join("\n");
}
