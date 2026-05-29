"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GlassCard from "../ui/GlassCard";

const SAMPLE_BIOS = {
  traditional: {
    title: "Traditional Style",
    sub: "Respectful · Classical · Family-First",
    urdu: "السلام علیکم۔ میں ایک خاموش مزاج، گھریلو اور باحجاب لڑکی ہوں۔ خاندانی اقدار اور اسلامی احکامات پر پختہ یقین رکھتی ہوں اور پانچ وقت نماز کی پابند ہوں۔ میرے والد صاحب ایک ریٹائرڈ سرکاری افسر ہیں اور والدہ ہوم میکر ہیں۔ ہم ایک ایسے دیندار، شریف اور تعلیم یافتہ شریک حیات کی تلاش میں ہیں جو رشتوں کا احترام کرنا جانتا ہو اور حلال روزی کمانے والا ہو۔",
    en: "Assalam-u-Alaikum. I am a simple, soft-spoken, and family-oriented girl who holds traditional Islamic values close. Observing 5 daily prayers, I seek a respectful, well-educated, and settled partner who understands marriage as a beautiful spiritual commitment, values family ties, and walks this path with integrity.",
    roman: "Assalam-u-Alaikum. Main ek simple aur family-oriented larki hoon jo Deen aur parivar ki values ko zaroori samajhti hai. 5 waqt namaz ki pabandi koshish hai. Ek aisi jeevan saathi (partner) ki talash hai jo shareef, well-educated aur rishton ki izzat karne wala ho."
  },
  modern: {
    title: "Modern Style",
    sub: "Clean · Confident · Direct",
    urdu: "السلام علیکم۔ میں پیشے کے لحاظ سے سافٹ ویئر انجینئر ہوں اور ایک آزاد لیکن فیملی اورینٹڈ لائف اسٹائل گزارتا ہوں۔ مجھے نئے مقامات کی سیر کرنا پسند ہے۔ میں ایک ایسی جیون ساتھی کی تلاش میں ہوں جو تعلیم یافتہ، اوپن مائنڈڈ ہو اور زندگی کی خوبصورتیوں میں میرا ساتھ دے۔",
    en: "Assalam-u-Alaikum. I am a software engineer based in Karachi, blending professional drive with a warm interest in fitness, reading, and travel. I am seeking a modern, forward-thinking partner who respects individual ambitions, values deep intellectual conversations, and balances career milestones with family life.",
    roman: "Assalam-u-Alaikum. Main ek professional software engineer hoon. Career ke sath sath family ko poori priority deta hoon. Ek aisi intelligent aur open-minded partner chahiye jo career aur life dono mein mere sath kandha se kandha mila sake."
  },
  poetic: {
    title: "Poetic Style",
    sub: "Eloquent · Metaphorical · Elegant",
    urdu: "السلام علیکم۔\n'زندگی کی ڈگر پر ایک پیارے سے سفر کی چاہ ہے۔'\nمیں ایک حساس دل اور تخلیقی سوچ رکھنے والا شخص ہوں۔ پانچ وقت سجدہ ریز ہو کر خدا کا شکر ادا کرتا ہوں۔ ہم سفر ایسا ہو جو لفظوں کی نزاکت اور جذبوں کی گہرائی کو سمجھے اور ساتھ مل کر ایک خوبصورت آشیاں بنائے۔",
    en: "Assalam-u-Alaikum. \n'A quiet heart seeking a soul to build a home of peace.'\nI am a creative, warm-hearted writer who believes that marriage is a beautiful verse of companionship. Seeking a kind, emotionally mature partner who values emotional resonance, deep poetry, and inner peace.",
    roman: "Assalam-u-Alaikum. \n'Dua hai ke koi aisi mile jo dil ke haal ko chehre se padh le.'\nMain ek soft-hearted aur creative person hoon. Nature se mohabbat hai. Kisi aisi companion ki talash hai jo zindagi ke safar ko khubsurat aur pur-sukoon bana sake."
  },
  professional: {
    title: "Professional Style",
    sub: "Achiever · Structured · Concise",
    urdu: "السلام علیکم۔ میں نے مارکیٹنگ میں ایم بی اے کیا ہے اور ایک ملٹی نیشنل کمپنی میں سینئر مینیجر کے عہدے پر فائز ہوں۔ میں ایک خود اعتماد، مستقل مزاج اور کامیابیوں پر یقین رکھنے والی لڑکی ہوں۔ ایک ایسے ہم سفر کی تلاش ہے جو کیریئر اورینٹڈ ہو اور فیملی اقدار کا احترام کرے۔",
    en: "Assalam-u-Alaikum. Completed MBA from a top-tier school, currently leading marketing operations at a fintech startup. I value active ambition, personal growth, and emotional maturity. Looking for an equally career-focused, well-settled partner who is emotionally intelligent and supportive.",
    roman: "Assalam-u-Alaikum. Masters kiya hai Finance mein aur ek top corporate company mein Product Manager hoon. Growth, focus, aur dedication meri life ke pillars hain. Apne hi jaisi ek career-focused, mature aur family values ko samajhne wali partner ki talash hai."
  },
  detailed: {
    title: "Detailed Style",
    sub: "Comprehensive · Thorough · In-depth",
    urdu: "السلام علیکم۔\n\nتعلیم و کیریئر: ایم بی بی ایس ڈاکٹر، ہسپتال میں پریکٹس۔\nدینی اقدار: 5 وقت کی نماز، سنت کی پیروی کی کوشش، باحجاب۔\nخاندانی پس منظر: متوسط اور دیندار خاندان، والد سرکاری ملازم، 1 بھائی اور 2 بہنیں۔\nپسندیدہ شریکِ حیات: تعلیم یافتہ، بااخلاق، حلال روزی کمانے والا اور خاندان کی قدر کرنے والا شخص۔",
    en: "Assalam-u-Alaikum.\n\nEDUCATION & CAREER: Practicing doctor (MBBS); holds M.D. specialization.\nDEEN & PRACTICE: Observes 5 daily prayers, active Quran learning, wears hijab.\nFAMILY BACKGROUND: Respected family originally from Lahore. Father retired banker, mother homemaker, 1 brother.\nEXPECTATIONS: A practicing Muslim professional with high emotional intelligence and strong family values.",
    roman: "Assalam-u-Alaikum.\n\nEDUCATION & CAREER: MBBS Doctor, practice karti hoon.\nDEEN PRACTICE: 5 Waqt namaz ki pabandi, wears hijab, Alhamdulillah.\nFAMILY BACKGROUND: Respected family, father business manager, mother housewife, 2 sisters.\nEXPECTATIONS: Well educated professional, caring nature, respectable family values."
  }
};

// Premium high-resolution Apple Color Emoji PNG assets stored locally in public/assets/
const STYLES = [
  {
    id: "traditional",
    label: "Traditional",
    sub: "Respectful · family-oriented",
    appleEmojiUrl: "/assets/emoji-traditional.png"
  },
  {
    id: "modern",
    label: "Modern",
    sub: "Clean · contemporary",
    appleEmojiUrl: "/assets/emoji-modern.png"
  },
  {
    id: "poetic",
    label: "Poetic",
    sub: "Eloquent · literary",
    appleEmojiUrl: "/assets/emoji-poetic.png"
  },
  {
    id: "professional",
    label: "Professional",
    sub: "Career-forward · concise",
    appleEmojiUrl: "/assets/emoji-professional.png"
  },
  {
    id: "detailed",
    label: "Detailed",
    sub: "Comprehensive · thorough",
    appleEmojiUrl: "/assets/emoji-detailed.png"
  }
];

const LANGS = [
  { id: "urdu", label: "اردو Script" },
  { id: "roman", label: "Roman Urdu" },
  { id: "en", label: "English" }
];

export default function BioStylesShowcase() {
  const [selectedStyle, setSelectedStyle] = useState("traditional");
  const [selectedLang, setSelectedLang] = useState("roman");

  const bioData = SAMPLE_BIOS[selectedStyle];
  const isUrdu = selectedLang === "urdu";
  const bioText = bioData[selectedLang];

  return (
    <section className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden px-4 md:px-6">
      <div className="islamic-bg" />

      {/* Floating Background Blooms */}
      <div className="absolute top-[30%] left-[-10%] w-[45vw] h-[45vw] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] bg-rose/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Andaaz Aapki Marzi Ka
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            5 Andaaz — Aapki Marzi
          </h2>
          <div className="w-16 h-0.5 bg-gold mt-4 rounded-full" />
        </div>

        {/* Showcase Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Style Buttons */}
          <div className="lg:col-span-5 flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-3.5 justify-center w-full">
            {STYLES.map((style) => {
              const active = selectedStyle === style.id;
              const details = SAMPLE_BIOS[style.id];
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full max-w-[280px] lg:max-w-none text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4.5 cursor-pointer group ${
                    active
                      ? "bg-gold-dim border-gold text-gold shadow-gold-glow"
                      : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Richly Shaded Apple Color Emoji container */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all shrink-0 p-2 ${
                    active ? "bg-white/10 border-gold/45" : "bg-white/5 border-white/10"
                  }`}>
                    <img
                      src={style.appleEmojiUrl}
                      alt={style.label}
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[15.5px] font-bold ${active ? "text-gold-light" : "text-text-primary"}`}>
                      {style.label}
                    </div>
                    <div className="text-[11.5px] text-text-muted mt-0.5 font-medium tracking-wide">
                      {details.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Mock Bio Card */}
          <div className="lg:col-span-7 w-full flex flex-col items-center">
            {/* Language tabs */}
            <div className="flex gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
              {LANGS.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    selectedLang === lang.id
                      ? "bg-gradient-to-r from-gold-light to-gold text-[#1A1304] font-bold shadow-md"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Simulated Glass Bio Card */}
            <div className="w-full max-w-[500px] perspective-1000">
              <motion.div
                layout
                className="relative bg-gradient-to-b from-[#fbf5e6] to-[#f5ecd4] text-[#2b2412] p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between border border-gold/30"
              >
                {/* SVG Corner Ornaments */}
                <svg className="absolute top-4 left-4 w-10 h-10 text-gold/60" viewBox="0 0 32 32" fill="none">
                  <path d="M2 2 L 12 2 M 2 2 L 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 6 Q 6 6 6 2" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <circle cx="6" cy="6" r="1.4" fill="currentColor" />
                </svg>
                <svg className="absolute top-4 right-4 w-10 h-10 text-gold/60 scale-x-[-1]" viewBox="0 0 32 32" fill="none">
                  <path d="M2 2 L 12 2 M 2 2 L 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 6 Q 6 6 6 2" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <circle cx="6" cy="6" r="1.4" fill="currentColor" />
                </svg>
                <svg className="absolute bottom-4 left-4 w-10 h-10 text-gold/60 scale-y-[-1]" viewBox="0 0 32 32" fill="none">
                  <path d="M2 2 L 12 2 M 2 2 L 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 6 Q 6 6 6 2" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <circle cx="6" cy="6" r="1.4" fill="currentColor" />
                </svg>
                <svg className="absolute bottom-4 right-4 w-10 h-10 text-gold/60 scale-[-1_-1]" viewBox="0 0 32 32" fill="none">
                  <path d="M2 2 L 12 2 M 2 2 L 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 6 Q 6 6 6 2" stroke="currentColor" stroke-width="1.2" fill="none" />
                  <circle cx="6" cy="6" r="1.4" fill="currentColor" />
                </svg>

                {/* Card Header */}
                <div className="text-center mb-6">
                  <span className="font-display text-[26px] font-bold text-[#8a6f24] tracking-wide block">
                    Rishta Bio
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7a6b3d] mt-1 block">
                    — {bioData.title} · {selectedLang === "en" ? "English" : selectedLang === "roman" ? "Roman Urdu" : "Urdu"} —
                  </span>
                </div>

                {/* Card Content with Swap Transition */}
                <div className="flex-1 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedStyle}-${selectedLang}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`text-[#2B2412] text-center w-full px-2 ${
                        isUrdu ? "font-urdu text-[20px] leading-[2.1]" : "font-display text-[15px] leading-relaxed"
                      }`}
                      style={{
                        direction: isUrdu ? "rtl" : "ltr",
                        textAlign: isUrdu ? "right" : "left",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {bioText}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-[#C9A84C]/25 flex items-center justify-between text-[10px] text-[#7a6b3d] font-medium font-sans">
                  <span>SAMPLE BIO · DEMO ONLY</span>
                  <span className="font-display italic font-semibold">— RishtaGPT</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
