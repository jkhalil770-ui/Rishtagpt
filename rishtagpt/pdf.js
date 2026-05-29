/* HD PDF export — uses jsPDF + html2canvas at high scale.
 * Renders an off-DOM A4 sheet with the bio + photo + ornaments, then captures it.
 */
(function () {
  async function exportBioPDF({ bio, lang, data, style, photo }) {
    const { jsPDF } = window.jspdf;

    // Build a hidden off-screen A4 sheet (794 × 1123 px at 96dpi)
    const sheet = document.createElement("div");
    sheet.style.position = "fixed";
    sheet.style.left = "-99999px";
    sheet.style.top  = "0";
    sheet.style.width = "794px";
    sheet.style.minHeight = "1123px";
    sheet.style.background = "linear-gradient(180deg, #fbf5e6 0%, #f5ecd4 100%)";
    sheet.style.color = "#2b2412";
    sheet.style.fontFamily = '"DM Sans", system-ui, sans-serif';
    sheet.style.padding = "56px 56px 64px";
    sheet.style.boxSizing = "border-box";
    sheet.style.position = "fixed";

    const isUrdu = lang === "urdu";
    const langInfo = window.RG_LANGS.find(l => l.id === lang);
    const styleInfo = window.RG_STYLES.find(s => s.id === style);

    const photoBlock = photo
      ? `<div style="width:120px;height:150px;border-radius:10px;overflow:hidden;border:2px solid rgba(201,168,76,0.55);box-shadow:0 8px 24px -8px rgba(0,0,0,0.25);flex-shrink:0;">
           <img src="${photo}" style="width:100%;height:100%;object-fit:cover;display:block;" crossorigin="anonymous" />
         </div>`
      : "";

    const headerOrnament = `
      <div style="display:flex;align-items:center;gap:14px;justify-content:center;margin-bottom:6px;">
        <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#C9A84C);"></div>
        <svg width="40" height="40" viewBox="0 0 100 100" style="flex-shrink:0;">
          <defs>
            <linearGradient id="pdf-gold" x1="10%" x2="90%" y1="0%" y2="100%">
              <stop offset="0%" stop-color="#E6C56A"/>
              <stop offset="100%" stop-color="#8a6f24"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="none" stroke="url(#pdf-gold)" stroke-width="2" opacity="0.6"/>
          <path d="M66 50 a18 18 0 1 1 -25 -16.5 a14.5 14.5 0 0 0 25 16.5 z" fill="url(#pdf-gold)"/>
          <path d="M0 -5 L1.5 -1.6 L5 -1.2 L2.3 1.3 L3 5 L0 3 L-3 5 L-2.3 1.3 L-5 -1.2 L-1.5 -1.6 Z" fill="#fff5cf" transform="translate(66 36)"/>
        </svg>
        <div style="flex:1;height:1px;background:linear-gradient(90deg,#C9A84C,transparent);"></div>
      </div>`;

    const cornerOrn = (pos) => {
      const transforms = {
        tl: "top:24px;left:24px;",
        tr: "top:24px;right:24px;transform:scaleX(-1);",
        bl: "bottom:24px;left:24px;transform:scaleY(-1);",
        br: "bottom:24px;right:24px;transform:scale(-1,-1);",
      };
      return `<svg style="position:absolute;width:42px;height:42px;color:rgba(201,168,76,0.5);${transforms[pos]}" viewBox="0 0 32 32" fill="none">
        <path d="M2 2 L 14 2 M 2 2 L 2 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M2 8 Q 8 8 8 2" stroke="currentColor" stroke-width="1" fill="none"/>
        <path d="M2 18 Q 10 18 10 12 Q 10 4 16 4" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
        <circle cx="8" cy="8" r="1.6" fill="currentColor" opacity="0.8"/>
      </svg>`;
    };

    const facts = [
      ["Name", data.name],
      ["Age", data.age + " years"],
      ["Height", data.height],
      ["City", data.city],
      ["Marital", data.marital || "Never married"],
      ["Degree", data.degree],
      ["Profession", data.profession],
      ["Maslak", data.maslak],
    ].filter(([, v]) => v && v !== "—" && v !== "");

    sheet.innerHTML = `
      <div style="position:relative;border:1.5px solid rgba(201,168,76,0.45);border-radius:18px;padding:42px 44px 38px;min-height:1011px;background:rgba(255,255,255,0.35);box-shadow:inset 0 0 0 1px rgba(255,255,255,0.5);">
        ${cornerOrn("tl")}${cornerOrn("tr")}${cornerOrn("bl")}${cornerOrn("br")}

        ${headerOrnament}

        <div style="text-align:center;">
          <div style="font-family:'Playfair Display',serif;font-size:34px;color:#8a6f24;letter-spacing:0.5px;font-weight:600;">Rishta Bio</div>
          <div style="font-family:'Playfair Display',serif;font-style:italic;font-size:13px;color:#7a6b3d;margin-top:4px;">— ${styleInfo?.label || ""} · ${langInfo?.label || ""} —</div>
        </div>

        ${photo || facts.length
          ? `<div style="display:flex;gap:20px;align-items:flex-start;margin-top:26px;padding:18px 0;border-top:1px solid rgba(201,168,76,0.25);border-bottom:1px solid rgba(201,168,76,0.25);">
               ${photoBlock}
               <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;">
                 ${facts.map(([k, v]) => `
                   <div>
                     <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.12em;color:#a08850;font-weight:600;">${k}</div>
                     <div style="font-size:13px;color:#2b2412;font-weight:500;margin-top:2px;">${v}</div>
                   </div>`).join("")}
               </div>
             </div>`
          : ""}

        <div style="
          margin-top:28px;
          font-family:${isUrdu ? `'Noto Nastaliq Urdu', serif` : `'Playfair Display', serif`};
          font-size:${isUrdu ? '17px' : '14.5px'};
          line-height:${isUrdu ? '2.2' : '1.75'};
          color:#2b2412;
          direction:${isUrdu ? 'rtl' : 'ltr'};
          text-align:${isUrdu ? 'right' : 'left'};
          white-space:pre-wrap;
        ">${escapeHTML(bio)}</div>

        <div style="margin-top:36px;display:flex;align-items:center;justify-content:space-between;padding-top:18px;border-top:1px solid rgba(201,168,76,0.3);">
          <div style="font-family:'Playfair Display',serif;font-style:italic;font-size:11px;color:#a08850;">
            Generated by RishtaGPT · ${new Date().toLocaleDateString("en-GB")}
          </div>
          <div style="display:flex;align-items:center;gap:6px;font-size:10px;color:#a08850;">
            <span style="width:4px;height:4px;border-radius:50%;background:#C9A84C;"></span>
            <span>Confidential · Family use only</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(sheet);

    try {
      // Wait for fonts + image to settle
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await new Promise(r => setTimeout(r, 250));

      const canvas = await window.html2canvas(sheet, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fbf5e6",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const pdfW = pdf.internal.pageSize.getWidth();   // 210
      const pdfH = pdf.internal.pageSize.getHeight();  // 297
      // canvas is 794×N px @ scale 3 → fit width
      const imgW = pdfW;
      const imgH = (canvas.height * imgW) / canvas.width;

      if (imgH <= pdfH) {
        pdf.addImage(imgData, "JPEG", 0, 0, imgW, imgH, undefined, "FAST");
      } else {
        // Multi-page split
        let y = 0;
        while (y < imgH) {
          pdf.addImage(imgData, "JPEG", 0, -y, imgW, imgH, undefined, "FAST");
          y += pdfH;
          if (y < imgH) pdf.addPage();
        }
      }

      const safeName = (data.name || "RishtaGPT").replace(/[^a-z0-9_-]/gi, "_");
      pdf.save(`${safeName}_Rishta_Bio.pdf`);
    } finally {
      document.body.removeChild(sheet);
    }
  }

  function escapeHTML(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  window.RG_PDF = { exportBioPDF };
})();
