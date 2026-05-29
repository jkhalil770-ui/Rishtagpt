"use client";

import { useState } from "react";
import { Copy, Check, Download, Image, Share2, Send, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShareButtons({
  bio,
  user,
  onRequireLogin,
  onPdf,
  onPng,
  onRegen,
  pdfLoading,
  pngLoading,
}) {
  const [copied, setCopied] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);

  const handleCopy = async () => {
    if (!bio) return;
    try {
      await navigator.clipboard.writeText(bio);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error("Clipboard copy error:", e);
    }
  };

  const handleWhatsAppShare = () => {
    if (!bio) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(bio)}`;
    window.open(url, "_blank");
  };

  const handleReferralShare = () => {
    const inviteMsg =
      "Check out how AI transformed my basic biodata into a premium, dignified rishta bio. You can generate yours in seconds at: https://rishtagpt.online";
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMsg)}`;
    window.open(url, "_blank");
  };

  const handlePdfClick = () => {
    if (!user) {
      onRequireLogin("pdf");
    } else {
      onPdf();
    }
  };

  const handlePngClick = () => {
    if (!user) {
      onRequireLogin("png");
    } else {
      onPng();
    }
  };

  const handleSocialShareClick = () => {
    if (!user) {
      onRequireLogin("share");
    } else {
      setShowSharePanel(!showSharePanel);
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://rishtagpt.online")}&quote=${encodeURIComponent(bio)}`;
    window.open(url, "_blank");
  };

  const shareToTwitter = () => {
    const text = `${bio.slice(0, 150)}...\n\nCreate yours at:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent("https://rishtagpt.online")}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full flex flex-col gap-3.5 mt-6 px-1">
      {/* 1. Copy Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCopy}
        className={`w-full py-4 rounded-2xl border text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
          copied
            ? "bg-[#22c55e]/10 border-[#22c55e]/45 text-[#22c55e]"
            : "bg-white/[0.03] border-white/10 text-text-primary hover:border-white/20 hover:bg-white/[0.05]"
        }`}
      >
        {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={16} />}
        <span>{copied ? "Copied! ✓" : "Copy Karein"}</span>
      </motion.button>

      {/* 2. WhatsApp Share */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 12px 30px -10px rgba(37,211,102,0.4)" }}
        whileTap={{ scale: 0.98 }}
        onClick={handleWhatsAppShare}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] border border-[#25D366]/40 text-white text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
      >
        <Send size={15} className="rotate-45" />
        <span>WhatsApp pe Share Karein</span>
      </motion.button>

      {/* 3. PDF Download */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 12px 30px -10px rgba(201,168,76,0.3)" }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePdfClick}
        disabled={pdfLoading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-light via-gold to-gold-light border border-gold-light/40 text-[#1A1304] text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pdfLoading ? (
          <div className="w-4 h-4 border-2 border-[#1A1304] border-t-transparent rounded-full animate-spin" />
        ) : (
          <Download size={16} />
        )}
        <span>{pdfLoading ? "PDF ban raha hai..." : "PDF Download Karein"}</span>
      </motion.button>

      {/* 4. PNG Image Download */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePngClick}
        disabled={pngLoading}
        className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-text-primary text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pngLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Image size={16} />
        )}
        <span>{pngLoading ? "Image tayyar ho rahi hai..." : "Image Card Download (PNG)"}</span>
      </motion.button>

      {/* 5. Social Share */}
      <div className="w-full relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSocialShareClick}
          className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-text-primary text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Share2 size={16} />
          <span>Social Media pe Share Karein</span>
        </motion.button>

        {/* Dynamic Social share panel inside page */}
        <AnimatePresence>
          {showSharePanel && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-[64px] inset-x-0 z-30 bg-[#0F1629] border border-white/10 p-3 rounded-2xl shadow-xl flex items-center justify-around gap-2"
            >
              <button
                onClick={shareToFacebook}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-text-primary transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Facebook</span>
              </button>
              <button
                onClick={shareToTwitter}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-text-primary transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Twitter (X)</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-text-primary transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Copy Link</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Referral */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleReferralShare}
        className="w-full py-4 rounded-2xl bg-white/[0.03] border border-[#C9A84C]/30 hover:border-gold/60 text-gold-light text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
      >
        <span>Dost Ko Bhejo 🤝</span>
      </motion.button>

      {/* 7. Return/Regenerate */}
      <button
        onClick={onRegen}
        className="w-full mt-2 py-4 rounded-2xl bg-transparent border border-white/10 hover:border-white/20 text-text-muted hover:text-text-primary text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
      >
        <RotateCcw size={12} />
        <span>Dobara Generate Karein</span>
      </button>
    </div>
  );
}
