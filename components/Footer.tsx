"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Logo from "./Logo"; // ✅ use your updated MP logo

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const lines = [];
    for (let i = 0; i < 4; i++) {
      lines.push({
        y: (canvas.height / 5) * (i + 1),
        speed: 0.0005 + Math.random() * 0.001,
        amplitude: 25 + Math.random() * 25,
        frequency: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
        opacity: 0.02 + Math.random() * 0.03,
        color: i % 2 === 0 ? "16, 185, 129" : "52, 211, 153",
      });
    }

    let t = 0;

    const animate = () => {
      t += 1;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(0, line.y);

        for (let x = 0; x < canvas.width; x += 2) {
          const y =
            line.y +
            Math.sin(x * line.frequency + t * line.speed + line.offset) *
              line.amplitude;
          ctx.lineTo(x, y);
        }

        const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grad.addColorStop(0, `rgba(${line.color}, 0)`);
        grad.addColorStop(0.3, `rgba(${line.color}, ${line.opacity})`);
        grad.addColorStop(0.7, `rgba(${line.color}, ${line.opacity})`);
        grad.addColorStop(1, `rgba(${line.color}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Grid dots
      const grid = 60;
      for (let x = 0; x < canvas.width; x += grid) {
        for (let y = 0; y < canvas.height; y += grid) {
          const dist = Math.hypot(
            x - canvas.width / 2,
            y - canvas.height / 2
          );
          const op = Math.max(0, 0.1 - (dist / canvas.width) * 0.3);

          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${op})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer className="relative bg-[#050505] text-white py-24 px-6 border-t border-neutral-900 overflow-hidden">

      {/* Animated Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Glow */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-[200px]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">

        <div className="flex items-center gap-3 select-none">
         
          <h2 className="text-[10vw] md:text-[8vw] leading-none font-black tracking-tighter bg-gradient-to-br from-neutral-500 to-neutral-800 bg-clip-text text-transparent">
            LET&apos;S TALK
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
             <Logo className="h-12 w-12 pt-2 text-emerald-500" />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 hover:scale-110 transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>

            <a
              href="https://www.linkedin.com/in/methmin-pulsara/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>

            <a
              href="mailto:methminpulsara10@gmail.com"
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <p className="text-neutral-500 text-sm font-mono">
            © {new Date().getFullYear()} MethminPulsara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
