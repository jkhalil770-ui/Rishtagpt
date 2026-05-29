"use client";

import { useEffect } from "react";

export default function ClientInitializer() {
  useEffect(() => {
    // 1. Register PWA Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("PWA Service Worker registered with scope:", reg.scope);
        })
        .catch((err) => {
          console.error("PWA Service Worker registration failed:", err);
        });
    }

    // 2. Initialize Lenis Smooth Scrolling on Desktop
    if (window.innerWidth > 768) {
      import("lenis").then(({ default: Lenis }) => {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Bind Lenis scroll events to GSAP ScrollTrigger
        import("gsap").then(({ gsap }) => {
          import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);
            
            lenis.on("scroll", ScrollTrigger.update);

            ScrollTrigger.scrollerProxy(document.body, {
              scrollTop(value) {
                return arguments.length
                  ? lenis.scrollTo(value, { immediate: true })
                  : lenis.scroll;
              },
              getBoundingClientRect() {
                return {
                  top: 0,
                  left: 0,
                  width: window.innerWidth,
                  height: window.innerHeight,
                };
              },
            });

            ScrollTrigger.addEventListener("refresh", () => lenis.resize());
            ScrollTrigger.refresh();
          });
        });
      });
    }

    // 3. Setup Custom PWA Install prompt listener
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default browser mini-infobar
      e.preventDefault();
      // Cache the event so it can be triggered later
      window.deferredPrompt = e;
      // Dispatch a custom event to notify components that PWA is installable
      window.dispatchEvent(new CustomEvent("pwa-installable", { detail: e }));
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  return null;
}
