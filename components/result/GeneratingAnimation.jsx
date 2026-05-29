"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Aapki kahani likh rahe hain...",
  "Alfaaz dhundh rahe hain...",
  "AI soch raha hai...",
  "Bas thodi der...",
];

export default function GeneratingAnimation({ active, onFinished }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);

  // 1. Message Cycle timer
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);

  // 2. Progress fill simulator (0 to 90% slowly, then 100% on complete)
  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          // Slow down as it approaches 90
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
      // Simulate API finished call after a standard delay
      const finishTimer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          if (onFinished) onFinished();
        }, 600);
      }, 3500); // Allow sufficient time for the user to experience the cinematic transition
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
        this.y = Math.random() * height; // Start at random height initially
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.9 + 0.3; // Floating upward
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

    // Spawn 30 particles
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial-gradient from-[#0f1629] to-[#0A0F1E]"
        >
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
            <div className="absolute inset-8 rounded-full bg-gold/15 blur-xl" />

            {/* Center Crescent Logo */}
            <div className="relative z-20 w-16 h-16 text-gold animate-pulse">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="2.2">
                <path
                  d="M66 50 a18 18 0 1 1 -25 -16.5 a14.5 14.5 0 0 0 25 16.5 z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>
          </div>

          {/* Rotating Message Texts */}
          <div className="relative z-10 h-10 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={msgIndex}
                initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(2px)" }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="font-display text-lg md:text-xl font-bold tracking-wide italic shimmer-text"
              >
                {MESSAGES[msgIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <span className="relative z-10 text-[11px] text-text-muted uppercase tracking-[0.2em] font-semibold mt-2">
            AI PROCESSING ENGINE
          </span>

          {/* Fake Progress Bar */}
          <div className="relative z-10 w-48 h-[3px] bg-white/[0.08] rounded-full overflow-hidden mt-8 shadow-inner">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-light via-gold to-gold-light rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <span className="relative z-10 text-[11.5px] font-bold text-gold-light mt-3 num">
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
