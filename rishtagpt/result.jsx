/* Output / Result screen — Gemini-powered, multi-style, HD PDF, save bio */

const { useState, useEffect, useRef } = React;

function Corner({ position }) {
  const styles = {
    tl: { top: 10, left: 10, transform: "none" },
    tr: { top: 10, right: 10, transform: "scaleX(-1)" },
    bl: { bottom: 10, left: 10, transform: "scaleY(-1)" },
    br: { bottom: 10, right: 10, transform: "scale(-1,-1)" },
  };
  return (
    <svg className="corner" style={styles[position]} viewBox="0 0 32 32" fill="none">
      <path d="M2 2 L 12 2 M 2 2 L 2 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M2 6 Q 6 6 6 2" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M2 16 Q 8 16 8 10 Q 8 4 14 4" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.7"/>
      <circle cx="6" cy="6" r="1.2" fill="currentColor" opacity="0.8"/>
      <path d="M14 2 q 0 4 -4 4 M2 14 q 4 0 4 -4" stroke="currentColor" strokeWidth="0.6" opacity="0.5"/>
    </svg>
  );
}

function ConfettiBurst({ trigger }) {
  if (!trigger) return null;
  const N = 26;
  const items = Array.from({ length: N }, (_, i) => {
    const x = (Math.random() - 0.5) * 320;
    const dx = (Math.random() - 0.5) * 120;
    const delay = Math.random() * 0.4;
    const colors = ["#E6C56A", "#C9A84C", "#f1d98a", "#E8B4A0"];
    const c = colors[i % colors.length];
    const w = 4 + Math.random() * 6;
    const h = 8 + Math.random() * 10;
    return (
      <span key={i}
        className="confetti"
        style={{
          background: c,
          width: w, height: h,
          left: "50%",
          "--x": `${x}px`,
          "--dx": `${dx}px`,
          animationDelay: `${delay}s`,
          borderRadius: i % 3 === 0 ? "50%" : "2px",
        }}
      />
    );
  });
  return <div className="absolute inset-x-0 top-10 pointer-events-none" style={{ zIndex: 40 }}>{items}</div>;
}

function StyleSelector({ value, onChange, locked, onPremium }) {
  return (
    <div className="px-5 pt-4">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="text-[11px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>Bio Style</div>
        <div className="text-[10px] flex items-center gap-1" style={{ color: "var(--ink-dim)" }}>
          <Ic.lock style={{ width: 10, height: 10 }}/> 4 locked
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto hide-scroll pb-1 -mx-1 px-1">
        {RG_STYLES.map((s, i) => {
          const isLocked = i > 0 && locked;
          const sel = value === s.id;
          return (
            <button
              key={s.id}
              onClick={() => isLocked ? onPremium() : onChange(s.id)}
              className="shrink-0 rounded-2xl px-3.5 py-2.5 text-left transition-all relative"
              style={{
                minWidth: 140,
                background: sel
                  ? "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.06))"
                  : "rgba(255,255,255,0.04)",
                border: sel ? "1px solid rgba(201,168,76,0.55)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: sel ? "0 0 0 1px rgba(201,168,76,0.25), 0 8px 24px -10px rgba(201,168,76,0.35)" : "none",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="apple-emoji"
                      style={{
                        fontSize: 20, lineHeight: 1,
                        filter: isLocked ? "grayscale(0.7) opacity(0.55)" : "none",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 24, height: 24,
                      }}>
                  {s.emoji}
                </span>
                <div className="text-[13px] font-semibold flex-1" style={{ color: sel ? "var(--gold-2)" : "var(--ink)" }}>
                  {s.label}
                </div>
                {isLocked && <Ic.lock style={{ width: 11, height: 11, color: "var(--gold-3)" }}/>}
              </div>
              <div className="text-[10.5px] mt-1 leading-snug" style={{ color: "var(--ink-soft)" }}>
                {s.sub}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LoadingBurst({ lang }) {
  const messages = {
    urdu:  ["لکھی جا رہی ہے", "آپ کی بائیو تیار ہو رہی ہے"],
    roman: ["Likhi ja rahi hai", "Aapki bio tayyar ho rahi hai"],
    en:    ["Writing your bio", "Crafting something special"],
  };
  const m = messages[lang] || messages.roman;

  return (
    <div className="pload-wrap flex flex-col items-center justify-center py-6" style={{ minHeight: 320 }}>
      {/* Sleek Scanning Stage */}
      <div className="pload-stage flex items-center justify-center relative" style={{ width: 180, height: 180, marginBottom: 20 }}>
        {/* Pulsing Concentric Radar Rings */}
        <div className="absolute inset-0 rounded-full border border-[rgba(201,168,76,0.22)] animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute inset-4 rounded-full border border-[rgba(201,168,76,0.14)] animate-pulse" style={{ animationDuration: "2s" }} />
        <div className="absolute inset-8 rounded-full border border-dashed border-[rgba(201,168,76,0.08)]" style={{ animation: "spin-slow 30s linear infinite" }} />
        
        {/* Holographic Glowing Center Orb */}
        <div
          className="absolute inset-11 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(232,180,160,0.06) 100%)",
            border: "1.5px solid rgba(201,168,76,0.45)",
            boxShadow: "0 0 40px -8px rgba(201,168,76,0.45)",
            animation: "float-bob 5s ease-in-out infinite"
          }}
        >
          {/* Logo with transparent bg via LogoSmall */}
          <LogoSmall size={52}/>

          {/* Holographic vertical laser scanner line */}
          <div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E6C56A] to-transparent z-10"
            style={{
              boxShadow: "0 0 8px #E6C56A",
              animation: "scanner-sweep 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite"
            }}
          />
        </div>
      </div>

      {/* Styles for scanner sweep in style tag */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanner-sweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />

      <div className="flex items-center gap-1.5 mt-2">
        <div className="pload-title text-[17px] font-semibold">{m[0]}</div>
        <div className="pload-dots" aria-hidden="true">
          <span/><span/><span/>
        </div>
      </div>
      <div className="pload-sub text-[12px] opacity-75 mt-1">{m[1]}</div>
      <div className="pload-bar mt-4" />
    </div>
  );
}

function ResultScreen({ data, onBack, onPremium, onViewSaved, premium, user, onRequireLogin }) {
  const [lang, setLang] = useState("urdu");
  const [style, setStyle] = useState("traditional");
  const [cache, setCache] = useState({});           // key = `${style}|${lang}` -> { text, ts }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const abortRef = useRef(null);

  const cacheKey = `${style}|${lang}`;
  const bio = cache[cacheKey]?.text || "";

  // Auth listener for auto-triggering pending actions on login success
  useEffect(() => {
    const handleAuthTrigger = (e) => {
      const { action } = e.detail;
      if (action === "pdf") pdf();
      else if (action === "wa") wa();
      else if (action === "save") saveBio();
    };
    window.addEventListener("rg-auth-trigger", handleAuthTrigger);
    return () => window.removeEventListener("rg-auth-trigger", handleAuthTrigger);
  }, [bio, pdfBusy, loading, user]);

  // Generate (or skip if cached) whenever style/lang changes
  useEffect(() => {
    if (cache[cacheKey]) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    (async () => {
      try {
        const text = await RG_Gemini.generateBio({
          data, style, lang, signal: ac.signal
        });
        if (cancelled) return;
        setCache(prev => ({ ...prev, [cacheKey]: { text, ts: Date.now() }}));
        setLoading(false);
        // Confetti burst every time a new bio arrives — rewarding moment
        setConfetti(true);
        setTimeout(()=>setConfetti(false), 2400);
      } catch (e) {
        if (cancelled || e.name === "AbortError") return;
        console.error(e);
        setError(e.message || "Bio generate karne mein masla hua. Dobara try karein.");
        setLoading(false);
      }
    })();

    return () => { cancelled = true; ac.abort(); };
  }, [cacheKey]);

  const regen = () => {
    setCache(prev => {
      const c = { ...prev };
      delete c[cacheKey];
      return c;
    });
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(bio); } catch (e) {}
    setCopied(true);
    setTimeout(()=>setCopied(false), 1800);
  };

  const wa = () => {
    if (!bio) return;
    if (!user) {
      onRequireLogin("wa");
      return;
    }
    const url = "https://wa.me/?text=" + encodeURIComponent(bio);
    window.open(url, "_blank");
  };

  const saveBio = () => {
    if (!bio) return;
    if (!user) {
      onRequireLogin("save");
      return;
    }
    RG_Store.saveBio({
      id: `bio_${Date.now()}`,
      createdAt: Date.now(),
      lang, style,
      text: bio,
      formSnapshot: { name: data.name, age: data.age, city: data.city, gender: data.gender, profession: data.profession },
      photo: data.photo || null,
    });
    setSaved(true);
    setTimeout(()=>setSaved(false), 2200);
  };

  const pdf = async () => {
    if (!bio || pdfBusy) return;
    if (!user) {
      onRequireLogin("pdf");
      return;
    }
    setPdfBusy(true);
    try {
      await RG_PDF.exportBioPDF({ bio, lang, data, style, photo: data.photo });
    } catch (e) {
      console.error(e);
      alert("PDF banane mein masla hua: " + e.message);
    } finally {
      setPdfBusy(false);
    }
  };

  const onStyleChange = (id) => setStyle(id);

  const cc = bio.length;

  return (
    <div className="screen-col">
      <ConfettiBurst trigger={confetti}/>

      <div className="px-5 flex items-center gap-3 pt-1 shrink-0">
        <button onClick={onBack} className="iconbtn" aria-label="Back">
          <Ic.back style={{ width: 18, height: 18 }} />
        </button>
        <div className="text-[12px] uppercase tracking-widest flex-1" style={{ color: "var(--ink-soft)" }}>
          Generated Bio
        </div>
        <button onClick={onViewSaved} className="iconbtn" aria-label="Saved">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h12v17l-6-4-6 4V4z"/>
          </svg>
        </button>
      </div>

      <div className="scroll-region screen-anim">
        <div className="px-5 pt-3">
          <h2 className="font-display text-[28px] leading-tight">
            <span className="shimmer-text">Aapki Bio Tayyar Hai!</span>
            <Ic.sparkle style={{ width: 22, height: 22, color: "var(--gold-2)", display: "inline", marginLeft: 6, marginBottom: -2 }} />
          </h2>
          <div className="text-[13px] mt-1" style={{ color: "var(--ink-soft)" }}>
            AI-generated with Gemini · Choose style, language, and share.
          </div>
        </div>

        <StyleSelector value={style} onChange={onStyleChange} locked={!premium} onPremium={onPremium}/>

        <div className="px-5 pt-3">
          <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl"
               style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {RG_LANGS.map(o => (
              <button key={o.id}
                onClick={()=>setLang(o.id)}
                className="py-2.5 rounded-xl text-[13px] font-medium transition-all"
                style={
                  lang === o.id
                    ? { background: "linear-gradient(135deg,#E6C56A,#C9A84C)", color: "#1a1304", boxShadow: "0 4px 14px -2px rgba(201,168,76,0.4)" }
                    : { background: "transparent", color: "var(--ink-soft)" }
                }>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 pt-5">
          <div className={"paper p-7 pt-8 pb-7 relative " + (loading ? "loading" : "")}>
            <Corner position="tl"/>
            <Corner position="tr"/>
            <Corner position="bl"/>
            <Corner position="br"/>

            {loading && !error ? (
              <LoadingBurst lang={lang} />
            ) : error ? (
              <div className="py-10 flex flex-col items-center justify-center text-center px-3">
                <div className="text-[14px] font-semibold text-[#7a2a2a]">Ek masla hua</div>
                <div className="mt-1.5 text-[12px] text-[#8a4a4a]">{error}</div>
                <button onClick={regen} className="mt-4 px-4 py-2 rounded-xl text-[13px] font-medium"
                        style={{ background: "linear-gradient(135deg,#E6C56A,#C9A84C)", color: "#1a1304" }}>
                  Try again
                </button>
              </div>
            ) : (
              <div
                className={lang === "urdu" ? "font-urdu text-[18px] leading-[2.1]" : "font-display text-[15px] leading-[1.7]"}
                style={{
                  direction: lang === "urdu" ? "rtl" : "ltr",
                  textAlign: lang === "urdu" ? "right" : "left",
                  whiteSpace: "pre-wrap",
                  color: "#2b2412",
                }}
              >
                {bio}
              </div>
            )}

            {!loading && !error && bio && (
              <div className="mt-5 pt-4 border-t border-[rgba(201,168,76,0.25)] flex items-center justify-between text-[11px]" style={{ color: "#7a6b3d" }}>
                <span>{cc} characters · {RG_STYLES.find(s=>s.id===style)?.label}</span>
                <span className="font-display italic">— RishtaGPT</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pt-5 flex flex-col gap-2.5">
          <button
            onClick={copy}
            disabled={loading || !bio}
            className="rounded-2xl py-3.5 px-5 flex items-center justify-center gap-2 text-[15px] font-medium glass transition-all"
            style={{
              color: copied ? "#7df0a6" : "var(--ink)",
              borderColor: copied ? "rgba(125,240,166,0.4)" : "rgba(255,255,255,0.08)",
              background: copied ? "rgba(125,240,166,0.08)" : undefined,
            }}>
            {copied ? <Ic.check style={{ width: 16, height: 16 }} /> : <Ic.copy style={{ width: 16, height: 16 }} />}
            {copied ? "Copied!" : "Copy Karein"}
          </button>

          <button
            onClick={wa}
            disabled={loading || !bio}
            className="rounded-2xl py-3.5 px-5 flex items-center justify-center gap-2 text-[15px] font-semibold"
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              color: "white",
              boxShadow: "0 12px 36px -10px rgba(37,211,102,0.5)",
            }}>
            <Ic.whatsapp style={{ width: 16, height: 16 }} />
            WhatsApp pe Share Karein
          </button>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={regen}
              disabled={loading || !bio}
              className="rounded-2xl py-3 flex flex-col items-center justify-center gap-1 text-[12px] font-medium"
              style={{
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.4)",
                color: "var(--gold-2)",
              }}>
              <Ic.refresh style={{ width: 16, height: 16 }} />
              Dobara
            </button>
            <button
              onClick={saveBio}
              disabled={loading || !bio}
              className="rounded-2xl py-3 flex flex-col items-center justify-center gap-1 text-[12px] font-medium"
              style={{
                background: saved ? "rgba(125,240,166,0.08)" : "transparent",
                border: "1px solid " + (saved ? "rgba(125,240,166,0.5)" : "rgba(255,255,255,0.12)"),
                color: saved ? "#7df0a6" : "var(--ink)",
              }}>
              {saved ? <Ic.check style={{ width: 16, height: 16 }} /> : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 4h12v17l-6-4-6 4V4z"/>
                </svg>
              )}
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={pdf}
              disabled={loading || !bio || pdfBusy}
              className="gold-btn rounded-2xl py-3 flex flex-col items-center justify-center gap-1 text-[12px]">
              {pdfBusy ? (
                <svg viewBox="0 0 50 50" width="16" height="16" style={{ animation: "spin-slow 1s linear infinite" }}>
                  <circle cx="25" cy="25" r="20" stroke="#1a1304" strokeOpacity="0.3" strokeWidth="5" fill="none"/>
                  <circle cx="25" cy="25" r="20" stroke="#1a1304" strokeWidth="5" fill="none"
                          strokeLinecap="round" strokeDasharray="40 80"/>
                </svg>
              ) : <Ic.download style={{ width: 16, height: 16 }} />}
              PDF HD
            </button>
          </div>
        </div>

        {!premium && (
          <div className="px-5 pt-6">
            <div className="premiumcard p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                   style={{ background: "linear-gradient(135deg,#E6C56A,#C9A84C)", color: "#1a1304" }}>
                <Ic.crown style={{ width: 22, height: 22 }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold">Unlock all 5 styles + branded PDF</div>
                <div className="text-[12px]" style={{ color: "var(--ink-soft)" }}>
                  Modern · Poetic · Professional · Detailed
                </div>
              </div>
              <button onClick={onPremium} className="text-[12px] uppercase tracking-widest font-semibold" style={{ color: "var(--gold-2)" }}>
                Upgrade
              </button>
            </div>
          </div>
        )}

        <div className="px-5 pt-7 pb-8 text-center">
          <div className="text-[11px] flex items-center justify-center gap-1.5" style={{ color: "var(--ink-soft)" }}>
            Made with <Ic.heart style={{ width: 11, height: 11, color: "var(--rose)" }} /> for Pakistani &amp; Indian families
          </div>
          <div className="text-[10px] mt-1 flex items-center justify-center gap-1" style={{ color: "var(--ink-dim)" }}>
            <Ic.lock style={{ width: 10, height: 10 }} />
            Aapka data save nahi hota · Bios sirf aapke device par store hoti hain
          </div>
        </div>
      </div>
    </div>
  );
}

window.ResultScreen = ResultScreen;
