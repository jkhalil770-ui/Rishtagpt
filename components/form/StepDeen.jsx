"use client";

import { ChevronDown, BookOpen, Heart } from "lucide-react";

const MASLAKS = [
  { group: "Sunni", items: ["Sunni (Barelvi)", "Sunni (Deobandi)", "Sunni (Ahle Hadith / Salafi)", "Sunni (General)"] },
  { group: "Shia", items: ["Shia (Ithna Ashari / 12ver)", "Shia (Ismaili)", "Shia (Bohra)", "Shia (General)"] },
  { group: "Other", items: ["Prefer not to mention"] }
];

const PRAYERS = [
  { id: "5waqt", title: "5 Waqt Baaqaida", sub: "Regularly observes 5 times namaz" },
  { id: "mostly", title: "Aksar Padhta hoon", sub: "Prays most of the time" },
  { id: "trying", title: "Koshish Mein Hoon", sub: "Actively working on regular habits" },
  { id: "none", title: "Prefer not to say", sub: "Skip this detail" }
];

const QURAN_LEVELS = [
  { id: "hafiz", title: "Hafiz / Hafiza", sub: "Has memorized the Holy Quran" },
  { id: "naazra", title: "Naazra Padhta hoon", sub: "Recites Quran regularly" },
  { id: "learning", title: "Seekh raha hoon", sub: "Currently learning recitation" },
  { id: "none", title: "Prefer not to say", sub: "Skip this detail" }
];

const PARDA_OPTIONS = [
  "Baaqaida Parda (with niqab)",
  "Hijab with Abaya",
  "Hijab Only",
  "Occasional / Modest Dressing",
  "Prefer not to mention"
];

const DEEN_PREFS = [
  "Same Maslak Zaroori Hai",
  "Sunni Ho Toh Theek Hai",
  "Practicing Muslim Ho — Maslak Koi Bhi",
  "Open Hoon"
];

export default function StepDeen({ data, setData, errors }) {
  const handleFieldChange = (field, val) => {
    setData({ ...data, [field]: val });
  };

  const isGirl = data.gender === "girl";

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Maslak Selection */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Maslak / Sect
        </label>
        <div className="relative">
          <select
            value={data.maslak || ""}
            onChange={(e) => handleFieldChange("maslak", e.target.value)}
            className={`w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-[15.5px] text-text-primary outline-none appearance-none cursor-pointer transition-all duration-300 focus:border-gold/70 focus:bg-gold-dim ${
              errors.maslak ? "border-rose/55" : "border-white/10"
            }`}
          >
            <option value="" disabled className="bg-bg-secondary text-text-muted">
              — Select Maslak —
            </option>
            {MASLAKS.map((group) => (
              <optgroup key={group.group} label={group.group} className="bg-bg-secondary text-text-muted font-bold">
                {group.items.map((m) => (
                  <option key={m} value={m} className="bg-bg-secondary text-text-primary">
                    {m}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
        </div>
        {errors.maslak && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.maslak}
          </span>
        )}
      </div>

      {/* 2. Namaz Habits Grid */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Namaz / Prayers
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {PRAYERS.map((p) => {
            const isSelected = data.namaz === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleFieldChange("namaz", p.id)}
                className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gold-dim border-gold/70 text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                {/* Masjid Icon */}
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                    <path d="M12 2v6M9 6h6M12 22v-6M8 18h8M6 14h12M4 10h16M2 14c0-4 3.5-7 8-7h4c4.5 0 8 3 8 7v8H2v-8z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-[14.5px] font-bold ${isSelected ? "text-gold-light" : "text-text-primary"}`}>
                    {isGirl && p.title.endsWith("hoon") ? p.title.replace("hoon", "hoon") : p.title}
                  </div>
                  <div className="text-[11px] text-text-muted mt-1 leading-snug">{p.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
        {errors.namaz && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.namaz}
          </span>
        )}
      </div>

      {/* 3. Quran Habits Grid */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Quran / Recitation
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {QURAN_LEVELS.map((q) => {
            const isSelected = data.quran === q.id;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  handleFieldChange("quran", q.id);
                  if (q.id === "hafiz") handleFieldChange("hafiz", true);
                  else handleFieldChange("hafiz", false);
                }}
                className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gold-dim border-gold/70 text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <BookOpen size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-[14.5px] font-bold ${isSelected ? "text-gold-light" : "text-text-primary"}`}>
                    {q.id === "hafiz" ? (isGirl ? "Hafiza-e-Quran" : "Hafiz-e-Quran") : q.title}
                  </div>
                  <div className="text-[11px] text-text-muted mt-1 leading-snug">{q.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
        {errors.quran && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.quran}
          </span>
        )}
      </div>

      {/* 4. Hijab / Parda (Conditional for Girls) */}
      {isGirl && (
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Hijab / Parda Preference
          </label>
          <div className="relative">
            <select
              value={data.hijab || ""}
              onChange={(e) => handleFieldChange("hijab", e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-[15.5px] text-text-primary outline-none appearance-none cursor-pointer focus:border-gold/70 focus:bg-gold-dim"
            >
              <option value="" disabled className="bg-bg-secondary text-text-muted">
                — Select Hijab/Parda —
              </option>
              {PARDA_OPTIONS.map((p) => (
                <option key={p} value={p} className="bg-bg-secondary text-text-primary">
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
          </div>
        </div>
      )}

      {/* 5. Partner Religion Preference */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Partner's Deen Preference
        </label>
        <div className="relative">
          <select
            value={data.partnerDeen || ""}
            onChange={(e) => handleFieldChange("partnerDeen", e.target.value)}
            className={`w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-[15.5px] text-text-primary outline-none appearance-none cursor-pointer transition-all duration-300 focus:border-gold/70 focus:bg-gold-dim ${
              errors.partnerDeen ? "border-rose/55" : "border-white/10"
            }`}
          >
            <option value="" disabled className="bg-bg-secondary text-text-muted">
              — Select Partner Preference —
            </option>
            {DEEN_PREFS.map((pref) => (
              <option key={pref} value={pref} className="bg-bg-secondary text-text-primary">
                {pref}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
        </div>
        {errors.partnerDeen && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.partnerDeen}
          </span>
        )}
      </div>
    </div>
  );
}
