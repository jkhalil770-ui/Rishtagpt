/* Shared UI primitives + canvas particle background */

const { useEffect, useRef, useState, useMemo } = React;

/* ─── Floating gold particles (canvas, slow upward drift) ─── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0, w = 0, h = 0;
    const N = 28;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.6,
      vy: 0.0003 + Math.random() * 0.0008,
      vx: (Math.random() - 0.5) * 0.0002,
      tw: Math.random() * Math.PI * 2,
    }));
    const resize = () => {
      const rect = c.getBoundingClientRect();
      w = rect.width; h = rect.height;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);

    const tick = () => {
      ctx.clearRect(0,0,w,h);
      for (const p of parts) {
        p.y -= p.vy;
        p.x += p.vx;
        p.tw += 0.02;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x >  1.05) p.x = -0.05;
        const x = p.x * w, y = p.y * h;
        const a = 0.35 + Math.sin(p.tw) * 0.25;
        const r = p.r;
        const grd = ctx.createRadialGradient(x,y,0, x,y, r*5);
        grd.addColorStop(0, `rgba(230,197,106,${0.8*a})`);
        grd.addColorStop(0.4, `rgba(230,197,106,${0.25*a})`);
        grd.addColorStop(1, `rgba(230,197,106,0)`);
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(x,y, r*5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = `rgba(255,235,180,${a})`;
        ctx.beginPath(); ctx.arc(x,y, r*0.7, 0, Math.PI*2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="particles" />;
}

function PatternOverlay() {
  return <div className="pattern-overlay" />;
}

/* ─── Persistent header ─── */
function Header({ onPremium, onHome, onSaved, savedCount }) {
  return (
    <div className="topbar">
      <button
        onClick={onHome}
        className="flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0"
      >
        <LogoSmall size={28}/>
        <span className="font-display gold-text text-[20px] tracking-tight font-semibold">
          RishtaGPT
        </span>
      </button>
      <div className="flex items-center gap-2">
        <button className="iconbtn relative" aria-label="Saved bios" onClick={onSaved}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h12v17l-6-4-6 4V4z"/>
          </svg>
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-bold flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#E6C56A,#C9A84C)", color: "#1a1304" }}>
              {savedCount}
            </span>
          )}
        </button>
        <button className="iconbtn gold" aria-label="Premium" onClick={onPremium}>
          <Ic.crown style={{ width: 18, height: 18 }} />
        </button>
      </div>
    </div>
  );
}

/* ─── Glass input wrappers ─── */
function Field({ label, children, optional, error }) {
  return (
    <div className={"mb-4 " + (error ? "shake-anim" : "")}>
      {label && (
        <div className="flex items-baseline">
          <div className="label">{label}</div>
          {optional && <span className="label-soft">optional</span>}
        </div>
      )}
      {children}
      {error && <div className="text-xs text-rose-300 mt-1.5 ml-1">{error}</div>}
    </div>
  );
}

function PillToggle({ options, value, onChange }) {
  const idx = options.findIndex((o) => o.v === value);
  return (
    <div className="pill-toggle">
      <div className="pill-thumb" style={{ transform: `translateX(${idx * 100}%)` }} />
      {options.map((o) => (
        <button
          key={o.v}
          className={value === o.v ? "active" : ""}
          onClick={() => onChange(o.v)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Stepper({ value, min = 0, max = 99, onChange }) {
  return (
    <div className="stepper">
      <button onClick={() => onChange(Math.max(min, value - 1))} aria-label="dec">−</button>
      <div className="val">{value}</div>
      <button onClick={() => onChange(Math.min(max, value + 1))} aria-label="inc">+</button>
    </div>
  );
}

function IconCard({ icon, title, sub, sel, onClick }) {
  return (
    <button className={"icard " + (sel ? "sel" : "")} onClick={onClick}>
      <div className="ic-icon">{icon}</div>
      <div className="ic-title">{title}</div>
      {sub && <div className="ic-sub">{sub}</div>}
    </button>
  );
}

function Tag({ label, sel, onClick }) {
  return (
    <span className={"tag " + (sel ? "sel" : "")} onClick={onClick}>
      {sel && <Ic.check style={{ width: 12, height: 12, marginRight: 6, color: "var(--gold-2)" }} />}
      {label}
    </span>
  );
}

/* ─── Custom Dropdown (replaces native select) ─── */
function Dropdown({ value, onChange, options, placeholder = "— Select —", title }) {
  const [open, setOpen] = useState(false);
  const labelOf = (o) => typeof o === "string" ? o : o.label;
  const valueOf = (o) => typeof o === "string" ? o : o.v;
  const selected = options.find(o => valueOf(o) === value);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const esc = (e) => e.key === "Escape" && setOpen(false);
      document.addEventListener("keydown", esc);
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", esc);
      };
    }
  }, [open]);

  const sheet = open ? (
    <>
      <div className="cdd-sheet-backdrop" onClick={() => setOpen(false)} />
      <div className="cdd-sheet" role="listbox">
        <div className="cdd-handle"/>
        <div className="cdd-head">
          <div className="cdd-title">{title || placeholder}</div>
          <button onClick={() => setOpen(false)} className="iconbtn" aria-label="Close">
            <Ic.close style={{ width: 16, height: 16 }} />
          </button>
        </div>
        <div className="cdd-list">
          {options.map((o, i) => {
            const v = valueOf(o);
            const isSel = v === value;
            return (
              <div
                key={String(v) + i}
                className={"cdd-option " + (isSel ? "sel" : "")}
                role="option"
                aria-selected={isSel}
                onClick={() => { onChange(v); setOpen(false); }}
              >
                <span>{labelOf(o)}</span>
                <Ic.check className="ck" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      <button
        type="button"
        className={"cdd-trigger " + (open ? "open " : "") + (!selected ? "placeholder" : "")}
        onClick={() => setOpen(true)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selected ? labelOf(selected) : placeholder}
        </span>
        <svg className="cdd-chev" viewBox="0 0 14 8" fill="none">
          <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && ReactDOM.createPortal(sheet, document.body)}
    </>
  );
}

/* Dual handle range slider — two stacked native ranges with shared track */
function RangeDual({ min, max, value, onChange }) {
  const [a, b] = value;
  const trackFill = {
    left:  `${((a - min) / (max - min)) * 100}%`,
    width: `${((b - a) / (max - min)) * 100}%`,
  };
  return (
    <div className="relative h-10 flex items-center select-none">
      <div className="absolute left-0 right-0 h-[4px] bg-white/8 rounded-full" />
      <div className="absolute h-[4px] rounded-full" style={{ ...trackFill, background: "linear-gradient(90deg,#E6C56A,#C9A84C)" }} />
      <input
        type="range" min={min} max={max} value={a}
        onChange={(e) => onChange([Math.min(+e.target.value, b - 1), b])}
        className="range absolute inset-0 w-full"
        style={{ background: "transparent", pointerEvents: "auto", zIndex: 2 }}
      />
      <input
        type="range" min={min} max={max} value={b}
        onChange={(e) => onChange([a, Math.max(+e.target.value, a + 1)])}
        className="range absolute inset-0 w-full"
        style={{ background: "transparent", pointerEvents: "auto", zIndex: 3 }}
      />
    </div>
  );
}

/* Trust pill */
function Trust({ icon, label }) {
  return (
    <div className="trust">
      <span className="star">✦</span>
      {icon}{label}
    </div>
  );
}

/* Drifting crescent in hero */
function HeroCrescent() {
  return (
    <svg className="crescent" viewBox="0 0 200 200" fill="none">
      <defs>
        <radialGradient id="cg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E6C56A" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.0"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#cg)"/>
      <path
        d="M150 100a55 55 0 1 1-72-52 42 42 0 0 0 72 52z"
        stroke="#E6C56A" strokeWidth="1.2" fill="rgba(230,197,106,0.08)"
      />
      <circle cx="155" cy="58" r="2.5" fill="#E6C56A"/>
      <circle cx="40"  cy="150" r="1.8" fill="#E6C56A"/>
      <circle cx="170" cy="130" r="1.4" fill="#E6C56A"/>
    </svg>
  );
}

Object.assign(window, {
  Particles, PatternOverlay, Header, Field, PillToggle,
  Stepper, IconCard, Tag, RangeDual, Trust, HeroCrescent,
  Dropdown,
});
