"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Users, Heart, Shield, Copy, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BioCard from "@/components/result/BioCard";
import AudioPlayer from "@/components/result/AudioPlayer";
import ShareButtons from "@/components/result/ShareButtons";
import GeneratingAnimation from "@/components/result/GeneratingAnimation";
import LoginModal from "@/components/ui/LoginModal";
import GlassCard from "@/components/ui/GlassCard";
import { auth, onAuthStateChanged, logGeneration } from "@/utils/firebase";
import { generateBio } from "@/utils/gemini";
import { exportBioPDF } from "@/utils/exportPDF";
import { exportBioPNG } from "@/utils/exportPNG";

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTransition, setShowTransition] = useState(true);
  const [error, setError] = useState("");
  const [queueStatus, setQueueStatus] = useState("");

  // Firebase auth state
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Generated bios state (contains structured JSON objects per language)
  const [bios, setBios] = useState({}); 
  const [activeLang, setActiveLang] = useState("");
  const [activeStyle, setActiveStyle] = useState("traditional");
  const [isFamilyApproval, setIsFamilyApproval] = useState(false);
  
  // Download loadings
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pngLoading, setPngLoading] = useState(false);

  // 1. Load Form Data on Mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem("rg_form_v2");
      if (!cached) {
        router.push("/form");
        return;
      }
      const parsedData = JSON.parse(cached);
      setData(parsedData);
      
      // Default active tab to the first selected language
      if (parsedData.langs && parsedData.langs.length > 0) {
        setActiveLang(parsedData.langs[0]);
      } else {
        setActiveLang("roman");
      }
    } catch (e) {
      console.error(e);
      router.push("/form");
    }
  }, [router]);

  // 2. Track Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  const hasFetchedRef = useRef(false);

  // 3. Sequentially fetch bios payloads for each selected language to prevent concurrent rate limit collisions
  useEffect(() => {
    if (!data || hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchAllBios = async () => {
      setLoading(true);
      setError("");
      
      const langQueries = data.langs || ["roman"];
      const generatedResults = {};

      try {
        // Run sequential queries with a small gap to respect free rate-limits
        for (const langId of langQueries) {
          console.log(`[UI] Launching sequential generation for language: ${langId}`);
          const parsedJson = await generateBio({
            data,
            lang: langId,
            onStatusChange: (status) => {
              if (status === "queued" || status === "generating" || status === "success") {
                setQueueStatus(status);
              }
            }
          });
          generatedResults[langId] = parsedJson;
        }

        setBios(generatedResults);

        // Record generation stats in Firestore if logged in
        if (auth.currentUser) {
          await logGeneration(auth.currentUser.uid);
        }
      } catch (err) {
        console.error("AI Generation Error:", err);
        setError(err.message || "AI aapki bio tayyar nahi kar saka. Thodi der baad 'Try Again' par click karein.");
        // Reset ref so they can retry on failure
        hasFetchedRef.current = false;
      } finally {
        setLoading(false);
      }
    };

    fetchAllBios();
  }, [data]);

  // 4. Handle auto-triggering of pending actions after login success
  const handleLoginSuccess = async (loggedInUser) => {
    setUser(loggedInUser);
    await logGeneration(loggedInUser.uid);

    if (pendingAction === "pdf") {
      setTimeout(() => triggerPdfExport(), 500);
    } else if (pendingAction === "png") {
      setTimeout(() => triggerPngExport(), 500);
    }
    setPendingAction(null);
  };

  const currentLangObj = bios[activeLang] || {};
  const currentBio = isFamilyApproval 
    ? (currentLangObj.familyApproval || "") 
    : (currentLangObj[activeStyle] || "");

  // 5. PDF Export Handler
  const triggerPdfExport = async () => {
    if (!data || pdfLoading) return;
    setPdfLoading(true);
    try {
      await exportBioPDF({
        bio: currentBio,
        lang: activeLang,
        data,
        style: isFamilyApproval ? "familyApproval" : activeStyle,
        photo: data.photo,
      });
    } catch (e) {
      console.error(e);
      alert("PDF download failed: " + e.message);
    } finally {
      setPdfLoading(false);
    }
  };

  // 6. PNG Export Handler (Upgraded to pass dynamic luxury parameters)
  const triggerPngExport = async () => {
    if (!data || pngLoading) return;
    setPngLoading(true);
    try {
      await exportBioPNG({
        bio: currentBio,
        lang: activeLang,
        data,
        photo: data.photo,
        headline: currentLangObj.headline,
        traits: currentLangObj.traits,
        firstImpressions: currentLangObj.firstImpressions
      });
    } catch (e) {
      console.error(e);
      alert("PNG card download failed: " + e.message);
    } finally {
      setPngLoading(false);
    }
  };

  const handleRequireLogin = (action) => {
    setPendingAction(action);
    setLoginOpen(true);
  };

  const handleFinishedTransition = () => {
    setShowTransition(false);
  };

  const handleBackToForm = () => {
    router.push("/form");
  };

  if (!data) return null;

  return (
    <>
      <Header />
      <main className="relative min-h-screen gradient-mesh pt-24 pb-20 px-4 md:px-6 flex flex-col items-center overflow-x-hidden">
        <div className="islamic-bg" />

        <div className="w-full max-w-2xl flex flex-col items-stretch mt-4 md:mt-8 relative z-10">
          {/* Header Back Button Row */}
          <div className="flex items-center gap-3.5 mb-6 justify-between sm:justify-start">
            <button
              onClick={handleBackToForm}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-gold-dim text-text-muted hover:text-gold transition-all cursor-pointer flex items-center justify-center active:scale-95"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs uppercase tracking-widest font-bold text-gold-light italic">
              AI MATRIMONIAL INSIGHT STUDIO
            </span>
          </div>

          {/* Heading with Luxury Entry */}
          <div className="mb-6 text-center sm:text-left">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight shimmer-text flex items-center justify-center sm:justify-start gap-2">
              Aapki Bio Tayyar Hai!
              <Sparkles size={20} className="text-gold animate-pulse shrink-0" />
            </h2>
            <p className="text-[13px] text-text-muted mt-1 leading-relaxed">
              AI-generated with Gemini. Choose output tabs, switch styles instantly, and view insights.
            </p>
          </div>

          {/* AI First Impressions (Feature 5 Adjustments) */}
          {!loading && currentLangObj.firstImpressions && (
            <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start mb-6">
              {currentLangObj.firstImpressions.map((imp, idx) => (
                <span 
                  key={idx} 
                  className="px-3.5 py-1.5 rounded-xl border border-gold/30 bg-gold-dim text-gold text-[10.5px] font-bold uppercase tracking-wider shadow-[0_2px_8px_rgba(201,168,76,0.08)] flex items-center gap-1.5 animate-pulse-glow"
                >
                  <Sparkles size={11} className="shrink-0" />
                  {imp}
                </span>
              ))}
            </div>
          )}

          {/* Language Selection Tabs */}
          {data.langs && data.langs.length > 1 && (
            <div className="flex gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
              {data.langs.map((langId) => {
                const isSelected = activeLang === langId;
                const label = langId === "urdu" ? "Urdu Script" : langId === "roman" ? "Roman Urdu" : "English";
                return (
                  <button
                    key={langId}
                    onClick={() => setActiveLang(langId)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-gold-light to-gold text-[#1A1304] shadow-md"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* AI Generated Profile Headline (Feature 4) */}
          {!loading && currentLangObj.headline && (
            <div className="text-center py-4.5 px-6 rounded-3xl bg-white/[0.01] border border-white/5 mb-6 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.02] to-transparent animate-shimmer-sweep pointer-events-none" />
              <p className="font-display italic text-[16px] md:text-[17.5px] font-bold gold-text-gradient tracking-wide leading-relaxed">
                “{currentLangObj.headline}”
              </p>
            </div>
          )}

          {/* Style Tabs Switcher & Family Approval Mode Toggle (Feature 5 & 6) */}
          {!loading && !error && (
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
              {/* Style Switcher Tabs */}
              <div className="flex-1 overflow-x-auto flex gap-1.5 p-1 rounded-2xl bg-[#070b16]/60 border border-white/10" style={{ scrollbarWidth: "none" }}>
                {["traditional", "modern", "professional", "poetic", "detailed"].map((styleId) => {
                  const isSelected = activeStyle === styleId && !isFamilyApproval;
                  const label = styleId.charAt(0).toUpperCase() + styleId.slice(1);
                  return (
                    <button
                      key={styleId}
                      disabled={isFamilyApproval}
                      onClick={() => {
                        setActiveStyle(styleId);
                        setIsFamilyApproval(false);
                      }}
                      className={`flex-1 min-w-[75px] py-2 px-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? "bg-gradient-to-r from-gold-light to-gold text-[#1A1304] shadow-md font-bold"
                          : "text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Family Approval Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsFamilyApproval(!isFamilyApproval)}
                className={`px-5 py-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isFamilyApproval
                    ? "bg-gradient-to-r from-gold-light to-gold text-[#1A1304] border-gold shadow-gold-glow scale-[1.02]"
                    : "bg-[#070b16]/60 border-white/10 text-text-muted hover:border-gold/50 hover:text-text-primary"
                }`}
              >
                <Users size={14} className={isFamilyApproval ? "text-[#1A1304]" : "text-gold"} />
                <span>Family Approval Mode</span>
              </button>
            </div>
          )}

          {/* Bio Display Card */}
          {error ? (
            <GlassCard className="p-8 border-red-500/25 bg-red-500/[0.02] flex flex-col items-center justify-center text-center">
              <span className="text-sm font-bold text-red-300">Ek masla hua</span>
              <p className="text-xs text-red-400 mt-2 max-w-sm leading-relaxed">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-5 py-2.5 rounded-xl bg-gold text-[#1A1304] text-xs font-bold cursor-pointer"
              >
                Try Again
              </button>
            </GlassCard>
          ) : (
            <>
              <BioCard
                bio={currentBio}
                lang={activeLang}
                style={isFamilyApproval ? "familyApproval" : activeStyle}
                loading={loading}
              />

              {/* Text to Speech player */}
              {!loading && currentBio && (
                <AudioPlayer text={currentBio} lang={activeLang} />
              )}
            </>
          )}

          {/* Share Action Panel */}
          {!loading && currentBio && (
            <ShareButtons
              bio={currentBio}
              user={user}
              onRequireLogin={handleRequireLogin}
              onPdf={triggerPdfExport}
              onPng={triggerPngExport}
              onRegen={handleBackToForm}
              pdfLoading={pdfLoading}
              pngLoading={pngLoading}
            />
          )}

          {/* Before vs After AI Transformation split panel (Feature 1) */}
          {!loading && currentLangObj.beforeAfter && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {/* Before Card */}
              <GlassCard className="p-6 border-white/5 bg-[#0C1226]/40 backdrop-blur-md">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-text-muted mb-4 flex items-center gap-1.5 font-display">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                  Raw Profile Points
                </h4>
                <ul className="flex flex-col gap-3">
                  {currentLangObj.beforeAfter.before.map((point, idx) => (
                    <li key={idx} className="text-[12.5px] text-text-muted/80 leading-relaxed flex items-start gap-2.5">
                      <span className="text-rose/80 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* After Card */}
              <GlassCard className="p-6 border-gold/25 bg-gold-dim/40 backdrop-blur-md shadow-gold-glow">
                <h4 className="text-[11px] uppercase tracking-widest font-bold text-gold mb-4 flex items-center gap-1.5 font-display">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-ping" />
                  AI Enhanced Wording
                </h4>
                <ul className="flex flex-col gap-3">
                  {currentLangObj.beforeAfter.after.map((point, idx) => (
                    <li key={idx} className="text-[12.5px] text-text-primary leading-relaxed flex items-start gap-2.5 font-medium">
                      <span className="text-gold mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          )}

          {/* AI Personality Snapshot gold pills (Feature 3) */}
          {!loading && currentLangObj.traits && (
            <div className="mt-8 flex flex-col items-center p-6.5 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-sm">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-text-muted mb-4 font-display">
                AI Personality Snapshot
              </h4>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {currentLangObj.traits.map((trait, idx) => (
                  <span 
                    key={idx} 
                    className="px-4.5 py-2.5 rounded-full border border-gold/30 bg-[#070b16]/90 text-gold text-[11.5px] font-bold tracking-wider shadow-[0_2px_12px_rgba(201,168,76,0.15)] flex items-center gap-2 transition-transform duration-300 hover:scale-105"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Rishta Score Card Matrimonial Insight Metrics (Feature 2 Adjustments) */}
          {!loading && currentLangObj.scores && (
            <div className="mt-8 flex flex-col items-stretch p-7 rounded-3xl bg-[#080d1e]/80 border border-white/10 shadow-2xl relative overflow-hidden">
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-text-muted text-center mb-6 font-display">
                Matrimonial Profile Insight Metrics
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  { name: "Family Values", score: currentLangObj.scores.familyValues },
                  { name: "Communication Style", score: currentLangObj.scores.communicationStyle },
                  { name: "Professional Stability", score: currentLangObj.scores.professionalStability },
                  { name: "Lifestyle Balance", score: currentLangObj.scores.lifestyleBalance },
                  { name: "Religious Commitment", score: currentLangObj.scores.religiousCommitment },
                  { name: "Responsibility", score: currentLangObj.scores.responsibility },
                ].map((metric, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                    {/* circular progress indicators */}
                    <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="27" className="stroke-white/[0.06] fill-none" strokeWidth="2.5" />
                        <circle cx="32" cy="32" r="27" className="stroke-gold fill-none" strokeWidth="3"
                          strokeDasharray={2 * Math.PI * 27}
                          strokeDashoffset={2 * Math.PI * 27 * (1 - (metric.score || 70) / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[13.5px] font-bold text-gold-light font-display num">
                        {metric.score}%
                      </span>
                    </div>
                    <span className="text-[11.5px] font-bold text-text-primary leading-tight">{metric.name}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-[10px] text-text-muted/50 italic text-center mt-6 uppercase tracking-wider font-semibold">
                "For entertainment and self-reflection purposes only."
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Gmail Google Login Modal Sheet */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Cinematic Transition Medallion Overlay */}
      <GeneratingAnimation
        active={showTransition}
        onFinished={handleFinishedTransition}
        queueStatus={queueStatus}
        ready={!loading}
      />

      <Footer />
    </>
  );
}
