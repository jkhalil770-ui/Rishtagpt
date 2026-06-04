"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, RefreshCw, Download, ArrowLeft, Shield, Users, BookOpen } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";
import { exportCompatibilityPNG } from "@/utils/exportCompatibilityPNG";

const LOADING_MESSAGES = [
  "Reading profiles...",
  "Understanding personalities...",
  "Comparing values...",
  "Analyzing family priorities...",
  "Building compatibility report...",
  "Preparing insights...",
];

const DEFAULT_PROFILE = {
  name: "",
  age: 25,
  profession: "",
  religiousOutlook: "",
  lifestyle: "",
  familyValues: ""
};

export default function CompatibilityPage() {
  const router = useRouter();
  
  // Profile inputs
  const [profileA, setProfileA] = useState({ ...DEFAULT_PROFILE, name: "Candidate A" });
  const [profileB, setProfileB] = useState({ ...DEFAULT_PROFILE, name: "Candidate B" });
  
  const [mockMode, setMockMode] = useState(true); // Default to mock success mode for smooth, reliable rate-limit safe testing
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);

  // Focus rings
  const [focusA, setFocusA] = useState({});
  const [focusB, setFocusB] = useState({});

  // 1. Loading screen typewriter cycles
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      setDisplayText("");
      return;
    }
    setDisplayText("");
    let i = 0;
    const currentMsg = LOADING_MESSAGES[msgIndex];
    const typingTimer = setInterval(() => {
      setDisplayText(currentMsg.substring(0, i + 1));
      i++;
      if (i >= currentMsg.length) {
        clearInterval(typingTimer);
      }
    }, 40);
    return () => clearInterval(typingTimer);
  }, [msgIndex, loading]);

  // 2. Slow progress bar loader (0 to 90%)
  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          const increment = (90 - prev) * 0.08;
          return prev + Math.max(increment, 0.4);
        }
        return prev;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [loading]);

  // Handle Form Submission
  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!profileA.name.trim() || !profileB.name.trim()) {
      alert("Naam likhna zaroori hai donon profiles ka.");
      return;
    }
    
    setLoading(true);
    setError("");
    setResult(null);
    setMsgIndex(0);

    try {
      const resp = await fetch("/api/compatibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileA,
          profileB,
          mockSuccess: mockMode
        })
      });

      if (!resp.ok) {
        const errJson = await resp.json();
        throw new Error(errJson.error || "Kuch masla hua check karne mein.");
      }

      const json = await resp.json();
      
      // Speed up progress to 100% and show results
      setProgress(100);
      setTimeout(() => {
        setResult(json);
        setLoading(false);
      }, 800);

    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Trigger PNG download
  const handleExportPNG = async () => {
    if (exporting || !result) return;
    setExporting(true);
    try {
      await exportCompatibilityPNG({ profileA, profileB, result });
    } catch (e) {
      alert("PNG generation failed: " + e.message);
    } finally {
      setExporting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setResult(null);
    setError("");
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen gradient-mesh pt-24 pb-20 px-4 md:px-6 flex flex-col items-center overflow-x-hidden">
        <div className="islamic-bg" />

        {/* Global Particles floating overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* 1. Loading / Processing Animation Screen */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#050814] via-[#0b1021] to-[#050814]"
            >
              {/* Radial glow */}
              <div className="absolute w-[60vw] h-[60vw] rounded-full bg-gold/5 blur-[130px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

              {/* Animated SVG Compatibility Symbol */}
              <div className="relative w-40 h-40 flex items-center justify-center mb-10">
                <motion.svg 
                  className="w-full h-full text-gold/30"
                  viewBox="0 0 100 100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                >
                  <circle cx="35" cy="50" r="22" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="65" cy="50" r="22" stroke="currentColor" strokeWidth="1" fill="none" />
                  <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                </motion.svg>

                {/* Glowing Core Heart */}
                <motion.div 
                  className="absolute z-10 text-gold drop-shadow-[0_0_15px_rgba(201,168,76,0.8)]"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                >
                  <Heart size={36} className="fill-gold" />
                </motion.div>
              </div>

              {/* Typewriter Messages */}
              <div className="h-10 text-center px-4">
                <div className="font-display text-lg md:text-xl font-bold tracking-wide italic shimmer-text min-h-[30px] flex items-center justify-center">
                  <span>{displayText}</span>
                  <span className="w-[3px] h-5 bg-gold ml-2 animate-ping shrink-0" />
                </div>
              </div>

              <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-semibold mt-2">
                AI Compatibility Processor
              </span>

              {/* Progress meter */}
              <div className="relative w-64 h-[4px] bg-white/[0.04] border border-white/5 rounded-full overflow-hidden mt-8">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-light to-gold rounded-full shadow-[0_0_8px_rgba(201,168,76,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[12px] font-bold text-gold-light mt-3 tracking-wider font-display">
                {Math.round(progress)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Main Container */}
        <div className="w-full max-w-4xl flex flex-col items-stretch mt-4 relative z-10">
          
          {/* Back button row */}
          <div className="flex items-center gap-3.5 mb-6">
            <button
              onClick={() => router.push("/")}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-gold-dim text-text-muted hover:text-gold transition-all cursor-pointer flex items-center justify-center active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs uppercase tracking-widest font-bold text-gold-light italic">
              AI MATRIMONIAL COMPATIBILITY LAB
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!result ? (
              // 3. Entry Input Form
              <motion.div
                key="form-entry"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {/* Hero Header */}
                <div className="text-center mb-10">
                  <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight shimmer-text mb-4 leading-tight">
                    Discover More Than A Match
                  </h1>
                  <p className="text-[14px] sm:text-[16px] text-text-muted max-w-xl mx-auto leading-relaxed">
                    AI analyzes family values, lifestyle, career goals, communication patterns, and religious outlooks to discover true alignment.
                  </p>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-8">
                  {/* Two Profile Grid Panels */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Column: Profile A */}
                    <GlassCard className="p-6 md:p-8 border-gold/20 shadow-2xl relative bg-[#0C1226]/80 backdrop-blur-md">
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-gold/30 bg-gold-dim text-gold text-[9px] font-bold uppercase tracking-wider">
                        Profile A
                      </div>
                      
                      <h3 className="font-display text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                        <Users size={18} className="text-gold" />
                        First Candidate
                      </h3>

                      <div className="space-y-6">
                        {/* Name Input */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Name / Label (e.g. Ahmed)"
                            value={profileA.name}
                            onChange={(e) => setProfileA({ ...profileA, name: e.target.value })}
                            onFocus={() => setFocusA({ ...focusA, name: true })}
                            onBlur={() => setFocusA({ ...focusA, name: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none ${
                              focusA.name ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Age Input */}
                        <div className="relative">
                          <input
                            type="number"
                            min="18"
                            max="70"
                            required
                            placeholder="Age"
                            value={profileA.age || ""}
                            onChange={(e) => setProfileA({ ...profileA, age: Number(e.target.value) })}
                            onFocus={() => setFocusA({ ...focusA, age: true })}
                            onBlur={() => setFocusA({ ...focusA, age: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none ${
                              focusA.age ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Profession / Education */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Profession & Education (e.g. Software Engineer, BS)"
                            value={profileA.profession}
                            onChange={(e) => setProfileA({ ...profileA, profession: e.target.value })}
                            onFocus={() => setFocusA({ ...focusA, profession: true })}
                            onBlur={() => setFocusA({ ...focusA, profession: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none ${
                              focusA.profession ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Religious Outlook */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Religious Outlook (e.g. Sunni, prays 5 times)"
                            value={profileA.religiousOutlook}
                            onChange={(e) => setProfileA({ ...profileA, religiousOutlook: e.target.value })}
                            onFocus={() => setFocusA({ ...focusA, religion: true })}
                            onBlur={() => setFocusA({ ...focusA, religion: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none ${
                              focusA.religion ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Lifestyle & Hobbies */}
                        <div className="relative">
                          <textarea
                            required
                            rows="2"
                            placeholder="Lifestyle & Traits (e.g. quiet, career-driven, loves books, outgoing lifestyle)"
                            value={profileA.lifestyle}
                            onChange={(e) => setProfileA({ ...profileA, lifestyle: e.target.value })}
                            onFocus={() => setFocusA({ ...focusA, lifestyle: true })}
                            onBlur={() => setFocusA({ ...focusA, lifestyle: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none resize-none ${
                              focusA.lifestyle ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Family Values */}
                        <div className="relative">
                          <textarea
                            required
                            rows="2"
                            placeholder="Family Setup & Expectations (e.g. nuclear family, traditional background, expects house-sharing)"
                            value={profileA.familyValues}
                            onChange={(e) => setProfileA({ ...profileA, familyValues: e.target.value })}
                            onFocus={() => setFocusA({ ...focusA, family: true })}
                            onBlur={() => setFocusA({ ...focusA, family: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none resize-none ${
                              focusA.family ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>
                      </div>
                    </GlassCard>

                    {/* Right Column: Profile B */}
                    <GlassCard className="p-6 md:p-8 border-gold/20 shadow-2xl relative bg-[#0C1226]/80 backdrop-blur-md">
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-gold/30 bg-gold-dim text-gold text-[9px] font-bold uppercase tracking-wider">
                        Profile B
                      </div>

                      <h3 className="font-display text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                        <Users size={18} className="text-gold" />
                        Second Candidate
                      </h3>

                      <div className="space-y-6">
                        {/* Name Input */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Name / Label (e.g. Zara)"
                            value={profileB.name}
                            onChange={(e) => setProfileB({ ...profileB, name: e.target.value })}
                            onFocus={() => setFocusB({ ...focusB, name: true })}
                            onBlur={() => setFocusB({ ...focusB, name: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none ${
                              focusB.name ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Age Input */}
                        <div className="relative">
                          <input
                            type="number"
                            min="18"
                            max="70"
                            required
                            placeholder="Age"
                            value={profileB.age || ""}
                            onChange={(e) => setProfileB({ ...profileB, age: Number(e.target.value) })}
                            onFocus={() => setFocusB({ ...focusB, age: true })}
                            onBlur={() => setFocusB({ ...focusB, age: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none ${
                              focusB.age ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Profession / Education */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Profession & Education (e.g. Graphic Designer, BS)"
                            value={profileB.profession}
                            onChange={(e) => setProfileB({ ...profileB, profession: e.target.value })}
                            onFocus={() => setFocusB({ ...focusB, profession: true })}
                            onBlur={() => setFocusB({ ...focusB, profession: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none ${
                              focusB.profession ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Religious Outlook */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Religious Outlook (e.g. Sunni, moderate Namaz)"
                            value={profileB.religiousOutlook}
                            onChange={(e) => setProfileB({ ...profileB, religiousOutlook: e.target.value })}
                            onFocus={() => setFocusB({ ...focusB, religion: true })}
                            onBlur={() => setFocusB({ ...focusB, religion: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none ${
                              focusB.religion ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Lifestyle & Hobbies */}
                        <div className="relative">
                          <textarea
                            required
                            rows="2"
                            placeholder="Lifestyle & Traits (e.g. artistic, outgoing, enjoys community events, values simple living)"
                            value={profileB.lifestyle}
                            onChange={(e) => setProfileB({ ...profileB, lifestyle: e.target.value })}
                            onFocus={() => setFocusB({ ...focusB, lifestyle: true })}
                            onBlur={() => setFocusB({ ...focusB, lifestyle: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none resize-none ${
                              focusB.lifestyle ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>

                        {/* Family Values */}
                        <div className="relative">
                          <textarea
                            required
                            rows="2"
                            placeholder="Family Setup & Expectations (e.g. moderate, joint family oriented, expects respect and values)"
                            value={profileB.familyValues}
                            onChange={(e) => setProfileB({ ...profileB, familyValues: e.target.value })}
                            onFocus={() => setFocusB({ ...focusB, family: true })}
                            onBlur={() => setFocusB({ ...focusB, family: false })}
                            className={`w-full px-4.5 py-3.5 bg-white/[0.02] border rounded-2xl text-text-primary text-sm font-medium transition-all duration-350 outline-none resize-none ${
                              focusB.family ? "border-gold shadow-gold-glow scale-[1.01]" : "border-white/10"
                            }`}
                          />
                        </div>
                      </div>
                    </GlassCard>

                  </div>

                  {/* Errors display */}
                  {error && (
                    <div className="p-4.5 rounded-2xl bg-rose/5 border border-rose/25 text-rose-light text-center text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  {/* Flagship CTA Action Panel */}
                  <div className="flex flex-col items-center pt-4 gap-4">
                    {/* Developer Mock checkbox */}
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={mockMode}
                        onChange={(e) => setMockMode(e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 accent-gold"
                      />
                      <span className="text-[11.5px] text-text-muted font-bold tracking-wide uppercase">
                        Mock Success Mode (Bypasses Gemini rate-limits for testing)
                      </span>
                    </label>

                    {/* Magnetic analyze compatibility button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(201,168,76,0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="px-10 py-5 rounded-2xl bg-gradient-to-r from-gold-light via-gold to-gold-light text-[#1A1304] text-[15px] font-black uppercase tracking-wider transition-all duration-300 shadow-gold-glow cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Analyze Compatibility</span>
                      <Sparkles size={16} />
                    </motion.button>
                  </div>

                </form>
              </motion.div>
            ) : (
              // 4. Compatibility Results Reveal View
              <motion.div
                key="results-view"
                initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10"
              >
                {/* Section 1: Playfair headline & Shimmer sweep */}
                <div className="text-center relative py-6 overflow-hidden">
                  <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="font-display italic text-3xl sm:text-4xl md:text-5xl font-black gold-text-gradient tracking-wide leading-tight max-w-2xl mx-auto"
                  >
                    “{result.compatibilityHeadline}”
                  </motion.h2>
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-text-muted mt-4">
                    AI MATRIMONIAL REPORT
                  </p>
                </div>

                {/* Section 2: Compatibility Status Badge Card */}
                <div className="flex flex-col items-center justify-center">
                  <GlassCard className="px-10 py-6 border-gold/30 bg-[#1A1508] shadow-gold-glow text-center min-w-[280px]">
                    <span className="text-[10px] text-text-muted uppercase tracking-[0.25em] font-bold block mb-2">
                      Compatibility Rating
                    </span>
                    <div className="font-display text-2xl sm:text-3xl font-black text-gold flex items-center justify-center gap-2.5">
                      <Heart size={20} className="fill-gold text-gold" />
                      {result.compatibilityStatus}
                    </div>
                  </GlassCard>
                </div>

                {/* Section 3: Compatibility Radar Category Arcs */}
                <GlassCard className="p-8 border-white/10 bg-[#080d1e]/85 shadow-2xl relative">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-text-muted text-center mb-8 font-display">
                    Matrimonial Harmony Categories
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {[
                      { name: "Family Values", score: result.scores.familyValues },
                      { name: "Communication", score: result.scores.communication },
                      { name: "Education", score: result.scores.education },
                      { name: "Lifestyle", score: result.scores.lifestyle },
                      { name: "Career Goals", score: result.scores.careerGoals },
                      { name: "Religious Outlook", score: result.scores.religiousOutlook },
                    ].map((metric, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.01] border border-white/5">
                        <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="27" className="stroke-white/[0.06] fill-none" strokeWidth="2.5" />
                            <motion.circle cx="32" cy="32" r="27" className="stroke-gold fill-none" strokeWidth="3"
                              initial={{ strokeDashoffset: 2 * Math.PI * 27 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 27 * (1 - (metric.score || 70) / 100) }}
                              transition={{ duration: 1.2, delay: 0.1 * idx, ease: "easeOut" }}
                              strokeDasharray={2 * Math.PI * 27}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute text-[13px] font-bold text-gold-light font-display">
                            {metric.score}%
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-text-primary leading-tight">{metric.name}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Section 4 & 5: Strengths vs Topics Worth Discussing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Strengths Card */}
                  <GlassCard className="p-6 border-gold/25 bg-gold-dim/40 backdrop-blur-md shadow-gold-glow">
                    <h4 className="text-[11px] uppercase tracking-widest font-bold text-gold mb-5 flex items-center gap-1.5 font-display">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-ping" />
                      Key Alignment Strengths
                    </h4>
                    <ul className="space-y-4">
                      {result.strengths.map((point, idx) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + 0.1 * idx }}
                          key={idx} 
                          className="text-[13px] text-text-primary leading-relaxed flex items-start gap-2.5 font-medium"
                        >
                          <span className="text-gold font-bold">✓</span>
                          <span>{point.replace(/^✓\s*/, "")}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </GlassCard>

                  {/* Discussion Areas Card */}
                  <GlassCard className="p-6 border-white/5 bg-[#0C1226]/40 backdrop-blur-md">
                    <h4 className="text-[11px] uppercase tracking-widest font-bold text-text-muted mb-5 flex items-center gap-1.5 font-display">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                      Topics Worth Discussing
                    </h4>
                    <ul className="space-y-4">
                      {result.discussionAreas.map((point, idx) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + 0.1 * idx }}
                          key={idx} 
                          className="text-[13px] text-text-muted leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="text-gold font-bold">•</span>
                          <span>{point.replace(/^[•-]\s*/, "")}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </GlassCard>

                </div>

                {/* Section 6: AI First Impression Badges */}
                <div className="flex flex-col items-center p-6 rounded-3xl bg-white/[0.01] border border-white/5">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-text-muted mb-4 font-display">
                    Matrimonial Dynamic Badges
                  </h4>
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {result.firstImpressions.map((badge, idx) => (
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + 0.08 * idx, type: "spring" }}
                        key={idx} 
                        className="px-4 py-2 rounded-xl border border-gold/30 bg-[#070b16]/90 text-gold text-[11px] font-bold tracking-wider shadow-[0_2px_12px_rgba(201,168,76,0.12)] flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                        {badge}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Section 7: AI Final Summary */}
                <GlassCard className="p-8 md:p-10 border-white/10 bg-[#070b16]/60 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-gold-light mb-6 flex items-center gap-2 font-display">
                    <BookOpen size={13} className="text-gold" />
                    AI Matchmaker Synthesis
                  </h4>

                  <p className="text-[14.5px] text-text-primary/90 font-medium leading-[1.8] tracking-wide text-justify">
                    {result.summary}
                  </p>
                </GlassCard>

                {/* Section 8: Export Share Panel & Action Links */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-7 py-4.5 rounded-2xl border border-white/10 hover:border-gold/30 bg-[#070b16]/50 hover:bg-[#0C1226]/80 text-text-muted hover:text-gold text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    <span>Dobara Check Karein</span>
                  </button>

                  <motion.button
                    onClick={handleExportPNG}
                    disabled={exporting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-gradient-to-r from-gold-light to-gold text-[#1A1304] text-xs font-black uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Download size={14} className={exporting ? "animate-bounce" : ""} />
                    <span>{exporting ? "Saving Report..." : "Save Share Card"}</span>
                  </motion.button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </>
  );
}
