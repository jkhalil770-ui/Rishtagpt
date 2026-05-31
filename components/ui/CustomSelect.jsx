"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({ value, onChange, options, placeholder = "— Select —", error, disabled, openUpward }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => {
    const optVal = opt.value !== undefined ? opt.value : opt;
    return optVal === value;
  });

  const displayText = selectedOption 
    ? (selectedOption.label !== undefined ? selectedOption.label : selectedOption) 
    : placeholder;

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-[15px] text-text-primary flex items-center justify-between outline-none transition-all duration-300 cursor-pointer text-left disabled:opacity-40 disabled:cursor-not-allowed ${
          isOpen 
            ? "border-gold/70 bg-gold-dim shadow-[0_0_15px_rgba(201,168,76,0.12)]" 
            : error 
            ? "border-rose/55 bg-rose/5" 
            : "border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
        }`}
      >
        <span className={value ? "text-text-primary font-medium" : "text-text-muted/40 font-medium"}>
          {displayText}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {/* Overlay backdrop to close dropdown on click outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 pointer-events-auto" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown Options List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: openUpward ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUpward ? -10 : 10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute left-0 right-0 z-40 max-h-60 overflow-y-auto rounded-2xl border border-white/10 bg-[#0C1226]/95 backdrop-blur-xl p-2 shadow-2xl ${
              openUpward ? "bottom-full mb-2" : "mt-2"
            }`}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#C9A84C transparent",
            }}
          >
            {options.map((opt, i) => {
              const isHeader = opt && opt.isHeader;
              
              if (isHeader) {
                return (
                  <div 
                    key={i} 
                    className="px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-wider text-gold/60 mt-1 select-none"
                  >
                    {opt.label}
                  </div>
                );
              }

              const val = opt.value !== undefined ? opt.value : opt;
              const label = opt.label !== undefined ? opt.label : opt;
              const isSelected = val === value;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(val)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-[14px] flex items-center justify-between transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-gold-dim text-gold font-bold shadow-sm" 
                      : "text-text-muted hover:bg-white/[0.04] hover:text-text-primary"
                  }`}
                >
                  <span>{label}</span>
                  {isSelected && <Check size={14} className="text-gold shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
