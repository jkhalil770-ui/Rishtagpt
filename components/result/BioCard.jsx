"use client";

import { motion } from "framer-motion";

function CornerOrnament({ position }) {
  const styles = {
    tl: { top: 12, left: 12, transform: "none" },
    tr: { top: 12, right: 12, transform: "scaleX(-1)" },
    bl: { bottom: 12, left: 12, transform: "scaleY(-1)" },
    br: { bottom: 12, right: 12, transform: "scale(-1,-1)" },
  };
  return (
    <svg
      className="absolute w-8 h-8 text-gold/55 pointer-events-none"
      style={styles[position]}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path d="M2 2 L 12 2 M 2 2 L 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 6 Q 6 6 6 2" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M2 16 Q 8 16 8 10 Q 8 4 14 4" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.7" />
      <circle cx="6" cy="6" r="1.4" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export default function BioCard({ bio, lang, style, loading }) {
  const isUrdu = lang === "urdu";
  const isRoman = lang === "roman";

  const getFontClass = () => {
    if (isUrdu) return "font-urdu text-[19px] leading-[2.2] text-right";
    if (isRoman) return "font-sans italic text-[14.5px] leading-relaxed text-left";
    return "font-display text-[15.5px] leading-relaxed text-left";
  };

  const styleLabel = style.charAt(0).toUpperCase() + style.slice(1);
  const charCount = bio ? bio.length : 0;

  return (
    <div className="relative w-full rounded-[24px] bg-[#1A1508] border border-gold/30 p-8 pb-7 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* 4 Corner Ornaments */}
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      {/* Shimmer sweep loader effect when fetching */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.04] to-transparent bg-[length:200%_100%] animate-shimmer-sweep pointer-events-none" />
      )}

      {/* Card Content */}
      <div className="min-h-[220px] flex flex-col justify-between">
        {/* Main Text Block */}
        <div
          dir={isUrdu ? "rtl" : "ltr"}
          className={`text-text-primary whitespace-pre-wrap ${getFontClass()} ${
            loading ? "opacity-35 blur-[1px]" : "opacity-100"
          }`}
        >
          {bio || "Aapki bio generate ho rahi hai..."}
        </div>

        {/* Info Footer Row */}
        {!loading && bio && (
          <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-[11px] text-gold/60 font-medium">
            <span>
              {charCount} Characters · {styleLabel} Style
            </span>
            <span className="font-display italic font-semibold">— RishtaGPT</span>
          </div>
        )}
      </div>
    </div>
  );
}
