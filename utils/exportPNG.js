import html2canvas from "html2canvas";

export async function exportBioPNG({ bio, lang, data, photo }) {
  // Build a hidden off-screen Instagram Story card (1080 × 1920 px)
  const card = document.createElement("div");
  card.style.position = "fixed";
  card.style.left = "-99999px";
  card.style.top = "0";
  card.style.width = "1080px";
  card.style.height = "1920px";
  card.style.background = "#0A0F1E";
  card.style.color = "#F5F0E8";
  card.style.fontFamily = '"DM Sans", system-ui, sans-serif';
  card.style.boxSizing = "border-box";
  card.style.padding = "90px";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.alignItems = "center";
  card.style.justifyContent = "space-between";

  const isUrdu = lang === "urdu";
  const bioLines = bio.split("\n\n");
  // Select first paragraph/blocks to fit neatly on a story
  const bioExcerpt = bioLines.slice(0, 2).join("\n\n");

  const photoBlock = photo
    ? `<div style="width:240px;height:240px;border-radius:50%;overflow:hidden;border:4px solid #C9A84C;box-shadow:0 0 45px rgba(201,168,76,0.45);margin-bottom:30px;flex-shrink:0;">
         <img src="${photo}" style="width:100%;height:100%;object-fit:cover;display:block;" />
       </div>`
    : `<div style="width:240px;height:240px;border-radius:50%;background:rgba(201,168,76,0.1);border:3px dashed rgba(201,168,76,0.45);display:flex;align-items:center;justify-content:center;margin-bottom:30px;color:#C9A84C;flex-shrink:0;">
         <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
           <circle cx="12" cy="7" r="4"/>
         </svg>
       </div>`;

  const islamicPattern = `
    <div style="
      position:absolute;
      inset:0;
      pointer-events:none;
      opacity:0.05;
      background-image:url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><g fill='none' stroke='%23C9A84C' stroke-width='1.2'><polygon points='50,8 60,30 84,30 70,46 76,68 50,58 24,68 30,46 16,30 40,30'/><g transform='translate(50 50)'><polygon points='0,-26 18,-18 26,0 18,18 0,26 -18,18 -26,0 -18,-18' /><polygon points='0,-26 18,-18 26,0 18,18 0,26 -18,18 -26,0 -18,-18' transform='rotate(22.5)'/></g><circle cx='50' cy='50' r='40' opacity='0.5'/></g></svg>&quot;);
      background-size: 150px 150px;
    "></div>
  `;

  card.innerHTML = `
    ${islamicPattern}

    <!-- Double gold thin borders -->
    <div style="
      position:absolute;
      inset:40px;
      border:1px solid rgba(201,168,76,0.3);
      border-radius:36px;
      pointer-events:none;
    "></div>
    <div style="
      position:absolute;
      inset:52px;
      border:2.5px solid #C9A84C;
      border-radius:30px;
      pointer-events:none;
      box-shadow:inset 0 0 40px rgba(0,0,0,0.8);
    "></div>

    <!-- Content Wrapper -->
    <div style="display:flex;flex-direction:column;align-items:center;z-index:2;width:100%;height:100%;justify-content:space-between;padding:50px 0;">
      
      <!-- Top Crest Header -->
      <div style="text-align:center;">
        <svg width="72" height="72" viewBox="0 0 100 100" style="margin-bottom:14px;color:#C9A84C;">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"/>
          <path d="M66 50 a18 18 0 1 1 -25 -16.5 a14.5 14.5 0 0 0 25 16.5 z" fill="currentColor"/>
        </svg>
        <div style="font-family:'Playfair Display',serif;font-size:48px;font-weight:700;letter-spacing:2px;background:linear-gradient(135deg,#E6C56A,#C9A84C);-webkit-background-clip:text;color:transparent;">RishtaGPT</div>
        <div style="font-size:16px;color:#8A8FA8;text-transform:uppercase;letter-spacing:0.25em;margin-top:6px;">Matrimonial Bio Card</div>
      </div>

      <!-- Center Profile + Bio -->
      <div style="display:flex;flex-direction:column;align-items:center;width:100%;max-width:800px;text-align:center;">
        ${photoBlock}
        
        <div style="font-family:'Playfair Display',serif;font-size:24px;color:#C9A84C;font-weight:600;margin-bottom:30px;">
          ${data.name || "Candidate"} · ${data.age || "25"} Yrs · ${data.profession || "Professional"}
        </div>

        <div style="
          font-family:${isUrdu ? `'Noto Nastaliq Urdu', serif` : `'Playfair Display', serif`};
          font-size:${isUrdu ? '32px' : '23px'};
          line-height:${isUrdu ? '2.4' : '1.9'};
          color:#F5F0E8;
          direction:${isUrdu ? 'rtl' : 'ltr'};
          text-align:center;
          white-space:pre-wrap;
          padding:0 30px;
        ">${escapeHTML(bioExcerpt)}</div>
      </div>

      <!-- Bottom Branded watermark -->
      <div style="text-align:center;">
        <div style="font-family:'Playfair Display',serif;font-style:italic;font-size:16px;color:#C9A84C;letter-spacing:1px;font-weight:600;margin-bottom:8px;">
          Written by Artificial Intelligence
        </div>
        <div style="font-size:14px;color:#8A8FA8;letter-spacing:0.08em;">
          Generate yours at <span style="color:#F5F0E8;font-weight:600;">RishtaGPT.online</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(card);

  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await new Promise((r) => setTimeout(r, 400));

    const canvas = await html2canvas(card, {
      scale: 1, // story dimensions are 1080x1920 exactly, scale 1 is standard HD
      useCORS: true,
      backgroundColor: "#0A0F1E",
      logging: false,
      width: 1080,
      height: 1920,
    });

    const imgURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    const safeName = (data.name || "RishtaGPT").replace(/[^a-z0-9_-]/gi, "_");
    link.download = `${safeName}_BioCard.png`;
    link.href = imgURL;
    link.click();
  } finally {
    document.body.removeChild(card);
  }
}

function escapeHTML(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
