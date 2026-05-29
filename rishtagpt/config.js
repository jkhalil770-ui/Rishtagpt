/* RishtaGPT config — API key + bio style definitions
 *
 * ⚠️  SECURITY NOTE
 *   This file ships to the browser. The API key is visible to anyone
 *   who views page source. For production, restrict the key in Google
 *   Cloud Console (HTTP referrer = your-domain.com only) and ideally
 *   proxy requests through a backend.
 */
window.RG_CONFIG = {
  GEMINI_API_KEY: "AIzaSyBlTDxs0pH3iPRo4GaP0ehFZs6xlCCZKPw",
  GEMINI_MODEL: "gemini-2.0-flash",
  RESEND_API_KEY: "re_WTGKn6hA_686mukXoqrW26SSmab51Wcxj",
};

window.RG_STYLES = [
  {
    id: "traditional",
    label: "Traditional",
    sub: "Respectful · family-oriented",
    emoji: "🕌",
    promptHint: "Write in a respectful, traditional Pakistani Muslim rishta tone. Use salaam, dua phrases, mention family values, parents' status, biradari naturally. Conservative but warm.",
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

window.RG_LANGS = [
  { id: "urdu",  label: "Urdu Script", direction: "rtl", note: "Use formal Urdu script (Nastaliq style). Use proper Urdu vocabulary, not transliterated English." },
  { id: "roman", label: "Roman Urdu",  direction: "ltr", note: "Use Roman Urdu — Urdu words written in English alphabet. Mix in common English words where natural (e.g. 'profession', 'family')." },
  { id: "en",    label: "English",     direction: "ltr", note: "Use clear, fluent English. Include common Islamic phrases (Assalam-u-Alaikum, InshaAllah, JazakAllah Khair) where natural." },
];
