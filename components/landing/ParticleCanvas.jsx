"use client";

import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for parallax tracking
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const isMobile = window.innerWidth <= 768;
    const maxParticles = isMobile ? 20 : 60;

    class Particle {
      constructor() {
        this.reset();
        // Stagger spawn heights on start
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = Math.random() * 0.4 + 0.15; // Slow upward float
        this.speedX = (Math.random() - 0.5) * 0.12;
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.65 + 0.2;
        this.fadeSpeed = Math.random() * 0.008 + 0.003;
        this.fadingIn = true;
      }

      update(parallaxX, parallaxY) {
        this.y -= this.speedY;
        this.x += this.speedX + parallaxX * (this.size * 0.15); // Layered parallax based on particle size (depth)

        // Alpha fade handling
        if (this.fadingIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.maxAlpha) {
            this.alpha = this.maxAlpha;
            this.fadingIn = false;
          }
        } else if (this.y < height * 0.25) {
          // Fade out as it floats to the top
          this.alpha -= this.fadeSpeed * 1.5;
        }

        // Reset if floats off screen or fully faded
        if (this.y < -10 || this.x < -10 || this.x > width + 10 || (this.alpha <= 0 && !this.fadingIn)) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 197, 106, ${this.alpha})`;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = "rgba(201, 168, 76, 0.4)";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax offsets (divide by window size to normalize)
      const px = (mouse.x - width / 2) / (width / 2);
      const py = (mouse.y - height / 2) / (height / 2);

      particles.forEach((p) => {
        p.update(-px * 8, -py * 8);
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
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
