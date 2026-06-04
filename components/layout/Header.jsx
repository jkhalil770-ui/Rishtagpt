"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Bookmark, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // 1. Check if PWA prompt was already deferred
    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
      setIsInstallable(true);
    }

    // 2. Listen to custom event dispatched by ClientInitializer
    const handlePwaInstallable = (e) => {
      setDeferredPrompt(e.detail);
      setIsInstallable(true);
    };

    window.addEventListener("pwa-installable", handlePwaInstallable);

    // 3. Listen to appinstalled event to clean up UI
    const handleAppInstalled = () => {
      console.log("App was successfully installed!");
      setIsInstallable(false);
      setDeferredPrompt(null);
      window.deferredPrompt = null;
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("pwa-installable", handlePwaInstallable);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const triggerPwaInstall = () => {
    if (!deferredPrompt) return;
    
    // Show the browser install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted PWA installation");
      } else {
        console.log("User dismissed PWA installation");
      }
      // Reset the deferred prompt variable
      setDeferredPrompt(null);
      window.deferredPrompt = null;
      setIsInstallable(false);
    });
  };

  const isFormPage = pathname.startsWith("/form");

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-gradient-to-b from-bg-primary/95 to-bg-primary/0 backdrop-blur-md px-4 md:px-8 py-4 flex items-center justify-between border-b border-white/[0.03]">
      <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer group">
        {/* Crescent Star Small Logo replaced with actual brand logo */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#070b16]/70 border border-gold/30 text-gold transition-all duration-300 group-hover:border-gold/50 group-hover:scale-105 overflow-hidden p-0 isolate transform-gpu">
          <img src="/assets/logo.png?v=3.2" alt="RishtaGPT Logo" className="w-full h-full object-cover rounded-xl" />
        </div>
        <span className="font-display font-semibold text-[20px] tracking-tight bg-gradient-to-r from-text-primary to-gold-light bg-clip-text text-transparent">
          RishtaGPT
        </span>
      </Link>

      {!isFormPage && (
        <div className="flex items-center gap-3.5">
          {/* PWA Install Button (reveals only if installable) */}
          {isInstallable && (
            <button
              onClick={triggerPwaInstall}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-dim border border-gold/45 text-gold text-xs font-bold transition-all duration-300 cursor-pointer animate-pulse-glow hover:bg-gold hover:text-[#1A1304]"
            >
              <Download size={13} />
              <span>Install App</span>
            </button>
          )}

          {/* Shuru CTA */}
          <Link
            href="/form"
            className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-gold-light to-gold text-[#1A1304] no-underline hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-md cursor-pointer flex items-center gap-1"
          >
            <Sparkles size={12} />
            <span>Create Bio</span>
          </Link>
        </div>
      )}

      {isFormPage && (
        <Link
          href="/"
          className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors no-underline uppercase tracking-widest cursor-pointer"
        >
          Exit Form
        </Link>
      )}
    </header>
  );
}
