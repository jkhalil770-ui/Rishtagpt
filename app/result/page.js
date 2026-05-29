"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Bookmark } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BioCard from "@/components/result/BioCard";
import AudioPlayer from "@/components/result/AudioPlayer";
import ShareButtons from "@/components/result/ShareButtons";
import GeneratingAnimation from "@/components/result/GeneratingAnimation";
import LoginModal from "@/components/ui/LoginModal";
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

  // Firebase auth state
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Generated bios state
  const [bios, setBios] = useState({}); // e.g. { urdu: "...", roman: "...", en: "..." }
  const [activeLang, setActiveLang] = useState("");
  
  // Download loadings
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pngLoading, setPngLoading] = useState(false);

  // 1. Load Form Data on Mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem("rg_form_v2");
      if (!cached) {
        // Redirect to form if no data
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

  // 3. Concurrently fetch Gemini bios for each selected language
  useEffect(() => {
    if (!data) return;

    const fetchAllBios = async () => {
      setLoading(true);
      setError("");
      
      const langQueries = data.langs || ["roman"];
      const generatedResults = {};

      try {
        // Fetch separate language queries concurrently in parallel
        await Promise.all(
          langQueries.map(async (langId) => {
            const bioText = await generateBio({
              data,
              style: data.style || "traditional",
              lang: langId,
            });
            generatedResults[langId] = bioText;
          })
        );

        setBios(generatedResults);

        // Record generation stats in Firestore if logged in
        if (auth.currentUser) {
          await logGeneration(auth.currentUser.uid);
        }
      } catch (err) {
        console.error("Gemini Concurrency Generation Error:", err);
        setError(err.message || "Bio generate karne mein masla hua. Thodi der baad try karein.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBios();
  }, [data]);

  // 4. Handle auto-triggering of pending actions after login success
  const handleLoginSuccess = async (loggedInUser) => {
    setUser(loggedInUser);
    
    // Log initial generation in db post-login
    await logGeneration(loggedInUser.uid);

    if (pendingAction === "pdf") {
      setTimeout(() => triggerPdfExport(), 500);
    } else if (pendingAction === "png") {
      setTimeout(() => triggerPngExport(), 500);
    } else if (pendingAction === "share") {
      // Allow social share panel trigger
    }
    setPendingAction(null);
  };

  // 5. PDF Export Handler
  const triggerPdfExport = async () => {
    if (!data || pdfLoading) return;
    setPdfLoading(true);
    try {
      await exportBioPDF({
        bio: bios[activeLang],
        lang: activeLang,
        data,
        style: data.style || "traditional",
        photo: data.photo,
      });
    } catch (e) {
      console.error(e);
      alert("PDF download failed: " + e.message);
    } finally {
      setPdfLoading(false);
    }
  };

  // 6. PNG Export Handler
  const triggerPngExport = async () => {
    if (!data || pngLoading) return;
    setPngLoading(true);
    try {
      await exportBioPNG({
        bio: bios[activeLang],
        lang: activeLang,
        data,
        photo: data.photo,
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

  const currentBio = bios[activeLang] || "";

  return (
    <>
      <Header />
      <main className="relative min-h-screen gradient-mesh pt-24 pb-20 px-4 md:px-6 flex flex-col items-center">
        <div className="islamic-bg" />

        <div className="w-full max-w-2xl flex flex-col items-stretch mt-4 md:mt-8">
          {/* Header Back Button Row */}
          <div className="flex items-center gap-3.5 mb-6">
            <button
              onClick={handleBackToForm}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-xs uppercase tracking-widest font-bold text-text-muted">
              Result Screen / Final Bio
            </span>
          </div>

          {/* Heading */}
          <div className="mb-6 text-center sm:text-left">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight shimmer-text flex items-center justify-center sm:justify-start gap-2">
              Aapki Bio Tayyar Hai!
              <Sparkles size={20} className="text-gold animate-pulse" />
            </h2>
            <p className="text-[13px] text-text-muted mt-1 leading-relaxed">
              AI-generated with Gemini. Choose output tabs, hear recitation, and download.
            </p>
          </div>

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
                style={data.style || "traditional"}
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
      />

      <Footer />
    </>
  );
}
