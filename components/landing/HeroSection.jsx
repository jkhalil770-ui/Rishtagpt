"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, Sparkles, Globe, MessageSquare } from "lucide-react";
import Link from "next/link";
import GoldButton from "../ui/GoldButton";

export default function HeroSection() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        const x = (e.clientX - window.innerWidth / 2) / 35;
        const y = (e.clientY - window.innerHeight / 2) / 35;
        setMouseOffset({ x, y });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const headline = "Beautiful rishta bios, written by AI.";
  const words = headline.split(" ");

  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const wordVars = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent gradient-mesh px-4 md:px-6">
      {/* Visual background layers */}
      <div className="islamic-bg" />

      {/* Floating Ambient Glow Bloom */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[35vw] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Centered Hero Layout */}
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center mt-12 md:mt-20"
      >
        {/* Animated Crescent Moon Medallion */}
        <motion.div
          style={{ x: mouseOffset.x, y: mouseOffset.y }}
          animate={{
            rotate: [0, 5, 0, -5, 0],
            filter: [
              "drop-shadow(0 0 15px rgba(201,168,76,0.35))",
              "drop-shadow(0 0 28px rgba(201,168,76,0.55))",
              "drop-shadow(0 0 15px rgba(201,168,76,0.35))",
            ],
          }}
          transition={{
            rotate: { duration: 10, ease: "easeInOut", repeat: Infinity },
            filter: { duration: 4, ease: "easeInOut", repeat: Infinity },
          }}
          className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-gold cursor-pointer mb-6"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1.8">
            <circle cx="50" cy="50" r="46" opacity="0.4" />
            <circle cx="50" cy="50" r="40" strokeDasharray="3 3" opacity="0.6" />
            <path
              d="M66 50 a18 18 0 1 1 -25 -16.5 a14.5 14.5 0 0 0 25 16.5 z"
              fill="url(#goldGrad)"
              stroke="none"
            />
            <defs>
              <linearGradient id="goldGrad" x1="10%" x2="90%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#E6C56A" />
                <stop offset="100%" stopColor="#8a6f24" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Small Tagline */}
        <motion.span
          variants={itemVars}
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-gold italic mb-3 block"
        >
          AI se likhein apni kahani
        </motion.span>

        {/* Word-by-word reveal Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-[80px] leading-[0.92] text-text-primary tracking-tight font-semibold mb-6 flex flex-wrap justify-center gap-x-3 gap-y-1 max-w-[850px]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-1">
              <motion.span
                variants={wordVars}
                className={
                  word.toLowerCase().includes("rishta") || word.toLowerCase().includes("ai")
                    ? "gold-text-gradient font-bold"
                    : ""
                }
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtext Paragraph */}
        <motion.p
          variants={itemVars}
          className="text-[14px] md:text-[17px] text-text-muted leading-[1.65] max-w-[560px] mb-10"
        >
          Generate dignified, culturally-grounded rishta bios in{" "}
          <strong className="text-text-primary">Urdu, Roman Urdu, and English</strong> powered by Gemini AI. Complete A4 biodatas with photo in seconds.
        </motion.p>

        {/* Action Button CTA */}
        <motion.div
          variants={itemVars}
          className="mb-10 w-full flex justify-center"
          animate={{
            boxShadow: [
              "0 0 20px rgba(201,168,76,0.15)",
              "0 0 35px rgba(201,168,76,0.35)",
              "0 0 20px rgba(201,168,76,0.15)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ borderRadius: "999px", width: "max-content" }}
        >
          <Link href="/form" className="no-underline">
            <GoldButton className="px-10 py-5 text-[17px] flex items-baseline gap-2">
              Shuru Karein
              <span className="text-[13px] ml-1">→</span>
            </GoldButton>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVars}
          className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-text-primary font-medium"
        >
          <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gold/25 bg-white/[0.04] backdrop-blur-md">
            <Sparkles size={14} className="text-gold" />
            <span>✦ 100% Free</span>
          </div>
          <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gold/25 bg-white/[0.04] backdrop-blur-md">
            <Globe size={14} className="text-gold" />
            <span>✦ 3 Languages</span>
          </div>
          <div className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gold/25 bg-white/[0.04] backdrop-blur-md">
            <MessageSquare size={14} className="text-gold" />
            <span>✦ WhatsApp Ready</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Downward Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.9, 0.3], y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-[11px] uppercase tracking-widest text-text-muted cursor-pointer"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span>Neechey Dekhein</span>
        <ChevronDown size={14} className="text-gold" />
      </motion.div>
    </section>
  );
}
