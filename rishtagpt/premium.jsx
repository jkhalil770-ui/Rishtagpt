/* Premium paywall — bottom sheet */

function PremiumSheet({ open, onClose, onUnlock }) {
  if (!open) return null;
  const features = [
    "5 AI bio styles — Traditional, Modern, Poetic, Pro, Detailed",
    "PDF export — beautifully formatted biodata",
    "Printable biodata card with photo slot",
    "Roman Urdu, Urdu, English — all together",
    "WhatsApp-ready formatting",
    "Save up to 10 bios for family",
  ];
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose}/>
      <div className="sheet">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[22px]">🌟</span>
            <div className="font-display text-[22px] gold-text font-semibold">RishtaGPT Premium</div>
          </div>
          <button onClick={onClose} className="iconbtn">
            <Ic.close style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div className="text-[13px] mb-4" style={{ color: "var(--ink-soft)" }}>
          One-time purchase. Lifetime access. No subscription.
        </div>

        <div className="glass-gold p-4 mb-4">
          <ul className="flex flex-col gap-2.5">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px]" style={{ color: "var(--ink)" }}>
                <span
                  className="shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#E6C56A,#C9A84C)", color: "#1a1304" }}
                >
                  <Ic.check style={{ width: 12, height: 12, strokeWidth: 3 }} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest" style={{ color: "var(--ink-soft)" }}>One-time price</div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <div className="font-display gold-text text-[36px] font-semibold leading-none">Rs. 299</div>
              <div className="text-[13px] line-through" style={{ color: "var(--ink-dim)" }}>Rs. 999</div>
            </div>
          </div>
          <div className="text-right text-[10px] uppercase tracking-widest font-semibold px-2 py-1 rounded"
               style={{ background: "rgba(232,180,160,0.15)", color: "var(--rose)", border: "1px solid rgba(232,180,160,0.3)" }}>
            70% Off
          </div>
        </div>

        {/* Pay methods */}
        <div className="grid grid-cols-1 gap-2.5">
          <button onClick={onUnlock} className="gold-btn rounded-2xl py-3.5 flex items-center justify-center gap-2 text-[15px]">
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 22, height: 22, borderRadius: 6,
              background: "#1a1304", color: "#E6C56A", fontWeight: 800, fontSize: 11
            }}>JC</span>
            Pay with JazzCash
          </button>
          <button onClick={onUnlock} className="rounded-2xl py-3.5 flex items-center justify-center gap-2 text-[15px] font-semibold"
            style={{ background: "linear-gradient(135deg, #15a05a 0%, #0c7a44 100%)", color: "white" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 22, height: 22, borderRadius: 6,
              background: "white", color: "#0c7a44", fontWeight: 800, fontSize: 11
            }}>EP</span>
            Pay with Easypaisa
          </button>
          <button onClick={onUnlock} className="rounded-2xl py-3.5 flex items-center justify-center gap-2 text-[15px] font-medium"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--ink)" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="13" rx="2"/>
              <path d="M2 11h20M6 16h3"/>
            </svg>
            Pay with Card
          </button>
        </div>

        <div className="mt-4 text-center text-[11px] flex items-center justify-center gap-1.5" style={{ color: "var(--ink-dim)" }}>
          <Ic.lock style={{ width: 11, height: 11 }} />
          Secure payment · Cancel anytime
        </div>
      </div>
    </>
  );
}

window.PremiumSheet = PremiumSheet;
