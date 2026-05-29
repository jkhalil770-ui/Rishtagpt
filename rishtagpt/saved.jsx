/* Saved bios screen — list, view, delete, share */

function SavedScreen({ onBack, onOpen }) {
  const [bios, setBios] = React.useState(() => RG_Store.listBios());
  const [confirmDel, setConfirmDel] = React.useState(null);

  const remove = (id) => {
    setBios(RG_Store.deleteBio(id));
    setConfirmDel(null);
  };

  const timeAgo = (ts) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60)        return "just now";
    if (diff < 3600)      return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400)     return `${Math.floor(diff/3600)}h ago`;
    if (diff < 86400 * 7) return `${Math.floor(diff/86400)}d ago`;
    return new Date(ts).toLocaleDateString("en-GB");
  };

  return (
    <div className="screen-col">
      <div className="px-5 flex items-center gap-3 pt-1 shrink-0">
        <button onClick={onBack} className="iconbtn" aria-label="Back">
          <Ic.back style={{ width: 18, height: 18 }} />
        </button>
        <div className="text-[12px] uppercase tracking-widest flex-1" style={{ color: "var(--ink-soft)" }}>
          Saved Bios
        </div>
        <div className="text-[11px]" style={{ color: "var(--gold-2)" }}>
          {bios.length}/10
        </div>
      </div>

      <div className="scroll-region screen-anim">
        <div className="px-5 pt-3">
          <h2 className="font-display text-[26px] gold-text leading-tight">
            Mehfooz Bios
          </h2>
          <div className="text-[13px] mt-1" style={{ color: "var(--ink-soft)" }}>
            Your bio history · stored locally on this device.
          </div>
        </div>

        {bios.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-8 text-center py-20">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4"
                 style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold-2)"
                   strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4h12v17l-6-4-6 4V4z"/>
              </svg>
            </div>
            <div className="font-display text-[20px]">No saved bios yet</div>
            <div className="text-[13px] mt-1.5 max-w-[260px]" style={{ color: "var(--ink-soft)" }}>
              Generate a bio and tap <span style={{ color: "var(--gold-2)" }}>Save</span> to keep it here for later.
            </div>
          </div>
        ) : (
          <div className="px-5 pt-5 pb-8 flex flex-col gap-3">
          {bios.map(b => {
            const styleLabel = RG_STYLES.find(s=>s.id===b.style)?.label || b.style;
            const langLabel  = RG_LANGS.find(l=>l.id===b.lang)?.label || b.lang;
            const isUrdu = b.lang === "urdu";
            return (
              <div key={b.id} className="glass-gold p-4 relative">
                <div className="flex items-start gap-3">
                  {b.photo ? (
                    <img src={b.photo} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0"
                         style={{ border: "1px solid rgba(201,168,76,0.4)" }}/>
                  ) : (
                    <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                         style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.3)" }}>
                      <Ic.user style={{ width: 22, height: 22, color: "var(--gold-2)" }}/>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-[14px] truncate">{b.formSnapshot?.name || "Unnamed"}</div>
                      <div className="text-[10px]" style={{ color: "var(--ink-dim)" }}>· {timeAgo(b.createdAt)}</div>
                    </div>
                    <div className="text-[11px]" style={{ color: "var(--ink-soft)" }}>
                      {b.formSnapshot?.age}y · {b.formSnapshot?.city} · {b.formSnapshot?.profession}
                    </div>
                    <div className="flex gap-1.5 mt-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider"
                            style={{ background: "rgba(201,168,76,0.12)", color: "var(--gold-2)", border: "1px solid rgba(201,168,76,0.3)" }}>
                        {styleLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider"
                            style={{ background: "rgba(232,180,160,0.1)", color: "var(--rose)", border: "1px solid rgba(232,180,160,0.3)" }}>
                        {langLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={"mt-3 text-[12px] leading-relaxed " + (isUrdu ? "font-urdu" : "")}
                  style={{
                    color: "var(--ink-soft)",
                    direction: isUrdu ? "rtl" : "ltr",
                    textAlign: isUrdu ? "right" : "left",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {b.text}
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                  <button
                    onClick={() => { navigator.clipboard.writeText(b.text); }}
                    className="flex-1 rounded-lg py-2 text-[12px] font-medium"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--ink)" }}>
                    Copy
                  </button>
                  <button
                    onClick={() => { window.open("https://wa.me/?text=" + encodeURIComponent(b.text), "_blank"); }}
                    className="flex-1 rounded-lg py-2 text-[12px] font-semibold"
                    style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white" }}>
                    Share
                  </button>
                  <button
                    onClick={() => setConfirmDel(b.id)}
                    className="rounded-lg w-9 h-9 flex items-center justify-center"
                    style={{ background: "rgba(255,117,117,0.08)", border: "1px solid rgba(255,117,117,0.25)", color: "#ff9a9a" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>
                    </svg>
                  </button>
                </div>

                {confirmDel === b.id && (
                  <div className="absolute inset-0 rounded-[20px] flex items-center justify-center backdrop-blur-sm"
                       style={{ background: "rgba(10,15,30,0.88)" }}>
                    <div className="text-center px-4">
                      <div className="text-[14px] font-semibold mb-3">Delete this bio?</div>
                      <div className="flex gap-2">
                        <button onClick={()=>setConfirmDel(null)}
                                className="px-4 py-2 rounded-lg text-[12px]"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                          Cancel
                        </button>
                        <button onClick={()=>remove(b.id)}
                                className="px-4 py-2 rounded-lg text-[12px] font-semibold"
                                style={{ background: "#c54848", color: "white" }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          </div>
        )}
      </div>
    </div>
  );
}

window.SavedScreen = SavedScreen;
