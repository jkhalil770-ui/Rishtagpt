/* Premium RishtaGPT logo — auto removes dark bg using canvas on first load */

/* Canvas-based transparent logo generator */
(function() {
  const SRC = "assets/logo.png";
  let _blob = null;
  let _pending = [];

  function buildTransparent(cb) {
    if (_blob) { cb(_blob); return; }
    _pending.push(cb);
    if (_pending.length > 1) return; // already loading

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = id.data;

      // Sample corner to get background color
      const bgR = d[0], bgG = d[1], bgB = d[2];

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i+1], b = d[i+2];
        // Distance from background color
        const dist = Math.sqrt(
          (r - bgR)**2 + (g - bgG)**2 + (b - bgB)**2
        );
        // Make pixels close to background color transparent (threshold=55)
        if (dist < 55) {
          d[i+3] = Math.round((dist / 55) * 80); // soft edge
        }
      }

      ctx.putImageData(id, 0, 0);
      canvas.toBlob(blob => {
        _blob = URL.createObjectURL(blob);
        _pending.forEach(fn => fn(_blob));
        _pending = [];
      }, "image/png");
    };
    img.onerror = () => {
      // fallback: use original
      _blob = SRC;
      _pending.forEach(fn => fn(_blob));
      _pending = [];
    };
    img.src = SRC;
  }

  window.RG_LogoSrc = buildTransparent;
})();

/* ──────────────── React Logo Components ──────────────── */

function LogoMark({ size = 120, animate = true }) {
  const [src, setSrc] = React.useState("assets/logo.png");
  React.useEffect(() => { window.RG_LogoSrc(s => setSrc(s)); }, []);

  return (
    <div
      className={animate ? "float-bob" : ""}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "visible" }}
    >
      {/* Gold radial glow halo */}
      <div style={{
        position: "absolute",
        width: size * 0.9,
        height: size * 0.9,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.45) 0%, rgba(201,168,76,0.1) 50%, transparent 75%)",
        filter: "blur(18px)",
        pointerEvents: "none",
      }}/>
      <img
        src={src}
        alt="RishtaGPT Logo"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          position: "relative",
          zIndex: 2,
          filter: "drop-shadow(0 8px 28px rgba(201,168,76,0.55)) brightness(1.1)",
        }}
      />
    </div>
  );
}

function LogoSmall({ size = 28 }) {
  const [src, setSrc] = React.useState("assets/logo.png");
  React.useEffect(() => { window.RG_LogoSrc(s => setSrc(s)); }, []);

  return (
    <div style={{
      position: "relative",
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
      {/* Subtle glow */}
      <div style={{
        position: "absolute",
        inset: "-40%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)",
        filter: "blur(8px)",
        pointerEvents: "none",
      }}/>
      <img
        src={src}
        alt="RishtaGPT Logo"
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          position: "relative",
          zIndex: 2,
          filter: "brightness(1.1) drop-shadow(0 2px 8px rgba(201,168,76,0.4))",
        }}
      />
    </div>
  );
}

function Wordmark({ size = 48 }) {
  return (
    <div className="flex items-center gap-3">
      <Flourish dir="left"/>
      <h1
        className="font-display gold-text font-semibold tracking-tight leading-none"
        style={{ fontSize: size }}
      >
        RishtaGPT
      </h1>
      <Flourish dir="right"/>
    </div>
  );
}

function Flourish({ dir = "left" }) {
  return (
    <svg width="36" height="14" viewBox="0 0 36 14" fill="none"
         style={{ transform: dir === "right" ? "scaleX(-1)" : "none", opacity: 0.7 }}>
      <defs>
        <linearGradient id={`fl-${dir}`} x1="0%" x2="100%">
          <stop offset="0%"  stopColor="#C9A84C" stopOpacity="0"/>
          <stop offset="100%" stopColor="#E6C56A" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <path d="M0 7 L26 7" stroke={`url(#fl-${dir})`} strokeWidth="0.8"/>
      <circle cx="29" cy="7" r="1.4" fill="#E6C56A"/>
      <path d="M32 4 q 2 3 0 6" stroke="#E6C56A" strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

Object.assign(window, { LogoMark, LogoSmall, Wordmark, Flourish });