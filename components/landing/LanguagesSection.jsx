"use client";

import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const LANG_CARDS = [
  {
    title: "اردو Script",
    lang: "urdu",
    fontClass: "font-urdu text-[20px] leading-[2.1] text-right",
    align: "text-right",
    dir: "rtl",
    sample: "الحمدللہ، میں پانچ وقت نماز کی پابندی کرتا ہوں اور ایک متوسط اور شریف گھرانے سے تعلق رکھتا ہوں۔ کیریئر کے لحاظ سے میں سافٹ ویئر انجینئر ہوں اور حلال روزی کمانے کو ترجیح دیتا ہوں۔",
    badge: "اردو",
  },
  {
    title: "Roman Urdu",
    lang: "roman",
    fontClass: "font-sans italic text-[14.5px] leading-relaxed text-left",
    align: "text-left",
    dir: "ltr",
    sample: "Alhamdulillah, main 5 waqt namaz ki pabandi karta hoon aur ek respectable family se belong karta hoon. Professionally software engineer hoon aur family values ko prioritize karta hoon.",
    badge: "Roman Urdu",
  },
  {
    title: "English",
    lang: "en",
    fontClass: "font-display text-[15px] leading-relaxed text-left",
    align: "text-left",
    dir: "ltr",
    sample: "Alhamdulillah, I practice my 5 daily prayers and come from a well-settled family. I am a software engineer by profession, balancing ambitious career milestones with family-centered values.",
    badge: "English",
  },
];

export default function LanguagesSection() {
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVars = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden px-4 md:px-6">
      {/* Visual background layers */}
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="islamic-bg" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20 flex flex-col items-center"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Haseen Tarjuma
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Aapki Zaban Mein
          </h2>
          <div className="w-16 h-0.5 bg-gold mt-4 rounded-full" />
        </motion.div>

        {/* Floating Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVars}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 justify-between items-stretch"
        >
          {LANG_CARDS.map((card, i) => (
            <motion.div
              key={card.lang}
              variants={cardVars}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                y: {
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                },
              }}
              className="w-full flex"
            >
              <GlassCard className="p-8 md:p-10 flex flex-col justify-between items-stretch w-full relative overflow-hidden group border-gold/15 bg-white/[0.04]">
                {/* Top language badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase tracking-wider font-bold text-text-muted">
                    Language Option
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-bold bg-gold-dim text-gold border border-gold/30">
                    {card.badge}
                  </span>
                </div>

                {/* Sample block with custom typography */}
                <div
                  dir={card.dir}
                  className={`flex-1 flex items-center min-h-[140px] text-text-primary ${card.fontClass}`}
                >
                  "{card.sample}"
                </div>

                {/* Simulated Wave overlay at bottom */}
                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10.5px] text-text-muted font-medium">
                  <span>TRANS-LITERATED READY</span>
                  <span className="text-gold">✦ Active</span>
                </div>

                {/* Card Hover Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
