"use client";

import { motion, AnimatePresence } from "framer-motion";
import { loginWithGoogle } from "@/utils/firebase";
import { Lock, X } from "lucide-react";
import { useState } from "react";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await loginWithGoogle();
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Login fail hua. Dobara try karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative z-10 w-full md:max-w-md bg-gradient-to-b from-[#1E2540] to-[#0A0F1E] border-t md:border border-gold/30 rounded-t-[32px] md:rounded-[28px] p-8 pb-10 max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col items-center"
          >
            {/* Top Drag/Close Handle for Mobile */}
            <div className="w-12 h-1 bg-white/10 rounded-full mb-6 md:hidden" />

            {/* Close Button top right */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-text-muted hover:text-text-primary"
            >
              <X size={18} />
            </button>

            {/* Crescent Star Logo */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gold-dim border border-gold/45 mb-4 pulse-glow">
              <svg width="34" height="34" viewBox="0 0 100 100" className="text-gold">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6"/>
                <path d="M66 50 a18 18 0 1 1 -25 -16.5 a14.5 14.5 0 0 0 25 16.5 z" fill="currentColor"/>
              </svg>
            </div>

            <h3 className="font-display text-[26px] font-semibold text-center gold-text-gradient">
              Ek Baar Login Karein
            </h3>
            <p className="text-[13px] text-text-muted text-center mt-2 max-w-[280px]">
              Sirf download ke liye — aapka bio data hamare server pe save nahi hota.
            </p>

            {error && (
              <div className="mt-4 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/35 text-red-300 text-[12px] text-center w-full">
                {error}
              </div>
            )}

            {/* Google Authentication Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-neutral-900 font-bold py-4 px-6 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              {loading ? "Authenticating..." : "Google se Login Karein"}
            </button>

            {/* Security Note Footer */}
            <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-text-muted opacity-80">
              <Lock size={12} className="text-gold" />
              <span>Aapka data safe hai. SSL Secured Auth</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
