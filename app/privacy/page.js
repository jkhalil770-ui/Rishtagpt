"use client";

import { motion } from "framer-motion";
import { Shield, ArrowLeft, EyeOff, Lock, Database } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

export default function PrivacyPolicy() {
  const containerVars = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 px-4 md:px-6">
        {/* Floating Ambient Glow Bloom */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-3xl flex flex-col mt-4"
        >
          {/* Back Button */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-gold transition-colors no-underline mb-6 cursor-pointer"
          >
            <ArrowLeft size={14} className="text-gold" />
            <span>Back to Home</span>
          </Link>

          {/* Page Title Header */}
          <div className="mb-10 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gold-dim border border-gold/30 text-gold flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Shield size={20} />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-text-primary via-gold-light to-text-primary bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-[13px] text-text-muted mt-2 uppercase tracking-wider font-semibold italic">
              Last Updated: May 2026 · Privacy First Matchmaking
            </p>
          </div>

          {/* Privacy Cards Info */}
          <div className="flex flex-col gap-6">
            <GlassCard className="p-8 border-gold/25 bg-[#0C1226]/85 shadow-gold-glow">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <EyeOff size={18} className="text-gold" />
                1. Zero Data Persistence Policy
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                RishtaGPT operates on a strict **zero data storage policy**. All bio form inputs, personal descriptions, professional profiles, and uploaded images are processed entirely in-memory during execution. We **never** save, store, or log your personal data or photos on our databases or cloud servers.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <Database size={18} className="text-gold" />
                2. Ephemeral Profile Generations
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                When you click "Create Bio", the data is sent securely to the Google Gemini AI engine solely to write your bio text. Once the PDF biodata card is compiled, the session is cleared. Your generated biodatas remain cached locally inside your browser's local memory (localStorage) so only you can review or delete them.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <Lock size={18} className="text-gold" />
                3. Secure API Integration
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed mb-4">
                We use secure HTTPS SSL layers for all network transits. Firebase services are used solely to check API authentication tokens, and hCaptcha site keys protect the system from automated web scraper attacks. Your uploads (such as optional profile photos) are processed locally using high-performance Canvas compressors inside your web browser.
              </p>
              <div className="p-4 rounded-xl bg-gold-dim border border-gold/20 text-xs font-semibold text-gold flex items-center gap-2.5">
                <Shield size={14} className="shrink-0 animate-pulse" />
                <span>RishtaGPT is fully compliant with modern data protection ethics for families.</span>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-text-primary mb-3 font-display">
                4. Third-Party Services
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                We utilize Gemini AI for bio copywriting services, Google Fonts for elegant typography rendering, and Vercel for fast, optimized content delivery. None of these third parties are granted permission to access or retain user details generated through our forms.
              </p>
            </GlassCard>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
