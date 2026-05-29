/* global React, Icon, Eyebrow, Button, Chip, Navbar, HeroStage, SvcIcon, ProjectArt */
const { useState, useEffect, useRef } = React;

const SERVICES = [
  { num: "01", icon: "spark", title: "Premium Portfolio Websites", body: "Crafted personal sites for founders, designers and creative engineers. Pixel-honest, motion-rich, deploy-ready.", tags: ["Next.js", "Framer Motion", "GSAP"] },
  { num: "02", icon: "wand", title: "AI-Powered Web Experiences", body: "Embedded LLMs, generative interfaces and adaptive flows that feel native — not bolted on.", tags: ["LLM UX", "Streaming", "Agents"] },
  { num: "03", icon: "motion", title: "Motion UI Design", body: "Choreographed micro-interactions, staggered reveals and cinematic transitions that earn the user's attention.", tags: ["Lottie", "Rive", "WAAPI"] },
  { num: "04", icon: "code", title: "Creative Frontend Development", body: "Production-grade React, TypeScript and a11y-first markup. Hand-tuned for lighthouse, INP and core web vitals.", tags: ["React", "TS", "Tailwind"] },
  { num: "05", icon: "layers", title: "Design Systems", body: "Token-based component libraries that scale from a hero section to a 200-screen product without losing soul.", tags: ["Storybook", "Tokens", "Figma"] },
  { num: "06", icon: "search", title: "SEO-Optimized Builds", body: "Schema, OG, semantic HTML and fast-by-default architecture. Sites that convert and rank.", tags: ["Schema", "Core Vitals", "OG"] },
];

const PROJECTS = [
  { title: "Aurora — Generative Brand System", year: "2025", desc: "A living brand system with shader-driven mark generation, motion grammar and a public design API.", tags: ["WebGL", "Design System", "Motion"], art: "portrait", feat: true },
  { title: "Helix Music Visualizer", year: "2025", desc: "Real-time audio-reactive visuals for a Berlin record label, distributed as an embeddable web canvas.", tags: ["Audio", "Three.js", "GLSL"], art: "waves" },
  { title: "Verge — Editorial Platform", year: "2024", desc: "A typographic publishing platform with sub-100ms route transitions and view-transitions API.", tags: ["Next.js", "Typography", "CMS"], art: "grid" },
  { title: "Finch Personal Banking", year: "2024", desc: "Onboarding and dashboard flows for a Series A fintech. Lifted activation 41% in eight weeks.", tags: ["Product UX", "React", "Charts"], art: "chart" },
  { title: "Atlas Travel Cards", year: "2023", desc: "Stacked story-card interactions with momentum scroll and shared-element transitions.", tags: ["Interaction", "Mobile-first"], art: "cards" },
];

const TESTIMONIALS = [
  { name: "Ahmed Khan",       role: "Founder, Nova Studio · Lahore",          initial: "AK", hue: 270, gender: "m", style: 1, body: "JRK Studio ne hamari website ko bilkul next level pe le liya. The animations, the polish, the typography — sab kuch international standard ka feel hota hai. Inbound triple ho gaya launch ke baad." },
  { name: "Zainab Ali",       role: "Product Designer, Capbridge · Karachi",  initial: "ZA", hue: 320, gender: "f", style: 2, body: "Best frontend developer I've worked with in Pakistan. The motion system feels like Apple-level work, and the code is genuinely clean. Already booked Junaid for our next product." },
  { name: "Bilal Hussain",    role: "CEO, Obsidian Labs · Islamabad",         initial: "BH", hue: 30,  gender: "m", style: 3, body: "Clear communication, on-time delivery, and unbelievable attention to detail. Our investors literally asked us who built the site in our last pitch. Strongly recommended." },
  { name: "Ayesha Malik",     role: "Marketing Head, Velora · Lahore",        initial: "AM", hue: 350, gender: "f", style: 4, body: "Professional, creative aur seriously reliable. The new site converts 4× better than what we had before — and somehow still feels lighter and faster. Magic." },
  { name: "Hamza Raza",       role: "Co-founder, Kessel · Karachi",           initial: "HR", hue: 200, gender: "m", style: 5, body: "Junaid bhai ka kaam dekh ke samajh aaya frontend craft kis level pe ja sakti hai. Cinematic, smooth, modern — exactly what our brand needed. Will work with him again." },
  { name: "Sara Iqbal",       role: "Founder, Aurora Apparel · Islamabad",    initial: "SI", hue: 0,   gender: "f", style: 6, body: "JRK Studio ne hamari ecommerce ko ek experience bana diya. Cart abandonment 38% drop hua, average order value chal gaya. Best investment of the year, hands down." },
  { name: "Omar Sheikh",      role: "CTO, FinchPay · Lahore",                 initial: "OS", hue: 90,  gender: "m", style: 7, body: "Junaid is a one-person studio that out-shipped agencies twice his size. The dashboard motion he choreographed became our internal benchmark for all future product work." },
  { name: "Mariam Qureshi",   role: "CEO, Helix Records · Karachi",           initial: "MQ", hue: 280, gender: "f", style: 8, body: "Working with JRK Studio felt like collaborating with a creative director and a senior engineer at the same time. Every detail considered. Every interaction polished. Premium." },
  { name: "Faisal Tariq",     role: "Founder, Verge Editorial · Lahore",      initial: "FT", hue: 230, gender: "m", style: 9, body: "Mujhe ek aisa portfolio site chahiye tha jo dekhne wale ko ruk ne pe majboor kar de — Junaid ne literally wahi deliver kiya. Awwwards-grade output without the agency price tag." },
  { name: "Hira Nawaz",       role: "Design Director, Atlas Travel · Islamabad", initial: "HN", hue: 160, gender: "f", style: 10, body: "Such a rare combination of design taste, motion intuition aur engineering rigor. Hamari new app onboarding's completion rate 41% jump kar gayi launch ke pehle hafta mein." },
  { name: "Usman Akhtar",     role: "CEO, Mehfil Media · Lahore",             initial: "UA", hue: 50,  gender: "m", style: 11, body: "From the first call to launch day, the experience felt premium. Junaid samajhta hai brand ko, audience ko, aur most importantly — kya nahi karna chahiye. Highly recommended." },
];

const SKILLS = ["React", "TypeScript", "Next.js", "Three.js", "GLSL", "Framer Motion", "GSAP", "Tailwind", "Node", "Figma", "Storybook", "Rive", "Lottie", "WebGL"];

/* ───────────────────── sections ───────────────────── */
const Hero = ({ socials, tweaks, content }) => (
  <section id="top" className="hero" data-screen-label="01 Hero">
    <div className="wrap">
      <div className="hero-grid">
        <div className="hero-text reveal">
          <div className="hero-meta">
            <Chip><span className="status-dot"></span>&nbsp;&nbsp;Available — {new Date().getFullYear()} Q3</Chip>
            <Chip>Based remotely · WW</Chip>
          </div>
          <h1>
            Cinematic <span className="glow">{content.highlight}</span><br/>
            frontend, <em style={{fontStyle:"normal",color:"var(--ink-soft)"}}>made&nbsp;personal.</em>
          </h1>
          <p className="lede">
            I'm {content.name} — a creative frontend engineer building futuristic, motion-rich web experiences for founders, studios and ambitious brands. Apple-keynote polish, Linear-grade code, shipped on time.
          </p>
          <div className="hero-actions">
            <Button primary href="#contact">Start a project</Button>
            <Button href="#work">See selected work</Button>
          </div>
          <div className="hero-stats">
            <div><div className="num">7+</div><div className="lbl">Years building</div></div>
            <div><div className="num">62</div><div className="lbl">Sites shipped</div></div>
            <div><div className="num">4.98<span style={{color:"var(--accent-soft)"}}>★</span></div><div className="lbl">Avg client rating</div></div>
          </div>
        </div>
        <div className="hero-art reveal">
          <HeroStage avatarSrc={content.avatar} />
        </div>
      </div>
    </div>
  </section>
);

const Marquee = () => {
  const items = ["React", "Next.js", "TypeScript", "Three.js", "GLSL", "Framer Motion", "GSAP", "WebGL", "Rive", "Tailwind", "Node", "Storybook"];
  const row = items.concat(items);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{row.map((s,i)=>(<React.Fragment key={i}>{s}{i<row.length-1?<i style={{margin:"0 28px",opacity:.4}}>✦</i>:null}</React.Fragment>))}</span>
        <span>{row.map((s,i)=>(<React.Fragment key={i}>{s}{i<row.length-1?<i style={{margin:"0 28px",opacity:.4}}>✦</i>:null}</React.Fragment>))}</span>
      </div>
    </div>
  );
};

const Services = () => (
  <section id="services" data-screen-label="03 Services">
    <div className="wrap">
      <div className="section-head reveal">
        <Eyebrow>02 — Services</Eyebrow>
        <h2>What I build, end&nbsp;to&nbsp;end.</h2>
        <p className="lead">A small, focused practice. I take on a few clients each quarter — design and code held by the same set of hands.</p>
      </div>
      <div className="services-grid reveal-stagger">
        {SERVICES.map(s => (
          <article key={s.num} className="svc">
            <div className="svc-num">{s.num}</div>
            <SvcIcon name={s.icon} />
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <div className="svc-tags">{s.tags.map(t => <Chip key={t}>{t}</Chip>)}</div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="work" data-screen-label="02 Work">
    <div className="wrap">
      <div className="section-head reveal">
        <Eyebrow>01 — Selected Work</Eyebrow>
        <h2>Recent builds, <span className="glow">handpicked</span>.</h2>
        <p className="lead">A short list — not everything I've made, but the ones that capture the practice. Each one starts with a real problem and ends with measured outcomes.</p>
      </div>
      <div className="projects-grid reveal-stagger">
        {PROJECTS.map((p,i) => (
          <article key={i} className={`proj ${p.feat ? "feat" : ""}`}>
            <div className="proj-thumb">
              <ProjectArt variant={p.art} />
              <a href="#contact" className="proj-link" aria-label={`Open ${p.title}`}>
                <Icon name="arrow-ne" size={16} />
              </a>
            </div>
            <div className="proj-meta">
              <div className="proj-meta-row">
                <h3>{p.title}</h3>
                <span className="yr">{p.year}</span>
              </div>
              <p className="desc">{p.desc}</p>
              <div className="tags">{p.tags.map(t => <Chip key={t}>{t}</Chip>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const About = ({ content }) => (
  <section id="about" data-screen-label="04 About">
    <div className="wrap">
      <div className="about">
        <div className="reveal">
          <Eyebrow>03 — About</Eyebrow>
          <h2 style={{marginTop:18}}>A studio of one, deliberately&nbsp;small.</h2>
          <p style={{marginTop:22, fontSize:"clamp(15px,1.1vw,17px)"}}>
            I'm {content.name} — a creative frontend engineer working at the intersection of design, motion and code. I help founders, studios and creative teams ship the websites they actually wish they had: cinematic, fast, and emotionally designed.
          </p>
          <p style={{marginTop:18, fontSize:"clamp(15px,1.1vw,17px)"}}>
            I take on a small handful of projects each quarter so each one gets the obsession it deserves. No agency overhead, no hand-offs — design, motion and engineering, all by the same person.
          </p>
          <div className="about-stats">
            <div className="stat-card"><div className="num"><span>7</span>+ yrs</div><div className="lbl">Frontend craft</div></div>
            <div className="stat-card"><div className="num"><span>62</span></div><div className="lbl">Production builds</div></div>
            <div className="stat-card"><div className="num"><span>14</span></div><div className="lbl">Countries served</div></div>
            <div className="stat-card"><div className="num"><span>4.98</span>/5</div><div className="lbl">Average rating</div></div>
          </div>
        </div>
        <div className="reveal">
          <div className="skills-card">
            <h4>Toolkit</h4>
            <div className="skills-grid">{SKILLS.map(s => <Chip key={s}>{s}</Chip>)}</div>
            <h4>Process</h4>
            <ul style={{margin:0,padding:0,listStyle:"none",display:"grid",gap:10}}>
              {[
                ["01","Discover","30-min call. We pin down the story, the audience, the constraints."],
                ["02","Design","High-fidelity directions in 7–10 days. Motion sketched in real code."],
                ["03","Build","Production frontend, accessible markup, motion choreography baked in."],
                ["04","Ship","Deploy, measure, iterate. 30 days of post-launch polish included."],
              ].map(([n,t,d]) => (
                <li key={n} style={{display:"grid",gridTemplateColumns:"40px 1fr",gap:14,padding:"12px 0",borderTop:"1px solid var(--line)"}}>
                  <div style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--accent-soft)",letterSpacing:".18em"}}>{n}</div>
                  <div>
                    <div style={{fontWeight:500,fontSize:14}}>{t}</div>
                    <div style={{fontSize:13,color:"var(--ink-soft)",marginTop:3}}>{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* Generated SVG portrait avatar — different gradient per hue, no copyrighted images */
const PortraitAvatar = ({ hue = 270, initial = "X" }) => (
  <svg viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id={`pa-${hue}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={`hsl(${hue}, 70%, 64%)`} />
        <stop offset="1" stopColor={`hsl(${(hue+40)%360}, 60%, 32%)`} />
      </linearGradient>
      <radialGradient id={`pl-${hue}`} cx="0.3" cy="0.25" r="0.8">
        <stop offset="0" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    <rect width="80" height="80" rx="40" fill={`url(#pa-${hue})`} />
    <circle cx="40" cy="32" r="11" fill="rgba(255,255,255,0.92)" />
    <path d="M16 72 C 20 56, 60 56, 64 72 Z" fill="rgba(255,255,255,0.92)" />
    <rect width="80" height="80" rx="40" fill={`url(#pl-${hue})`} opacity="0.6" />
    <text x="50%" y="56%" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="11" fontWeight="700" fill={`hsl(${hue}, 80%, 22%)`}>{initial}</text>
  </svg>
);

const Testimonials = () => {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 900 ? 2 : 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const pages = Math.max(1, TESTIMONIALS.length - perView + 1);
  const safePage = Math.min(page, pages - 1);

  useEffect(() => {
    const tr = trackRef.current; if (!tr) return;
    const card = tr.children[0];
    if (!card) return;
    const cardW = card.getBoundingClientRect().width + 18;
    tr.style.transform = `translateX(${-cardW * safePage}px)`;
  }, [safePage, perView]);

  // auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setPage(p => (p + 1) % pages);
    }, 6500);
    return () => clearInterval(id);
  }, [pages]);

  return (
    <section id="testimonials" data-screen-label="05 Reviews">
      <div className="wrap">
        <div className="section-head reveal">
          <Eyebrow>04 — Reviews</Eyebrow>
          <h2>Trusted by teams that <span className="glow">care</span> about craft.</h2>
          <p className="lead">A short sample of what founders, design leads and product directors have said about working together.</p>
        </div>

        <div className="testi-wrap reveal">
          <div className="testi-viewport">
            <div className="testi-track" ref={trackRef}>
              {TESTIMONIALS.map((t,i) => (
                <article key={i} className="testi">
                  <div className="testi-head">
                    <div className="av"><PortraitAvatar hue={t.hue} initial={t.initial} /></div>
                    <div>
                      <div className="name">{t.name}</div>
                      <div className="role">{t.role}</div>
                    </div>
                  </div>
                  <div className="stars">{[...Array(5)].map((_,k)=>(<Icon key={k} name="star" size={13} />))}</div>
                  <p className="quote">{t.body}</p>
                </article>
              ))}
            </div>
          </div>
          <button className="testi-nav prev" aria-label="Previous reviews" onClick={()=>setPage(p => Math.max(0, p-1))} disabled={safePage === 0}>
            <Icon name="arrow" size={16} stroke={1.8} /><span style={{display:"none"}}>prev</span>
          </button>
          <button className="testi-nav next" aria-label="Next reviews" onClick={()=>setPage(p => Math.min(pages-1, p+1))} disabled={safePage >= pages-1}>
            <Icon name="arrow" size={16} stroke={1.8} />
          </button>
          <div className="testi-dots" role="tablist">
            {Array.from({length: pages}).map((_,i) => (
              <button key={i} className={i === safePage ? "active" : ""} aria-label={`Page ${i+1}`} onClick={()=>setPage(i)} role="tab" aria-selected={i===safePage} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ socials }) => {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") || "";
    const subject = encodeURIComponent(`New project inquiry — ${name}`);
    const body = encodeURIComponent(`${data.get("message") || ""}\n\n— ${name}\n${data.get("email") || ""}`);
    setSent(true);
    setTimeout(() => {
      window.location.href = `${socials.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" data-screen-label="06 Contact">
      <div className="wrap">
        <div className="contact-card reveal">
          <div className="contact-grid">
            <div className="contact-side">
              <Eyebrow>05 — Contact</Eyebrow>
              <h2 style={{marginTop:18}}>Have a project<br/>worth obsessing&nbsp;over?</h2>
              <p style={{marginTop:18}}>Currently booking new work for the upcoming quarter. Drop a few details — I usually reply within a day.</p>
              <div className="contact-list">
                <a href={socials.email} aria-label="Email">
                  <span className="ico"><Icon name="mail" size={16} /></span>
                  <span><div className="lbl">Email</div><div className="val">{socials.email.replace("mailto:","")}</div></span>
                </a>
                <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <span className="ico"><Icon name="wa" size={16} /></span>
                  <span><div className="lbl">WhatsApp</div><div className="val">Message instantly</div></span>
                </a>
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <span className="ico"><Icon name="ig" size={16} /></span>
                  <span><div className="lbl">Instagram</div><div className="val">@{socials.igHandle}</div></span>
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" name="name" type="text" required placeholder="Your full name" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" required placeholder="you@studio.com" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="cf-budget">Budget range</label>
                <input id="cf-budget" name="budget" type="text" placeholder="e.g. $8k — $20k" />
              </div>
              <div className="field">
                <label htmlFor="cf-message">Project</label>
                <textarea id="cf-message" name="message" required placeholder="A few lines about timeline, scope and the dream outcome." />
              </div>
              <button type="submit" className="btn btn-primary" style={{justifyContent:"center",marginTop:6}}>
                {sent ? "Opening your mail…" : "Send message"} <Icon name="arrow" size={14} />
              </button>
              <div className={`form-msg ${sent ? "show" : ""}`}>Thanks — we'll continue in your mail client.</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ socials }) => (
  <footer>
    <div className="wrap">
      <div className="mega-mark" aria-hidden="true">JRK</div>
      <div className="footer-grid">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span className="nav-mark" style={{width:32,height:32,borderRadius:10}}>JRK</span>
          <div>
            <div style={{fontFamily:"var(--display)",fontWeight:600,fontSize:14}}>JRK Studio</div>
            <div className="footer-meta">© {new Date().getFullYear()} — All rights reserved.</div>
          </div>
        </div>
        <div className="footer-socials">
          <a className="icon-btn" href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon name="ig" /></a>
          <a className="icon-btn" href={socials.whatsapp}  target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="wa" /></a>
          <a className="icon-btn" href={socials.github}    target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="gh" /></a>
          <a className="icon-btn" href={socials.linkedin}  target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="li" /></a>
          <a className="icon-btn" href={socials.x}         target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"><Icon name="x" /></a>
          <a className="icon-btn" href={socials.email}     aria-label="Email"><Icon name="mail" /></a>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Hero, Marquee, Services, Projects, About, Testimonials, Contact, Footer });
