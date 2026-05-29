"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Square, Volume2 } from "lucide-react";

export default function AudioPlayer({ text, lang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSupported(true);
    }
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = () => {
    if (!supported || !text) return;

    const synth = window.speechSynthesis;

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    // Initialize new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Detect voices and assign correct accent
    const voices = synth.getVoices();
    let selectedVoice = null;

    if (lang === "urdu" || lang === "roman") {
      // Find Urdu/Hindi voice (closely related accents)
      selectedVoice =
        voices.find((v) => v.lang.includes("ur-PK") || v.lang.includes("ur")) ||
        voices.find((v) => v.lang.includes("hi-IN") || v.lang.includes("hi"));
      
      utterance.rate = 0.85; // Slightly slower for warm elder tone
    } else {
      // Find English voice
      selectedVoice =
        voices.find((v) => v.lang.includes("en-US")) ||
        voices.find((v) => v.lang.includes("en-GB")) ||
        voices.find((v) => v.lang.includes("en"));
      
      utterance.rate = 0.95;
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    setIsPlaying(true);
    synth.speak(utterance);
  };

  const handleStop = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  if (!supported || !text) return null;

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="inline-flex items-center gap-3.5 px-4.5 py-2.5 rounded-full bg-[#1A1508]/80 border border-gold/25 backdrop-blur-md">
        <Volume2 size={13} className="text-gold" />
        
        {/* Play/Stop Trigger */}
        <button
          onClick={handlePlay}
          className="text-xs font-bold text-text-primary flex items-center gap-1.5 cursor-pointer hover:text-gold transition-colors select-none"
        >
          {isPlaying ? (
            <>
              <Square size={10} fill="currentColor" className="text-gold animate-pulse" />
              <span>Sunein (Stop)</span>
            </>
          ) : (
            <>
              <Play size={10} fill="currentColor" className="text-gold" />
              <span>Sunein (Audio)</span>
            </>
          )}
        </button>

        {/* Mini reactive equalizer graphic when playing */}
        {isPlaying && (
          <div className="flex items-end gap-[2px] h-[10px] w-[14px]">
            <div className="w-[2px] h-full bg-gold rounded-full eq-bar" style={{ animationDelay: "0.1s", animationDuration: "0.8s" }} />
            <div className="w-[2px] h-full bg-gold rounded-full eq-bar" style={{ animationDelay: "0.3s", animationDuration: "0.6s" }} />
            <div className="w-[2px] h-full bg-gold rounded-full eq-bar" style={{ animationDelay: "0.2s", animationDuration: "0.7s" }} />
            <div className="w-[2px] h-full bg-gold rounded-full eq-bar" style={{ animationDelay: "0.4s", animationDuration: "0.5s" }} />
          </div>
        )}
      </div>
    </div>
  );
}
