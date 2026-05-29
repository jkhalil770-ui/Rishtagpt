/* Multi-step form — internal scroll, bottom CTA always visible */

const HEIGHT_OPTIONS = [
  "4'8\"","4'9\"","4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"",
  "5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\"","6'3\"+"
];
const COMPLEXION = ["Fair","Wheatish","Olive","Medium","Tan","Dark"];
const MASLAK = [
  "Sunni — Barelvi",
  "Sunni — Deobandi",
  "Sunni — Ahle Hadith",
  "Sunni — General",
  "Shia — Ithna Ashari",
  "Shia — Ismaili",
  "Shia — Bohra",
  "Shia — General",
  "Prefer not to mention",
];
const DEGREE = ["Matric","Intermediate","Bachelors","Masters","MPhil","PhD","Hafiz-e-Quran","Aalim/Aalima","Medical (MBBS/MD)","Engineering","CA/ACCA","Other"];
const STATUS = ["Alive","Late","Retired"];
const PARTNER_DEEN = ["Strictly practising","Practising","Moderate","Open","Doesn't matter"];
const MARITAL = ["Never married", "Divorced", "Widowed"];

const TRAITS = ["Calm","Caring","Ambitious","Funny","Homely","Responsible","Religious","Social","Simple","Independent","Confident","Patient"];

const STEPS = ["Personal","Deen","Career","Family","Preferences"];

function PhotoUpload({ value, onChange }) {
  const inputRef = React.useRef(null);
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { alert("Photo size 5MB se kam honi chahiye"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 700;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const w = img.width * scale, h = img.height * scale;
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        onChange(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative shrink-0 rounded-2xl overflow-hidden flex items-center justify-center group"
        style={{
          width: 84, height: 84,
          background: value ? `url(${value}) center/cover` : "rgba(255,255,255,0.04)",
          border: "1.5px dashed rgba(201,168,76,0.4)",
          cursor: "pointer",
        }}
      >
        {!value && (
          <div className="flex flex-col items-center gap-1 text-center px-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
                 style={{ color: "var(--gold-2)" }}>
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <circle cx="12" cy="12" r="3.2"/>
              <path d="M8 5l1.5-2h5L16 5"/>
            </svg>
            <div className="text-[9px] leading-tight" style={{ color: "var(--ink-soft)" }}>Tap to add</div>
          </div>
        )}
      </button>
      <div className="flex-1">
        <div className="text-[13px] font-medium">{value ? "Photo added" : "Profile photo"}</div>
        <div className="text-[11px]" style={{ color: "var(--ink-soft)" }}>
          {value ? "Will appear on PDF biodata card." : "Optional · used on PDF biodata card."}
        </div>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-[11px] mt-1 underline"
            style={{ color: "var(--ink-soft)" }}
          >
            Remove
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={onFile} className="hidden"/>
    </div>
  );
}

function StepIndicator({ step, total }) {
  return (
    <div className="px-5 pt-2 pb-4">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <React.Fragment key={i}>
            <div className={"stepdot " + (i < step ? "done" : i === step ? "active" : "")}>
              {i < step
                ? <Ic.check style={{ width: 14, height: 14 }} />
                : i + 1}
            </div>
            {i < total - 1 && (
              <div className="seg">
                <div className="fill" style={{ transform: `scaleX(${i < step ? 1 : 0})` }}/>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <div>
          <div className="font-display text-[22px] leading-tight">{STEPS[step]}</div>
          <div className="text-[12px]" style={{ color: "var(--ink-soft)" }}>
            Step {step + 1} of {total}
          </div>
        </div>
        <div className="text-[11px] uppercase tracking-widest" style={{ color: "var(--gold-2)" }}>
          {Math.round(((step + 1) / total) * 100)}%
        </div>
      </div>
    </div>
  );
}

function Step1({ d, set, errors }) {
  return (
    <div className="screen-anim">
      <div className="glass-gold p-5">
        <PhotoUpload value={d.photo} onChange={(v)=>set({photo:v})} />

        <Field label="Name" error={errors.name}>
          <input className="gi" placeholder="Aapka naam" value={d.name} onChange={(e)=>set({name:e.target.value})}/>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Age" error={errors.age}>
            <Stepper value={d.age} min={18} max={70} onChange={(v)=>set({age:v})}/>
          </Field>
          <Field label="Height" error={errors.height}>
            <Dropdown
              value={d.height}
              onChange={(v)=>set({height:v})}
              options={HEIGHT_OPTIONS}
              placeholder="— Select —"
              title="Select height"
            />
          </Field>
        </div>

        <Field label="Gender" error={errors.gender}>
          <PillToggle
            options={[{v:"boy", label:"Boy"},{v:"girl", label:"Girl"}]}
            value={d.gender}
            onChange={(v)=>set({gender:v})}
          />
        </Field>

        <Field label="Marital Status">
          <div className="flex gap-2 flex-wrap">
            {MARITAL.map(m => (
              <Tag key={m} label={m} sel={d.marital === m} onClick={()=>set({marital:m})}/>
            ))}
          </div>
        </Field>

        <Field label="City / Country" error={errors.city}>
          <input className="gi" placeholder="Karachi, Pakistan" value={d.city} onChange={(e)=>set({city:e.target.value})}/>
        </Field>

        <Field label="Complexion" optional>
          <Dropdown
            value={d.complexion}
            onChange={(v)=>set({complexion:v})}
            options={[{v:"", label:"Prefer not to say"}, ...COMPLEXION.map(c => ({v:c, label:c}))]}
            placeholder="Prefer not to say"
            title="Select complexion"
          />
        </Field>
      </div>
    </div>
  );
}

function Step2({ d, set, errors }) {
  const namaz = [
    { v: "regular",  t: "Regular",      s: "5 times a day" },
    { v: "mostly",   t: "Mostly",       s: "Try every day" },
    { v: "sometimes",t: "Sometimes",    s: "Learning" },
    { v: "occasion", t: "Occasionally", s: "Working on it" },
  ];
  const quran = [
    { v: "hafiz",   t: "Hafiz-e-Quran", s: "Memorised" },
    { v: "daily",   t: "Daily tilawat", s: "Read every day" },
    { v: "weekly",  t: "Weekly",        s: "When possible" },
    { v: "learning",t: "Learning",      s: "In progress" },
  ];
  return (
    <div className="screen-anim">
      <div className="glass-gold p-5">
        <Field label="Maslak" error={errors.maslak}>
          <Dropdown
            value={d.maslak}
            onChange={(v)=>set({maslak:v})}
            options={MASLAK}
            placeholder="— Select Maslak —"
            title="Select Maslak"
          />
        </Field>

        <Field label="Namaz" error={errors.namaz}>
          <div className="grid grid-cols-2 gap-2.5">
            {namaz.map(o => (
              <IconCard key={o.v}
                icon={<Ic.masjid style={{ width: 22, height: 22 }} />}
                title={o.t} sub={o.s}
                sel={d.namaz === o.v} onClick={()=>set({namaz:o.v})}/>
            ))}
          </div>
        </Field>

        <Field label="Quran" error={errors.quran}>
          <div className="grid grid-cols-2 gap-2.5">
            {quran.map(o => (
              <IconCard key={o.v}
                icon={<Ic.book style={{ width: 22, height: 22 }} />}
                title={o.t} sub={o.s}
                sel={d.quran === o.v} onClick={()=>set({quran:o.v})}/>
            ))}
          </div>
        </Field>

        <Field label="Hafiz-e-Quran?">
          <PillToggle
            options={[{v:false,label:"No"},{v:true,label:"Yes"}]}
            value={!!d.hafiz}
            onChange={(v)=>set({hafiz:v})}
          />
        </Field>

        {d.gender === "girl" && (
          <Field label="Hijab / Parda">
            <PillToggle
              options={[{v:"hijab",label:"Hijab"},{v:"niqab",label:"Niqab"},{v:"none",label:"None"}]}
              value={d.hijab}
              onChange={(v)=>set({hijab:v})}
            />
          </Field>
        )}

        <Field label="Partner Deen Preference" error={errors.partnerDeen}>
          <Dropdown
            value={d.partnerDeen}
            onChange={(v)=>set({partnerDeen:v})}
            options={PARTNER_DEEN}
            placeholder="— Select —"
            title="Partner deen preference"
          />
        </Field>
      </div>
    </div>
  );
}

function Step3({ d, set, errors }) {
  const types = ["Govt","Private","Business","Freelance"];
  return (
    <div className="screen-anim">
      <div className="glass-gold p-5">
        <Field label="Degree" error={errors.degree}>
          <Dropdown
            value={d.degree}
            onChange={(v)=>set({degree:v})}
            options={DEGREE}
            placeholder="— Select degree —"
            title="Highest qualification"
          />
        </Field>

        <Field label="Institution" optional>
          <input className="gi" placeholder="University name" value={d.institution} onChange={(e)=>set({institution:e.target.value})}/>
        </Field>

        <Field label="Profession" error={errors.profession}>
          <input className="gi" placeholder="e.g. Software Engineer" value={d.profession} onChange={(e)=>set({profession:e.target.value})}/>
        </Field>

        <Field label="Employment Type" error={errors.employment}>
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <Tag key={t} label={t} sel={d.employment === t} onClick={()=>set({employment:t})}/>
            ))}
          </div>
        </Field>

        <Field label="Monthly Income" optional>
          <div className="px-1">
            <input
              type="range" min="0" max="20" step="1"
              value={d.income}
              onChange={(e)=>set({income: +e.target.value})}
              className="range"
            />
            <div className="flex items-center justify-between mt-2 text-[12px]" style={{ color: "var(--ink-soft)" }}>
              <span>Rs. 0</span>
              <span className="text-[14px] font-semibold" style={{ color: "var(--gold-2)" }}>
                {d.income === 0 ? "Prefer not to say" :
                 d.income >= 20 ? "Rs. 2,000,000+" :
                 `Rs. ${(d.income * 100).toLocaleString()},000`}
              </span>
              <span>Rs. 20L+</span>
            </div>
          </div>
        </Field>
      </div>
    </div>
  );
}

function Step4({ d, set, errors }) {
  const fam = [
    { v: "conservative", t: "Conservative", s: "Traditional values" },
    { v: "moderate",     t: "Moderate",     s: "Balanced approach" },
    { v: "liberal",      t: "Liberal",      s: "Modern, open" },
  ];
  return (
    <div className="screen-anim">
      <div className="glass-gold p-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Father status" error={errors.fatherStatus}>
            <Dropdown
              value={d.fatherStatus}
              onChange={(v)=>set({fatherStatus:v})}
              options={STATUS}
              placeholder="—"
              title="Father status"
            />
          </Field>
          <Field label="Mother status" error={errors.motherStatus}>
            <Dropdown
              value={d.motherStatus}
              onChange={(v)=>set({motherStatus:v})}
              options={STATUS}
              placeholder="—"
              title="Mother status"
            />
          </Field>
        </div>

        <Field label="Father's profession" optional>
          <input className="gi" placeholder="e.g. Retired Banker" value={d.fatherProf} onChange={(e)=>set({fatherProf:e.target.value})}/>
        </Field>

        <Field label="Mother's profession" optional>
          <input className="gi" placeholder="e.g. Homemaker" value={d.motherProf} onChange={(e)=>set({motherProf:e.target.value})}/>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Brothers">
            <Stepper value={d.brothers} max={20} onChange={(v)=>set({brothers:v})}/>
          </Field>
          <Field label="Sisters">
            <Stepper value={d.sisters} max={20} onChange={(v)=>set({sisters:v})}/>
          </Field>
        </div>

        <Field label="Family Type" error={errors.famType}>
          <div className="grid grid-cols-3 gap-2">
            {fam.map(o => (
              <button key={o.v}
                onClick={()=>set({famType:o.v})}
                className={"icard items-center text-center " + (d.famType === o.v ? "sel" : "")}
                style={{ alignItems: "center" }}>
                <div className="ic-icon"><Ic.home style={{ width: 22, height: 22 }} /></div>
                <div className="ic-title text-center">{o.t}</div>
                <div className="ic-sub text-center">{o.s}</div>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Residence" error={errors.residence}>
          <PillToggle
            options={[{v:"own",label:"Owned"},{v:"rent",label:"Rented"},{v:"abroad",label:"Abroad"}]}
            value={d.residence}
            onChange={(v)=>set({residence:v})}
          />
        </Field>

        <Field label="Biradari / Caste" optional>
          <div className="flex gap-2 items-center">
            <input
              className="gi flex-1"
              placeholder="e.g. Syed, Rajput, Sheikh"
              value={d.biradari}
              disabled={d.biradariSkip}
              onChange={(e)=>set({biradari:e.target.value})}
            />
            <button
              type="button"
              onClick={()=>set({biradariSkip:!d.biradariSkip, biradari: ""})}
              className="trust whitespace-nowrap"
              style={{
                cursor:"pointer", height: 50, padding: "0 14px",
                borderColor: d.biradariSkip ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.08)",
                color: d.biradariSkip ? "var(--gold-2)" : "var(--ink-soft)",
                background: d.biradariSkip ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.04)",
              }}>
              Prefer not
            </button>
          </div>
        </Field>

        <Field label="Wali / Family Contact" optional>
          <input
            className="gi"
            type="tel"
            placeholder="+92 300 1234567"
            value={d.waliContact}
            onChange={(e)=>set({waliContact:e.target.value})}
          />
          <div className="text-[11px] mt-1.5 ml-1" style={{ color: "var(--ink-dim)" }}>
            Optional — shown on PDF only if you add it.
          </div>
        </Field>
      </div>
    </div>
  );
}

function Step5({ d, set, errors }) {
  const toggleTrait = (t) => {
    const has = d.traits.includes(t);
    if (has) set({ traits: d.traits.filter(x => x !== t) });
    else if (d.traits.length < 3) set({ traits: [...d.traits, t] });
  };
  return (
    <div className="screen-anim">
      <div className="glass-gold p-5">
        <Field label={`Personality traits (up to 3 · ${d.traits.length}/3)`} error={errors.traits}>
          <div className="flex flex-wrap gap-2">
            {TRAITS.map(t => (
              <Tag key={t} label={t} sel={d.traits.includes(t)} onClick={()=>toggleTrait(t)} />
            ))}
          </div>
        </Field>

        <Field label={`Partner age range: ${d.partnerAge[0]} – ${d.partnerAge[1]} years`}>
          <RangeDual min={18} max={55} value={d.partnerAge} onChange={(v)=>set({partnerAge:v})}/>
        </Field>

        <Field label="Location Preference" error={errors.locPref}>
          <div className="flex gap-2 flex-wrap">
            {["Same city","Same country","Abroad OK"].map(o => (
              <Tag key={o} label={o} sel={d.locPref === o} onClick={()=>set({locPref:o})}/>
            ))}
          </div>
        </Field>

        <Field label={`Additional note (${(d.note||"").length}/100)`} optional>
          <textarea
            className="gi"
            maxLength={100}
            placeholder="Anything else to mention…"
            value={d.note}
            onChange={(e)=>set({note:e.target.value})}
          />
        </Field>
      </div>
    </div>
  );
}

function validateStep(step, d) {
  const e = {};
  if (step === 0) {
    if (!d.name)    e.name = "Naam dijiye";
    if (!d.age)     e.age  = "Age select karein";
    if (!d.gender)  e.gender = "Gender select karein";
    if (!d.height)  e.height = "Height select karein";
    if (!d.city)    e.city = "City likhein";
  }
  if (step === 1) {
    if (!d.maslak) e.maslak = "Maslak select karein";
    if (!d.namaz)  e.namaz = "Namaz habit select karein";
    if (!d.quran)  e.quran = "Quran option select karein";
    if (!d.partnerDeen) e.partnerDeen = "Partner deen preference choose karein";
  }
  if (step === 2) {
    if (!d.degree)     e.degree = "Degree select karein";
    if (!d.profession) e.profession = "Profession likhein";
    if (!d.employment) e.employment = "Employment type choose karein";
  }
  if (step === 3) {
    if (!d.fatherStatus) e.fatherStatus = "Required";
    if (!d.motherStatus) e.motherStatus = "Required";
    if (!d.famType)      e.famType = "Family type choose karein";
    if (!d.residence)    e.residence = "Residence choose karein";
  }
  if (step === 4) {
    if (!d.traits || d.traits.length === 0) e.traits = "Kam az kam 1 trait choose karein";
    if (!d.locPref) e.locPref = "Location preference choose karein";
  }
  return e;
}

function FormScreen({ data, setData, onBack, onSubmit }) {
  const [step, setStep] = React.useState(() => {
    const s = Number(data.__step) || 0;
    return Math.min(Math.max(s, 0), STEPS.length - 1);
  });
  const [shake, setShake] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const total = STEPS.length;
  const scrollRef = React.useRef(null);

  const set = (patch) => setData({ ...data, ...patch });

  // Persist current step so user lands back on same page after navigating away
  React.useEffect(() => {
    if (data.__step !== step) setData({ ...data, __step: step });
    // eslint-disable-next-line
  }, [step]);

  const next = () => {
    const e = validateStep(step, data);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setShake(true);
      setTimeout(()=>setShake(false), 500);
      // scroll to first error
      setTimeout(()=>{
        const el = scrollRef.current?.querySelector(".text-rose-300");
        el?.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    if (step < total - 1) {
      setStep(step + 1);
      setErrors({});
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else onSubmit();
  };

  const back = () => {
    if (step === 0) onBack();
    else {
      setStep(step - 1);
      setErrors({});
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="screen-col">
      {/* Top bar (fixed within phone) */}
      <div className="px-5 flex items-center gap-3 pt-1 pb-1 shrink-0">
        <button onClick={back} className="iconbtn" aria-label="Back">
          <Ic.back style={{ width: 18, height: 18 }} />
        </button>
        <div className="text-[12px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
          Bio Builder
        </div>
      </div>

      <div className="shrink-0">
        <StepIndicator step={step} total={total} />
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className={"scroll-region px-5 pb-6 " + (shake ? "shake-anim" : "")}>
        {step === 0 && <Step1 d={data} set={set} errors={errors}/>}
        {step === 1 && <Step2 d={data} set={set} errors={errors}/>}
        {step === 2 && <Step3 d={data} set={set} errors={errors}/>}
        {step === 3 && <Step4 d={data} set={set} errors={errors}/>}
        {step === 4 && <Step5 d={data} set={set} errors={errors}/>}
      </div>

      {/* Bottom action — flex sibling, always visible */}
      <div
        className="px-5 pt-3 shrink-0"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(10,15,30,0.92) 30%, rgba(10,15,30,0.97))",
          paddingBottom: "max(20px, env(safe-area-inset-bottom))",
        }}
      >
        <button onClick={next} className="gold-btn w-full rounded-2xl py-4 text-[16px] flex items-center justify-center gap-2">
          {step === total - 1 ? (
            <>
              Generate Bio
              <Ic.sparkle style={{ width: 16, height: 16 }} />
            </>
          ) : (
            <>
              Aagey Barhein
              <Ic.arrow style={{ width: 18, height: 18 }} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

window.FormScreen = FormScreen;
