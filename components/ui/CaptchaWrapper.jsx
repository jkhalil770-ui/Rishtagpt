"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, ArrowRight } from "lucide-react";

export default function CaptchaWrapper({ onVerify }) {
  const [position, setPosition] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  const startX = useRef(0);

  const handleStart = (e) => {
    if (isVerified) return;
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    startX.current = clientX - position;
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging || isVerified) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const track = trackRef.current;
      if (!track) return;
      
      const maxDelta = track.clientWidth - 56; // handle width is 56px
      let newPos = clientX - startX.current;
      newPos = Math.max(0, Math.min(newPos, maxDelta));
      setPosition(newPos);

      // Verify once reached 96% of the track
      if (newPos >= maxDelta * 0.96) {
        setIsVerified(true);
        setIsDragging(false);
        setPosition(maxDelta);
        document.body.style.userSelect = "";
        
        // Short delay to show the beautiful complete animation before redirecting
        setTimeout(() => {
          if (onVerify) onVerify("verified_human_token");
        }, 800);
      }
    };

    const handleEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      document.body.style.userSelect = "";
      
      // Fallback slider handle back to start if not verified
      if (!isVerified) {
        setPosition(0);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, isVerified, onVerify, position]);

  return (
    <div className="flex flex-col items-center my-6 w-full px-1">
      {/* Dynamic Slide Track Container */}
      <div 
        ref={trackRef}
        className={`relative w-full h-[62px] rounded-2xl border transition-all duration-500 overflow-hidden flex items-center justify-between px-1.5 select-none ${
          isVerified 
            ? "bg-[#22c55e]/10 border-[#22c55e]/40 shadow-[0_0_20px_rgba(34,197,94,0.15)]" 
            : isDragging
            ? "bg-[#070b16]/90 border-gold/50 shadow-[0_0_15px_rgba(201,168,76,0.12)]"
            : "bg-[#070b16]/75 border-white/10 hover:border-white/20"
        }`}
      >
        {/* Progress Fill bar behind handle */}
        <div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-gold/5 to-gold/20 rounded-l-2xl transition-all pointer-events-none"
          style={{ width: `${position + 28}px` }}
        />

        {/* Swipe instruction text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-[12.5px] font-extrabold uppercase tracking-[0.18em] transition-all duration-300 ${
            isVerified 
              ? "text-[#22c55e]" 
              : isDragging
              ? "text-gold-light/90 scale-98"
              : "text-text-muted/65"
          }`}>
            {isVerified ? "Verification Successful ✓" : "Swipe to Verify Human ✦"}
          </span>
        </div>

        {/* Interactive Handle */}
        <div
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          className={`w-[50px] h-[50px] rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-all select-none z-10 ${
            isVerified
              ? "bg-[#22c55e] text-[#1A1304] shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              : "bg-gradient-to-r from-gold-light via-gold to-gold-light text-[#1A1304] shadow-md hover:scale-[1.02]"
          }`}
          style={{ transform: `translateX(${position}px)` }}
        >
          {isVerified ? (
            <Check size={20} strokeWidth={3} className="animate-bounce" />
          ) : (
            <ArrowRight size={18} strokeWidth={2.5} className={isDragging ? "animate-pulse" : ""} />
          )}
        </div>
      </div>
    </div>
  );
}
