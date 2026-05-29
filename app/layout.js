import { Playfair_Display, DM_Sans, Noto_Nastaliq_Urdu } from "next/font/google";
import ClientInitializer from "@/components/ui/ClientInitializer";
import BackgroundEnvironment from "@/components/ui/BackgroundEnvironment";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "RishtaGPT — AI Rishta Bio Generator",
  description: "AI se apna rishta bio banao — Urdu, Roman Urdu, English mein. Free, fast, beautiful. Built for Pakistani & Indian families.",
  keywords: ["rishta bio", "biodata", "marriage biodata", "AI biodata", "Pakistani rishta", "matrimonial biodata"],
  metadataBase: new URL("https://rishtagpt.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "RishtaGPT — AI Rishta Bio Generator",
    description: "AI se apna rishta bio banao — Urdu, Roman Urdu, English mein. Free, fast, beautiful. Built for Pakistani & Indian families.",
    images: ["/og-image.png"],
    url: "https://rishtagpt.online",
    siteName: "RishtaGPT",
  },
  twitter: {
    card: "summary_large_image",
    title: "RishtaGPT — AI Rishta Bio Generator",
    description: "AI se apna rishta bio banao — Urdu, Roman Urdu, English mein. Free, fast, beautiful. Built for Pakistani & Indian families.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/favicon.svg",
    shortcut: "/assets/favicon.svg",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RishtaGPT" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${notoUrdu.variable} font-sans bg-bg-primary text-text-primary min-h-screen relative overflow-x-hidden`}
      >
        <BackgroundEnvironment />
        <ClientInitializer />
        {children}
      </body>
    </html>
  );
}
