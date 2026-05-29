/* global React, ReactDOM, Navbar, Hero, Marquee, Services, Projects, About, Testimonials, Contact, Footer, HeroStage, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakSlider, TweakToggle */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#8b5cf6",
  "bgTone": "deep-violet",
  "glass": 22,
  "particles": true,
  "motion": "full",
  "headlineSize": 100
}/*EDITMODE-END*/;

const SOCIALS = {
  // Real verified Instagram handle from QR
  instagram: "https://instagram.com/junaid_rana46",
  igHandle:  "junaid_rana46",
  whatsapp:  "https://wa.me/?text=Hi%20JRK%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  github:    "https://github.com/",
  linkedin:  "https://www.linkedin.com/",
  x:         "https://x.com/",
  email:     "mailto:hello@jrk.studio"
};

const CONTENT = {
  name: "Junaid",
  highlight: "futuristic",
  avatar: "assets/avatar.png"
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tweaks to document
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", t.accent);
    // derive soft / deep / glow from accent
    r.style.setProperty("--accent-soft", `color-mix(in oklab, ${t.accent} 65%, white)`);
    r.style.setProperty("--accent-deep", `color-mix(in oklab, ${t.accent} 70%, black 30%)`);
    r.style.setProperty("--accent-glow", `color-mix(in oklab, ${t.accent} 70%, transparent)`);
    r.style.setProperty("--glass-blur", `${t.glass}px`);

    if (t.bgTone === "true-black") {
      r.style.setProperty("--bg-0", "#050507");
      r.style.setProperty("--bg-1", "#0a0a0e");
    } else {
      r.style.setProperty("--bg-0", "#07050d");
      r.style.setProperty("--bg-1", "#0c0917");
    }
    document.body.dataset.particles = t.particles ? "on" : "off";
    document.body.dataset.motion = t.motion;
    if (t.particles) window.__ambientStart && window.__ambientStart();
    else window.__ambientStop && window.__ambientStop();
  }, [t.accent, t.bgTone, t.glass, t.particles, t.motion]);

  // headline size
  useEffect(() => {
    const r = document.documentElement;
    const px = `clamp(48px, ${t.headlineSize / 14}vw, ${t.headlineSize + 16}px)`;
    r.style.setProperty("--h1-size", px);
    document.querySelectorAll(".hero h1").forEach(h => {
      h.style.fontSize = px;
    });
  }, [t.headlineSize]);

  // inject syntax-highlighted code in laptop screen (after mount)
  useEffect(() => { HeroStage.injectCode && HeroStage.injectCode(); window.__observeReveals && window.__observeReveals(); });

  return (
    <>
      <Navbar socials={SOCIALS} />
      <main>
        <Hero socials={SOCIALS} tweaks={t} content={CONTENT} />
        <Marquee />
        <Projects />
        <Services />
        <About content={CONTENT} />
        <Testimonials />
        <Contact socials={SOCIALS} />
      </main>
      <Footer socials={SOCIALS} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakColor label="Accent" value={t.accent}
          options={["#8b5cf6","#a855f7","#7c3aed","#06b6d4","#f43f5e","#22c55e"]}
          onChange={(v)=>setTweak("accent", v)} />
        <TweakRadio label="Background" value={t.bgTone}
          options={["deep-violet","true-black"]}
          onChange={(v)=>setTweak("bgTone", v)} />
        <TweakSection label="Surfaces" />
        <TweakSlider label="Glass blur" value={t.glass} min={0} max={40} unit="px"
          onChange={(v)=>setTweak("glass", v)} />
        <TweakSection label="Motion" />
        <TweakToggle label="Ambient particles" value={t.particles}
          onChange={(v)=>setTweak("particles", v)} />
        <TweakRadio label="Animations" value={t.motion}
          options={["full","reduced"]}
          onChange={(v)=>setTweak("motion", v)} />
        <TweakSection label="Type" />
        <TweakSlider label="Headline" value={t.headlineSize} min={64} max={140} unit="px"
          onChange={(v)=>setTweak("headlineSize", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
