/* Output / Result screen */

function buildBio(d, lang) {
  const name = d.name || "—";
  const age = d.age || "—";
  const city = d.city || "—";
  const height = d.height || "—";
  const prof = d.profession || "—";
  const degree = d.degree || "—";
  const traits = (d.traits||[]).join(", ");
  const fam = d.famType === "conservative" ? "Conservative" :
              d.famType === "moderate" ? "Moderate" :
              d.famType === "liberal" ? "Liberal" : "—";
  const partner = `${d.partnerAge?.[0] ?? 22}–${d.partnerAge?.[1] ?? 30} years, ${d.locPref || "Same country"}`;

  if (lang === "en") {
    return [
      `Assalam-u-Alaikum,`,
      ``,
      `My name is ${name}, ${age} years old, from ${city}. I stand ${height} tall.`,
      ``,
      `I hold a degree in ${degree} and currently work as a ${prof}. I belong to a ${fam.toLowerCase()} family, with ${d.brothers||0} brother(s) and ${d.sisters||0} sister(s).`,
      ``,
      `Alhamdulillah, I try to be ${traits || "responsible and caring"} in my everyday life, and aim to be a partner in faith and life.`,
      ``,
      `I am looking for a life partner aged ${partner}.${d.note ? " " + d.note : ""}`,
      ``,
      `JazakAllah Khair.`,
    ].join("\n");
  }
  if (lang === "roman") {
    return [
      `Assalam-u-Alaikum,`,
      ``,
      `Mera naam ${name} hai, umar ${age} saal, ${city} se. Qad ${height}.`,
      ``,
      `Maine ${degree} mukammal ki hai aur abhi ${prof} ke taur par kaam karta/karti hoon. Mera taluq aik ${fam.toLowerCase()} gharaane se hai — ${d.brothers||0} bhai aur ${d.sisters||0} behen.`,
      ``,
      `Alhamdulillah, main koshish karta/karti hoon ke ${traits || "zimmedaar aur khayal rakhne wala/wali"} insaan banoon.`,
      ``,
      `Apne liye aisa life partner chahta/chahti hoon jo ${partner} ho.${d.note ? " " + d.note : ""}`,
      ``,
      `JazakAllah Khair.`,
    ].join("\n");
  }
  // Urdu
  return [
    `السلام علیکم،`,
    ``,
    `میرا نام ${name} ہے، عمر ${age} سال، ${city} سے۔ قد ${height}۔`,
    ``,
    `میں نے ${degree} مکمل کی ہے اور اس وقت ${prof} کے طور پر خدمت سرانجام دے رہا/رہی ہوں۔ میرا تعلق ایک ${fam} گھرانے سے ہے — ${d.brothers||0} بھائی اور ${d.sisters||0} بہنیں۔`,
    ``,
    `الحمد للہ، میں ${traits || "ذمہ دار اور خیال رکھنے والا/والی"} انسان بننے کی کوشش کرتا/کرتی ہوں۔`,
    ``,
    `اپنے لیے ایسا شریکِ حیات تلاش کر رہا/رہی ہوں جو ${partner} ہو۔${d.note ? " " + d.note : ""}`,
    ``,
    `جزاک اللہ خیر۔`,
  ].join("\n");
}

function Corner({ position }) {
  /* SVG arabesque corner */
  const transforms = {
    tl: "translate(0,0) rotate(0)",
    tr: "translate(100%,0) rotate(90) scale(-1,1) translate(-100%,0)",
    bl: "translate(0,100%) scale(1,-1) translate(0,-100%)",
    br: "translate(100%,100%) rotate(180)",
  };
  return (
    <svg className="corner" style={{ [position[0]==="t"?"top":"bottom"]: 10, [position[1]==="l"?"left":"right"]: 10,
       transform: position === "tr" ? "scaleX(-1)" :
                  position === "bl" ? "scaleY(-1)" :
                  position === "br" ? "scale(-1,-1)" : "none"
    }} viewBox="0 0 32 32" fill="none">
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

function ResultScreen({ data, onBack, onPremium, onRegen }) {
  const [lang, setLang] = React.useState("urdu");
  const [loading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [confetti, setConfetti] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setConfetti(false);
    const t = setTimeout(() => {
      setLoading(false);
      setConfetti(true);
      setTimeout(()=>setConfetti(false), 2400);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const bio = buildBio(data, lang);
  const cc  = bio.length;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bio);
    } catch (e) {}
    setCopied(true);
    setTimeout(()=>setCopied(false), 1800);
  };

  const wa = () => {
    const url = "https://wa.me/?text=" + encodeURIComponent(bio);
    window.open(url, "_blank");
  };

  return (
    <div className="relative flex-1 flex flex-col pb-10" style={{ minHeight: "calc(100dvh - 70px)" }}>
      <ConfettiBurst trigger={confetti}/>

      <div className="px-5 flex items-center gap-3 pt-1">
        <button onClick={onBack} className="iconbtn" aria-label="Back">
          <Ic.back style={{ width: 18, height: 18 }} />
        </button>
        <div className="text-[12px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>
          Generated Bio
        </div>
      </div>

      <div className="px-5 pt-3">
        <h2 className="font-display text-[28px] leading-tight">
          <span className="shimmer-text">Aapki Bio Tayyar Hai!</span>
          <Ic.sparkle style={{ width: 22, height: 22, color: "var(--gold-2)", display: "inline", marginLeft: 6, marginBottom: -2 }} />
        </h2>
        <div className="text-[13px] mt-1" style={{ color: "var(--ink-soft)" }}>
          Choose your language and share when ready.
        </div>
      </div>

      {/* Language toggle */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl"
             style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            {v:"urdu",  l:"Urdu Script"},
            {v:"roman", l:"Roman Urdu"},
            {v:"en",    l:"English"},
          ].map(o => (
            <button key={o.v}
              onClick={()=>setLang(o.v)}
              className={"py-2.5 rounded-xl text-[13px] font-medium transition-all"}
              style={
                lang === o.v
                  ? { background: "linear-gradient(135deg,#E6C56A,#C9A84C)", color: "#1a1304", boxShadow: "0 4px 14px -2px rgba(201,168,76,0.4)" }
                  : { background: "transparent", color: "var(--ink-soft)" }
              }>
              {o.l}
            </button>
          ))}
        </div>
      </div>

      {/* Bio paper */}
      <div className="px-5 pt-5">
        <div className={"paper p-7 pt-8 pb-7 relative " + (loading ? "loading" : "")}>
          <Corner position="tl"/>
          <Corner position="tr"/>
          <Corner position="bl"/>
          <Corner position="br"/>

          {loading ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <div className="font-display italic text-[#7a6b3d] text-[15px]">Likhi ja rahi hai…</div>
              <div className="mt-2 text-[12px] text-[#8a7c4d]">AI aapki bio tayyar kar rahi hai</div>
            </div>
          ) : (
            <div
              className={lang === "urdu" ? "font-urdu text-[18px] leading-[2.1]" : "font-display text-[15px] leading-[1.7]"}
              style={{
                direction: lang === "urdu" ? "rtl" : "ltr",
                whiteSpace: "pre-wrap",
                color: "#2b2412",
              }}
            >
              {bio}
            </div>
          )}

          {!loading && (
            <div className="mt-5 pt-4 border-t border-[rgba(201,168,76,0.25)] flex items-center justify-between text-[11px]" style={{ color: "#7a6b3d" }}>
              <span>{cc} characters</span>
              <span className="font-display italic">— RishtaGPT</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pt-5 flex flex-col gap-2.5">
        <button
          onClick={copy}
          disabled={loading}
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
          disabled={loading}
          className="rounded-2xl py-3.5 px-5 flex items-center justify-center gap-2 text-[15px] font-semibold"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            color: "white",
            boxShadow: "0 12px 36px -10px rgba(37,211,102,0.5)",
          }}>
          <Ic.whatsapp style={{ width: 16, height: 16 }} />
          WhatsApp pe Share Karein
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onRegen}
            disabled={loading}
            className="rounded-2xl py-3.5 flex items-center justify-center gap-2 text-[14px] font-medium"
            style={{
              background: "transparent",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "var(--gold-2)",
            }}>
            <Ic.refresh style={{ width: 15, height: 15 }} />
            Dobara
          </button>
          <button
            onClick={onPremium}
            disabled={loading}
            className="gold-btn rounded-2xl py-3.5 flex items-center justify-center gap-2 text-[14px]">
            <Ic.download style={{ width: 15, height: 15 }} />
            PDF
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ml-1"
                  style={{ background: "rgba(26,19,4,0.25)", color: "#1a1304" }}>
              Pro
            </span>
          </button>
        </div>
      </div>

      {/* Upsell */}
      <div className="px-5 pt-6">
        <div className="premiumcard p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
               style={{ background: "linear-gradient(135deg,#E6C56A,#C9A84C)", color: "#1a1304" }}>
            <Ic.crown style={{ width: 22, height: 22 }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold">Aur behtareen bio chahiye?</div>
            <div className="text-[12px]" style={{ color: "var(--ink-soft)" }}>
              Unlock 5 styles, PDF export, biodata card.
            </div>
          </div>
          <button onClick={onPremium} className="text-[12px] uppercase tracking-widest font-semibold" style={{ color: "var(--gold-2)" }}>
            Upgrade
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pt-7 pb-2 text-center">
        <div className="text-[11px] flex items-center justify-center gap-1.5" style={{ color: "var(--ink-soft)" }}>
          Made with <Ic.heart style={{ width: 11, height: 11, color: "var(--rose)" }} /> for Pakistani &amp; Indian families
        </div>
        <div className="text-[10px] mt-1 flex items-center justify-center gap-1" style={{ color: "var(--ink-dim)" }}>
          <Ic.lock style={{ width: 10, height: 10 }} />
          Aapka data save nahi hota
        </div>
      </div>
    </div>
  );
}

window.ResultScreen = ResultScreen;
