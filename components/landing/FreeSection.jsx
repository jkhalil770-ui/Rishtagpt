"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GoldButton from "../ui/GoldButton";

export default function FreeSection() {
  return (
    <section className="relative w-full py-28 md:py-36 bg-transparent overflow-hidden px-4 md:px-6 flex flex-col items-center justify-center text-center">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Background Star pattern overlay */}
      <div className="islamic-bg" />

      {/* Massive radial gold bloom backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[40vw] bg-gradient-to-r from-gold/5 via-rose/5 to-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl flex flex-col items-center"
      >
        <span className="text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-4 block">
          Hamara Ehed
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Bilkul Free — Hamesha
        </h2>
        <p className="text-[15px] sm:text-[17px] text-text-muted leading-relaxed max-w-[500px] mb-10">
          Koi hidden payment nahi. Koi card details nahi. Koi subscription plan nahi. Bas apni sacchi kahani likhao.
        </p>

        {/* 3 feature badges */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-12">
          <div className="px-5 py-2.5 rounded-full border border-gold/25 bg-white/[0.04] backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide">
            ✦ Unlimited Bios
          </div>
          <div className="px-5 py-2.5 rounded-full border border-gold/25 bg-white/[0.04] backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide">
            ✦ PDF + PNG Download
          </div>
          <div className="px-5 py-2.5 rounded-full border border-gold/25 bg-white/[0.04] backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide">
            ✦ WhatsApp Ready
          </div>
        </div>

        {/* Massive Pulsing Call to Action Button */}
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(201,168,76,0.15)",
              "0 0 40px rgba(201,168,76,0.45)",
              "0 0 20px rgba(201,168,76,0.15)",
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ borderRadius: "999px", width: "max-content" }}
        >
          <Link href="/form" className="no-underline">
            <GoldButton className="px-12 py-5 text-[17px] flex items-baseline gap-2">
              Abhi Shuru Karein
              <span className="text-[13px] ml-1">→</span>
            </GoldButton>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
