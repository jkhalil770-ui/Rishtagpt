/* Multi-step form — 5 steps */

const HEIGHT_OPTIONS = [
  "4'8\"","4'9\"","4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"",
  "5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\"","6'3\"+"
];
const COMPLEXION = ["Fair","Wheatish","Olive","Medium","Tan","Dark"];
const MASLAK = [
  "— Select —",
  "Sunni — Barelvi",
  "Sunni — Deobandi",
  "Sunni — Ahle Hadith",
  "Sunni — General",
  "Shia — Ithna Ashari",
  "Shia — Ismaili",
  "Shia — General",
  "Prefer not to mention",
];
const DEGREE = ["Matric","Intermediate","Bachelors","Masters","MPhil","PhD","Hafiz-e-Quran","Aalim/Aalima","Other"];
const STATUS = ["Alive","Late","Retired"];
const RESIDENCE = ["Owned","Rented","Abroad"];
const PARTNER_DEEN = ["Strictly practising","Practising","Moderate","Open","Doesn't matter"];

const TRAITS = ["Calm","Caring","Ambitious","Funny","Homely","Responsible","Religious","Social","Simple","Independent","Confident","Patient"];

const STEPS = ["Personal","Deen","Career","Family","Preferences"];

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

function Step1({ d, set }) {
  return (
    <div className="step-enter">
      <div className="glass-gold p-5">
        <Field label="Name">
          <input className="gi" placeholder="Aapka naam" value={d.name} onChange={(e)=>set({name:e.target.value})}/>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Age">
            <Stepper value={d.age} min={18} max={70} onChange={(v)=>set({age:v})}/>
          </Field>
          <Field label="Height">
            <select className="gi" value={d.height} onChange={(e)=>set({height:e.target.value})}>
              <option>— Select —</option>
              {HEIGHT_OPTIONS.map(h => <option key={h}>{h}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Gender">
          <PillToggle
            options={[{v:"boy", label:"Boy"},{v:"girl", label:"Girl"}]}
            value={d.gender}
            onChange={(v)=>set({gender:v})}
          />
        </Field>

        <Field label="City / Country">
          <input className="gi" placeholder="Karachi, Pakistan" value={d.city} onChange={(e)=>set({city:e.target.value})}/>
        </Field>

        <Field label="Complexion" optional>
          <select className="gi" value={d.complexion} onChange={(e)=>set({complexion:e.target.value})}>
            <option value="">— Prefer not to say —</option>
            {COMPLEXION.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
    </div>
  );
}

function Step2({ d, set }) {
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
    <div className="step-enter">
      <div className="glass-gold p-5">
        <Field label="Maslak">
          <select className="gi" value={d.maslak} onChange={(e)=>set({maslak:e.target.value})}>
            {MASLAK.map(m => <option key={m}>{m}</option>)}
          </select>
        </Field>

        <Field label="Namaz">
          <div className="grid grid-cols-2 gap-2.5">
            {namaz.map(o => (
              <IconCard key={o.v}
                icon={<Ic.masjid style={{ width: 22, height: 22 }} />}
                title={o.t} sub={o.s}
                sel={d.namaz === o.v} onClick={()=>set({namaz:o.v})}/>
            ))}
          </div>
        </Field>

        <Field label="Quran">
          <div className="grid grid-cols-2 gap-2.5">
            {quran.map(o => (
              <IconCard key={o.v}
                icon={<Ic.book style={{ width: 22, height: 22 }} />}
                title={o.t} sub={o.s}
                sel={d.quran === o.v} onClick={()=>set({quran:o.v})}/>
            ))}
          </div>
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

        <Field label="Partner Deen Preference">
          <select className="gi" value={d.partnerDeen} onChange={(e)=>set({partnerDeen:e.target.value})}>
            <option value="">— Select —</option>
            {PARTNER_DEEN.map(p => <option key={p}>{p}</option>)}
          </select>
        </Field>
      </div>
    </div>
  );
}

function Step3({ d, set }) {
  const types = ["Govt","Private","Business","Freelance"];
  return (
    <div className="step-enter">
      <div className="glass-gold p-5">
        <Field label="Degree">
          <select className="gi" value={d.degree} onChange={(e)=>set({degree:e.target.value})}>
            <option value="">— Select —</option>
            {DEGREE.map(x => <option key={x}>{x}</option>)}
          </select>
        </Field>

        <Field label="Institution" optional>
          <input className="gi" placeholder="University name" value={d.institution} onChange={(e)=>set({institution:e.target.value})}/>
        </Field>

        <Field label="Profession">
          <input className="gi" placeholder="e.g. Software Engineer" value={d.profession} onChange={(e)=>set({profession:e.target.value})}/>
        </Field>

        <Field label="Employment Type">
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

function Step4({ d, set }) {
  const fam = [
    { v: "conservative", t: "Conservative", s: "Traditional values" },
    { v: "moderate",     t: "Moderate",     s: "Balanced approach" },
    { v: "liberal",      t: "Liberal",      s: "Modern, open" },
  ];
  return (
    <div className="step-enter">
      <div className="glass-gold p-5">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Father status">
            <select className="gi" value={d.fatherStatus} onChange={(e)=>set({fatherStatus:e.target.value})}>
              <option value="">—</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Mother status">
            <select className="gi" value={d.motherStatus} onChange={(e)=>set({motherStatus:e.target.value})}>
              <option value="">—</option>
              {STATUS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Father's profession" optional>
          <input className="gi" placeholder="e.g. Retired Banker" value={d.fatherProf} onChange={(e)=>set({fatherProf:e.target.value})}/>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Brothers">
            <Stepper value={d.brothers} max={20} onChange={(v)=>set({brothers:v})}/>
          </Field>
          <Field label="Sisters">
            <Stepper value={d.sisters} max={20} onChange={(v)=>set({sisters:v})}/>
          </Field>
        </div>

        <Field label="Family Type">
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

        <Field label="Residence">
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
              onClick={()=>set({biradariSkip:!d.biradariSkip, biradari: ""})}
              className={"trust whitespace-nowrap " + (d.biradariSkip ? "" : "")}
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
      </div>
    </div>
  );
}

function Step5({ d, set }) {
  const toggleTrait = (t) => {
    const has = d.traits.includes(t);
    if (has) set({ traits: d.traits.filter(x => x !== t) });
    else if (d.traits.length < 3) set({ traits: [...d.traits, t] });
  };
  return (
    <div className="step-enter">
      <div className="glass-gold p-5">
        <Field label={`Personality traits (up to 3 · ${d.traits.length}/3)`}>
          <div className="flex flex-wrap gap-2">
            {TRAITS.map(t => (
              <Tag key={t} label={t} sel={d.traits.includes(t)} onClick={()=>toggleTrait(t)} />
            ))}
          </div>
        </Field>

        <Field label={`Partner age range: ${d.partnerAge[0]} – ${d.partnerAge[1]} years`}>
          <RangeDual min={18} max={55} value={d.partnerAge} onChange={(v)=>set({partnerAge:v})}/>
        </Field>

        <Field label="Location Preference">
          <div className="flex gap-2">
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

function FormScreen({ data, setData, onBack, onSubmit }) {
  const [step, setStep] = React.useState(0);
  const [shake, setShake] = React.useState(false);
  const total = STEPS.length;
  const set = (patch) => setData({ ...data, ...patch });

  const valid = () => {
    if (step === 0) return data.name && data.gender && data.height && data.city && data.age;
    if (step === 1) return data.maslak && data.maslak !== "— Select —" && data.namaz && data.quran;
    if (step === 2) return data.degree && data.profession && data.employment;
    if (step === 3) return data.fatherStatus && data.motherStatus && data.famType && data.residence;
    if (step === 4) return data.traits.length > 0 && data.locPref;
    return true;
  };

  const next = () => {
    if (!valid()) {
      setShake(true);
      setTimeout(()=>setShake(false), 500);
      return;
    }
    if (step < total - 1) setStep(step + 1);
    else onSubmit();
  };
  const back = () => {
    if (step === 0) onBack();
    else setStep(step - 1);
  };

  return (
    <div className="relative flex-1 flex flex-col" style={{ minHeight: "calc(100dvh - 70px)" }}>
      {/* Back row */}
      <div className="px-5 flex items-center gap-3 pt-1">
        <button onClick={back} className="iconbtn" aria-label="Back">
          <Ic.back style={{ width: 18, height: 18 }} />
        </button>
        <div className="text-[12px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
          Bio Builder
        </div>
      </div>

      <StepIndicator step={step} total={total} />

      <div className={"px-5 pb-32 flex-1 " + (shake ? "shake-anim" : "")}>
        {step === 0 && <Step1 d={data} set={set}/>}
        {step === 1 && <Step2 d={data} set={set}/>}
        {step === 2 && <Step3 d={data} set={set}/>}
        {step === 3 && <Step4 d={data} set={set}/>}
        {step === 4 && <Step5 d={data} set={set}/>}
      </div>

      {/* Sticky next bar */}
      <div className="absolute left-0 right-0 bottom-0 px-5 pt-3 pb-6"
           style={{
             background: "linear-gradient(180deg, transparent, rgba(10,15,30,0.85) 30%, rgba(10,15,30,0.97))",
             paddingBottom: "max(24px, env(safe-area-inset-bottom))",
           }}>
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
