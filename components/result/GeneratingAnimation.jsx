"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Understanding your personality...",
  "Analyzing your preferences...",
  "Finding the right words...",
  "Crafting a beautiful introduction...",
  "Finalizing your profile...",
];

export default function GeneratingAnimation({ active, onFinished }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  // 1. Message Cycle timer
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [active]);

  // Typewriter effect logic
  useEffect(() => {
    if (!active) {
      setDisplayText("");
      return;
    }
    setDisplayText("");
    let i = 0;
    const currentMsg = MESSAGES[msgIndex];
    const typingTimer = setInterval(() => {
      setDisplayText(currentMsg.substring(0, i + 1));
      i++;
      if (i >= currentMsg.length) {
        clearInterval(typingTimer);
      }
    }, 35); // 35ms per character for fluid motion
    return () => clearInterval(typingTimer);
  }, [msgIndex, active]);

  // 2. Progress fill simulator (0 to 90% slowly, then 100% on complete)
  useEffect(() => {
    if (!active) {
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
  }, [active]);

  // 3. Complete fill to 100% and trigger exit after ready
  useEffect(() => {
    if (active && progress >= 90) {
      const finishTimer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          if (onFinished) onFinished();
        }, 600);
      }, 3500);
      return () => clearTimeout(finishTimer);
    }
  }, [active, progress]);

  // 4. Background Upward Floating Particles
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let frameId;
    let particles = [];
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    class Spark {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.9 + 0.3;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.fade = Math.random() * 0.005 + 0.002;
      }
      update() {
        this.y -= this.speedY;
        this.alpha -= this.fade;
        if (this.y < -10 || this.alpha <= 0) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 30; i++) {
      particles.push(new Spark());
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#050814] via-[#0b1021] to-[#050814]"
        >
          {/* Glowing Ambient Glow Bloom */}
          <div className="absolute w-[50vw] h-[50vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

          {/* Spars Canvas overlay */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1] mix-blend-screen" />

          {/* Central Spinning Islamic Medallion */}
          <div className="relative z-10 w-36 h-36 flex items-center justify-center mb-10">
            {/* Concentric pulsing rings */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute rounded-full border border-gold/25"
                style={{
                  width: 60 + i * 50,
                  height: 60 + i * 50,
                  opacity: 0.4 - i * 0.1,
                  animation: `ring-out ${2.6 + i * 0.4}s cubic-bezier(0.2, 0.6, 0.2, 1) ${i * 0.3}s infinite`,
                }}
              />
            ))}

            {/* Medallion Orbit ring */}
            <div className="absolute inset-0 rounded-full border border-gold/45 border-t-transparent animate-spin-slow" />
            <div
              className="absolute inset-4 rounded-full border border-dashed border-gold/25"
              style={{ animation: "spin 12s linear infinite reverse" }}
            />

            {/* Glowing inner core */}
            <div className="absolute inset-8 rounded-full bg-gold/20 blur-xl" />

            {/* Center Crescent Logo replaced with actual brand logo */}
            <div className="relative z-20 w-16 h-16 flex items-center justify-center bg-[#070b16]/80 rounded-full border border-gold/40 shadow-[0_0_30px_rgba(201,168,76,0.35)] overflow-hidden p-2 animate-pulse">
              <img src="/assets/logo.png" alt="RishtaGPT Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Rotating Message Texts with realistic typewriter simulation */}
          <div className="relative z-10 h-10 flex items-center justify-center text-center px-4">
            <div className="font-display text-lg md:text-xl font-bold tracking-wide italic shimmer-text min-h-[30px] flex items-center justify-center">
              <span>{displayText}</span>
              <span className="w-[3px] h-5 bg-gold ml-2 animate-ping shrink-0" />
            </div>
          </div>

          <span className="relative z-10 text-[11px] text-text-muted uppercase tracking-[0.2em] font-semibold mt-2">
            AI PROCESSING ENGINE
          </span>

          {/* Fake Progress Bar with glassmorphic upgrades */}
          <div className="relative z-10 w-64 h-[5px] bg-white/[0.04] border border-white/5 rounded-full overflow-hidden mt-8 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-light via-gold to-gold-light rounded-full shadow-[0_0_10px_rgba(201,168,76,0.4)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <span className="relative z-10 text-[12px] font-bold text-gold-light mt-3.5 tracking-wider num font-display">
            {Math.round(progress)}%
          </span>

          {/* Keyframe styles */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes ring-out {
              0% { transform: scale(0.5); opacity: 0; }
              15% { opacity: 0.8; }
              100% { transform: scale(1.6); opacity: 0; }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
