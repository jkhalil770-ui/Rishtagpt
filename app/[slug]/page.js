import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, ArrowRight, BookOpen, Heart, User, Globe, Award, HelpCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/ui/GlassCard";

// Complete catalog of supported programmatic SEO profiles
const PROFILES = {
  "doctor-rishta-profile": {
    profession: "Doctor",
    title: "Doctor Matrimonial & Rishta Profile Bios",
    keyword: "doctor rishta profile",
    metaDesc: "Create the perfect doctor matrimonial profile. View sample bios in Urdu, Roman Urdu, and English, and use our AI generator to write yours instantly.",
    description: "Matrimonial bio templates and AI optimization guidelines tailored for medical practitioners, practicing physicians, MBBS doctors, and dental surgeons.",
    h1: "Doctor Rishta Profile Examples & AI Writer",
    h2: "How to Craft an Outstanding Matrimonial Bio for Doctors",
    entityIntro: "A doctor's matrimonial profile should successfully balance their professional dedication and shift schedules with their personal values, family alignment, and commitment to building a loving home.",
    tips: [
      "Highlight specialization or practice field (e.g., MBBS, FCPS, MD, practicing dentist) without sounding overly clinical.",
      "Address demanding shift hours transparently but positively, framing it around dedication and duty.",
      "Balance career goals with family values, personal interests, and religious practice."
    ],
    faqs: [
      { q: "How do I write a matrimonial bio for a practicing MBBS doctor?", a: "Focus on a warm, balanced tone. State your medical degree and practice details (e.g., hospital practice, specialization) in the first paragraph, and dedicate the second paragraph to your family background, religious values, and personal expectations in a partner." },
      { q: "Should female doctors mention night shift duties in their rishta profile?", a: "Yes, addressing career preferences and schedules transparently helps filter out incompatible matches early on. Frame it as dedication to healthcare while expressing a commitment to family harmony." },
      { q: "What partner preferences are best suited for doctors?", a: "Many doctors prefer partners with high educational backgrounds, corporate professionals, or fellow medical professionals who understand the demanding hours of the profession." }
    ],
    samples: {
      male: {
        en: "Assalam-u-Alaikum. I am a practicing pediatrician (MBBS), currently working at a private hospital in Lahore. I am a dedicated professional who values humbleness, continuous growth, and family ties. Observing daily prayers, I seek an educated, family-oriented partner who values emotional maturity and is supportive of medical duties. Shukriya.",
        roman: "Assalam-u-Alaikum. Main ek professional doctor (MBBS) hoon, specialized in Cardiology. Practice ke sath sath deen aur parivar ki values ko zaroori samajhta hoon. 5 waqt namaz ki koshish hai. Ek aisi companion ki talash hai jo sensible ho, well-educated ho aur rishton ki izzat kare.",
        urdu: "السلام علیکم۔ میں پیشے کے لحاظ سے ایک ایم بی بی ایس سرجن ہوں اور لاہور کے ایک نامور ہسپتال میں پریکٹس کرتا ہوں۔ میں دینی اور خاندانی اقدار کو اولیت دیتا ہوں اور پانچ وقت نماز کا پابند ہوں۔ مجھے ایک ایسی تعلیم یافتہ، بااخلاق اور سلجھی ہوئی شریکِ حیات کی تلاش ہے جو خاندان کو ساتھ لے کر چلنے کی صلاحیت رکھتی ہو۔"
      },
      female: {
        en: "Assalam-u-Alaikum. I am an MBBS doctor currently preparing for my specialization. Observing modest dressing and hijab, I balance my hospital shifts with absolute devotion to family values. Looking for a practicing, highly educated Muslim professional who understands the demands of the medical profession and supports personal growth. JazakAllah.",
        roman: "Assalam-u-Alaikum. Main ek doctor (MBBS) hoon, currently completing my house job in Karachi. Simple, soft-spoken aur Deen ki paasdar hoon. Family values bohot zaroori hain. Ek aise settled aur practicing partner ki talash hai jo mature, caring aur supportive ho.",
        urdu: "السلام علیکم۔ میں ایک باحجاب لیڈی ڈاکٹر (MBBS) ہوں اور ہسپتال میں پریکٹس کرتی ہوں۔ دیندار اور بااخلاق فیملی سے تعلق ہے۔ پانچ وقت نماز کی پابندی میری اولین ترجیح ہے۔ ایک ایسے تعلیم یافتہ اور سلجھے ہوئے جیون ساتھی کی تلاش ہے جو کیریئر کو سپورٹ کرے اور خاندانی اقدار کا احترام کرے۔"
      }
    }
  },
  "engineer-rishta-profile": {
    profession: "Engineer",
    title: "Engineer Matrimonial & Rishta Profile Bios",
    keyword: "engineer rishta profile",
    metaDesc: "Create the perfect engineer matrimonial profile. View sample bios in Urdu, Roman Urdu, and English, and use our AI generator to write yours instantly.",
    description: "Matrimonial bio templates and AI optimization guidelines tailored for civil, electrical, mechanical, and aerospace engineers.",
    h1: "Engineer Rishta Profile Examples & AI Writer",
    h2: "How to Craft an Outstanding Matrimonial Bio for Engineers",
    entityIntro: "An engineer's matrimonial profile should successfully translate analytical, structured thinking and professional stability into a warm, emotionally mature, and family-first personal presentation.",
    tips: [
      "Detail your specific engineering discipline (e.g., Mechanical, Electrical, Civil) and corporate standing.",
      "Showcase a balanced personality by highlighting personal hobbies, community involvement, or creative interests.",
      "State partner expectations clearly, emphasizing mutual intelligence, communication, and family alignment."
    ],
    faqs: [
      { q: "How can an engineer write an attractive matrimonial bio?", a: "Avoid dry, purely technical terms. Focus on your logical mindset as a strength for building a stable future, mention your degree/university, and pair it with a warm description of your family values and what you enjoy outside work." },
      { q: "What educational criteria should an engineer set in partner preferences?", a: "Many engineers prefer partners with at least a Bachelor's degree (B.Sc, BBA, MBBS, or B.E) to ensure intellectual compatibility and shared goals in professional life." }
    ],
    samples: {
      male: {
        en: "Assalam-u-Alaikum. I hold a Bachelor's in Electrical Engineering from NUST and work as a Senior Project Lead. I am a stable, career-oriented individual who balances modern analytical thinking with a warm, caring heart and traditional Muslim family values. Seeking an educated, gentle, and practicing partner. Shukriya.",
        roman: "Assalam-u-Alaikum. Mechanical Engineer (B.E) hoon, leading project management at an international firm. Career-focused, family-oriented, and simple nature. Namaz ki pabandi karta hoon. Aisi partner chahiye jo well-educated ho aur joint family values ko samajhti ho.",
        urdu: "السلام علیکم۔ میں نے نسٹ (NUST) سے مکینیکل انجینئرنگ کی ڈگری حاصل کی ہے اور ایک نامور ملٹی نیشنل کمپنی میں پروجیکٹ مینیجر ہوں۔ میں ایک مستقل مزاج اور فیملی اورینٹڈ شخص ہوں جو دینی اقدار کا احترام کرتا ہے۔ ایک ایسی تعلیم یافتہ اور سلجھی ہوئی ساتھی کی تلاش ہے جو زندگی کے سفر میں ساتھ دے۔"
      },
      female: {
        en: "Assalam-u-Alaikum. I am a civil engineering graduate working with an architectural consultant. Grounded in Islamic morals, I hold a deep respect for family elders and household harmony. Seeking an intellectually compatible, settled professional who is supportive of a balanced career and values religious commitment. JazakAllah.",
        roman: "Assalam-u-Alaikum. Main B.E (Electrical Engineering) graduate hoon aur consultancy firm mein kaam karti hoon. Deen aur modest lifestyle ko follow karti hoon. Mujhe ek aise educated, reliable aur Deen-dost partner ki talash hai jo family ki respect kare.",
        urdu: "السلام علیکم۔ میں نے الیکٹریکل انجینئرنگ کی ہے اور پبلک سیکٹر میں کام کرتی ہوں۔ متوسط اور دیندار خاندان سے تعلق ہے۔ پانچ وقت نماز کی پابند ہوں اور حجاب کرتی ہوں۔ ایک ایسے مہذب اور برسرِروزگار جیون ساتھی کی تلاش ہے جو خاندان کا احترام کرے اور تعلیم یافتہ ہو۔"
      }
    }
  },
  "teacher-rishta-profile": {
    profession: "Teacher",
    title: "Teacher Matrimonial & Rishta Profile Bios",
    keyword: "teacher rishta profile",
    metaDesc: "Create the perfect teacher matrimonial profile. View sample bios in Urdu, Roman Urdu, and English, and use our AI generator to write yours instantly.",
    description: "Matrimonial bio templates and AI optimization guidelines tailored for school teachers, college lecturers, and university professors.",
    h1: "Teacher Rishta Profile Examples & AI Writer",
    h2: "How to Craft an Outstanding Matrimonial Bio for Teachers",
    entityIntro: "A teacher's profile shines through its focus on patience, communication, nurturing values, educational pedigree, and their beautiful capability to foster growth in both career and home environments.",
    tips: [
      "Highlight your level of instruction (e.g., school teacher, college lecturer, assistant professor) and subjects of expertise.",
      "Emphasize personal traits like patience, eloquence, empathy, and organizational skills.",
      "Express a beautiful commitment to building a balanced household where education and morals are celebrated."
    ],
    faqs: [
      { q: "Why is a teacher's matrimonial profile highly valued in traditional families?", a: "Teachers are traditionally highly respected for their patience, high ethical standards, structured schedule, and capability to balance professional work with home and childcare responsibilities." }
    ],
    samples: {
      male: {
        en: "Assalam-u-Alaikum. I am a high school chemistry teacher and academic coordinator. I hold a Master's degree and have a deep passion for mentoring youth. In my personal life, I observe Islamic principles, enjoy reading, and love family gatherings. Seeking a kind, moral, and educated companion. Shukriya.",
        roman: "Assalam-u-Alaikum. University lecturer (MPhil) hoon, teaching English literature. Respectful nature, simple habits, aur namaz ka paband. Family values ko prioritise karta hoon. Ek educated, mature aur parivaar ko chalane wali partner ki talash hai.",
        urdu: "السلام علیکم۔ میں ہائی اسکول میں فزکس کا استاد اور تعلیمی کوآرڈینیٹر ہوں۔ میں ایک صابر، مہذب اور سلجھے ہوئے مزاج کا مالک ہوں اور خاندانی رشتوں کا بے حد احترام کرتا ہوں۔ پانچ وقت نماز کی پابندی کرتا ہوں۔ ایک ایسی نیک سیرت اور تعلیم یافتہ شریکِ حیات کی تلاش ہے جو رشتوں کو نبھانا جانتی ہو۔"
      },
      female: {
        en: "Assalam-u-Alaikum. Working as a primary school teacher at a reputable private academy. I am an affectionate, patient, and family-oriented girl holding a Master's degree. I practice modest dressing and value Deen. Looking for a settled, practicing professional who values emotional peace and supports my teaching career. JazakAllah.",
        roman: "Assalam-u-Alaikum. Reputed school mein science teacher hoon. Nature wise soft-spoken, patient aur family-oriented hoon. Quran ki recitation ki aadat hai. Ek aise noble aur supportive settled professional partner ki talash hai jo deen aur family ko balance kar sake.",
        urdu: "السلام علیکم۔ میں ایک نجی اسکول میں ریاضی کی معلمہ ہوں۔ میں ایک بااخلاق، صابر اور گھریلو لڑکی ہوں جو خاندانی روایات کو اہمیت دیتی ہے۔ پانچ وقت نماز کی پابندی کرتی ہوں۔ ایک ایسے شریف، برسرِروزگار اور تعلیم یافتہ ساتھی کی تلاش ہے جو فیملی اقدار کا احترام کرے۔"
      }
    }
  },
  "businessman-rishta-profile": {
    profession: "Businessman",
    title: "Businessman Matrimonial & Rishta Profile Bios",
    keyword: "businessman rishta profile",
    metaDesc: "Create the perfect businessman matrimonial profile. View sample bios in Urdu, Roman Urdu, and English, and use our AI generator to write yours instantly.",
    description: "Matrimonial bio templates and AI optimization guidelines tailored for business owners, entrepreneurs, and industrial startup founders.",
    h1: "Businessman Rishta Profile Examples & AI Writer",
    h2: "How to Craft an Outstanding Matrimonial Bio for Businessmen",
    entityIntro: "A business professional's matrimonial profile should successfully showcase financial stability, self-reliance, risk management capabilities, and leadership drive, balanced with absolute humility and a family-first heart.",
    tips: [
      "Describe the scale or industry of your business operations (e.g., family export business, retail startup, real estate) clearly but humbly.",
      "Showcase your ability to support a household financially while remaining emotionally present.",
      "Emphasize strong ethics, honesty in trade, and alignment with traditional and modern family choices."
    ],
    faqs: [
      { q: "What should a businessman highlight in a matrimonial bio?", a: "State your business sector and self-made path or family enterprise legacy. Keep it down-to-earth by explicitly mentioning how you prioritize family time and hold firm ethical and religious boundaries in your daily life." }
    ],
    samples: {
      male: {
        en: "Assalam-u-Alaikum. I manage a family-owned textile exporting business in Karachi. I am self-reliant, highly driven, and financially settled. I observe daily prayers and believe in active charity. Seeking an educated, gentle, and family-oriented partner who brings peace and values deep relationships. Shukriya.",
        roman: "Assalam-u-Alaikum. E-commerce business owner hoon, running my own brand. Independent, focused aur down-to-earth nature hai. Career ke sath Deen aur Namaz ko priority deta hoon. Ek well-mannered, educated aur supportive companion ki talash hai.",
        urdu: "السلام علیکم۔ میں اپنے فیملی ٹیکسٹائل اور امپورٹ بزنس کو سنبھالتا ہوں۔ میں ایک خود دار، محنتی اور مالی طور پر مستحکم شخص ہوں جو پانچ وقت نماز کی پابندی کرتا ہے۔ ایک بااخلاق، سلجھی ہوئی اور تعلیم یافتہ جیون ساتھی کی تلاش ہے جو خاندانی اقدار کا احترام کرے اور جوائنٹ فیملی میں خوش رہ سکے۔"
      },
      female: {
        en: "Assalam-u-Alaikum. I run a home-based boutique and baking brand. Self-motivated, highly creative, and family-oriented, I hold a Bachelor's degree. I balance modern independence with modesty, Namaz, and a love for home management. Looking for a settled, practicing business owner or corporate professional. JazakAllah.",
        roman: "Assalam-u-Alaikum. Main digital marketing agency run karti hoon as a freelancer. Simple, caring, and values-driven larki hoon. Ghar aur career dono ko sath chalana aata hai. Ek mature, educated aur shareef partner chahiye jo mere commitments ko samjhe.",
        urdu: "السلام علیکم۔ میں نے بزنس ایڈمنسٹریشن میں بی بی اے کیا ہے اور اب اپنا ایک بیوٹی سیلون اور ہوم ڈیکور برانڈ چلاتی ہوں۔ میں ایک بااخلاق اور گھریلو مزاج رکھنے والی لڑکی ہوں جو حجاب کرتی ہے اور نماز کی پابند ہے۔ ایک ایسے دیندار اور کاروباری یا ملازم پیشہ شریکِ حیات کی تلاش ہے جو اخلاقیات کا پاسدار ہو۔"
      }
    }
  },
  "overseas-rishta-profile": {
    profession: "Overseas Pakistani",
    title: "Overseas Matrimonial & Rishta Profile Bios",
    keyword: "overseas rishta profile",
    metaDesc: "Create the perfect overseas matrimonial profile. View sample bios in Urdu, Roman Urdu, and English, and use our AI generator to write yours instantly.",
    description: "Matrimonial bio templates and AI optimization guidelines tailored for expat candidates settled in the USA, UK, Canada, Australia, and Middle East.",
    h1: "Overseas Rishta Profile Examples & AI Writer",
    h2: "How to Craft an Outstanding Matrimonial Bio for Expats",
    entityIntro: "An expat's matrimonial profile must bridge two worlds: displaying absolute career stability and cultural adaptability abroad, while reinforcing deep root connections, local language familiarity, and solid Islamic values.",
    tips: [
      "Detail your citizenship/residency status (e.g., green card, citizen, work permit) and your specific settled city abroad.",
      "Clearly address your willingness or requirements regarding partner relocation (e.g. looking for someone willing to move, or open to relocating yourself).",
      "Emphasize that your home environment remains deeply rooted in local cultural values, halal lifestyle, and daily prayers."
    ],
    faqs: [
      { q: "How do I write a matrimonial bio for an overseas candidate?", a: "Mention your location (e.g., Dubai, London, Toronto), profession, and legal status early on. Be warm and reassuring about how you maintain your language, cultural roots, and Deen practice despite living abroad, and state your relocation preferences clearly." }
    ],
    samples: {
      male: {
        en: "Assalam-u-Alaikum. I am a software architect settled in Dallas, USA (US Citizen). Originally from Islamabad, I maintain a deeply rooted halal lifestyle, observe daily prayers, and visit Pakistan regularly. Seeking an educated, gentle, and family-oriented partner from Pakistan who is open to relocating to the US. Shukriya.",
        roman: "Assalam-u-Alaikum. Senior financial analyst (M.Sc) settled in London, UK. Grounded in Islamic principles, down-to-earth, and financially stable. Seeking an educated, respectful Muslim larki who is willing to relocate to the UK and values family harmony.",
        urdu: "السلام علیکم۔ میں کینیڈا (ٹورنٹو) کا شہری ہوں اور وہاں ایک آئی ٹی کمپنی میں مینیجر کے طور پر کام کرتا ہوں۔ مالی طور پر مستحکم ہوں، اور وہاں بھی ایک صاف ستھرا حلال لائف اسٹائل اور پانچ وقت نماز قائم رکھی ہوئی ہے۔ مجھے ایک ایسی سچی، بااخلاق اور تعلیم یافتہ ساتھی کی تلاش ہے جو کینیڈا شفٹ ہونے کے لیے رضامند ہو۔"
      },
      female: {
        en: "Assalam-u-Alaikum. I am a registered nurse born and raised in Birmingham, UK. While enjoying British citizenship and career stability, I practice daily Namaz, wear hijab, and hold deep traditional Pakistani values. Looking for a settled, practicing professional who resides in the UK or is willing to settle abroad. JazakAllah.",
        roman: "Assalam-u-Alaikum. Masters kiya hai clinical psychology mein, currently residing in Dubai, UAE with family. Family-centered, caring, and observing modesty. Seeking an educated, settled professional working in the Gulf region or open to discussion. JazakAllah.",
        urdu: "السلام علیکم۔ میں اپنے خاندان کے ساتھ شارجہ، یو اے ای میں مقیم ہوں اور وہاں ایک نجی اسکول میں پڑھاتی ہوں۔ ہم اصل میں سیالکوٹ سے تعلق رکھتے ہیں اور ہماری اقدار بالکل روایتی ہیں۔ میں پانچ وقت نماز اور پردے کی پابند ہوں۔ ایک ایسے تعلیم یافتہ اور برسرِروزگار شریکِ حیات کی تلاش ہے جو امارات میں مقیم ہو یا یہاں سیٹل ہونا چاہتا ہو۔"
      }
    }
  },
  "software-engineer-rishta-profile": {
    profession: "Software Engineer",
    title: "Software Engineer Matrimonial & Rishta Profile Bios",
    keyword: "software engineer rishta profile",
    metaDesc: "Create the perfect software engineer matrimonial profile. View sample bios in Urdu, Roman Urdu, and English, and use our AI generator to write yours instantly.",
    description: "Matrimonial bio templates and AI optimization guidelines tailored for tech leads, software developers, and web engineers.",
    h1: "Software Engineer Rishta Profile Examples & AI Writer",
    h2: "How to Craft an Outstanding Matrimonial Bio for Tech Professionals",
    entityIntro: "A software engineer's profile should successfully translate high-growth tech careers, remote-work capabilities, and high-income metrics into a warm, emotionally available, stable, and family-centered narrative.",
    tips: [
      "Highlight your academic foundation (e.g. BS Computer Science, FAST, NUST, UET) and current technical role or startup standing.",
      "Address flexible/remote work hours or plans regarding relocation or overseas assignments if applicable.",
      "Emphasize personal growth, emotional maturity, namaz habits, and balancing screen time with healthy family commitments."
    ],
    faqs: [
      { q: "What should a software engineer include in their matrimonial bio?", a: "Explain your role simply without using heavy programming jargon. Frame your analytical skills as problem-solving strengths for life, mention your income/stability, and dedicate half the bio to your family, community ethics, and religious principles." }
    ],
    samples: {
      male: {
        en: "Assalam-u-Alaikum. I am a senior software developer working remotely for a US-based tech firm, currently residing in Islamabad. Analytical yet warm, I observe daily prayers and value simple, sincere connections. Seeking an educated, emotionally mature, and family-oriented partner who values intellectual depth and home peace. Shukriya.",
        roman: "Assalam-u-Alaikum. Software Engineer (BSCS from FAST) and Tech Lead at a software house in Lahore. Grounded in Deen, simple habits, and focused career path. Seeking a caring, well-educated, and simple larki who values family traditions and joins me in this beautiful journey.",
        urdu: "السلام علیکم۔ میں پیشے کے لحاظ سے ایک سافٹ ویئر انجینئر ہوں اور لاہور کی ایک آئی ٹی کمپنی میں ٹیم لیڈ کے عہدے پر فائز ہوں۔ میں ایک پرسکون، خوددار اور فیملی اورینٹڈ انسان ہوں جو پانچ وقت کی نماز کی پابندی کرتا ہے۔ ایک ایسی سلجھی ہوئی، باحیا اور تعلیم یافتہ ساتھی کی تلاش ہے جو خاندانی رشتوں کا احترام کرے۔"
      },
      female: {
        en: "Assalam-u-Alaikum. I hold a BS in Software Engineering and work as a UX Researcher. Grounded in Islamic principles, I wear hijab, practice daily Namaz, and balance my technical career with active participation in family affairs. Looking for a practicing, highly educated, and settled professional who values growth and emotional intelligence. JazakAllah.",
        roman: "Assalam-u-Alaikum. Main software engineer (BS-CS) hoon aur systems company mein developement lead hoon. Caring nature, Deen-friendly, and very close to my parents. Seeking an educated, settled professional with sound morals and supportive personality.",
        urdu: "السلام علیکم۔ میں نے کمپیوٹر سائنس میں بی ایس کیا ہے اور ایک سافٹ ویئر ہاؤس میں موبائل ایپ ڈویلپر کے طور پر کام کرتی ہوں۔ متوسط اور عزت دار فیملی سے تعلق ہے۔ نماز کی پابند اور باحجاب ہوں۔ ایک ایسے شریف النفس، تعلیم یافتہ اور برسرِروزگار جیون ساتھی کی تلاش ہے جو اخلاقی اقدار کا پاسبان ہو۔"
      }
    }
  }
};

export async function generateStaticParams() {
  return Object.keys(PROFILES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const p = PROFILES[params.slug];
  if (!p) return {};

  return {
    title: `${p.title} | AI Bio Examples`,
    description: p.metaDesc,
    keywords: [p.keyword, "rishta bio generator", "AI rishta bio", "matrimonial bio", "muslim marriage profile", "shaadi biodata"],
    alternates: {
      canonical: `/${params.slug}`,
    },
    openGraph: {
      title: `${p.title} | AI Bio Examples`,
      description: p.metaDesc,
      url: `https://rishtagpt.online/${params.slug}`,
      type: "article",
    },
    twitter: {
      title: `${p.title} | AI Bio Examples`,
      description: p.metaDesc,
    }
  };
}

export default function ProgrammaticSEOPage({ params }) {
  const p = PROFILES[params.slug];
  if (!p) {
    notFound();
  }

  // Inject dynamic structured JSON-LD data for programmatic SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://rishtagpt.online/#webapp",
        "url": "https://rishtagpt.online",
        "name": "RishtaGPT",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "description": "AI-powered matrimonial bio and biodata writer for Muslim candidates.",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://rishtagpt.online/${params.slug}/#faq`,
        "mainEntity": p.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://rishtagpt.online/${params.slug}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://rishtagpt.online"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": p.profession,
            "item": `https://rishtagpt.online/${params.slug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="relative min-h-screen gradient-mesh pt-24 pb-20 px-4 md:px-6 flex flex-col items-center">
        <div className="islamic-bg" />

        <div className="w-full max-w-4xl flex flex-col items-stretch mt-4 md:mt-8 relative z-10">
          
          {/* Top Breadcrumb Nav */}
          <div className="flex items-center gap-2 mb-6 text-xs text-text-muted font-semibold tracking-wider uppercase justify-center sm:justify-start">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gold">{p.profession} Profiles</span>
          </div>

          {/* Page Heading Crest */}
          <div className="text-center md:text-left mb-10 md:mb-14">
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight shimmer-text flex items-center justify-center md:justify-start gap-3 flex-wrap">
              {p.h1}
              <Sparkles size={24} className="text-gold animate-pulse shrink-0" />
            </h1>
            <p className="text-[14.5px] md:text-[16px] text-text-muted mt-3.5 leading-relaxed max-w-2xl">
              {p.description} Grounded in cultural values, certified Islamic principles, and optimized for search engine crawlability.
            </p>
          </div>

          {/* 1. How to Write Column */}
          <GlassCard className="p-7 sm:p-10 border-gold/20 bg-[#0C1226]/80 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gold/5 blur-3xl rounded-full" />
            <h2 className="font-display text-2xl font-bold gold-text-gradient mb-5 flex items-center gap-2">
              <Award size={20} className="text-gold" />
              {p.h2}
            </h2>
            <p className="text-[14.5px] text-text-primary leading-relaxed mb-6">
              {p.entityIntro}
            </p>
            <ul className="flex flex-col gap-4">
              {p.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[13.5px] text-text-muted leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-bold text-xs shrink-0 mt-0.5 num">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* 2. Stripe-Like Luxury Conversion CTA */}
          <div className="p-8 md:p-10 rounded-3xl border border-gold/30 bg-gradient-to-r from-[#0C1226]/90 via-gold-dim/15 to-[#0C1226]/90 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 mb-14 relative overflow-hidden">
            <div className="absolute top-1/2 left-[-10%] w-[180px] h-[180px] bg-gold/5 blur-2xl rounded-full pointer-events-none" />
            <div className="flex-1 min-w-0 text-center md:text-left relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-gold block mb-2">
                FAST · PRIVATE · 100% FREE
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
                Write Your {p.profession} Rishta Bio Now
              </h3>
              <p className="text-xs text-text-muted mt-2 leading-relaxed max-w-md">
                Our Gemini-powered matrimonial generator tailors language specifically to your profession, maslak, and values in seconds.
              </p>
            </div>
            <Link 
              href={`/form?profession=${encodeURIComponent(p.profession)}`}
              className="px-8 py-4.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-light hover:scale-[1.03] active:scale-[0.98] text-[#1A1304] text-[15px] font-extrabold transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer shrink-0 relative z-10"
            >
              <span>Start Generator</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* 3. Sample Bios Showcase Grid */}
          <div className="mb-14">
            <h2 className="font-display text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <BookOpen size={22} className="text-gold" />
              Verified Matrimonial Sample Bios
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Male Showcase Card */}
              <GlassCard className="p-7 border-white/10 bg-[#0C1226]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-5 border-b border-white/5 pb-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                      <User size={15} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-text-primary block leading-none">Male (Boy) Templates</span>
                      <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-semibold block">For {p.profession} Candidates</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-gold tracking-wider block mb-1">English Bio</span>
                      <p className="text-xs text-text-muted leading-relaxed font-display bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.03]">
                        {p.samples.male.en}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-gold tracking-wider block mb-1">Roman Urdu Bio</span>
                      <p className="text-xs text-text-muted leading-relaxed font-display bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.03]">
                        {p.samples.male.roman}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-gold tracking-wider block mb-1">Urdu Script Bio</span>
                      <p className="text-[15.5px] text-text-primary leading-[1.9] font-urdu text-right dir-rtl bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.03]" dir="rtl">
                        {p.samples.male.urdu}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Female Showcase Card */}
              <GlassCard className="p-7 border-white/10 bg-[#0C1226]/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-5 border-b border-white/5 pb-3">
                    <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center text-rose border border-rose/20">
                      <Heart size={14} className="text-gold" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-text-primary block leading-none">Female (Girl) Templates</span>
                      <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-semibold block">For {p.profession} Candidates</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-gold tracking-wider block mb-1">English Bio</span>
                      <p className="text-xs text-text-muted leading-relaxed font-display bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.03]">
                        {p.samples.female.en}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-gold tracking-wider block mb-1">Roman Urdu Bio</span>
                      <p className="text-xs text-text-muted leading-relaxed font-display bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.03]">
                        {p.samples.female.roman}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-gold tracking-wider block mb-1">Urdu Script Bio</span>
                      <p className="text-[15.5px] text-text-primary leading-[1.9] font-urdu text-right dir-rtl bg-white/[0.01] p-3.5 rounded-xl border border-white/[0.03]" dir="rtl">
                        {p.samples.female.urdu}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>

            </div>
          </div>

          {/* 4. Frequently Asked Questions (FAQ) Section */}
          <div className="mt-6">
            <h2 className="font-display text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <HelpCircle size={22} className="text-gold" />
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="flex flex-col gap-4">
              {p.faqs.map((faq, idx) => (
                <GlassCard key={idx} className="p-6 border-white/5 bg-[#0C1226]/30">
                  <h4 className="text-[14.5px] font-bold text-gold-light mb-2.5">
                    {faq.q}
                  </h4>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
