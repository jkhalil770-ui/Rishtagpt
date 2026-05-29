"use client";

import { motion } from "framer-motion";
import { FileText, ArrowLeft, CheckCircle, Scale, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

export default function TermsConditions() {
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
              <FileText size={20} />
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-text-primary via-gold-light to-text-primary bg-clip-text text-transparent">
              Terms &amp; Conditions
            </h1>
            <p className="text-[13px] text-text-muted mt-2 uppercase tracking-wider font-semibold italic">
              Last Updated: May 2026 · Ethical AI Matchmaking Terms
            </p>
          </div>

          {/* Terms Cards Info */}
          <div className="flex flex-col gap-6">
            <GlassCard className="p-8 border-gold/25 bg-[#0C1226]/85 shadow-gold-glow">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <CheckCircle size={18} className="text-gold" />
                1. Accuracy &amp; Honesty of Profiles
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                RishtaGPT is a copywriting assistant built to write high-quality matrimonial biodata cards. By using our platform, you agree to provide entirely **truthful, accurate, and genuine personal details**. Impersonating someone else, creating fake profiles, or fabricating education/career records is strictly prohibited and unethical.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <Scale size={18} className="text-gold" />
                2. Acceptable Matrimonial Use
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                This website is dedicated solely to formal matchmaking. Bios generated must represent respectable family guidelines. Using our service to generate spam, satirical content, commercial advertisements, or offensive remarks will result in access blocks through hCaptcha protection algorithms.
              </p>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-gold-light flex items-center gap-2 mb-3 font-display">
                <AlertTriangle size={18} className="text-gold" />
                3. AI Copywriting Limitation
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed mb-4">
                RishtaGPT translates and shapes profiles using Artificial Intelligence (Google Gemini). While the copy is designed to be highly polished, professional, and respectful, the platform cannot guarantee 100% factual accuracy. Users are urged to proofread their generated PDF cards before circulating them to families.
              </p>
              <div className="p-4 rounded-xl bg-gold-dim border border-gold/20 text-xs font-semibold text-gold flex items-center gap-2.5">
                <FileText size={14} className="shrink-0 animate-pulse" />
                <span>RishtaGPT is an assistant tool and is not liable for matches or marriages resulting from bios.</span>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/5 bg-[#0C1226]/85">
              <h3 className="text-lg font-bold text-text-primary mb-3 font-display">
                4. Copyright &amp; Personal Intellectual Property
              </h3>
              <p className="text-[13.5px] text-text-muted leading-relaxed">
                Matrimonial biodata cards created belong entirely to the user. You are granted an unlimited, worldwide, royalty-free license to distribute, print, share, or edit your generated PDF bio across family groups, matrimonial services, and matchmaking channels.
              </p>
            </GlassCard>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
