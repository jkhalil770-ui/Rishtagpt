function HeroScreen({ onStart }) {
  return (
    <div className="relative flex-1 flex flex-col px-6 pt-2 pb-10" style={{ minHeight: "calc(100dvh - 70px)" }}>
      <HeroCrescent />

      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 pt-6">
        {/* Logo mark above wordmark */}
        <div className="anim-in mb-5 relative">
          <div
            className="w-[78px] h-[78px] rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(180deg, rgba(201,168,76,0.18), rgba(201,168,76,0.04))",
              border: "1px solid rgba(201,168,76,0.4)",
              boxShadow: "0 0 60px -10px rgba(201,168,76,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <Ic.crescent style={{ width: 38, height: 38, color: "var(--gold-2)" }} />
          </div>
          <div className="absolute -inset-3 rounded-3xl pointer-events-none"
               style={{ background: "radial-gradient(closest-side, rgba(201,168,76,0.25), transparent 70%)", filter: "blur(10px)" }}/>
        </div>

        <h1 className="anim-in font-display gold-text text-[54px] leading-[1.0] tracking-tight font-semibold">
          RishtaGPT
        </h1>

        <div className="anim-in-delay font-display italic text-[15px] mt-3" style={{ color: "var(--rose)" }}>
          AI se likhein apni kahani
        </div>

        <p className="anim-in-d2 mt-2 text-[15px] max-w-[300px]" style={{ color: "var(--ink-soft)" }}>
          Generate your perfect Rishta Bio in seconds — Urdu, Roman Urdu, or English.
        </p>

        <button
          onClick={onStart}
          className="anim-in-d3 gold-btn pulse-anim mt-9 rounded-2xl px-8 py-4 text-[17px] flex items-center gap-2"
        >
          Shuru Karein
          <Ic.arrow style={{ width: 18, height: 18 }} />
        </button>

        {/* Sub-trust */}
        <div className="anim-in-d4 mt-9 flex items-center gap-2 flex-wrap justify-center">
          <Trust icon={<Ic.sparkle style={{ width: 12, height: 12 }} />} label="Free" />
          <Trust icon={<Ic.globe   style={{ width: 12, height: 12 }} />} label="3 Languages" />
          <Trust icon={<Ic.whatsapp style={{ width: 12, height: 12 }} />} label="WhatsApp Ready" />
        </div>

        {/* Decorative dotted divider */}
        <div className="mt-10 flex items-center gap-2 opacity-60">
          <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--gold)" }} />
          <span style={{ width: 2, height: 2, borderRadius: 999, background: "var(--gold)" }} />
          <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--gold-2)" }} />
          <span style={{ width: 2, height: 2, borderRadius: 999, background: "var(--gold)" }} />
          <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--gold)" }} />
        </div>

        <div className="mt-3 font-display italic text-[12px]" style={{ color: "var(--ink-dim)" }}>
          Made for Pakistani &amp; Indian Muslim families
        </div>
      </div>
    </div>
  );
}

window.HeroScreen = HeroScreen;
