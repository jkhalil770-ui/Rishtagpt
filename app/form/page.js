"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/form/ProgressBar";
import StepPersonal from "@/components/form/StepPersonal";
import StepDeen from "@/components/form/StepDeen";
import StepCareer from "@/components/form/StepCareer";
import StepFamily from "@/components/form/StepFamily";
import StepPreferences from "@/components/form/StepPreferences";
import CaptchaWrapper from "@/components/ui/CaptchaWrapper";
import GlassCard from "@/components/ui/GlassCard";

const DEFAULT_FORM_DATA = {
  name: "",
  age: 25,
  gender: "boy",
  height: "",
  marital: "Never Married",
  complexion: "",
  photo: null,
  maslak: "",
  namaz: "",
  quran: "",
  hafiz: false,
  hijab: "",
  partnerDeen: "",
  degree: "",
  institution: "",
  profession: "",
  employment: "",
  income: 0,
  fatherStatus: "",
  motherStatus: "",
  fatherProf: "",
  motherProf: "",
  brothers: 0,
  sisters: 0,
  famType: "",
  residence: "",
  biradari: "",
  biradariSkip: false,
  waliContact: "",
  traits: [],
  partnerAgeMax: 35,
  locPref: "",
  partnerEduMin: "No Preference",
  style: "traditional",
  langs: ["roman"], // default Roman Urdu
  note: "",
};

function validateStep(step, d) {
  const e = {};
  if (step === 0) {
    if (!d.name.trim()) e.name = "Naam likhna zaroori hai.";
    if (!d.height) e.height = "Height select karein.";
    if (!d.city || !d.city.trim()) e.city = "City / mulk likhein.";
  } else if (step === 1) {
    if (!d.maslak) e.maslak = "Maslak select karein.";
    if (!d.namaz) e.namaz = "Namaz ki aadat select karein.";
    if (!d.quran) e.quran = "Quran tilawat status select karein.";
    if (!d.partnerDeen) e.partnerDeen = "Partner deen preference select karein.";
  } else if (step === 2) {
    if (!d.degree) e.degree = "Degree select karein.";
    if (!d.profession || !d.profession.trim()) e.profession = "Profession likhna zaroori hai.";
    if (!d.employment) e.employment = "Employment status select karein.";
  } else if (step === 3) {
    if (!d.fatherStatus) e.fatherStatus = "Father status select karein.";
    if (!d.motherStatus) e.motherStatus = "Mother status select karein.";
    if (!d.famType) e.famType = "Family type select karein.";
    if (!d.residence) e.residence = "Residence status select karein.";
  } else if (step === 4) {
    if (!d.traits || d.traits.length === 0) e.traits = "Kam az kam 1 personality trait select karein.";
    if (!d.locPref) e.locPref = "Location preference select karein.";
  }
  return e;
}

export default function FormPage() {
  const router = useRouter();
  const captchaRef = useRef(null);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  // Load cached data from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem("rg_form_v2");
      if (cached) {
        setFormData(JSON.parse(cached));
      }
    } catch (e) {
      console.error("Local storage load error:", e);
    }
  }, []);

  // Save cached data to localStorage
  const saveFormData = (data) => {
    setFormData(data);
    try {
      localStorage.setItem("rg_form_v2", JSON.stringify(data));
    } catch (e) {
      console.error("Local storage save error:", e);
    }
  };

  const handleNext = () => {
    const e = validateStep(step, formData);
    setErrors(e);

    if (Object.keys(e).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (step < 4) {
      setStep(step + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Step 5: Reveal hCaptcha
      setShowCaptcha(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setErrors({});
      setShowCaptcha(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const handleCaptchaVerify = (token) => {
    if (token) {
      setIsCaptchaVerified(true);
      // Save full form state & route to result
      localStorage.setItem("rg_form_v2", JSON.stringify(formData));
      router.push("/result");
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 160 : -160,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -160 : 160,
      opacity: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen gradient-mesh pt-24 pb-20 px-4 md:px-6 flex flex-col items-center">
        <div className="islamic-bg" />

        <div className="w-full max-w-2xl flex flex-col items-stretch mt-4 md:mt-8">
          {/* Progress Indicators */}
          <ProgressBar currentStep={step} />

          {/* Form Content container */}
          <motion.div
            animate={shake ? { x: [-6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <GlassCard className="p-6 sm:p-10 border-gold/20 shadow-2xl relative bg-[#0C1226]/80 overflow-visible">
              <AnimatePresence mode="wait" custom={step}>
                <motion.div
                  key={step}
                  custom={step}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  {step === 0 && (
                    <StepPersonal
                      data={formData}
                      setData={saveFormData}
                      errors={errors}
                    />
                  )}
                  {step === 1 && (
                    <StepDeen
                      data={formData}
                      setData={saveFormData}
                      errors={errors}
                    />
                  )}
                  {step === 2 && (
                    <StepCareer
                      data={formData}
                      setData={saveFormData}
                      errors={errors}
                    />
                  )}
                  {step === 3 && (
                    <StepFamily
                      data={formData}
                      setData={saveFormData}
                      errors={errors}
                    />
                  )}
                  {step === 4 && (
                    <StepPreferences
                      data={formData}
                      setData={saveFormData}
                      errors={errors}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Conditional hCaptcha display inside panel */}
              {showCaptcha && !isCaptchaVerified && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 border-t border-white/5 pt-6 text-center"
                >
                  <p className="text-xs text-text-muted mb-2 font-medium">
                    🤖 Human verification zaroori hai:
                  </p>
                  <CaptchaWrapper
                    captchaRef={captchaRef}
                    onVerify={handleCaptchaVerify}
                  />
                </motion.div>
              )}
            </GlassCard>
          </motion.div>

          {/* Navigation action buttons row */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              className="px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-text-muted hover:text-text-primary text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ChevronLeft size={16} />
              <span>Peechey</span>
            </button>

            <button
              onClick={handleNext}
              disabled={showCaptcha && !isCaptchaVerified}
              className="flex-1 max-w-[280px] px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-light to-gold hover:scale-[1.03] active:scale-[0.98] text-[#1A1304] text-sm font-extrabold transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === 4 ? (
                <>
                  <span>Meri Bio Banao</span>
                  <Sparkles size={14} />
                </>
              ) : (
                <>
                  <span>Aagey Barhein</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
