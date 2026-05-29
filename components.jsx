/* global React */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ──────────────── icons ──────────────── */
const Icon = ({ name, size = 18, stroke = 1.6 }) => {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "arrow":     return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "arrow-ne":  return <svg {...props}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case "spark":     return <svg {...props}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2"/></svg>;
    case "code":      return <svg {...props}><path d="m8 18-6-6 6-6M16 6l6 6-6 6"/></svg>;
    case "wand":      return <svg {...props}><path d="M15 4V2M15 14v-2M8 9h2M20 9h2M17.8 11.8 19 13M17.8 6.2 19 5M3 21l9-9M12.2 6.2 11 5"/></svg>;
    case "motion":    return <svg {...props}><path d="M5 12c0-3.9 3.1-7 7-7M19 12c0 3.9-3.1 7-7 7M12 5l3 3M12 19l-3-3"/></svg>;
    case "search":    return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
    case "layers":    return <svg {...props}><path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 18l9 5 9-5"/></svg>;
    case "ig":        return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>;
    case "wa":        return <svg {...props}><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.2A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.5 9.5c.4 2.4 2.6 4.6 5 5l1.5-1.2 2 .9c-.2 1.4-1.4 2.3-2.8 2.3-3.7 0-7-3.3-7-7 0-1.4.9-2.6 2.3-2.8l.9 2-1.2 1.5Z" fill="currentColor" stroke="none" opacity="0.0"/></svg>;
    case "gh":        return <svg {...props}><path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-4a3 3 0 0 0-.9-2.3c2.9-.3 6-1.4 6-6.4a5 5 0 0 0-1.4-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.6 1.3a12.5 12.5 0 0 0-6.6 0C5.9 1.5 4.7 1.8 4.7 1.8a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 3.2 8.8c0 5 3.1 6.1 6 6.4A3 3 0 0 0 8.3 18v4"/></svg>;
    case "li":        return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 1 1 4 0v4M12 12v5"/></svg>;
    case "x":         return <svg {...props}><path d="M4 4l16 16M20 4 4 20"/></svg>;
    case "mail":      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>;
    case "star":      return <svg {...props} fill="currentColor" stroke="none"><path d="M12 2.5 14.6 8l6 .9-4.3 4.2 1 6L12 16.3 6.7 19l1-6L3.4 8.9l6-.9L12 2.5Z"/></svg>;
    case "check":     return <svg {...props}><path d="m4 12 5 5L20 6"/></svg>;
    case "play":      return <svg {...props}><path d="M6 4v16l14-8L6 4Z" fill="currentColor"/></svg>;
    default: return null;
  }
};

/* ──────────────── small bits ──────────────── */
const Eyebrow = ({ children }) => <div className="eyebrow">{children}</div>;

const Button = ({ children, primary, href, onClick, target, ariaLabel }) => {
  const Cls = `btn ${primary ? "btn-primary" : ""}`;
  const inner = <>{children}<Icon name="arrow" size={14} /></>;
  const props = { className: Cls, onClick, "aria-label": ariaLabel };
  if (href) return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} {...props}>{inner}</a>;
  return <button {...props}>{inner}</button>;
};

const Chip = ({ children }) => <span className="chip">{children}</span>;

/* ──────────────── nav ──────────────── */
const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const Navbar = ({ socials }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <div className="nav-inner">
          <a className="nav-logo" href="#top" aria-label="JRK Studio home">
            <span className="nav-mark">JRK</span>
            <span>JRK<span style={{opacity:.5}}>.studio</span></span>
          </a>
          <div className="nav-links" role="menubar">
            {NAV_LINKS.map(l => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? "active" : ""} role="menuitem">{l.label}</a>
            ))}
          </div>
          <a className="btn btn-primary nav-cta" href={socials.email} aria-label="Start a project">
            Let's talk <Icon name="arrow" size={13} />
          </a>
          <button className={`nav-burger ${open ? "open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`} onClick={close}>
        {NAV_LINKS.map(l => (
          <a key={l.id} href={`#${l.id}`} onClick={close}>{l.label}</a>
        ))}
        <a className="btn btn-primary" href={socials.email} onClick={close} style={{marginTop:24}}>
          Let's talk <Icon name="arrow" size={14} />
        </a>
      </div>
    </>
  );
};

/* ──────────────── hero stage ──────────────── */
const HeroStage = ({ avatarSrc }) => {
  const stageRef = useRef(null);

  // mobile tap toggles open
  useEffect(() => {
    const el = stageRef.current; if (!el) return;
    let timer;
    const onTouch = () => {
      el.classList.add("is-open");
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove("is-open"), 2400);
    };
    el.addEventListener("touchstart", onTouch, { passive: true });
    return () => { el.removeEventListener("touchstart", onTouch); clearTimeout(timer); };
  }, []);

  // parallax tilt
  useEffect(() => {
    const el = stageRef.current; if (!el) return;
    const fig = el.querySelector(".stage-figure");
    const rings = el.querySelector(".stage-rings");
    let raf;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (fig) fig.style.transform = `translateY(${-6 + y * -4}px) rotateY(${x * 6}deg) rotateX(${y * -4}deg)`;
        if (rings) rings.style.transform = `rotate(${x * 8}deg)`;
      });
    };
    const onLeave = () => {
      if (fig) fig.style.transform = "";
      if (rings) rings.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div className="stage" ref={stageRef} aria-label="Animated avatar holding a laptop">
      <div className="stage-glow"></div>
      <div className="stage-rings"></div>
      <div className="stage-stars"></div>
      <div className="stage-figure">
        <img className="avatar" src={avatarSrc} alt="JRK studio creative engineer holding a laptop" loading="eager" decoding="async" />
        <div className="avatar-screen-glow" aria-hidden="true"></div>
      </div>
    </div>
  );
};

// inject HTML inside <pre> properly
HeroStage.injectCode = () => {
  document.querySelectorAll(".laptop-screen .code").forEach(node => {
    if (node.dataset.injected) return;
    node.innerHTML = node.textContent;
    node.dataset.injected = "1";
  });
};

/* ──────────────── service icon swatch ──────────────── */
const SvcIcon = ({ name }) => (
  <div className="svc-icn"><Icon name={name} size={20} /></div>
);

/* ──────────────── project mockup art (no copyrighted UIs) ──────────────── */
const ProjectArt = ({ variant, accent = "#a78bfa" }) => {
  const arts = {
    gradient: (
      <svg viewBox="0 0 800 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b1d6b"/><stop offset="0.6" stopColor="#7c3aed"/><stop offset="1" stopColor="#0a0712"/>
          </linearGradient>
          <radialGradient id="g2" cx="0.7" cy="0.3" r="0.7"><stop offset="0" stopColor="#c4b5fd" stopOpacity="0.7"/><stop offset="1" stopColor="transparent"/></radialGradient>
        </defs>
        <rect width="800" height="450" fill="url(#g1)"/>
        <rect width="800" height="450" fill="url(#g2)"/>
        <g opacity="0.5" stroke="rgba(255,255,255,0.18)" fill="none">
          {Array.from({length:14}).map((_,i)=>(<path key={i} d={`M0 ${30+i*30} Q400 ${i*22} 800 ${20+i*30}`}/>))}
        </g>
        <text x="40" y="80" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="rgba(255,255,255,0.6)" letterSpacing="2">CASE 01 — LIVE</text>
      </svg>
    ),
    grid: (
      <svg viewBox="0 0 800 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1a1330"/><stop offset="1" stopColor="#06040c"/></linearGradient>
          <pattern id="p1" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="rgba(167,139,250,0.18)"/></pattern>
        </defs>
        <rect width="800" height="450" fill="url(#g3)"/>
        <rect width="800" height="450" fill="url(#p1)"/>
        <circle cx="600" cy="100" r="180" fill={accent} opacity="0.18" filter="url(#blur)"/>
        <g transform="translate(60,140)" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2">
          <rect x="0" y="0" width="220" height="160" rx="10"/>
          <rect x="240" y="0" width="220" height="60" rx="10"/>
          <rect x="240" y="80" width="220" height="80" rx="10"/>
          <rect x="480" y="0" width="220" height="160" rx="10"/>
          <circle cx="40" cy="40" r="18"/>
          <path d="M70 40h130M0 110h220M0 130h180"/>
        </g>
      </svg>
    ),
    waves: (
      <svg viewBox="0 0 800 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0a0712"/><stop offset="1" stopColor="#2a1656"/></linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#g4)"/>
        {Array.from({length:60}).map((_,i)=>(
          <path key={i} d={`M0 ${225 + Math.sin(i*0.4)*40} Q200 ${225 + Math.cos(i*0.5)*120} 400 ${225 + Math.sin(i*0.3)*60} T800 ${225 + Math.cos(i*0.2)*40}`} stroke={`rgba(167,139,250,${0.04 + (i%6)/40})`} strokeWidth="1" fill="none"/>
        ))}
        <circle cx="400" cy="225" r="60" fill="none" stroke="rgba(255,255,255,0.4)"/>
        <circle cx="400" cy="225" r="6" fill="#fff"/>
      </svg>
    ),
    cards: (
      <svg viewBox="0 0 800 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1c1135"/><stop offset="1" stopColor="#06040c"/></linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#g5)"/>
        <g transform="translate(80,100)">
          {[0,1,2].map(i => (
            <g key={i} transform={`translate(${i*180},${i*16})`}>
              <rect width="240" height="280" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(167,139,250,0.3)"/>
              <rect x="20" y="20" width="200" height="140" rx="10" fill="rgba(167,139,250,0.18)"/>
              <rect x="20" y="180" width="160" height="10" rx="3" fill="rgba(255,255,255,0.5)"/>
              <rect x="20" y="200" width="120" height="8" rx="3" fill="rgba(255,255,255,0.25)"/>
              <rect x="20" y="240" width="60" height="20" rx="10" fill={accent} opacity="0.6"/>
            </g>
          ))}
        </g>
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 800 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="800" height="450" fill="#0c0917"/>
        <g stroke="rgba(255,255,255,0.05)">
          {Array.from({length:8}).map((_,i)=>(<line key={i} x1="0" x2="800" y1={50+i*50} y2={50+i*50}/>))}
        </g>
        <path d="M40 320 L120 280 L200 290 L280 220 L360 240 L440 160 L520 180 L600 110 L680 140 L760 80" fill="none" stroke={accent} strokeWidth="2.4"/>
        <path d="M40 320 L120 280 L200 290 L280 220 L360 240 L440 160 L520 180 L600 110 L680 140 L760 80 L760 410 L40 410 Z" fill={accent} opacity="0.18"/>
        <g fill="#fff">
          <circle cx="600" cy="110" r="5"/><circle cx="600" cy="110" r="12" fill={accent} opacity="0.3"/>
        </g>
        <text x="40" y="60" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="rgba(255,255,255,0.6)" letterSpacing="2">REV +218%</text>
      </svg>
    ),
    portrait: (
      <svg viewBox="0 0 800 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="g6" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stopColor="#7c3aed" stopOpacity="0.55"/><stop offset="1" stopColor="#06040c"/></radialGradient>
        </defs>
        <rect width="800" height="450" fill="url(#g6)"/>
        <g transform="translate(400 225)">
          {Array.from({length:30}).map((_,i)=>(<circle key={i} r={20+i*8} fill="none" stroke={`rgba(167,139,250,${0.04 + (i%5)/30})`}/>))}
        </g>
        <text x="50%" y="48%" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="86" fontWeight="700" fill="rgba(255,255,255,0.92)" letterSpacing="-3">AURORA</text>
        <text x="50%" y="58%" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="rgba(255,255,255,0.5)" letterSpacing="6">A GENERATIVE BRAND SYSTEM</text>
      </svg>
    ),
  };
  return <div className="proj-thumb-art">{arts[variant] || arts.gradient}</div>;
};

Object.assign(window, { Icon, Eyebrow, Button, Chip, Navbar, HeroStage, SvcIcon, ProjectArt, NAV_LINKS });
