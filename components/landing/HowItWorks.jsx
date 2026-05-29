"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Edit3, Sparkles, Share2 } from "lucide-react";
import GlassCard from "../ui/GlassCard";

function TiltCard({ stepNum, title, descUrdu, descEn, icon: Icon }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || window.innerWidth <= 768) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    // Calculate rotation angles (max 8 degrees tilt)
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;
    setTilt({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full md:flex-1 perspective-1000 cursor-pointer"
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
        className="h-full"
      >
        <GlassCard className="h-full p-8 md:p-10 relative overflow-hidden flex flex-col items-center text-center group">
          {/* Gold step badge top left */}
          <div className="absolute top-6 left-6 w-9 h-9 rounded-xl flex items-center justify-center bg-gold-dim border border-gold/30 text-gold text-sm font-bold num">
            {stepNum}
          </div>

          {/* Icon center - animates on hover */}
          <div className="mt-6 mb-8 w-20 h-20 rounded-2xl bg-gold-dim border border-gold/20 flex items-center justify-center text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]">
            <Icon size={38} className="transition-transform duration-500 group-hover:rotate-6" />
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl font-semibold mb-4 group-hover:gold-text-gradient transition-all duration-300">
            {title}
          </h3>

          {/* Clean Urdu Script Description */}
          <p className="font-urdu text-[15px] leading-[2] text-text-primary max-w-[280px]" dir="rtl">
            {descUrdu}
          </p>

          {/* Separation line */}
          <div className="w-12 h-px bg-white/10 my-4 transition-colors group-hover:bg-gold/20" />

          {/* Clean English Translation */}
          <p className="text-text-muted text-[12.5px] leading-relaxed max-w-[280px]">
            {descEn}
          </p>

          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const textVars = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-transparent overflow-hidden px-4 md:px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      {/* Background Star geometric pattern overlay */}
      <div className="islamic-bg" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textVars}
          className="text-center mb-16 md:mb-20 flex flex-col items-center"
        >
          <span className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">
            Aasaan Tareeqa
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Teen Asaan Qadam
          </h2>
          <div className="w-16 h-0.5 bg-gold mt-4 rounded-full" />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVars}
          className="w-full flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-stretch"
        >
          <TiltCard
            stepNum="01"
            title="Details Bharein / Fill Details"
            descUrdu="اپنی پسند، معلومات اور دینی اقدار آسان 5 مراحل کے فارم میں درج کریں۔"
            descEn="Fill out your background, personality, and religious choices in a comfortable 5-step form."
            icon={Edit3}
          />
          <TiltCard
            stepNum="02"
            title="AI Likhega / AI Will Write"
            descUrdu="جیمنی 2.0 اے آئی سیکنڈز میں 3 زبانوں اور 5 منفرد اسٹائلز میں بہترین بائیو لکھے گا۔"
            descEn="Google Gemini 2.0 AI composes dignified bios in 3 languages and 5 customizable styles in seconds."
            icon={Sparkles}
          />
          <TiltCard
            stepNum="03"
            title="Share Karein / Share Bio"
            descUrdu="خوبصورت برانڈڈ پی ڈی ایف بائیو ڈیٹا یا ہائی کوالٹی امیج ڈاؤن لوڈ کر کے فیملی سے شیئر کریں۔"
            descEn="Download your elegant high-quality PDF biodata or image card and share directly with family."
            icon={Share2}
          />
        </motion.div>
      </div>
    </section>
  );
}
