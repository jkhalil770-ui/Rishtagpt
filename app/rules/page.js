"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Users, ShieldAlert, CheckSquare, Heart } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

export default function SafetyRules() {
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
              <BookOpen size={20} />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-text-primary via-gold-light to-text-primary bg-clip-text text-transparent">
              Safety &amp; Matchmaking Rules
            </h1>
            <p className="text-[13px] text-text-muted mt-2 uppercase tracking-wider font-semibold italic">
              Culturally Grounded Matchmaking Guidelines for South Asian Families
            </p>
          </div>

          {/* Rules Cards Info */}
          <div className="flex flex-col gap-6">
            <GlassCard className="p-8 border-gold/25 bg-[#0C1226]/85 shadow-gold-glow">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <Users size={18} className="text-gold" />
                1. Family &amp; Parental Involvement
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                Rishta is a beautiful union of two families, not just two individuals. We highly advise **always keeping parents or guardians involved** in all communication. Always share matches and biodatas with your family first before advancing discussions or arranging meetings.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <CheckSquare size={18} className="text-gold" />
                2. Verify Before you Trust (Reference Checks)
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                Matches can present highly polished details, but it is important to perform formal **reference checks**. Educate yourself, verify their educational qualifications, check employment status directly, and inquire through mutual acquaintances, local mosques, or family elders before finalizing a match.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <ShieldAlert size={18} className="text-gold" />
                3. Financial &amp; Scam Vigilance
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed mb-4">
                Be extremely vigilant of matrimonial scams. **Never send money** to anyone you meet through matchmaking channels for custom fees, immigration/visa costs, business emergency loans, or plane tickets. RishtaGPT is 100% free and will never ask you to send money to anyone.
              </p>
              <div className="p-4 rounded-xl bg-gold-dim border border-gold/20 text-xs font-semibold text-gold flex items-center gap-2.5">
                <ShieldAlert size={14} className="shrink-0 animate-pulse" />
                <span>Protect your personal identity. Avoid sharing bank records or sensitive passwords early on.</span>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-text-primary mb-3 font-display">
                <Heart size={18} className="text-gold" />
                4. Maintain Respect and Dignity
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                Respectful communication is the foundation of matrimony. Maintain formal respect, communicate through respectful family channels, and be transparent and honest about your expectations (maslak, career desires, joint family plans) from day one.
              </p>
            </GlassCard>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
