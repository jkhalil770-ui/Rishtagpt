"use client";

import { BookOpen } from "lucide-react";
import CustomSelect from "../ui/CustomSelect";

const MASLAKS = [
  { group: "Sunni", items: ["Sunni (Barelvi)", "Sunni (Deobandi)", "Sunni (Ahle Hadith / Salafi)", "Sunni (General)"] },
  { group: "Shia", items: ["Shia (Ithna Ashari / 12ver)", "Shia (Ismaili)", "Shia (Bohra)", "Shia (General)"] },
  { group: "Other", items: ["Prefer not to mention"] }
];

const formattedMaslaks = MASLAKS.flatMap((group) => [
  { label: group.group, isHeader: true },
  ...group.items.map((item) => ({ label: item, value: item }))
]);

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
        <CustomSelect
          value={data.maslak || ""}
          onChange={(val) => handleFieldChange("maslak", val)}
          options={formattedMaslaks}
          placeholder="— Select Maslak —"
          error={errors.maslak}
        />
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
                  const updated = {
                    ...data,
                    quran: q.id,
                    hafiz: q.id === "hafiz"
                  };
                  setData(updated);
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
          <CustomSelect
            value={data.hijab || ""}
            onChange={(val) => handleFieldChange("hijab", val)}
            options={PARDA_OPTIONS}
            placeholder="— Select Hijab/Parda —"
          />
        </div>
      )}

      {/* 5. Partner Religion Preference */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Partner's Deen Preference
        </label>
        <CustomSelect
          value={data.partnerDeen || ""}
          onChange={(val) => handleFieldChange("partnerDeen", val)}
          options={DEEN_PREFS}
          placeholder="— Select Partner Preference —"
          error={errors.partnerDeen}
          openUpward={true}
        />
        {errors.partnerDeen && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.partnerDeen}
          </span>
        )}
      </div>
    </div>
  );
}
