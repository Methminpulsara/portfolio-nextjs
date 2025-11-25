"use client";

import { useEffect, useRef } from "react";

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Ripple properties
    const ripples: { x: number; y: number; radius: number; alpha: number; speed: number }[] = [];
    
    canvas.width = width;
    canvas.height = height;

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 1,
        alpha: 0.8,
        speed: 2
      });
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.01;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${r.alpha})`; // Green-500
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Inner ripple for more "water" feel
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${r.alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      // Create ripple on move, but limit frequency slightly if needed
      // For now, every move creates a ripple for smooth trail
      createRipple(e.clientX, e.clientY);
    };

    const handleClick = (e: MouseEvent) => {
      // Big ripple on click
      for(let i=0; i<3; i++) {
        setTimeout(() => {
           ripples.push({
            x: e.clientX,
            y: e.clientY,
            radius: 1,
            alpha: 1.0,
            speed: 2 + i
          });
        }, i * 100);
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
    />
  );
}
