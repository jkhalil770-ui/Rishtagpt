"use client";

import { Globe } from "lucide-react";
import CustomSelect from "../ui/CustomSelect";

const TRAITS = [
  "Calm", "Caring", "Ambitious", "Funny", "Homely", "Responsible",
  "Religious", "Social", "Simple", "Independent", "Confident", "Patient"
];

const PREFERRED_LOCS = ["Same city", "Same country", "Abroad OK"];

const MIN_QUALIFICATIONS = [
  "No Preference",
  "Bachelors minimum",
  "Masters minimum",
  "MBBS / Doctor minimum",
  "Engineering minimum",
  "PhD minimum"
];

const STYLES = [
  { id: "traditional", label: "Traditional", desc: "Formal Urdu/respectful tone, classical structure", appleEmojiUrl: "/assets/emoji-traditional.png" },
  { id: "modern", label: "Modern", desc: "Confident, clean, direct contemporary tone", appleEmojiUrl: "/assets/emoji-modern.png" },
  { id: "poetic", label: "Poetic", desc: "Metaphorical, emotional, beautiful literary tone", appleEmojiUrl: "/assets/emoji-poetic.png" },
  { id: "professional", label: "Professional", desc: "Career-focused and achievement-oriented", appleEmojiUrl: "/assets/emoji-professional.png" },
  { id: "detailed", label: "Detailed", desc: "Comprehensive, thorough multi-section layout", appleEmojiUrl: "/assets/emoji-detailed.png" }
];

const LANGUAGES = [
  { id: "urdu", label: "Urdu Script (RTL)" },
  { id: "roman", label: "Roman Urdu (English letters)" },
  { id: "en", label: "English" }
];

export default function StepPreferences({ data, setData, errors }) {
  const handleFieldChange = (field, val) => {
    setData({ ...data, [field]: val });
  };

  const toggleTrait = (trait) => {
    const traits = data.traits || [];
    if (traits.includes(trait)) {
      handleFieldChange("traits", traits.filter((t) => t !== trait));
    } else {
      if (traits.length < 3) {
        handleFieldChange("traits", [...traits, trait]);
      }
    }
  };

  const handleLanguageToggle = (langId) => {
    const langs = data.langs || [];
    if (langs.includes(langId)) {
      // Must keep at least 1 language
      if (langs.length > 1) {
        handleFieldChange("langs", langs.filter((l) => l !== langId));
      }
    } else {
      handleFieldChange("langs", [...langs, langId]);
    }
  };

  const traits = data.traits || [];
  const selectedLangs = data.langs || ["roman"];

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Personality Traits Tag Pills */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Personality Traits <span className="text-text-muted/65 font-medium">(Select up to 3 · {traits.length}/3)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TRAITS.map((t) => {
            const isSelected = traits.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTrait(t)}
                className={`px-4 py-2.5 rounded-full border text-[13px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gold-dim border-gold text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        {errors.traits && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.traits}
          </span>
        )}
      </div>

      {/* 2. Partner Age Range Slider (Single standard range input for simplicity & reliability) */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Partner Max Age Limit: <span className="text-gold-light font-bold text-sm ml-1 num">{data.partnerAgeMax || 35} Years</span>
        </label>
        <div className="px-3 py-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <input
            type="range"
            min="20"
            max="60"
            step="1"
            value={data.partnerAgeMax || 35}
            onChange={(e) => handleFieldChange("partnerAgeMax", Number(e.target.value))}
            className="w-full h-[3.5px] bg-white/[0.08] rounded-full outline-none appearance-none cursor-pointer accent-gold"
          />
          <div className="flex items-center justify-between mt-2 text-[11px] text-text-muted font-bold">
            <span>20 Years</span>
            <span>60 Years</span>
          </div>
        </div>
      </div>

      {/* 3. Partner Location preference pills */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Partner Location Preference
        </label>
        <div className="flex gap-2 flex-wrap">
          {PREFERRED_LOCS.map((loc) => {
            const isSelected = data.locPref === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleFieldChange("locPref", loc)}
                className={`px-5 py-3 rounded-xl border text-[13.5px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gold-dim border-gold text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20"
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>
        {errors.locPref && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.locPref}
          </span>
        )}
      </div>

      {/* 4. Partner Minimum Education Dropdown */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Partner Minimum Education
        </label>
        <CustomSelect
          value={data.partnerEduMin || "No Preference"}
          onChange={(val) => handleFieldChange("partnerEduMin", val)}
          options={MIN_QUALIFICATIONS}
          placeholder="No Preference"
        />
      </div>

      {/* 5. Bio Style Selector Card Grid */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2.5">
          Bio Writing Style Presets
        </label>
        <div className="flex flex-col gap-3">
          {STYLES.map((style) => {
            const isSelected = data.style === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => handleFieldChange("style", style.id)}
                className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? "bg-gold-dim border-gold/70 text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                {/* Premium High-Resolution Local Apple Emoji */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all shrink-0 p-2 ${
                  isSelected ? "bg-white/10 border-gold/45" : "bg-white/5 border-white/10"
                }`}>
                  <img
                    src={style.appleEmojiUrl}
                    alt={style.label}
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-[14.5px] font-bold ${isSelected ? "text-gold-light" : "text-text-primary"}`}>
                    {style.label}
                  </div>
                  <div className="text-[11.5px] text-text-muted mt-1 leading-relaxed">{style.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Language Output Multiselect Checkbox Toggles */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Language Output <span className="text-text-muted/65 font-medium">(Select at least one)</span>
        </label>
        <div className="flex flex-col gap-2.5">
          {LANGUAGES.map((lang) => {
            const isChecked = selectedLangs.includes(lang.id);
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => handleLanguageToggle(lang.id)}
                className={`px-5 py-4 rounded-xl border text-[14px] font-bold text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                  isChecked
                    ? "bg-gold-dim border-gold/50 text-gold"
                    : "bg-white/[0.02] border-white/5 text-text-muted hover:bg-white/[0.04]"
                }`}
              >
                <span>{lang.label}</span>
                {/* Simulated checkbox */}
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    isChecked ? "bg-gold border-gold text-[#1A1304]" : "border-white/25 bg-transparent"
                  }`}
                >
                  {isChecked && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Additional Note Textarea with Gold Counter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted">
            Additional Note <span className="text-text-muted/50 font-medium">(Optional)</span>
          </label>
          <span className="text-[11px] font-bold text-gold-light num">
            {(data.note || "").length} / 100
          </span>
        </div>
        <textarea
          maxLength={100}
          placeholder="e.g. Seeking simple family, respect for parents is primary..."
          value={data.note || ""}
          onChange={(e) => handleFieldChange("note", e.target.value)}
          className="w-full h-24 bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all focus:border-gold/70 focus:bg-gold-dim resize-none"
        />
      </div>
    </div>
  );
}
