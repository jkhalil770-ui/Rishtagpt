/* App root — screen routing + persistence + desktop showcase mount */

const DEFAULT_DATA = {
  name: "", age: 25, gender: "", height: "", city: "",
  marital: "Never married", complexion: "", photo: null,
  maslak: "", namaz: "", quran: "", hafiz: false, hijab: "", partnerDeen: "",
  degree: "", institution: "", profession: "", employment: "", income: 0,
  fatherStatus: "", motherStatus: "", fatherProf: "", motherProf: "",
  brothers: 0, sisters: 0, famType: "", residence: "",
  biradari: "", biradariSkip: false, waliContact: "",
  traits: [], partnerAge: [25, 32], locPref: "", note: "",
};


/* ── Cinematic submission → result transition overlay ── */
function CinematicTransition({ visible, onComplete }) {
  const [phase, setPhase] = React.useState(0); // 0=idle,1=ring-in,2=reveal,3=done

  React.useEffect(() => {
    if (!visible) { setPhase(0); return; }
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 900);
    const t2 = setTimeout(() => setPhase(3), 2000);
    const t3 = setTimeout(() => { onComplete && onComplete(); }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible]);

  if (!visible && phase === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 120% 120% at 50% 50%, #0d1128 0%, #060810 100%)",
        opacity: phase === 3 ? 0 : 1,
        transition: "opacity 0.5s cubic-bezier(.4,0,.2,1)",
        pointerEvents: phase === 3 ? "none" : "all",
      }}
    >
      {/* Pulsing concentric rings */}
      {[0,1,2,3].map(i => (
        <div key={i} style={{
          position: "absolute",
          width: 40 + i * 70,
          height: 40 + i * 70,
          borderRadius: "50%",
          border: `${1.5 - i * 0.3}px solid rgba(201,168,76,${0.4 - i * 0.08})`,
          animation: `pload-ring-out ${2.4 + i * 0.3}s cubic-bezier(.2,.6,.2,1) ${i * 0.4}s infinite`,
        }}/>
      ))}

      {/* Central logo medallion */}
      <div style={{
        position: "relative",
        width: 120,
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
      }}>
        {/* Spinning outer ring */}
        <div style={{
          position: "absolute",
          inset: -8,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.35)",
          borderTopColor: "rgba(201,168,76,0.9)",
          animation: "pload-spin 2.4s linear infinite",
        }}/>
        {/* Spinning inner ring (reverse) */}
        <div style={{
          position: "absolute",
          inset: 8,
          borderRadius: "50%",
          border: "1px dashed rgba(201,168,76,0.2)",
          animation: "pload-spin 4s linear infinite reverse",
        }}/>
        {/* Glow */}
        <div style={{
          position: "absolute",
          inset: "15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}/>
        <div style={{ animation: "pload-core-pulse 1.6s ease-in-out infinite", position: "relative", zIndex: 2 }}>
          <LogoMark size={100} animate={false}/>
        </div>
      </div>

      {/* Text reveal */}
      <div style={{
        textAlign: "center",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.6s cubic-bezier(.2,.7,.2,1) 0.3s",
      }}>
        <div style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 22,
          fontWeight: 600,
          fontStyle: "italic",
          background: "linear-gradient(90deg, #8a6f24 0%, #E6C56A 40%, #fff5cf 60%, #C9A84C 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: "shimmer-sweep 2s linear infinite",
          marginBottom: 8,
        }}>
          {phase >= 2 ? "Tayyar ho rahi hai aapki bio" : "Maloomat jama ho rahi hai"}
        </div>
        <div style={{
          fontSize: 13,
          color: "rgba(138,143,168,0.8)",
          letterSpacing: "0.08em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}>
          <span>AI processing</span>
          <span style={{ display: "inline-flex", gap: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 4, height: 4, borderRadius: "50%",
                background: "#C9A84C",
                display: "inline-block",
                animation: `pload-dot-jump 1.2s ease-in-out ${i*0.15}s infinite`,
              }}/>
            ))}
          </span>
        </div>
      </div>

      {/* Bottom shimmer bar */}
      <div style={{
        position: "absolute",
        bottom: "20%",
        width: "50%",
        maxWidth: 200,
        height: 2,
        borderRadius: 999,
        background: "rgba(201,168,76,0.15)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent, #E6C56A 30%, #fff5cf 50%, #E6C56A 70%, transparent)",
          width: "50%",
          animation: "pload-bar-slide 1.8s cubic-bezier(.4,0,.6,1) infinite",
          borderRadius: 999,
        }}/>
      </div>
    </div>
  );
}
function App() {
  const [screen, setScreen] = React.useState("hero");
  const [premiumOpen, setPremiumOpen] = React.useState(false);
  const [premium, setPremium] = React.useState(false);
  const [data, setData] = React.useState(() => {
    const saved = RG_Store.loadForm();
    return saved ? { ...DEFAULT_DATA, ...saved } : DEFAULT_DATA;
  });
  const [savedCount, setSavedCount] = React.useState(() => RG_Store.listBios().length);
  const [showCinematic, setShowCinematic] = React.useState(false);

  // Authentication States
  const [user, setUser] = React.useState(null);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [pendingAction, setPendingAction] = React.useState(null);

  const handleFormSubmit = () => {
    setShowCinematic(true);
  };

  React.useEffect(() => {
    // Monitor auth state changes
    const unsubscribe = window.RG_Firebase.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => RG_Store.saveForm(data), 400);
    return () => clearTimeout(t);
  }, [data]);

  React.useEffect(() => {
    setSavedCount(RG_Store.listBios().length);
  }, [screen]);

  return (
    <>
      <Particles />
      <PatternOverlay />

      <Header
        onPremium={() => setPremiumOpen(true)}
        onHome={() => setScreen("hero")}
        onSaved={() => setScreen("saved")}
        savedCount={savedCount}
      />

      {screen === "hero" && (
        <HeroScreen
          onStart={() => setScreen("form")}
          onViewSaved={() => setScreen("saved")}
          savedCount={savedCount}
        />
      )}

      {screen === "form" && (
        <FormScreen
          data={data}
          setData={setData}
          onBack={() => setScreen("hero")}
          onSubmit={handleFormSubmit}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          data={data}
          premium={premium}
          onBack={() => setScreen("form")}
          onPremium={() => setPremiumOpen(true)}
          onViewSaved={() => setScreen("saved")}
          user={user}
          onRequireLogin={(action) => {
            setPendingAction(action);
            setLoginOpen(true);
          }}
        />
      )}

      {screen === "saved" && (
        <SavedScreen
          onBack={() => setScreen("hero")}
        />
      )}

      <PremiumSheet
        open={premiumOpen}
        onClose={() => setPremiumOpen(false)}
        onUnlock={() => { setPremium(true); setPremiumOpen(false); }}
      />

      <LoginSheet
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setLoginOpen(false);
          // Dispatch custom event to trigger pending action inside ResultScreen
          if (pendingAction) {
            window.dispatchEvent(new CustomEvent("rg-auth-trigger", { detail: { action: pendingAction } }));
            setPendingAction(null);
          }
        }}
      />
      <CinematicTransition
        visible={showCinematic}
        onComplete={() => { setShowCinematic(false); setScreen("result"); }}
      />
    </>
  );
}

/* ─── Desktop showcase (only mounts on wide screens — CSS handles visibility) ─── */
/* Desktop showcase panel — modern, no phone template */
function Showcase() {
  return (
    <div className="w-full max-w-[560px] flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-8">
        <LogoSmall size={40}/>
        <span className="font-display gold-text text-[26px] tracking-tight font-semibold">
          RishtaGPT
        </span>
        <span className="ml-2 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold"
              style={{ background: "rgba(232,180,160,0.15)", color: "var(--rose)", border: "1px solid rgba(232,180,160,0.3)" }}>
          v2
        </span>
      </div>

      <h1 className="font-display leading-[0.92] tracking-tight font-semibold mb-5"
          style={{ fontSize: "clamp(42px, 5.2vw, 64px)" }}>
        <span className="gold-text">Beautiful rishta bios,</span>
        <br/>
        <span style={{ color: "var(--ink)" }}>written by AI.</span>
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }}/>
        <span style={{
          fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
          fontSize: 18, color: "#E8B4A0", fontStyle: "italic",
        }}>
          AI se likhein apni kahani
        </span>
        <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }}/>
      </div>

      <p className="text-[15px] leading-[1.7] mb-8" style={{ color: "var(--ink-soft)" }}>
        Generate dignified, culturally-grounded rishta bios in{" "}
        <strong style={{color:"var(--ink)"}}>Urdu, Roman Urdu, and English</strong>{" "}
        powered by Gemini AI. Five distinct styles, HD PDF biodata cards, WhatsApp-ready in seconds.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          { i: <Ic.sparkle style={{width:18,height:18}}/>, t: "5 AI Styles", s: "Traditional, Modern, Poetic, Pro, Detailed" },
          { i: <Ic.globe style={{width:18,height:18}}/>,   t: "3 Languages", s: "Urdu, Roman Urdu, English" },
          { i: <Ic.download style={{width:18,height:18}}/>,t: "HD PDF Export", s: "Branded biodata with photo" },
          { i: <Ic.whatsapp style={{width:18,height:18}}/>,t: "WhatsApp Ready", s: "Share in one tap" },
        ].map((f, i) => (
          <div key={i} className="glass-gold p-4 flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                 style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)", color: "var(--gold-2)" }}>
              {f.i}
            </div>
            <div className="text-[14px] font-semibold">{f.t}</div>
            <div className="text-[12px]" style={{ color: "var(--ink-soft)" }}>{f.s}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6 flex-wrap mb-8 p-4 rounded-2xl"
           style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { n: "Free", l: "Always" },
          { n: "5", l: "AI Styles" },
          { n: "3", l: "Languages" },
          { n: "HD", l: "PDF Export" },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="font-display text-[26px] font-semibold leading-none gold-text">{s.n}</div>
            <div className="text-[11px] mt-1" style={{ color: "var(--ink-dim)" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
             style={{ background: "linear-gradient(135deg,#E6C56A,#C9A84C)" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a1304" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5 9-9"/>
          </svg>
        </div>
        <div className="text-[14px]" style={{ color: "var(--ink-soft)" }}>
          <span style={{color:"var(--ink)", fontWeight:600}}>Try it now</span>{" "}
          in the live preview on the right
        </div>
      </div>

      <div className="pt-5 flex items-center gap-5 text-[11px]"
           style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "var(--ink-dim)" }}>
        <span className="flex items-center gap-1.5">
          <Ic.lock style={{ width: 11, height: 11 }}/>
          No server storage
        </span>
        <span className="flex items-center gap-1.5">
          <Ic.heart style={{ width: 11, height: 11, color: "var(--rose)" }}/>
          Built for PK / IN families
        </span>
        <span className="flex items-center gap-1.5">
          <Ic.sparkle style={{ width: 11, height: 11, color: "var(--gold-2)" }}/>
          Gemini AI
        </span>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const sc = document.getElementById("showcase");
if (sc) {
  const scRoot = ReactDOM.createRoot(sc);
  scRoot.render(<Showcase />);
}
