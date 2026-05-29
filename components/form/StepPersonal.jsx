"use client";

import { useRef } from "react";
import { Camera, Trash2 } from "lucide-react";
import CustomSelect from "../ui/CustomSelect";

const HEIGHTS = [
  "4'8\"", "4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"",
  "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"",
  "6'2\"", "6'3\"", "6'4\"", "6'5\""
];

const COMPLEXIONS = ["Very Fair", "Fair", "Wheatish", "Brown", "Dark Brown", "Prefer not to mention"];
const MARITAL_STATUSES = ["Never Married", "Divorced", "Widowed"];

export default function StepPersonal({ data, setData, errors }) {
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Photo size 5MB se kam honi chahiye!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Compress photo using canvas
        const maxDim = 600;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        setData({ ...data, photo: canvas.toDataURL("image/jpeg", 0.85) });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (field, val) => {
    setData({ ...data, [field]: val });
  };

  const incrementAge = () => {
    if (data.age < 70) handleTextChange("age", (data.age || 25) + 1);
  };

  const decrementAge = () => {
    if (data.age > 18) handleTextChange("age", (data.age || 25) - 1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Profile Photo Upload */}
      <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative w-20 h-20 rounded-full border-2 border-dashed border-gold/45 overflow-hidden flex flex-col items-center justify-center bg-white/[0.04] cursor-pointer group transition-all shrink-0 hover:border-gold"
          style={data.photo ? { backgroundImage: `url(${data.photo})`, backgroundSize: "cover", backgroundPosition: "center", borderStyle: "solid" } : {}}
        >
          {!data.photo && (
            <div className="flex flex-col items-center gap-1 text-center text-gold-light group-hover:scale-105 transition-transform duration-300">
              <Camera size={18} />
              <span className="text-[9px] font-bold">Add Photo</span>
            </div>
          )}
        </button>
        <div className="flex-1">
          <h4 className="text-[13.5px] font-bold text-text-primary">
            Profile Photo <span className="text-text-muted/60 font-medium">(Optional)</span>
          </h4>
          <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
            {data.photo
              ? "Photo successfully loaded! Will print on PDF biodata card."
              : "Apni photo add karein. PDF card par circular photo print hogi."}
          </p>
          {data.photo && (
            <button
              type="button"
              onClick={() => handleTextChange("photo", null)}
              className="mt-2 text-[11px] text-rose font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Trash2 size={11} />
              <span>Remove Photo</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      {/* 2. Full Name Input */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Name / Naam
        </label>
        <input
          type="text"
          placeholder="Aapka naam"
          value={data.name || ""}
          onChange={(e) => handleTextChange("name", e.target.value)}
          className={`w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all duration-300 focus:border-gold/70 focus:bg-gold-dim focus:shadow-[0_0_15px_rgba(201,168,76,0.12)] ${
            errors.name ? "border-rose/55 bg-rose/5" : "border-white/10"
          }`}
        />
        {errors.name && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.name}
          </span>
        )}
      </div>

      {/* 3. Age & Height Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Age Stepper */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Age / Umar
          </label>
          <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-1 w-full overflow-hidden">
            <button
              type="button"
              onClick={decrementAge}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-gold text-xl font-bold cursor-pointer transition-colors active:scale-95 hover:bg-gold-dim"
            >
              -
            </button>
            <span className="font-display font-bold text-lg text-text-primary num">
              {data.age || 25}
            </span>
            <button
              type="button"
              onClick={incrementAge}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-gold text-xl font-bold cursor-pointer transition-colors active:scale-95 hover:bg-gold-dim"
            >
              +
            </button>
          </div>
        </div>

        {/* Height Dropdown */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
            Height / Qad
          </label>
          <CustomSelect
            value={data.height || ""}
            onChange={(val) => handleTextChange("height", val)}
            options={HEIGHTS}
            placeholder="— Select Height —"
            error={errors.height}
          />
          {errors.height && (
            <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
              {errors.height}
            </span>
          )}
        </div>
      </div>

      {/* 4. Gender Toggle Pill Slider */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Gender
        </label>
        <div className="relative flex p-1 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          {/* Slider background thumb */}
          <div
            className="absolute top-1 bottom-1 w-[50%] rounded-xl bg-gradient-to-r from-gold-light to-gold shadow-md transition-transform duration-300 ease-[cubic-bezier(0.25,1.7,0.5,1)]"
            style={{
              transform: data.gender === "girl" ? "translateX(96%)" : "translateX(4%)",
            }}
          />
          <button
            type="button"
            onClick={() => handleTextChange("gender", "boy")}
            className={`flex-1 py-3 text-sm font-bold transition-all relative z-10 cursor-pointer ${
              data.gender === "boy" ? "text-[#1A1304]" : "text-text-muted"
            }`}
          >
            Boy / Larka
          </button>
          <button
            type="button"
            onClick={() => handleTextChange("gender", "girl")}
            className={`flex-1 py-3 text-sm font-bold transition-all relative z-10 cursor-pointer ${
              data.gender === "girl" ? "text-[#1A1304]" : "text-text-muted"
            }`}
          >
            Girl / Larki
          </button>
        </div>
        {errors.gender && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.gender}
          </span>
        )}
      </div>

      {/* 5. Marital Status Badges */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Marital Status
        </label>
        <div className="flex gap-2 flex-wrap">
          {MARITAL_STATUSES.map((m) => {
            const isSelected = data.marital === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => handleTextChange("marital", m)}
                className={`px-5 py-3 rounded-xl border text-[13.5px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gold-dim border-gold text-gold shadow-gold-glow"
                    : "bg-white/[0.03] border-white/10 text-text-muted hover:border-white/20"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. City / Country */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          City, Country / Shehar
        </label>
        <input
          type="text"
          placeholder="e.g. Lahore, Pakistan"
          value={data.city || ""}
          onChange={(e) => handleTextChange("city", e.target.value)}
          className={`w-full bg-white/[0.03] border rounded-2xl px-5 py-4 text-[15.5px] text-text-primary placeholder-text-muted/40 outline-none transition-all duration-300 focus:border-gold/70 focus:bg-gold-dim ${
            errors.city ? "border-rose/55 bg-rose/5" : "border-white/10"
          }`}
        />
        {errors.city && (
          <span className="text-[11.5px] text-rose font-semibold mt-1.5 block">
            {errors.city}
          </span>
        )}
      </div>

      {/* 7. Complexion Dropdown */}
      <div>
        <label className="text-xs uppercase tracking-widest font-bold text-text-muted block mb-2">
          Complexion <span className="text-text-muted/50 font-medium">(Optional)</span>
        </label>
        <CustomSelect
          value={data.complexion || ""}
          onChange={(val) => handleTextChange("complexion", val)}
          options={COMPLEXIONS}
          placeholder="Prefer not to mention"
        />
      </div>
    </div>
  );
}
