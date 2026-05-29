"use client";

import { Shield } from "lucide-react";
import CustomSelect from "../ui/CustomSelect";

const PARENT_STATUSES = ["Alive", "Retired", "Late"];
const MOTHER_STATUSES = ["Housewife", "Working", "Late"];

const RESIDENCES = ["Own House", "Rented", "Joint Family", "Based Abroad"];

const FAM_TYPES = [
  { id: "conservative", title: "Conservative", sub: "Traditional values" },
  { id: "moderate", title: "Moderate", sub: "Balanced outlook" },
  { id: "liberal", title: "Liberal", sub: "Modern, open-minded" }
];

export default function StepFamily({ data, setData, errors }) {
  const handleFieldChange = (field, val) => {
    setData({ ...data, [field]: val });
  };

  const incrementBrothers = () => {
    if (data.brothers < 15) handleFieldChange("brothers", (data.brothers || 0) + 1);
  };

  const decrementBrothers = () => {
    if (data.brothers > 0) handleFieldChange("brothers", (data.brothers || 0) - 1);
  };

  const incrementSisters = () => {
    if (data.sisters < 15) handleFieldChange("sisters", (data.sisters || 0) + 1);
  };

  const decrementSisters = () => {
    if (data.sisters > 0) handleFieldChange("sisters", (data.sisters || 0) - 1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Parents Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Father Status */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Father Status
          </label>
          <CustomSelect
            value={data.fatherStatus || ""}
            onChange={(val) => handleFieldChange("fatherStatus", val)}
            options={PARENT_STATUSES}
            placeholder="— Select Status —"
            error={errors.fatherStatus}
          />
          {errors.fatherStatus && (
            <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
              {errors.fatherStatus}
            </span>
          )}
        </div>

        {/* Mother Status */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Mother Status
          </label>
          <CustomSelect
            value={data.motherStatus || ""}
            onChange={(val) => handleFieldChange("motherStatus", val)}
            options={MOTHER_STATUSES}
            placeholder="— Select Status —"
            error={errors.motherStatus}
          />
          {errors.motherStatus && (
            <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
              {errors.motherStatus}
            </span>
          )}
        </div>
      </div>

      {/* 2. Parents Professions (Conditional inputs) */}
      {data.fatherStatus !== "Late" && (
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Father's Profession <span className="text-text-muted/50 font-medium">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Businessman, retired engineer"
            value={data.fatherProf || ""}
            onChange={(e) => handleFieldChange("fatherProf", e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all focus:border-gold/70 focus:bg-gold-dim"
          />
        </div>
      )}

      {data.motherStatus === "Working" && (
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Mother's Profession <span className="text-text-muted/50 font-medium">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Government School Teacher, doctor"
            value={data.motherProf || ""}
            onChange={(e) => handleFieldChange("motherProf", e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all focus:border-gold/70 focus:bg-gold-dim"
          />
        </div>
      )}

      {/* 3. Brother & Sister Steppers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Brothers */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Brothers / Bhai
          </label>
          <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-1 w-full overflow-hidden font-medium">
            <button
              type="button"
              onClick={decrementBrothers}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-gold text-xl font-bold cursor-pointer transition-colors active:scale-95 hover:bg-gold-dim"
            >
              -
            </button>
            <span className="font-display font-bold text-lg text-text-primary num">
              {data.brothers || 0}
            </span>
            <button
              type="button"
              onClick={incrementBrothers}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-gold text-xl font-bold cursor-pointer transition-colors active:scale-95 hover:bg-gold-dim"
            >
              +
            </button>
          </div>
        </div>

        {/* Sisters */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Sisters / Behan
          </label>
          <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-1 w-full overflow-hidden font-medium">
            <button
              type="button"
              onClick={decrementSisters}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-gold text-xl font-bold cursor-pointer transition-colors active:scale-95 hover:bg-gold-dim"
            >
              -
            </button>
            <span className="font-display font-bold text-lg text-text-primary num">
              {data.sisters || 0}
            </span>
            <button
              type="button"
              onClick={incrementSisters}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-gold text-xl font-bold cursor-pointer transition-colors active:scale-95 hover:bg-gold-dim"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 4. Family Type Cards */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Family Outlook Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {FAM_TYPES.map((t) => {
            const isSelected = data.famType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleFieldChange("famType", t.id)}
                className={`p-5 rounded-2xl border text-center flex flex-col items-center gap-2.5 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gold-dim border-gold/70 text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                  <Shield size={16} />
                </div>
                <div className="min-w-0">
                  <div className={`text-[14px] font-bold ${isSelected ? "text-gold-light" : "text-text-primary"}`}>
                    {t.title}
                  </div>
                  <div className="text-[10px] text-text-muted mt-1 font-medium">{t.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
        {errors.famType && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.famType}
          </span>
        )}
      </div>

      {/* 5. Residence pills */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Residence Status
        </label>
        <div className="flex gap-2 flex-wrap">
          {RESIDENCES.map((res) => {
            const isSelected = data.residence === res;
            return (
              <button
                key={res}
                type="button"
                onClick={() => handleFieldChange("residence", res)}
                className={`px-5 py-3 rounded-xl border text-[13.5px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gold-dim border-gold text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20"
                }`}
              >
                {res}
              </button>
            );
          })}
        </div>
        {errors.residence && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.residence}
          </span>
        )}
      </div>

      {/* 6. Biradari / Caste */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Biradari / Caste / Clan <span className="text-text-muted/50 font-medium">(Optional)</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="e.g. Syed, Rajput, Sheikh"
            value={data.biradari || ""}
            disabled={data.biradariSkip}
            onChange={(e) => handleFieldChange("biradari", e.target.value)}
            className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all focus:border-gold/70 focus:bg-gold-dim disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={() => {
              handleFieldChange("biradariSkip", !data.biradariSkip);
              if (!data.biradariSkip) handleFieldChange("biradari", "");
            }}
            className={`h-[56px] px-5 rounded-2xl border text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              data.biradariSkip
                ? "bg-gold-dim border-gold text-gold shadow-gold-glow"
                : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20"
            }`}
          >
            Prefer not to say
          </button>
        </div>
      </div>

      {/* 7. Wali Contact Info (Optional) */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Wali / Family Contact <span className="text-text-muted/50 font-medium">(Optional)</span>
        </label>
        <input
          type="tel"
          placeholder="e.g. +92 300 1234567"
          value={data.waliContact || ""}
          onChange={(e) => handleFieldChange("waliContact", e.target.value)}
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all focus:border-gold/70 focus:bg-gold-dim"
        />
        <span className="text-[11px] text-text-muted/50 font-medium mt-1.5 ml-1 block">
          Optional — security/authenticity feature. Will only show on downloaded PDF.
        </span>
      </div>
    </div>
  );
}
