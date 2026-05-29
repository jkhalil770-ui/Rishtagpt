"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function BackgroundEnvironment() {
  const [isMobile, setIsMobile] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const canvasRef = useRef(null);

  // Motion values for spring-based desktop mouse parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring configurations for ultra-smooth easing (Apple / Linear style)
  const springX = useSpring(mouseX, { stiffness: 35, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 20 });

  // Scroll parallax tracking
  const { scrollY } = useScroll();

  // Screen-size detection to disable heavy effects on mobile (Performance Priority)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop Mouse Move listener
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      // Normalize coordinate offset from center (-1 to 1)
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      // Map to subtle displacement range (-15px to 15px)
      mouseX.set(x * 15);
      mouseY.set(y * 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  // Unified background transformations: combining scroll parallax and mouse movement
  // Background slowly slides upward as we scroll, creating depth
  const bgTransformY = useTransform([scrollY, springY], ([latestScroll, latestSpringY]) => {
    const scrollParallax = latestScroll * -0.06; // Fixed slow scroll movement
    return isMobile ? `${scrollParallax}px` : `${scrollParallax + latestSpringY}px`;
  });

  const bgTransformX = useTransform(springX, (latestSpringX) => {
    return isMobile ? "0px" : `${latestSpringX}px`;
  });

  // ----------------------------------------------------
  // CHAMPAGNE-GOLD DUST FLOATING PARTICLES CANVAS SYSTEM
  // ----------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track cursor interpolation for particle attraction/drift
    let particleMouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const maxParticles = isMobile ? 12 : 45; // Performance optimized: few high-quality sparkles

    class ChampagneParticle {
      constructor() {
        this.reset();
        // Stagger spawn height randomly on mount
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 2.2 + 0.6; // Tiny delicate sparkles
        this.speedY = Math.random() * 0.35 + 0.12; // Slow elegant floating
        this.speedX = (Math.random() - 0.5) * 0.08;
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.55 + 0.15;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.fadingIn = true;
        this.sparklePhase = Math.random() * Math.PI;
        this.sparkleSpeed = Math.random() * 0.02 + 0.005;
      }

      update(px, py) {
        this.y -= this.speedY;
        // Layered particle horizontal parallax according to size (creates 3D depth)
        this.x += this.speedX + px * (this.size * 0.12);

        // Alpha fade handling
        if (this.fadingIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.maxAlpha) {
            this.alpha = this.maxAlpha;
            this.fadingIn = false;
          }
        } else if (this.y < height * 0.2) {
          // Softly fade out as particles approach the header
          this.alpha -= this.fadeSpeed * 1.5;
        }

        // Add delicate twinkling animation
        this.sparklePhase += this.sparkleSpeed;
        const twinkle = Math.sin(this.sparklePhase) * 0.15;
        this.currentAlpha = Math.max(0.05, Math.min(this.alpha + twinkle, 1));

        // Reset if float off screen or faded completely
        if (this.y < -10 || this.x < -10 || this.x > width + 10 || (this.alpha <= 0 && !this.fadingIn)) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Rich champagne-gold color overlay
        ctx.fillStyle = `rgba(232, 201, 122, ${this.currentAlpha})`;
        ctx.shadowBlur = this.size * 2.2;
        ctx.shadowColor = "rgba(201, 168, 76, 0.35)";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new ChampagneParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation for particles drift
      particleMouse.x += (particleMouse.targetX - particleMouse.x) * 0.05;
      particleMouse.y += (particleMouse.targetY - particleMouse.y) * 0.05;

      const px = (particleMouse.x - width / 2) / (width / 2);
      const py = (particleMouse.y - height / 2) / (height / 2);

      particles.forEach((p) => {
        p.update(-px * 6, -py * 6);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      particleMouse.targetX = e.clientX;
      particleMouse.targetY = e.clientY;
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  // Desktop Interactive Spotlight gradient template (Safe for server-side static generation)
  const spotlightTemplate = useMotionTemplate`radial-gradient(circle 480px at ${useTransform(springX, x => x * 10 + dimensions.width / 2)}px ${useTransform(springY, y => y * 10 + dimensions.height / 2)}px, rgba(232, 201, 122, 0.035), transparent 80%)`;

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none bg-[#0A0F1E]">
      {/* 1. PERMANENT fixed background.png environment layer */}
      <motion.div
        style={{
          y: bgTransformY,
          x: bgTransformX,
        }}
        className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none"
      >
        <img
          src="/background.png"
          alt="RishtaGPT luxury background"
          className="w-full h-full object-cover scale-[1.03]"
          loading="eager"
          priority="true"
        />
      </motion.div>

      {/* 2. SUBTLE breathing moon glow bloom centered near the upper sky (around top right) */}
      <motion.div
        animate={{
          opacity: [0.38, 0.58, 0.38],
          scale: [0.96, 1.05, 0.96],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[12%] right-[18%] md:right-[22%] w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full bg-gradient-to-r from-gold/15 via-[#fffae8]/10 to-transparent blur-[60px] md:blur-[80px] mix-blend-screen"
      />

      {/* 3. GPU-ACCELERATED slow drifting luxury fog clouds */}
      <div className="absolute inset-0 overflow-hidden opacity-30 md:opacity-40 mix-blend-screen">
        {/* Fog cloud 1 */}
        <motion.div
          animate={{
            x: ["-25%", "25%", "-25%"],
            y: ["-5%", "5%", "-5%"],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[30%] -left-[20%] w-[80vw] h-[50vh] bg-gradient-to-r from-[#1E254A]/0 via-gold/[0.035] to-[#1E254A]/0 blur-[100px] md:blur-[150px] rounded-full"
        />

        {/* Fog cloud 2 */}
        <motion.div
          animate={{
            x: ["25%", "-25%", "25%"],
            y: ["5%", "-5%", "5%"],
          }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[20%] -right-[20%] w-[90vw] h-[55vh] bg-gradient-to-r from-[#182F5A]/0 via-gold/[0.03] to-[#182F5A]/0 blur-[100px] md:blur-[160px] rounded-full"
        />
      </div>

      {/* 4. CHAMPAGNE-GOLD floating particles canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none mix-blend-screen z-10"
      />

      {/* 5. LUXURY OVERLAY LAYER: soft vignette and elegant depth shading */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/25 via-transparent to-[#0A0F1E]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_50%,rgba(10,15,30,0.6)_100%)] pointer-events-none" />

      {/* 6. DESKTOP ONLY: interactive mouse spotlight light diffusion reflection */}
      {!isMobile && (
        <motion.div
          style={{
            backgroundImage: spotlightTemplate,
          }}
          className="absolute inset-0 pointer-events-none z-10 mix-blend-screen"
        />
      )}
    </div>
  );
}
