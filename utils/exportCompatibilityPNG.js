import html2canvas from "html2canvas";

export async function exportCompatibilityPNG({ profileA, profileB, result }) {
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
  card.style.padding = "80px";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.alignItems = "center";
  card.style.justifyContent = "space-between";

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

  const scores = result.scores || {};
  const strengths = result.strengths || [];
  const badges = result.firstImpressions || [];

  const scoresHtml = `
    <div style="width:100%; display:grid; grid-template-columns:1fr 1fr; gap:30px 40px; margin:25px 0; z-index:5; box-sizing:border-box; padding:0 30px;">
      ${[
        { name: "Family Values", score: scores.familyValues || 80 },
        { name: "Communication", score: scores.communication || 80 },
        { name: "Education Info", score: scores.education || 80 },
        { name: "Lifestyle Habits", score: scores.lifestyle || 80 },
        { name: "Career Goals", score: scores.careerGoals || 80 },
        { name: "Religious Outlook", score: scores.religiousOutlook || 80 },
      ].map(metric => `
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:between; font-size:16px; font-weight:700; color:#F5F0E8; letter-spacing:0.5px;">
            <span>${metric.name}</span>
            <span style="color:#C9A84C; margin-left:auto;">${metric.score}%</span>
          </div>
          <div style="width:100%; height:8px; background:rgba(255,255,255,0.06); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.04);">
            <div style="width:${metric.score}%; height:100%; background:linear-gradient(90deg, #E6C56A, #C9A84C); border-radius:10px;"></div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  const strengthsHtml = strengths.length > 0
    ? `<div style="display:flex; flex-direction:column; gap:14px; align-items:flex-start; margin:20px 0; z-index:5; width:100%; padding:0 40px; box-sizing:border-box;">
        ${strengths.slice(0, 3).map(str => `
          <div style="display:flex; align-items:center; gap:14px; font-size:16px; font-weight:600; color:#E6C56A; letter-spacing:0.5px;">
            <span style="font-size:18px;">✨</span>
            <span>${str.replace(/^✓\s*/, "")}</span>
          </div>
        `).join("")}
       </div>`
    : "";

  const badgesHtml = badges.length > 0
    ? `<div style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center; margin:15px 0; max-width:800px; z-index:5;">
        ${badges.slice(0, 4).map(badge => `
          <span style="padding:8px 18px; border-radius:10px; border:1px solid rgba(201,168,76,0.3); background:rgba(201,168,76,0.05); color:#C9A84C; font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">
            ${badge}
          </span>
        `).join("")}
       </div>`
    : "";

  card.innerHTML = `
    ${islamicPattern}

    <!-- Borders -->
    <div style="position:absolute; inset:40px; border:1px solid rgba(201,168,76,0.3); border-radius:36px; pointer-events:none;"></div>
    <div style="position:absolute; inset:52px; border:2.5px solid #C9A84C; border-radius:30px; pointer-events:none; box-shadow:inset 0 0 40px rgba(0,0,0,0.8);"></div>

    <!-- Content -->
    <div style="display:flex; flex-direction:column; align-items:center; z-index:2; width:100%; height:100%; justify-content:space-between; padding:30px 0; box-sizing:border-box;">
      
      <!-- Header Logo -->
      <div style="text-align:center; display:flex; flex-direction:column; align-items:center;">
        <div style="width:80px; height:80px; border-radius:50%; overflow:hidden; border:2px solid #C9A84C; box-shadow:0 0 20px rgba(201,168,76,0.35); margin-bottom:12px; background:#070b16; padding:6px; box-sizing:border-box;">
          <img src="/assets/logo.png" style="width:100%; height:100%; object-fit:contain; display:block;" />
        </div>
        <span style="font-size:14px; font-weight:700; color:#C9A84C; letter-spacing:4px; text-transform:uppercase;">RishtaGPT</span>
        <span style="font-size:10px; font-weight:700; color:rgba(255,255,255,0.4); letter-spacing:2px; text-transform:uppercase; margin-top:4px;">AI Compatibility Report</span>
      </div>

      <!-- Couples Matching Names Card -->
      <div style="display:flex; align-items:center; justify-content:center; gap:25px; margin:20px 0; z-index:5; width:100%;">
        <div style="padding:15px 35px; border-radius:20px; border:1.5px solid rgba(201,168,76,0.3); background:rgba(255,255,255,0.02); font-size:20px; font-weight:700; color:#F5F0E8; min-width:200px; text-align:center;">
          ${profileA.name}
        </div>
        <div style="font-size:26px; font-weight:900; color:#C9A84C; text-shadow:0 0 15px rgba(201,168,76,0.4);">
          &
        </div>
        <div style="padding:15px 35px; border-radius:20px; border:1.5px solid rgba(201,168,76,0.3); background:rgba(255,255,255,0.02); font-size:20px; font-weight:700; color:#F5F0E8; min-width:200px; text-align:center;">
          ${profileB.name}
        </div>
      </div>

      <!-- Compatibility Status -->
      <div style="text-align:center; z-index:5;">
        <span style="font-size:12px; font-weight:800; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:3px;">Compatibility Status</span>
        <div style="font-family:'Playfair Display', serif; font-size:42px; font-weight:800; color:#C9A84C; text-shadow:0 4px 15px rgba(0,0,0,0.6); margin-top:8px;">
          ${result.compatibilityStatus}
        </div>
      </div>

      <!-- Scores Block -->
      ${scoresHtml}

      <!-- Strengths list -->
      ${strengthsHtml}

      <!-- Relationship Headline -->
      <div style="font-family:'Playfair Display', serif; font-style:italic; font-size:26px; color:#C9A84C; font-weight:700; text-align:center; padding:0 60px; line-height:1.45; max-width:900px; z-index:5; text-shadow:0 2px 10px rgba(0,0,0,0.5);">
        “${result.compatibilityHeadline}”
      </div>

      <!-- Badges -->
      ${badgesHtml}

      <!-- Footer URL -->
      <div style="text-align:center; z-index:5; display:flex; flex-direction:column; align-items:center; gap:6px;">
        <div style="width:100px; height:1px; background:rgba(201,168,76,0.35); margin-bottom:4px;"></div>
        <span style="font-size:12px; font-weight:700; color:rgba(255,255,255,0.3); letter-spacing:2px; text-transform:uppercase;">Calculate Yours At</span>
        <span style="font-size:16px; font-weight:700; color:#C9A84C; letter-spacing:1px;">rishtagpt.online</span>
      </div>

    </div>
  `;

  document.body.appendChild(card);

  try {
    const canvas = await html2canvas(card, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#0A0F1E",
      scale: 2, // High resolution double scale (2160 × 3840 px output)
      width: 1080,
      height: 1920
    });

    const imgData = canvas.toDataURL("image/png");
    
    // Trigger download
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `RishtaGPT_Compatibility_${profileA.name}_and_${profileB.name}.png`;
    link.click();
  } catch (error) {
    console.error("[Export PNG Error]:", error);
    throw error;
  } finally {
    document.body.removeChild(card);
  }
}
