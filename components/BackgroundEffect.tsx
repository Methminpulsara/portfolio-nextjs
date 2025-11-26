"use client";

import { useEffect, useRef } from "react";

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    // Reduced particles for better performance
    const particles: { 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      radius: number; 
      alpha: number;
    }[] = [];

    const ripples: { 
      x: number; 
      y: number; 
      radius: number; 
      maxRadius: number;
      alpha: number; 
    }[] = [];

    // Reduced to 15 particles
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let lastRippleTime = 0;
    let frame = 0;

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 100,
        alpha: 0.4
      });
    };

    const animate = () => {
      frame++;
      
      // Skip frames for better performance (30fps instead of 60fps)
      if (frame % 2 !== 0) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw particles (no connections to reduce calculations)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.vx *= 0.99;
        p.vy *= 0.99;

        // Simple dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.fill();
      });

      // Draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 3;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const now = Date.now();
      if (now - lastRippleTime > 150) {
        createRipple(e.clientX, e.clientY);
        lastRippleTime = now;
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        setTimeout(() => {
          createRipple(e.clientX, e.clientY);
        }, i * 100);
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
  
}