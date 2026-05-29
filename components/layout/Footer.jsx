"use client";

import Link from "next/link";
import { Heart, ShieldCheck, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#070B16]/40 backdrop-blur-sm border-t border-white/[0.04] py-14 px-6 md:px-12 relative overflow-hidden">
      {/* Background Islamic star overlay */}
      <div className="islamic-bg opacity-[0.015]" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Brand & Tagline */}
        <div className="md:col-span-4 flex flex-col items-start">
          <Link href="/" className="flex items-center gap-2.5 no-underline group cursor-pointer">
            {/* Crescent Star Small Logo replaced with actual brand logo */}
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#070b16]/70 border border-gold/30 text-gold overflow-hidden p-0.5 transition-all duration-300 group-hover:scale-105">
              <img src="/assets/logo.png" alt="RishtaGPT Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-semibold text-[19px] bg-gradient-to-r from-text-primary to-gold-light bg-clip-text text-transparent">
              RishtaGPT
            </span>
          </Link>
          <p className="text-[13px] text-text-muted mt-3 italic leading-relaxed max-w-[280px]">
            Beautiful rishta bios, written by Artificial Intelligence. AI se likhein apni kahani.
          </p>
          <div className="mt-6 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[11px] text-text-muted">
            <ShieldCheck size={13} className="text-gold" />
            <span>No data saved on our servers. Privacy First.</span>
          </div>
        </div>

        {/* Center-Left Column: Quick Navigation Links */}
        <div className="md:col-span-2 flex flex-col items-start">
          <h4 className="text-xs uppercase tracking-widest font-bold text-text-primary mb-4">
            Navigation
          </h4>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-text-muted">
            <Link href="/" className="hover:text-gold-light transition-colors no-underline">
              Home
            </Link>
            <Link href="/form" className="hover:text-gold-light transition-colors no-underline">
              Create Bio
            </Link>
            <span className="text-text-muted/40 cursor-not-allowed">
              Saved Bios (Local Only)
            </span>
          </div>
        </div>

        {/* Center-Right Column: Legal & Safety Guidelines */}
        <div className="md:col-span-3 flex flex-col items-start">
          <h4 className="text-xs uppercase tracking-widest font-bold text-text-primary mb-4">
            Safety & Legal
          </h4>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-text-muted">
            <Link href="/rules" className="hover:text-gold-light transition-colors no-underline">
              Safety Rules
            </Link>
            <Link href="/privacy" className="hover:text-gold-light transition-colors no-underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-light transition-colors no-underline">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        {/* Right Column: Community & Support */}
        <div className="md:col-span-3 flex flex-col items-start">
          <h4 className="text-xs uppercase tracking-widest font-bold text-text-primary mb-4">
            Community
          </h4>
          <p className="text-[12.5px] text-text-muted leading-relaxed mb-4">
            Join our exclusive WhatsApp community for matchmaking tips.
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-text-muted/65 text-xs font-bold cursor-not-allowed"
            >
              <MessageSquare size={13} />
              <span>WhatsApp Group</span>
            </button>
            <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-gold-dim border border-gold/30 text-gold animate-pulse">
              Coming Soon
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-6xl mx-auto border-t border-white/[0.04] mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-text-muted">
        <div>
          Copyright &copy; 2026 RishtaGPT. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          Made with <Heart size={11} className="text-rose fill-current" /> for Pakistani &amp; Indian Muslim families.
        </div>
      </div>
    </footer>
  );
}
