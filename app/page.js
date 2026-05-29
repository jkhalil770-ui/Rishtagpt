"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Sparkles, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import BioStylesShowcase from "@/components/landing/BioStylesShowcase";
import LanguagesSection from "@/components/landing/LanguagesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FreeSection from "@/components/landing/FreeSection";
import GlassCard from "@/components/ui/GlassCard";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // 1. Check if deferredPrompt is already cached on window
    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
      // Wait a brief delay to show the prompt (Cinematic entrance)
      setTimeout(() => setShowInstallPrompt(true), 4000);
    }

    // 2. Listen to custom event dispatched by ClientInitializer
    const handlePwaInstallable = (e) => {
      setDeferredPrompt(e.detail);
      setTimeout(() => setShowInstallPrompt(true), 4000);
    };

    window.addEventListener("pwa-installable", handlePwaInstallable);

    // 3. Listen to appinstalled event
    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      window.deferredPrompt = null;
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("pwa-installable", handlePwaInstallable);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted PWA installation");
      }
      setDeferredPrompt(null);
      window.deferredPrompt = null;
      setShowInstallPrompt(false);
    });
  };

  return (
    <>
      <Header />
      <main className="relative w-full">
        {/* Section 1 — Hero */}
        <HeroSection />

        {/* Section 2 — How It Works */}
        <HowItWorks />

        {/* Section 3 — Bio Styles Showcase */}
        <BioStylesShowcase />

        {/* Section 4 — Languages Section */}
        <LanguagesSection />

        {/* Section 5 — Testimonials */}
        <TestimonialsSection />

        {/* Section 6 — Free Section */}
        <FreeSection />
      </main>
      <Footer />

      {/* Premium Floating PWA Install Prompt Banner */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 25, delay: 0.5 }}
            className="fixed bottom-6 right-6 z-40 w-full max-w-[340px] px-4 sm:px-0"
          >
            <GlassCard className="p-5 flex items-start gap-4 border-gold/45 bg-[#0C1226]/90 shadow-gold-intense relative">
              {/* Close Button */}
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-text-muted hover:text-text-primary cursor-pointer"
              >
                <X size={12} />
              </button>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gold-dim border border-gold/30 text-gold shrink-0">
                <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-current" strokeWidth="2.2">
                  <path
                    d="M66 50 a18 18 0 1 1 -25 -16.5 a14.5 14.5 0 0 0 25 16.5 z"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-[14px] font-bold text-text-primary flex items-center gap-1.5">
                  RishtaGPT Install Karein
                  <Sparkles size={12} className="text-gold" />
                </h4>
                <p className="text-[11.5px] text-text-muted mt-1 leading-relaxed">
                  Apne phone pe direct save karein aur fast, free bio generator payein.
                </p>
                <button
                  onClick={handleInstallClick}
                  className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-gold-light to-gold text-[#1A1304] transition-all cursor-pointer shadow-md hover:scale-[1.03] active:scale-[0.98]"
                >
                  Download App
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
