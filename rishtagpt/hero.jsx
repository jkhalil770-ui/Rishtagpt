function HeroScreen({ onStart, onViewSaved, savedCount }) {
  return (
    <div className="screen-col">
      <div className="scroll-region relative">
        <HeroCrescent />

        <div className="flex flex-col items-center text-center relative z-10 pt-6 pb-10 px-6"
             style={{ minHeight: "calc(100% - 0px)" }}>
          {/* Logo medallion */}
          <div className="anim-in mb-4 relative">
            <LogoMark size={140}/>
            <div className="absolute -inset-6 rounded-full pointer-events-none"
                 style={{ background: "radial-gradient(closest-side, rgba(201,168,76,0.22), transparent 70%)", filter: "blur(14px)" }}/>
          </div>

          {/* Wordmark */}
          <h1 className="anim-in font-display gold-text text-[52px] leading-[1.0] tracking-tight font-semibold">
            RishtaGPT
          </h1>

          {/* Premium tagline */}
          <div className="anim-in-delay mt-4 flex items-center gap-3 max-w-full px-2">
            <span className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.7))" }}/>
            <span className="inline-block" style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "linear-gradient(135deg,#fff5cf,#C9A84C)",
              boxShadow: "0 0 8px rgba(230,197,106,0.6)",
            }}/>
            <div
              className="italic"
              style={{
                fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                fontSize: 17,
                fontWeight: 500,
                fontStyle: "italic",
                letterSpacing: "2px",
                color: "#C9A84C",
                textShadow: "0 0 18px rgba(201,168,76,0.35)",
                whiteSpace: "nowrap",
              }}
            >
              AI se likhein apni kahani
            </div>
            <span className="inline-block" style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "linear-gradient(135deg,#fff5cf,#C9A84C)",
              boxShadow: "0 0 8px rgba(230,197,106,0.6)",
            }}/>
            <span className="h-px w-10" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.7), transparent)" }}/>
          </div>

          <div
            className="anim-in-d2 mt-3 text-[10.5px] font-medium uppercase"
            style={{
              letterSpacing: "0.32em",
              color: "var(--ink-soft)",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            GENERATE · PERFECT · RISHTA BIO
          </div>

          <p className="anim-in-d2 mt-5 text-[14px] max-w-[300px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Powered by AI. Urdu, Roman Urdu, or English — in seconds, beautifully formatted.
          </p>

          <button
            onClick={onStart}
            className="anim-in-d3 gold-btn pulse-anim mt-7 px-10 py-[18px] text-[18px] flex items-center gap-2.5"
            style={{ borderRadius: 50, fontWeight: 700, letterSpacing: "0.01em" }}
          >
            Shuru Karein
            <Ic.arrow style={{ width: 20, height: 20 }} />
          </button>

          {/* Trust pill row — 3 badges, 8px gap, centered */}
          <div
            className="anim-in-d3 mt-5 flex items-center justify-center flex-wrap"
            style={{ gap: 8 }}
          >
            <Trust label="Free" />
            <Trust label="3 Languages" />
            <Trust label="WhatsApp Ready" />
          </div>

          {savedCount > 0 && (
            <button
              onClick={onViewSaved}
              className="anim-in-d3 mt-4 text-[13px] flex items-center gap-1.5"
              style={{ color: "var(--gold-2)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4h12v17l-6-4-6 4V4z"/>
              </svg>
              View {savedCount} saved {savedCount === 1 ? "bio" : "bios"}
            </button>
          )}

          <div className="anim-in-d4 mt-7 flex items-center gap-2 flex-wrap justify-center">
            <Trust label="AI-Powered" />
            <Trust label="HD PDF Ready" />
          </div>

          <div className="mt-8 flex items-center gap-2 opacity-60">
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--gold)" }} />
            <span style={{ width: 2, height: 2, borderRadius: 999, background: "var(--gold)" }} />
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--gold-2)" }} />
            <span style={{ width: 2, height: 2, borderRadius: 999, background: "var(--gold)" }} />
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--gold)" }} />
          </div>

          <div className="mt-3 font-display italic text-[12px]" style={{ color: "var(--ink-dim)" }}>
            Crafted for Pakistani &amp; Indian Muslim families
          </div>
        </div>
      </div>
    </div>
  );
}

window.HeroScreen = HeroScreen;
