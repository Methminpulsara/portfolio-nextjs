"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background matching hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const lines: Array<{
      y: number;
      speed: number;
      amplitude: number;
      frequency: number;
      offset: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < 4; i++) {
      lines.push({
        y: (canvas.height / 5) * (i + 1),
        speed: 0.0005 + Math.random() * 0.001,
        amplitude: 20 + Math.random() * 30,
        frequency: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
        opacity: 0.02 + Math.random() * 0.03,
        color: i % 2 === 0 ? '16, 185, 129' : '52, 211, 153'
      });
    }

    let time = 0;

    const animate = () => {
      time += 1;
      
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(0, line.y);

        for (let x = 0; x < canvas.width; x += 2) {
          const y = line.y + Math.sin(x * line.frequency + time * line.speed + line.offset) * line.amplitude;
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(${line.color}, 0)`);
        gradient.addColorStop(0.3, `rgba(${line.color}, ${line.opacity})`);
        gradient.addColorStop(0.7, `rgba(${line.color}, ${line.opacity})`);
        gradient.addColorStop(1, `rgba(${line.color}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${line.color}, ${line.opacity * 2})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + 
            Math.pow(y - canvas.height / 2, 2)
          );
          const opacity = Math.max(0, 0.1 - (distanceFromCenter / canvas.width) * 0.3);
          
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <footer className="relative bg-[#050505] text-white py-24 px-6 border-t border-neutral-900 overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
        <div>
          <h2 className="text-[12vw] md:text-[10vw] leading-none font-black tracking-tighter select-none"
              style={{
                background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px rgba(16, 185, 129, 0.1)'
              }}>
            LET&apos;S TALK
          </h2>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 text-white transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/methmin-pulsara/" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 text-white transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:methminpulsara10@gmail.com" 
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 text-white transition-all duration-300 hover:scale-110"
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