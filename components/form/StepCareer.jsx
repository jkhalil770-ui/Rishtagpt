"use client";

import { ChevronDown, Briefcase, Landmark } from "lucide-react";

const DEGREES = [
  "Matric / O-Levels",
  "FA-FSc / A-Levels",
  "BA-BSc / Bachelors",
  "MA-MSc / Masters",
  "MBA",
  "Engineering (BE/BTech)",
  "Medical (MBBS/BDS)",
  "PhD",
  "Other"
];

const EMPLOYMENTS = ["Private Job", "Govt Job", "Own Business", "Based Abroad"];

export default function StepCareer({ data, setData, errors }) {
  const handleFieldChange = (field, val) => {
    setData({ ...data, [field]: val });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Education Qualification Dropdown */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Highest Degree / Taleem
        </label>
        <div className="relative">
          <select
            value={data.degree || ""}
            onChange={(e) => handleFieldChange("degree", e.target.value)}
            className={`w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-[15.5px] text-text-primary outline-none appearance-none cursor-pointer transition-all duration-300 focus:border-gold/70 focus:bg-gold-dim ${
              errors.degree ? "border-rose/55" : "border-white/10"
            }`}
          >
            <option value="" disabled className="bg-bg-secondary text-text-muted">
              — Select Education —
            </option>
            {DEGREES.map((d) => (
              <option key={d} value={d} className="bg-bg-secondary text-text-primary">
                {d}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
        </div>
        {errors.degree && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.degree}
          </span>
        )}
      </div>

      {/* 2. Educational Institution (Optional) */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Educational Institution <span className="text-text-muted/50 font-medium">(Optional)</span>
        </label>
        <input
          type="text"
          placeholder="e.g. NUST, FAST, IBA"
          value={data.institution || ""}
          onChange={(e) => handleFieldChange("institution", e.target.value)}
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all duration-300 focus:border-gold/70 focus:bg-gold-dim"
        />
      </div>

      {/* 3. Profession Input */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Profession / Kaam
        </label>
        <input
          type="text"
          placeholder="e.g. Senior Software Engineer"
          value={data.profession || ""}
          onChange={(e) => handleFieldChange("profession", e.target.value)}
          className={`w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all duration-300 focus:border-gold/70 focus:bg-gold-dim ${
            errors.profession ? "border-rose/55 bg-rose/5" : "border-white/10"
          }`}
        />
        {errors.profession && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.profession}
          </span>
        )}
      </div>

      {/* 4. Employment Type pills */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Employment Type
        </label>
        <div className="flex gap-2 flex-wrap">
          {EMPLOYMENTS.map((type) => {
            const isSelected = data.employment === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleFieldChange("employment", type)}
                className={`px-5 py-3 rounded-xl border text-[13.5px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gold-dim border-gold text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
        {errors.employment && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.employment}
          </span>
        )}
      </div>

      {/* 5. Income Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block">
            Monthly Income <span className="text-text-muted/50 font-medium">(Optional)</span>
          </label>
          {data.income > 0 && (
            <button
              type="button"
              onClick={() => handleFieldChange("income", 0)}
              className="text-[10px] uppercase tracking-wider font-bold text-gold hover:underline cursor-pointer"
            >
              Hide Income
            </button>
          )}
        </div>
        <div className="px-2 py-4 bg-white/[0.02] border border-white/5 rounded-2xl">
          <input
            type="range"
            min="0"
            max="15"
            step="1"
            value={data.income || 0}
            onChange={(e) => handleFieldChange("income", Number(e.target.value))}
            className="w-full h-[3.5px] bg-white/[0.08] rounded-full outline-none appearance-none cursor-pointer accent-gold hover:accent-gold-light"
            style={{
              WebkitAppearance: "none",
            }}
          />
          <div className="flex items-center justify-between mt-3 text-[11px] text-text-muted font-semibold">
            <span>Rs. 0</span>
            <span className="text-[14px] font-bold text-gold-light num">
              {data.income === 0
                ? "Prefer not to mention"
                : data.income >= 15
                ? "Rs. 1,500,000+ PKR/mo"
                : `Rs. ${(data.income * 100).toLocaleString()},000 PKR/mo`}
            </span>
            <span>Rs. 15L+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
