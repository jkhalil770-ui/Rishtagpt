import { useState, useRef } from "react";
import { Upload, X, Check, Paperclip, ChevronRight, ChevronLeft, Building2, Briefcase, ClipboardList, BadgeCheck } from "lucide-react";

const UF = '"Noto Nastaliq Urdu","Jameel Noori Nastaleeq",serif';

const UR = {
  "Full Name":"پورا نام","Email Address":"ای میل","WhatsApp":"واٹس ایپ","LinkedIn URL":"لنکڈان",
  "Your Role":"آپ کا عہدہ","Founder Full Name":"بانی کا پورا نام","CNIC / Passport Number":"شناختی کارڈ نمبر",
  "Founder Role":"بانی کا کردار","Your Equity %":"آپ کا حصہ فیصد","Co-Founder Details":"شریک بانی کی تفصیل",
  "Company Name":"کمپنی کا نام","Startup Name":"اسٹارٹ اپ کا نام","Industry":"صنعت","Startup Stage":"اسٹارٹ اپ مرحلہ",
  "Country":"ملک","Team Size":"ٹیم کا حجم","Funding Goal (PKR)":"فنڈنگ ہدف","Company Website":"ویب سائٹ",
  "Registered Address":"رجسٹرڈ پتہ","Brand Name (if different)":"برانڈ نام",
  "Problem Statement":"مسئلے کا بیان","Solution Description":"حل کی تفصیل",
  "Unique Selling Proposition":"منفرد پیشکش","Business Model":"کاروباری ماڈل",
  "Revenue Streams":"آمدنی کے ذرائع","Pricing Structure":"قیمت کا ڈھانچہ",
  "Customer Acquisition Method":"گاہک حصول کا طریقہ","Sales Cycle":"فروخت کا دور",
  "Customer Type":"گاہک کی قسم","TAM (Total Addressable Market)":"کل قابل رسائی بازار",
  "SAM (Serviceable Addressable Market)":"قابل خدمت بازار","SOM (Serviceable Obtainable Market)":"قابل حصول بازار",
  "Market CAGR %":"بازار کی سالانہ ترقی","Market Research Sources":"تحقیقی ذرائع",
  "Top Competitors":"مدمقابل کمپنیاں","Customer Pain Points":"گاہک کے مسائل","Geographic Market":"جغرافیائی بازار",
  "Product Description":"پروڈکٹ کی تفصیل","Demo Link":"ڈیمو لنک","Product / App Link":"پروڈکٹ لنک",
  "Development Stage":"ترقی کا مرحلہ","Product Type":"پروڈکٹ کی قسم","Tech Stack":"ٹیک اسٹیک",
  "Key Features":"اہم خصوصیات","12-Month Roadmap":"12 ماہ کا منصوبہ",
  "Monthly Revenue (PKR)":"ماہانہ آمدنی","Annual Revenue (PKR)":"سالانہ آمدنی",
  "Gross Margin %":"مجموعی منافع","Monthly Burn Rate (PKR)":"ماہانہ اخراجات",
  "Runway (months)":"رن وے (مہینے)","COGS Breakdown":"لاگت کی تفصیل",
  "P&L Statement Status":"منافع و نقصان کی صورتحال","Revenue Projections Status":"آمدنی کی پیش گوئی",
  "Bank Statements Status":"بینک اسٹیٹمنٹ کی صورتحال","Total Users":"کل صارفین",
  "Paying Customers":"ادائیگی کرنے والے گاہک","Customer Acquisition Cost — CAC (PKR)":"گاہک حصول کی لاگت",
  "Customer Lifetime Value — LTV (PKR)":"گاہک کی کل قدر","Monthly Churn %":"ماہانہ چھوڑنے کی شرح",
  "Monthly Retention %":"برقراری کی شرح","MoM Growth %":"ماہ بہ ماہ ترقی",
  "DAU / MAU":"روزانہ / ماہانہ صارفین","NPS Score":"NPS اسکور",
  "Key Clients / Partners":"بڑے کلائنٹس","Key Milestones":"اہم کامیابیاں",
  "Founder Background":"بانی کا پس منظر","Co-Founder Background":"شریک بانی کا پس منظر",
  "Education":"تعلیمی پس منظر","Work Experience":"کام کا تجربہ","Advisors / Board":"مشیران / بورڈ",
  "Team Structure":"ٹیم کا ڈھانچہ","Open Roles / Skill Gaps":"خالی عہدے / ہنر کی کمی",
  "Amount Raising (PKR)":"مطلوبہ سرمایہ","Equity Offered %":"پیش کردہ حصہ فیصد",
  "Pre-Money Valuation (PKR)":"ویلیوایشن","Investment Instrument":"سرمایہ کاری کا ذریعہ",
  "Use of Funds":"فنڈز کا استعمال","Existing Investors":"موجودہ سرمایہ کار",
  "Previous Rounds":"پچھلے راؤنڈز","Grants / Awards":"گرانٹس اور ایوارڈز",
  "Exit Strategy":"خروج کی حکمت عملی","Expected Returns (3–5yr)":"متوقع منافع",
  "Direct Competitors":"براہ راست حریف","Indirect Competitors":"بالواسطہ حریف",
  "Competitive Advantage":"مسابقتی فائدہ","Positioning Statement":"پوزیشننگ بیان",
  "Moat / Defensibility":"برتری اور دفاع","Business Risks":"کاروباری خطرات",
  "Regulatory Risks":"قانونی خطرات","Technical Risks":"تکنیکی خطرات",
  "Team Risks":"ٹیم کے خطرات","Market Risks":"بازار کے خطرات","Risk Mitigation Plans":"خطرات کا حل",
  "SECP Certificate":"ایس ای سی پی سرٹیفکیٹ","MOA / Articles of Association":"میمورنڈم و آرٹیکلز",
  "NTN Certificate":"این ٹی این سرٹیفکیٹ","Sales Tax Registration":"سیلز ٹیکس رجسٹریشن",
  "PSEB Registration":"پی ایس ای بی رجسٹریشن","Sector License":"سیکٹر لائسنس",
  "Shareholders Agreement":"حصص دار معاہدہ","Founder Vesting Agreement":"وسٹنگ معاہدہ",
  "Business Bank Account":"کاروباری بینک اکاؤنٹ","Registered Office Proof":"دفتر کا ثبوت",
  "Services Needed":"مطلوبہ خدمات","Urgency":"فوری ضرورت","How Did You Find Us?":"ہمارے بارے میں کیسے جانا",
  "About Your Startup":"اسٹارٹ اپ کے بارے میں","Investor Type":"سرمایہ کار کی قسم",
  "Years of Experience":"سرمایہ کاری کا تجربہ","Country of Residence":"رہائش کا ملک",
  "Nationality":"قومیت","Organization":"ادارہ / کمپنی","Designation":"عہدہ","Website":"ویب سائٹ",
  "Investment History":"سرمایہ کاری کی تاریخ","Portfolio Companies":"پورٹ فولیو کمپنیاں",
  "Source of Funds":"فنڈز کا ذریعہ","References":"حوالہ جات","Preferred Sectors":"پسندیدہ شعبے",
  "Preferred Stages":"پسندیدہ مراحل","Min Ticket (PKR)":"کم از کم سرمایہ",
  "Max Ticket (PKR)":"زیادہ سے زیادہ سرمایہ","Preferred Instrument":"پسندیدہ ذریعہ",
  "Startup Investing Experience":"اسٹارٹ اپ سرمایہ کاری","Risk Appetite":"خطرہ مول لینا",
  "Investment Horizon":"سرمایہ کاری کا دورانیہ","Sectors to Avoid":"نا پسندیدہ شعبے",
  "Business Model Preference":"پسندیدہ کاروباری ماڈل","Geography Preference":"جغرافیائی ترجیح",
  "Pakistan Market Interest":"پاکستان میں دلچسپی","ESG Preference":"ESG ترجیح",
  "Min Ticket Size (PKR)":"کم از کم ٹکٹ","Max Ticket Size (PKR)":"زیادہ سے زیادہ ٹکٹ",
  "Average Ticket Size (PKR)":"اوسط ٹکٹ","Target Ownership %":"ہدف حصہ فیصد",
  "Follow-On Investing":"فالو آن سرمایہ کاری","Deals Per Year":"سالانہ ڈیلز",
  "Solo or Syndicate":"سولو یا سنڈیکیٹ","Decision Timeline":"فیصلہ کا وقت",
  "Approval Process":"منظوری کا عمل","DD Requirements":"ڈیو ڈیلیجنس ضروریات",
  "Required Documents":"مطلوبہ دستاویزات","Meeting Format":"ملاقات کا طریقہ",
  "Communication Style":"رابطے کا طریقہ","Update Frequency":"اپڈیٹ کی تعدد",
  "Operational Expertise":"آپریشنل مہارت","Industry Connections":"صنعتی رابطے",
  "Global Network":"عالمی نیٹ ورک","Mentorship":"رہنمائی","Board Interest":"بورڈ میں دلچسپی",
  "Hiring Access":"ملازمت رسائی","Distribution Access":"تقسیم رسائی",
  "Preferred Round Size":"پسندیدہ فنڈنگ سائز","Min Traction Required":"کم از کم ترقی",
  "Revenue Stage":"آمدنی کا مرحلہ","Team Requirements":"ٹیم کی ضروریات",
  "Moat Preference":"پسندیدہ برتری","Deal Breakers":"ناقابل قبول شرائط",
};

const IND = ["FinTech","HealthTech","EdTech","AgriTech","SaaS / AI","E-Commerce","Logistics","CleanTech","PropTech","Cybersecurity","Fashion Tech","Construction Tech","Other"];
const STG = ["Idea / Pre-Revenue","MVP / Early Traction","Seed Stage","Series A","Growth Stage"];
const ITP = ["Angel Investor","Family Office","VC Fund","Strategic Investor","Operator Investor","Syndicate Investor","Corporate Investor","HNI"];
const INS = ["Equity","Convertible Note","SAFE","Revenue Share","Flexible"];

// ── FIELD DEFINITIONS ─────────────────────────────────────────────────────────

const STARTUP_BASIC = [
  { sec:"Founder Details / بانی کی تفصیلات", fields:[
    {id:"s1",en:"Full Name",type:"text",req:true,ph:"Muhammad Ali Khan"},
    {id:"s2",en:"Email Address",type:"email",req:true,ph:"03719222195"},
    {id:"s3",en:"WhatsApp",type:"tel",ph:"+92 300 0000000"},
    {id:"s4",en:"LinkedIn URL",type:"url",ph:"linkedin.com/in/yourprofile"},
    {id:"s5",en:"Your Role",type:"sel",opts:["CEO / Founder","Co-Founder CTO","Co-Founder COO","Other"]},
  ]},
  { sec:"Company Details / کمپنی کی تفصیلات", fields:[
    {id:"s6",en:"Company Name",type:"text",req:true},
    {id:"s7",en:"Industry",type:"sel",opts:IND},
    {id:"s8",en:"Startup Stage",type:"sel",opts:STG},
    {id:"s9",en:"Country",type:"text",ph:"Pakistan"},
    {id:"s10",en:"Team Size",type:"sel",opts:["1–3","4–10","11–25","26–50","50+"]},
    {id:"s11",en:"Funding Goal (PKR)",type:"text",ph:"e.g. 50 Lakhs"},
  ]},
  { sec:"Services Required / مطلوبہ خدمات", fields:[
    {id:"s12",en:"Services Needed",type:"chips",opts:["Investor-Ready Profile","Pitch Deck","Financial Model","Market Research","Legal Structuring","Branding & Website","Investor Outreach","Full Package"]},
    {id:"s13",en:"Urgency",type:"sel",opts:["Within 2 weeks","Within 1 month","1–3 months","Just exploring"]},
    {id:"s14",en:"How Did You Find Us?",type:"sel",opts:["LinkedIn","Founder Referral","Social Media","Google Search","Event / Conference","Other"]},
    {id:"s15",en:"About Your Startup",type:"ta",ph:"Brief description and what you need most..."},
  ]},
  { sec:"Document Uploads / دستاویزات اپلوڈ کریں", fields:[
    {id:"su1",en:"Pitch Deck (PDF / PPT)",type:"up",ac:".pdf,.pptx",ph:"پچ ڈیک اپلوڈ کریں / Upload pitch deck"},
    {id:"su2",en:"Company Registration Certificate",type:"up",ac:".pdf,.jpg,.png",ph:"رجسٹریشن سرٹیفکیٹ اپلوڈ کریں / Upload registration"},
    {id:"su3",en:"Any Other Supporting Document",type:"up",ac:".pdf,.doc,.docx,.jpg,.png",ph:"کوئی اور دستاویز / Any other document"},
  ]},
];

const INVESTOR_BASIC = [
  { sec:"Personal Details / ذاتی تفصیلات", fields:[
    {id:"i1",en:"Full Name",type:"text",req:true},
    {id:"i2",en:"Email Address",type:"email",req:true},
    {id:"i3",en:"WhatsApp",type:"tel"},
    {id:"i4",en:"LinkedIn URL",type:"url"},
    {id:"i5",en:"Country of Residence",type:"text"},
    {id:"i6",en:"Nationality",type:"text"},
  ]},
  { sec:"Professional Background / پیشہ ورانہ پس منظر", fields:[
    {id:"i7",en:"Organization",type:"text"},
    {id:"i8",en:"Designation",type:"text"},
    {id:"i9",en:"Investor Type",type:"sel",opts:ITP},
    {id:"i10",en:"Years of Experience",type:"sel",opts:["Just starting","1–3 years","3–7 years","7–15 years","15+ years"]},
  ]},
  { sec:"Investment Preferences / سرمایہ کاری کی ترجیحات", fields:[
    {id:"i11",en:"Preferred Sectors",type:"chips",opts:[...IND,"Open to All"]},
    {id:"i12",en:"Preferred Stages",type:"chips",opts:["Pre-Seed","Seed","Series A","Growth","All Stages"]},
    {id:"i13",en:"Min Ticket (PKR)",type:"text",ph:"e.g. 25 Lakhs"},
    {id:"i14",en:"Max Ticket (PKR)",type:"text",ph:"e.g. 2 Crore"},
    {id:"i15",en:"Preferred Instrument",type:"sel",opts:INS},
    {id:"i16",en:"How Did You Find Us?",type:"sel",opts:["LinkedIn","Referral","Social Media","Google","Event","Other"]},
  ]},
  { sec:"Identity Verification / شناخت کی تصدیق", fields:[
    {id:"iu1",en:"CNIC / Passport Copy",type:"up",ac:".pdf,.jpg,.png",ph:"شناختی کارڈ یا پاسپورٹ اپلوڈ کریں / Upload CNIC or passport",multi:false},
    {id:"iu2",en:"Business Registration (if applicable)",type:"up",ac:".pdf,.jpg,.png",ph:"کاروباری رجسٹریشن اپلوڈ کریں / Upload business registration",multi:false},
  ]},
];

const FULL_STARTUP = [
  { title:"Founder & Company Info", sub:"Stage 1 — بانی اور کمپنی کی بنیادی معلومات", fields:[
    {id:"p1",en:"Founder Full Name",type:"text",req:true},{id:"p2",en:"CNIC / Passport Number",type:"text",req:true},
    {id:"p3",en:"Email Address",type:"email",req:true},{id:"p4",en:"WhatsApp",type:"tel"},
    {id:"p5",en:"LinkedIn URL",type:"url"},{id:"p6",en:"Founder Role",type:"text",ph:"CEO / CTO / COO"},
    {id:"p7",en:"Your Equity %",type:"text",ph:"e.g. 55%"},{id:"p8",en:"Co-Founder Details",type:"ta",ph:"Name — Role — Equity % for each co-founder"},
    {id:"p9",en:"Startup Name",type:"text",req:true},{id:"p10",en:"Brand Name (if different)",type:"text"},
    {id:"p11",en:"Company Website",type:"url"},{id:"p12",en:"Registered Address",type:"text"},
    {id:"p13",en:"Industry",type:"sel",opts:IND},{id:"p14",en:"Startup Stage",type:"sel",opts:STG},
    {id:"p15",en:"Team Size",type:"text",ph:"e.g. 6 full-time, 2 part-time"},
  ]},
  { title:"Legal Structure", sub:"Stage 2 — قانونی ڈھانچہ — ہر دستاویز کی صورتحال اور اپلوڈ", fields:[
    {id:"l1",en:"SECP Certificate",type:"legal"},{id:"l2",en:"MOA / Articles of Association",type:"legal"},
    {id:"l3",en:"NTN Certificate",type:"legal"},{id:"l4",en:"Sales Tax Registration",type:"legal"},
    {id:"l5",en:"PSEB Registration",type:"legal"},{id:"l6",en:"Sector License",type:"legal"},
    {id:"l7",en:"Shareholders Agreement",type:"legal"},{id:"l8",en:"Founder Vesting Agreement",type:"legal"},
    {id:"l9",en:"Business Bank Account",type:"legal"},{id:"l10",en:"Registered Office Proof",type:"legal"},
  ]},
  { title:"Business Fundamentals", sub:"Stage 3 — کاروباری بنیادیں", fields:[
    {id:"b1",en:"Problem Statement",type:"ta",req:true,ph:"What specific problem does your startup solve?"},
    {id:"b2",en:"Solution Description",type:"ta",ph:"How exactly do you solve it?"},
    {id:"b3",en:"Unique Selling Proposition",type:"ta",ph:"What makes you different from every alternative?"},
    {id:"b4",en:"Business Model",type:"sel",opts:["SaaS / Subscription","Marketplace","E-Commerce","Service / Consulting","Freemium","B2B Enterprise","B2C Direct","B2B2C","Hardware + Software","Other"]},
    {id:"b5",en:"Revenue Streams",type:"ta",ph:"List all ways you generate revenue"},
    {id:"b6",en:"Pricing Structure",type:"ta",ph:"How do you price your product?"},
    {id:"b7",en:"Customer Acquisition Method",type:"ta",ph:"How do you acquire customers?"},
    {id:"b8",en:"Sales Cycle",type:"sel",opts:["Same day","1–7 days","1–4 weeks","1–3 months","3–6 months","6+ months"]},
    {id:"b9",en:"Customer Type",type:"sel",opts:["B2B","B2C","B2B2C","Government","Mixed"]},
  ]},
  { title:"Market Research", sub:"Stage 4 — مارکیٹ ریسرچ", fields:[
    {id:"m1",en:"TAM (Total Addressable Market)",type:"text",ph:"e.g. $2.5 Billion"},
    {id:"m2",en:"SAM (Serviceable Addressable Market)",type:"text",ph:"e.g. $400 Million"},
    {id:"m3",en:"SOM (Serviceable Obtainable Market)",type:"text",ph:"e.g. $25 Million"},
    {id:"m4",en:"Market CAGR %",type:"text",ph:"e.g. 23% annually"},
    {id:"m5",en:"Market Research Sources",type:"ta",ph:"Statista, World Bank, GSMA, custom research..."},
    {id:"m6",en:"Top Competitors",type:"ta",ph:"Name and brief description of each competitor"},
    {id:"m7",en:"Customer Pain Points",type:"ta",ph:"Top 3 pain points your customers face"},
    {id:"m8",en:"Geographic Market",type:"text",ph:"e.g. Pakistan initially, GCC expansion Year 2"},
  ]},
  { title:"Product Information", sub:"Stage 5 — پروڈکٹ کی معلومات + اسکرین شاٹس اپلوڈ", fields:[
    {id:"pr1",en:"Product Description",type:"ta",req:true,ph:"Detailed description of your product / service"},
    {id:"pr2",en:"Demo Link",type:"url",ph:"Live app / video demo / prototype link"},
    {id:"pr3",en:"Product / App Link",type:"url",ph:"Website or app store link"},
    {id:"pr4",en:"Development Stage",type:"sel",opts:["Concept / Wireframes","Prototype / MVP","Beta Testing","Live — Early Users","Live — Scaling"]},
    {id:"pr5",en:"Product Type",type:"sel",opts:["Web App","Mobile App iOS","Mobile App Android","Both Platforms","SaaS Platform","Hardware","Hardware + Software","Marketplace","API / B2B Tool"]},
    {id:"pr6",en:"Tech Stack",type:"text",ph:"e.g. React, Node.js, PostgreSQL, AWS"},
    {id:"pr7",en:"Key Features",type:"ta",ph:"List your top 5–7 product features"},
    {id:"pr8",en:"12-Month Roadmap",type:"ta",ph:"Key milestones and features you plan to build"},
    {id:"pr9",en:"Product Screenshots / Demo Video",type:"up",ac:".jpg,.png,.pdf,.mp4,.zip",ph:"اسکرین شاٹس، ڈیمو ویڈیو، UI موکپس اپلوڈ کریں / Upload screenshots or demo"},
    {id:"pr10",en:"Technical Documentation",type:"up",ac:".pdf,.doc,.docx",ph:"تکنیکی دستاویزات اپلوڈ کریں / Upload technical docs (optional)"},
  ]},
  { title:"Financial Structure", sub:"Stage 6 — مالی ڈھانچہ + مالی دستاویزات اپلوڈ", fields:[
    {id:"f1",en:"Monthly Revenue (PKR)",type:"text",ph:"e.g. 8,50,000"},{id:"f2",en:"Annual Revenue (PKR)",type:"text"},
    {id:"f3",en:"Gross Margin %",type:"text",ph:"e.g. 68%"},{id:"f4",en:"Monthly Burn Rate (PKR)",type:"text"},
    {id:"f5",en:"Runway (months)",type:"text"},{id:"f6",en:"COGS Breakdown",type:"ta",ph:"Hosting, salaries, raw materials, logistics..."},
    {id:"f7",en:"P&L Statement Status",type:"sel",opts:["Ready to share","Needs cleanup","Partially available","Not prepared"]},
    {id:"f8",en:"Revenue Projections Status",type:"sel",opts:["Complete 3-year model ready","Rough estimates only","Not prepared"]},
    {id:"f9",en:"Bank Statements Status",type:"sel",opts:["Last 12 months available","Last 6 months","Partial","Not available"]},
    {id:"fu1",en:"P&L Statement Upload",type:"up",ac:".pdf,.xlsx,.xls",ph:"منافع و نقصان بیان اپلوڈ کریں / Upload P&L statement"},
    {id:"fu2",en:"Bank Statements Upload",type:"up",ac:".pdf,.zip",ph:"بینک اسٹیٹمنٹس اپلوڈ کریں / Upload last 12 months bank statements"},
    {id:"fu3",en:"Financial Projections Upload",type:"up",ac:".xlsx,.xls,.pdf",ph:"مالی پیش گوئی اپلوڈ کریں / Upload 3-year financial model"},
    {id:"fu4",en:"Cap Table Upload",type:"up",ac:".pdf,.xlsx",ph:"حصص کا جدول اپلوڈ کریں / Upload cap table document"},
  ]},
  { title:"Traction & Metrics", sub:"Stage 7 — کارکردگی اور اعداد و شمار", fields:[
    {id:"t1",en:"Total Users",type:"text"},{id:"t2",en:"Paying Customers",type:"text"},
    {id:"t3",en:"Customer Acquisition Cost — CAC (PKR)",type:"text"},{id:"t4",en:"Customer Lifetime Value — LTV (PKR)",type:"text"},
    {id:"t5",en:"Monthly Churn %",type:"text"},{id:"t6",en:"Monthly Retention %",type:"text"},
    {id:"t7",en:"MoM Growth %",type:"text"},{id:"t8",en:"DAU / MAU",type:"text",ph:"e.g. 32%"},
    {id:"t9",en:"NPS Score",type:"text"},{id:"t10",en:"Key Clients / Partners",type:"ta"},
    {id:"t11",en:"Key Milestones",type:"ta"},
  ]},
  { title:"Team Structure", sub:"Stage 8 — ٹیم کا ڈھانچہ + CVs اپلوڈ کریں", fields:[
    {id:"tm1",en:"Founder Background",type:"ta",ph:"Education, previous companies, key achievements"},
    {id:"tm2",en:"Co-Founder Background",type:"ta",ph:"Education, experience, role"},
    {id:"tm3",en:"Education",type:"ta",ph:"Team degrees, universities, certifications"},
    {id:"tm4",en:"Work Experience",type:"ta",ph:"Relevant industry and startup experience"},
    {id:"tm5",en:"Advisors / Board",type:"ta",ph:"Name — Background — Role in company"},
    {id:"tm6",en:"Team Structure",type:"ta",ph:"Who does what — key roles and responsibilities"},
    {id:"tm7",en:"Open Roles / Skill Gaps",type:"ta",ph:"What key positions are you hiring for?"},
    {id:"tmu1",en:"Founder CV / Resume",type:"up",ac:".pdf,.doc,.docx",multi:false,ph:"بانی کا CV اپلوڈ کریں / Upload founder resume"},
    {id:"tmu2",en:"Co-Founder CV / Resume",type:"up",ac:".pdf,.doc,.docx",multi:false,ph:"شریک بانی کا CV اپلوڈ کریں / Upload co-founder resume"},
    {id:"tmu3",en:"Team Org Chart",type:"up",ac:".pdf,.jpg,.png",multi:false,ph:"ٹیم چارٹ اپلوڈ کریں / Upload org chart if available"},
  ]},
  { title:"Investment Structure", sub:"Stage 9 — سرمایہ کاری کا ڈھانچہ + پچ ڈیک اپلوڈ", fields:[
    {id:"i1",en:"Amount Raising (PKR)",type:"text",req:true,ph:"e.g. 75 Lakhs"},
    {id:"i2",en:"Equity Offered %",type:"text",ph:"e.g. 15%"},
    {id:"i3",en:"Pre-Money Valuation (PKR)",type:"text",ph:"e.g. 4.25 Crore"},
    {id:"i4",en:"Investment Instrument",type:"sel",opts:INS},
    {id:"i5",en:"Use of Funds",type:"ta",ph:"e.g. 40% product dev, 35% sales & marketing, 25% operations"},
    {id:"i6",en:"Existing Investors",type:"ta",ph:"Name — Amount invested — % held"},
    {id:"i7",en:"Previous Rounds",type:"ta",ph:"Date — Amount — Type — Investor name"},
    {id:"i8",en:"Grants / Awards",type:"ta",ph:"SMEDA, Ignite, LUMS incubator grants..."},
    {id:"i9",en:"Exit Strategy",type:"sel",opts:["Strategic Acquisition","IPO","Management Buyout","Secondary Sale","Not yet defined"]},
    {id:"i10",en:"Expected Returns (3–5yr)",type:"text",ph:"e.g. 3–5x return within 4 years"},
    {id:"iu1",en:"Investor Pitch Deck",type:"up",ac:".pdf,.pptx",multi:false,ph:"سرمایہ کاروں کا پچ ڈیک اپلوڈ کریں / Upload investor pitch deck"},
    {id:"iu2",en:"Existing Investment Agreements",type:"up",ac:".pdf,.doc,.docx",ph:"موجودہ سرمایہ کاری معاہدات اپلوڈ کریں / Upload existing agreements if any"},
  ]},
  { title:"Competitive Landscape", sub:"Stage 10 — مسابقتی منظرنامہ", fields:[
    {id:"c1",en:"Direct Competitors",type:"ta",ph:"Name — website — brief description of each"},
    {id:"c2",en:"Indirect Competitors",type:"ta",ph:"Alternatives customers currently use"},
    {id:"c3",en:"Competitive Advantage",type:"ta",ph:"Why you win against each competitor"},
    {id:"c4",en:"Positioning Statement",type:"ta",ph:"We are the only [X] that [Y] for [Z], unlike [competitor]"},
    {id:"c5",en:"Moat / Defensibility",type:"ta",ph:"Network effects, proprietary data, IP, switching costs, brand..."},
  ]},
  { title:"Risk Documentation", sub:"Stage 11 — خطرات کی دستاویزات", fields:[
    {id:"r1",en:"Business Risks",type:"ta",ph:"e.g. Revenue concentration, market timing"},
    {id:"r2",en:"Regulatory Risks",type:"ta",ph:"e.g. SBP licensing changes, data privacy laws"},
    {id:"r3",en:"Technical Risks",type:"ta",ph:"e.g. Scalability, cybersecurity, tech debt"},
    {id:"r4",en:"Team Risks",type:"ta",ph:"e.g. Key person dependency, hiring gaps"},
    {id:"r5",en:"Market Risks",type:"ta",ph:"e.g. Economic downturn, competitor funding"},
    {id:"r6",en:"Risk Mitigation Plans",type:"ta",ph:"Specific plan for managing each risk listed above"},
  ]},
];

const FULL_INVESTOR = [
  { title:"Investor Identity", sub:"Stage 1 — سرمایہ کار کی بنیادی معلومات", fields:[
    {id:"ip1",en:"Full Name",type:"text",req:true},{id:"ip2",en:"Country of Residence",type:"text"},
    {id:"ip3",en:"Nationality",type:"text"},{id:"ip4",en:"Email Address",type:"email",req:true},
    {id:"ip5",en:"WhatsApp",type:"tel"},{id:"ip6",en:"LinkedIn URL",type:"url"},
    {id:"ip7",en:"Organization",type:"text"},{id:"ip8",en:"Designation",type:"text"},{id:"ip9",en:"Website",type:"url"},
  ]},
  { title:"Verification & Background", sub:"Stage 2 — تصدیق اور شناخت + دستاویزات اپلوڈ کریں", fields:[
    {id:"iv1",en:"CNIC / Passport Copy",type:"up",ac:".pdf,.jpg,.png",multi:false,ph:"شناختی کارڈ یا پاسپورٹ اپلوڈ کریں / Upload clear scan of CNIC or passport"},
    {id:"iv2",en:"Business Registration Document",type:"up",ac:".pdf,.jpg,.png",multi:false,ph:"کاروباری رجسٹریشن اپلوڈ کریں / Upload business registration if corporate"},
    {id:"iv3",en:"Investment History",type:"ta",ph:"Previous startup investments — company, year, amount invested"},
    {id:"iv4",en:"Portfolio Companies",type:"ta",ph:"Companies you currently hold equity in"},
    {id:"iv5",en:"Source of Funds",type:"sel",opts:["Personal Savings","Business Profits","Family Office","Fund Capital","Syndicate Pool","Prefer Not to Disclose"]},
    {id:"iv6",en:"References",type:"ta",ph:"1–2 references who can vouch for your investment history (optional)"},
  ]},
  { title:"Investment Profile", sub:"Stage 3 — سرمایہ کاری کا پروفائل", fields:[
    {id:"ii1",en:"Investor Type",type:"sel",opts:ITP},
    {id:"ii2",en:"Years of Experience",type:"sel",opts:["Just starting","1–3 years","3–7 years","7–15 years","15+ years"]},
    {id:"ii3",en:"Startup Investing Experience",type:"sel",opts:["No prior startup investments","1–3 years","3–7 years","7+ years"]},
    {id:"ii4",en:"Preferred Stages",type:"chips",opts:["Pre-Seed","Seed","Series A","Series B+","All Stages"]},
    {id:"ii5",en:"Risk Appetite",type:"sel",opts:["Conservative (revenue required)","Moderate (some traction required)","Aggressive (early stage OK)","Very Aggressive (concept OK)"]},
    {id:"ii6",en:"Investment Horizon",type:"sel",opts:["1–2 years","3–5 years","5–7 years","7+ years (patient capital)"]},
  ]},
  { title:"Sector & Market Preferences", sub:"Stage 4 — شعبے اور بازار کی ترجیحات", fields:[
    {id:"sp1",en:"Preferred Sectors",type:"chips",opts:[...IND,"Open to All"]},
    {id:"sp2",en:"Sectors to Avoid",type:"ta",ph:"Industries or business types you will not invest in"},
    {id:"sp3",en:"Business Model Preference",type:"chips",opts:["SaaS / Subscription","Marketplace","B2B Enterprise","B2C Consumer","Hardware + Software","Impact / ESG","All Models"]},
    {id:"sp4",en:"Geography Preference",type:"chips",opts:["Pakistan only","Pakistan + GCC","Pakistan + South Asia","Global","Anywhere"]},
    {id:"sp5",en:"Pakistan Market Interest",type:"sel",opts:["Primary focus","Strong interest","Moderate interest","Opportunistic only"]},
    {id:"sp6",en:"ESG Preference",type:"sel",opts:["Primary mandate — impact focus","Strong preference","Nice to have","No preference"]},
  ]},
  { title:"Capital Structure", sub:"Stage 5 — سرمائے کا ڈھانچہ", fields:[
    {id:"cs1",en:"Min Ticket Size (PKR)",type:"text",ph:"e.g. 25 Lakhs"},{id:"cs2",en:"Max Ticket Size (PKR)",type:"text",ph:"e.g. 2 Crore"},
    {id:"cs3",en:"Average Ticket Size (PKR)",type:"text"},{id:"cs4",en:"Target Ownership %",type:"text",ph:"e.g. 5–15%"},
    {id:"cs5",en:"Follow-On Investing",type:"sel",opts:["Yes — regularly follow on","Yes — selectively","Unlikely","No"]},
    {id:"cs6",en:"Deals Per Year",type:"sel",opts:["1–2 deals","3–5 deals","5–10 deals","10+ deals"]},
    {id:"cs7",en:"Solo or Syndicate",type:"sel",opts:["Solo investor only","Prefer solo, open to syndicate","Prefer syndicate","Flexible"]},
    {id:"cs8",en:"Preferred Instrument",type:"sel",opts:INS},
  ]},
  { title:"Decision Process", sub:"Stage 6 — فیصلہ سازی کا عمل", fields:[
    {id:"dp1",en:"Decision Timeline",type:"sel",opts:["Under 1 week","2–4 weeks","1–2 months","2–4 months","4+ months"]},
    {id:"dp2",en:"Approval Process",type:"sel",opts:["Self-deciding","Family discussion required","Investment Committee (IC)","LP approval required","Board approval required"]},
    {id:"dp3",en:"DD Requirements",type:"ta",ph:"What do you need to see before committing? e.g. audited financials, product demo, reference calls"},
    {id:"dp4",en:"Required Documents",type:"ta",ph:"List all documents you need before investing"},
    {id:"dp5",en:"Meeting Format",type:"sel",opts:["In-person only","Video call preferred","Either is fine","Start with email / teaser"]},
    {id:"dp6",en:"Communication Style",type:"sel",opts:["Email","WhatsApp","Phone calls","Email then call","Flexible"]},
    {id:"dp7",en:"Update Frequency",type:"sel",opts:["Monthly updates","Quarterly updates","Semi-annually","Major events only","No preference"]},
  ]},
  { title:"Strategic Value", sub:"Stage 7 — سرمائے سے ہٹ کر آپ کی قدر", fields:[
    {id:"sv1",en:"Operational Expertise",type:"ta",ph:"Industries and business functions where you can actively add value"},
    {id:"sv2",en:"Industry Connections",type:"ta",ph:"Key networks you can open — corporate, banks, government, etc."},
    {id:"sv3",en:"Global Network",type:"ta",ph:"Countries and organizations you have access to internationally"},
    {id:"sv4",en:"Mentorship",type:"sel",opts:["Yes — active mentor / regular guidance","Occasionally when needed","No — capital only"]},
    {id:"sv5",en:"Board Interest",type:"sel",opts:["Board seat preferred","Advisory role OK","Observer seat only","No involvement preferred"]},
    {id:"sv6",en:"Hiring Access",type:"ta",ph:"Can you help portfolio companies hire key talent?"},
    {id:"sv7",en:"Distribution Access",type:"ta",ph:"Can you open customer or distribution channels for portfolio startups?"},
  ]},
  { title:"Deal Flow Preferences", sub:"Stage 8 — آپ کس طرح کے اسٹارٹ اپ دیکھنا چاہتے ہیں", fields:[
    {id:"df1",en:"Preferred Round Size",type:"text",ph:"e.g. Total round size PKR 50 Lakhs – 1.5 Crore"},
    {id:"df2",en:"Min Traction Required",type:"ta",ph:"e.g. 10% MoM growth, 6+ months runway, paying customers"},
    {id:"df3",en:"Revenue Stage",type:"sel",opts:["Pre-revenue OK","Some revenue required","Min PKR 1L MRR","Min PKR 5L MRR","Min PKR 15L MRR","Must be profitable"]},
    {id:"df4",en:"Team Requirements",type:"ta",ph:"e.g. Technical co-founder required, full-time founders only"},
    {id:"df5",en:"Moat Preference",type:"chips",opts:["Network Effects","Proprietary IP / Patent","Exclusive Partnerships","Data Advantage","Brand / Community","Regulatory License","No preference"]},
    {id:"df6",en:"Deal Breakers",type:"ta",ph:"What automatically disqualifies a startup from your consideration?"},
  ]},
  { title:"NDA & Confidentiality", sub:"Stage 9 — رازداری اور شرائط کی قبولیت", fields:[
    {id:"nda1",en:"I will maintain full confidentiality of all startup information shared by Marhaba Traders",type:"agree"},
    {id:"nda2",en:"I understand that startup financials, IP, and strategy are shared under strict NDA terms",type:"agree"},
    {id:"nda3",en:"I will not contact any Marhaba Traders startup directly without Marhaba Traders coordination",type:"agree"},
    {id:"nda4",en:"I will not share startup information with any third party without prior written consent",type:"agree"},
    {id:"nda5",en:"I understand Marhaba Traders curates deal flow and not every startup will match my criteria",type:"agree"},
    {id:"nda6",en:"I commit to providing structured written feedback after every startup introduction",type:"agree"},
  ]},
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function BiLabel({ en, required }) {
  const ur = UR[en];
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", lineHeight: 1.4 }}>
        {en}{required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
      </div>
      {ur && (
        <div style={{ fontSize: 12, color: "#64748b", direction: "rtl", textAlign: "right", fontFamily: UF, lineHeight: 1.7, marginTop: 2 }}>
          {ur}
        </div>
      )}
    </div>
  );
}

function UploadField({ def, val, onChange }) {
  const ref = useRef(null);
  const files = val || [];
  const onFile = e => { onChange([...files, ...Array.from(e.target.files).map(f => f.name)]); e.target.value = ""; };
  const rm = i => onChange(files.filter((_, x) => x !== i));
  return (
    <div>
      <div onClick={() => ref.current?.click()} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 14px", border: "2px dashed #93c5fd", borderRadius: 8, background: "#f0f9ff", transition: "all .15s" }}>
        <Upload size={18} color="#3b82f6" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "#2563eb", fontWeight: 500 }}>{def.ph || "Click to upload / فائل اپلوڈ کریں"}</div>
          {def.ac && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>Accepted: {def.ac}</div>}
        </div>
      </div>
      <input ref={ref} type="file" style={{ display: "none" }} onChange={onFile} multiple={def.multi !== false} accept={def.ac || ".pdf,.doc,.docx,.xlsx,.jpg,.png"} />
      {files.length > 0 && (
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Paperclip size={13} color="#3b82f6" />
                <span style={{ fontSize: 12, color: "#1d4ed8", wordBreak: "break-all" }}>{f}</span>
              </div>
              <button onClick={() => rm(i)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#94a3b8", padding: "0 0 0 8px" }}>
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LegalField({ def, val, onChange }) {
  const v = val || {};
  const ref = useRef(null);
  const onFile = e => { const f = e.target.files[0]; if (f) onChange({ ...v, fn: f.name }); };
  const ur = UR[def.en];
  const STATUS = [["Exists","#16a34a","#f0fdf4","#dcfce7"],["Missing","#dc2626","#fef2f2","#fee2e2"],["N/A","#6b7280","#f9fafb","#f3f4f6"]];
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 14px", background: "white", marginBottom: 2 }}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{def.en}</div>
        {ur && <div style={{ fontSize: 11, color: "#64748b", direction: "rtl", textAlign: "right", fontFamily: UF, lineHeight: 1.6 }}>{ur}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {STATUS.map(([o, col, bg, bd]) => {
            const on = v.s === o;
            return (
              <button key={o} type="button" onClick={() => onChange({ ...v, s: on ? null : o })}
                style={{ padding: "4px 12px", borderRadius: 20, border: `1.5px solid ${on ? col : "#e2e8f0"}`, background: on ? bg : "white", color: on ? col : "#94a3b8", cursor: "pointer", fontSize: 12, fontWeight: on ? 700 : 400, display: "flex", alignItems: "center", gap: 4 }}>
                {o === "Exists" && <Check size={11} />}{o === "Missing" && <X size={11} />}{o}
              </button>
            );
          })}
        </div>
        <div onClick={() => ref.current?.click()} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", padding: "4px 12px", border: `1.5px dashed ${v.fn ? "#3b82f6" : "#cbd5e0"}`, borderRadius: 20, fontSize: 12, color: v.fn ? "#2563eb" : "#94a3b8", background: v.fn ? "#eff6ff" : "#fafafa" }}>
          {v.fn ? <Paperclip size={12} color="#3b82f6" /> : <Upload size={12} color="#94a3b8" />}
          <span>{v.fn || "Upload document / دستاویز اپلوڈ کریں"}</span>
        </div>
        <input ref={ref} type="file" style={{ display: "none" }} onChange={onFile} accept=".pdf,.jpg,.png,.doc,.docx" />
      </div>
    </div>
  );
}

function Field({ def, val, onChange }) {
  const base = { width: "100%", padding: "8px 10px", border: "1px solid #e2e8f0", borderRadius: 7, fontSize: 13, background: "white", fontFamily: "inherit", boxSizing: "border-box" };
  if (def.type === "up") return <UploadField def={def} val={val} onChange={onChange} />;
  if (def.type === "legal") return <LegalField def={def} val={val} onChange={onChange} />;
  if (["text","email","tel","url"].includes(def.type))
    return <input type={def.type} placeholder={def.ph || ""} value={val || ""} onChange={e => onChange(e.target.value)} style={base} />;
  if (def.type === "ta")
    return <textarea placeholder={def.ph || ""} value={val || ""} onChange={e => onChange(e.target.value)} rows={3} style={{ ...base, resize: "vertical" }} />;
  if (def.type === "sel")
    return <select value={val || ""} onChange={e => onChange(e.target.value)} style={base}>
      <option value="">Select... / منتخب کریں</option>
      {(def.opts || []).map(o => <option key={o}>{o}</option>)}
    </select>;
  if (def.type === "chips") {
    const sel = val || [];
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 4 }}>
        {(def.opts || []).map(o => {
          const on = sel.includes(o);
          return <button key={o} type="button" onClick={() => onChange(on ? sel.filter(s => s !== o) : [...sel, o])}
            style={{ padding: "5px 13px", borderRadius: 20, border: `1.5px solid ${on ? "#3b82f6" : "#e2e8f0"}`, background: on ? "#eff6ff" : "white", color: on ? "#2563eb" : "#64748b", cursor: "pointer", fontSize: 12, fontWeight: on ? 600 : 400 }}>{o}</button>;
        })}
      </div>
    );
  }
  if (def.type === "agree") {
    return (
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${val ? "#16a34a" : "#e2e8f0"}`, background: val ? "#f0fdf4" : "white", transition: "all .15s" }}>
        <input type="checkbox" checked={val || false} onChange={e => onChange(e.target.checked)} style={{ marginTop: 3, flexShrink: 0, accentColor: "#16a34a" }} />
        <span style={{ fontSize: 13, color: val ? "#15803d" : "#374151", lineHeight: 1.6 }}>{def.en}</span>
      </label>
    );
  }
  return null;
}

function Grid({ fields, fd, upd }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {fields.map(f => {
        const full = ["ta","chips","legal","up","agree"].includes(f.type);
        return (
          <div key={f.id} style={{ gridColumn: full ? "1/-1" : "auto" }}>
            {!["agree","legal"].includes(f.type) && <BiLabel en={f.en} required={f.req} />}
            <Field def={f} val={fd[f.id]} onChange={v => upd(f.id, v)} />
          </div>
        );
      })}
    </div>
  );
}

function Done({ onReset }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f0fdf4", border: "2px solid #86efac", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Check size={32} color="#16a34a" />
      </div>
      <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#15803d" }}>Submitted Successfully</h3>
      <p style={{ fontSize: 14, color: "#16a34a", fontFamily: UF, direction: "rtl", margin: "0 0 6px" }}>کامیابی سے جمع ہوگیا</p>
      <p style={{ color: "#64748b", fontSize: 13, margin: "0 0 20px" }}>Marhaba Traders will review your submission and contact you within 48 hours.</p>
      <button onClick={onReset} style={{ padding: "9px 24px", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, background: "white", color: "#374151" }}>Submit Another</button>
    </div>
  );
}

function SectionForm({ sections, fd, setFd, title, urTitle, desc }) {
  const [done, setDone] = useState(false);
  const upd = (id, v) => setFd(p => ({ ...p, [id]: v }));
  if (done) return <Done onReset={() => setDone(false)} />;
  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ margin: "0 0 3px", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{title}</h3>
        <p style={{ margin: "0 0 2px", fontSize: 13, fontFamily: UF, color: "#3b82f6", direction: "rtl", textAlign: "right" }}>{urTitle}</p>
        <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>{desc}</p>
      </div>
      {sections.map(s => (
        <div key={s.sec} style={{ marginBottom: "1.25rem", background: "white", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "1.25rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
            <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{s.sec}</h4>
          </div>
          <Grid fields={s.fields} fd={fd} upd={upd} />
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
        <button onClick={() => setDone(true)} style={{ padding: "10px 28px", background: "#0f172a", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          Submit <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function StepForm({ sections, fd, setFd, title, urTitle, desc }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const total = sections.length;
  const upd = (id, v) => setFd(p => ({ ...p, [id]: v }));
  const sec = sections[step];
  if (done) return <Done onReset={() => { setDone(false); setStep(0); }} />;
  return (
    <div>
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <h3 style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{title}</h3>
            <p style={{ margin: "0 0 2px", fontSize: 12, fontFamily: UF, color: "#3b82f6", direction: "rtl" }}>{urTitle}</p>
            <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>{desc}</p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#3b82f6" }}>{step + 1} / {total}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>{Math.round(((step+1)/total)*100)}% done</div>
          </div>
        </div>
        <div style={{ height: 5, background: "#f1f5f9", borderRadius: 3, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ height: "100%", width: `${((step+1)/total)*100}%`, background: "linear-gradient(90deg,#3b82f6,#6366f1)", borderRadius: 3, transition: "width .3s" }} />
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
          {sections.map((s, i) => (
            <button key={i} type="button" onClick={() => setStep(i)}
              style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 4, padding: "4px 11px", borderRadius: 20,
                border: `1.5px solid ${i === step ? "#3b82f6" : i < step ? "#16a34a" : "#e2e8f0"}`,
                background: i === step ? "#eff6ff" : i < step ? "#f0fdf4" : "white",
                color: i === step ? "#2563eb" : i < step ? "#15803d" : "#94a3b8",
                fontSize: 11, cursor: "pointer", fontWeight: i === step ? 700 : 400 }}>
              {i < step && <Check size={10} />}{i + 1}. {s.title}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "1.25rem", marginBottom: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: "1px solid #f1f5f9" }}>
          <h4 style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{sec.title}</h4>
          {sec.sub && <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>{sec.sub}</p>}
        </div>
        <Grid fields={sec.fields} fd={fd} upd={upd} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: step === 0 ? "default" : "pointer", opacity: step === 0 ? 0.3 : 1, fontSize: 13, background: "white", fontWeight: 600, color: "#374151" }}>
          <ChevronLeft size={15} /> Back
        </button>
        {step < total - 1
          ? <button onClick={() => setStep(s => s + 1)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 22px", background: "#3b82f6", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              Next <ChevronRight size={15} />
            </button>
          : <button onClick={() => setDone(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 24px", background: "#0f172a", color: "white", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              Submit Profile <ChevronRight size={15} />
            </button>
        }
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState(0);
  const [fd1, sf1] = useState({});
  const [fd2, sf2] = useState({});
  const [fd3, sf3] = useState({});
  const [fd4, sf4] = useState({});

  const TABS = [
    { en: "Startup Onboarding", ur: "اسٹارٹ اپ رجسٹریشن", sub: "Basic intake + uploads", Icon: Building2 },
    { en: "Investor Onboarding", ur: "سرمایہ کار رجسٹریشن", sub: "Basic intake + KYC", Icon: Briefcase },
    { en: "Full Client Profile", ur: "مکمل کلائنٹ پروفائل", sub: "11 sections · all docs", Icon: ClipboardList },
    { en: "Full Investor Profile", ur: "مکمل سرمایہ کار پروفائل", sub: "9 sections · all docs", Icon: BadgeCheck },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 880, margin: "0 auto", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1.5px solid #e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>Marhaba Traders</span>
          <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 20, border: "1px solid #e2e8f0", color: "#64748b", fontWeight: 500 }}>Forms System</span>
          <span style={{ fontSize: 12, padding: "2px 9px", borderRadius: 20, border: "1px solid #bfdbfe", color: "#3b82f6", fontFamily: UF, direction: "rtl" }}>دو لسانی نظام</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>All forms are bilingual — English + اردو · Lahore, Punjab, Pakistan · 03719222195</p>
      </div>

      {/* Tab Selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
        {TABS.map((t, i) => {
          const active = tab === i;
          return (
            <button key={i} type="button" onClick={() => setTab(i)}
              style={{ padding: "14px 12px", textAlign: "left", borderRadius: 12, border: `2px solid ${active ? "#3b82f6" : "#e2e8f0"}`, background: active ? "#eff6ff" : "white", cursor: "pointer", transition: "all .15s", boxShadow: active ? "0 0 0 3px rgba(59,130,246,0.1)" : "0 1px 2px rgba(0,0,0,0.05)" }}>
              <t.Icon size={22} color={active ? "#2563eb" : "#94a3b8"} style={{ marginBottom: 8, display: "block" }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: active ? "#2563eb" : "#1e293b", lineHeight: 1.3, marginBottom: 2 }}>{t.en}</div>
              <div style={{ fontSize: 11, fontFamily: UF, color: active ? "#3b82f6" : "#64748b", direction: "rtl", textAlign: "right", lineHeight: 1.6 }}>{t.ur}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 3 }}>{t.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Form Area */}
      <div style={{ background: "white", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        {tab === 0 && <SectionForm sections={STARTUP_BASIC} fd={fd1} setFd={sf1} title="Startup Onboarding" urTitle="اسٹارٹ اپ رجسٹریشن فارم" desc="Basic intake form for startups interested in Marhaba Traders services" />}
        {tab === 1 && <SectionForm sections={INVESTOR_BASIC} fd={fd2} setFd={sf2} title="Investor Onboarding" urTitle="سرمایہ کار رجسٹریشن فارم" desc="Basic intake form for investors joining the Marhaba Traders network" />}
        {tab === 2 && <StepForm sections={FULL_STARTUP} fd={fd3} setFd={sf3} title="Full Client Profile" urTitle="مکمل کلائنٹ پروفائل" desc="11-section investor-ready profile with document uploads throughout" />}
        {tab === 3 && <StepForm sections={FULL_INVESTOR} fd={fd4} setFd={sf4} title="Full Investor Profile" urTitle="مکمل سرمایہ کار پروفائل" desc="9-section investor registration with identity verification and document uploads" />}
      </div>
    </div>
  );
}
