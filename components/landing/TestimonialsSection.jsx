"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const TESTIMONIALS = [
  {
    quote: "Itni khoobsurat bio pehle kabhi nahi dekhi — Ammi ne pehli baar khush hokar padhi.",
    name: "Fatima K.",
    city: "Lahore",
    stars: 5,
    photo: "/assets/fatima.png",
  },
  {
    quote: "3 languages mein ek saath — kamaal feature hai, overseas bhai ke liye English mein bheja.",
    name: "Hassan R.",
    city: "Karachi",
    stars: 5,
    photo: "/assets/hassan.png",
  },
  {
    quote: "Traditional style itna genuine laga — jaise kisi ne dil se likha ho.",
    name: "Zara M.",
    city: "Islamabad",
    stars: 5,
    photo: "/assets/zara.png",
  },
  {
    quote: "Bilkul free hai aur quality dekho — yeh toh kamal hai.",
    name: "Ahmed S.",
    city: "Dubai",
    stars: 5,
    photo: "/assets/ahmed.png",
  },
];

export default function TestimonialsSection() {
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVars = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden px-4 md:px-6">
      {/* Background Star pattern overlay */}
      <div className="islamic-bg" />

      {/* Floating Light Blooms */}
      <div className="absolute top-[40%] left-[-15%] w-[45vw] h-[45vw] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[45vw] h-[45vw] bg-rose/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20 flex flex-col items-center"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Khush-Gawaar Tausiyat
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Logon Ne Kya Kaha
          </h2>
          <div className="w-16 h-0.5 bg-gold mt-4 rounded-full" />
        </motion.div>

        {/* Testimonials 2x2 Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVars}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 justify-center"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} variants={cardVars} className="flex">
              <GlassCard className="p-8 md:p-10 flex flex-col justify-between items-stretch w-full relative overflow-hidden group border-gold/15 bg-white/[0.04] glass-card-hover">
                {/* Large Gold Quote Mark */}
                <div className="absolute top-6 right-8 text-gold/10 font-serif text-[120px] leading-none pointer-events-none font-bold select-none">
                  “
                </div>

                {/* Stars Row */}
                <div className="flex gap-1 mb-6 text-gold">
                  {Array.from({ length: t.stars }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      fill="currentColor"
                      stroke="none"
                    />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="flex-1 text-[15px] md:text-[16px] text-text-primary leading-relaxed mb-6 font-display italic">
                  "{t.quote}"
                </p>

                {/* Avatar Image + Name + City */}
                <div className="pt-5 border-t border-white/5 flex items-center gap-3.5 text-xs font-medium">
                  <div className="w-11 h-11 rounded-full border border-gold/30 overflow-hidden shrink-0 shadow-md">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-text-primary font-bold block text-[13.5px]">
                      {t.name}
                    </span>
                    <span className="text-text-muted mt-0.5 block text-[11.5px]">
                      {t.city}
                    </span>
                  </div>
                </div>

                {/* Hover gradient highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
