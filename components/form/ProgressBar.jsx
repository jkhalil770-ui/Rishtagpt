"use client";

import { Check } from "lucide-react";

export default function ProgressBar({ currentStep, totalSteps = 5 }) {
  const steps = ["Personal", "Deen", "Career", "Family", "Preferences"];

  return (
    <div className="w-full bg-[#0F1629] border border-white/[0.03] rounded-3xl p-6 shadow-xl mb-6">
      {/* 5-Dot Indicators Row */}
      <div className="flex items-center justify-between gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex-1 flex items-center">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 shrink-0 ${
                i < currentStep
                  ? "bg-gold/25 border border-gold/50 text-gold"
                  : i === currentStep
                  ? "bg-gradient-to-r from-gold-light to-gold text-[#1A1304] shadow-gold-glow animate-pulse-glow"
                  : "bg-white/[0.04] border border-white/10 text-text-muted"
              }`}
            >
              {i < currentStep ? <Check size={14} strokeWidth={3} /> : i + 1}
            </div>

            {/* Line Segment */}
            {i < totalSteps - 1 && (
              <div className="flex-1 h-[2px] mx-2 bg-white/[0.08] rounded-full overflow-hidden relative">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-light to-gold origin-left transition-transform duration-500"
                  style={{ transform: `scaleX(${i < currentStep ? 1 : 0})` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Text Info Row */}
      <div className="mt-5 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-[22px] font-bold text-text-primary tracking-tight">
            {steps[currentStep]}
          </h3>
          <span className="text-[12px] text-text-muted font-medium mt-0.5 block">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <span className="font-display font-bold text-[18px] text-gold-light num">
          {Math.round(((currentStep + 1) / totalSteps) * 100)}%
        </span>
      </div>
    </div>
  );
}
