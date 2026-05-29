"use client";

import { motion } from "framer-motion";

export default function GoldButton({ children, onClick, className = "", disabled, type = "button" }) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, boxShadow: "0 0 35px -2px rgba(201, 168, 76, 0.65)" }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`px-8 py-4 rounded-full font-bold text-[#1A1304] bg-gradient-to-r from-gold-light via-gold to-gold-light border border-gold-light/45 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </motion.button>
  );
}
