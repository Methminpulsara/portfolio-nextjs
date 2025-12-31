/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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

    for (let i = 0; i < 6; i++) {
      lines.push({
        y: (canvas.height / 7) * (i + 1),
        speed: 0.0005 + Math.random() * 0.001,
        amplitude: 30 + Math.random() * 40,
        frequency: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
        opacity: 0.03 + Math.random() * 0.04,
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

        ctx.shadowBlur = 20;
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
          const opacity = Math.max(0, 0.12 - (distanceFromCenter / canvas.width) * 0.3);
          
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax & Scale
      gsap.fromTo(imageRef.current, 
        { scale: 1.2, yPercent: 10 },
        {
          scale: 1,
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Text Reveal with Stagger
      const splitText = document.querySelectorAll(".about-text-reveal");
      splitText.forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        });
      });

      // Stats Counter Animation
      const stats = document.querySelectorAll(".stat-number");
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target") || "0");
        gsap.to(stat, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="min-h-screen bg-[#050505] text-white py-32 px-6 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-green-500/5 rounded-full blur-[200px] animate-float-slower" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Image Column */}
        <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto md:mx-0 overflow-hidden rounded-2xl group">
          <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
          <img 
            ref={imageRef}
            src="public/assets/linkdin-profile.png" 
            alt="Profile" 
            className="w-full h-full object-cover object-center"
          />
          {/* Decorative Border */}
          <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500" />
        </div>

        {/* Content Column */}
        <div className="space-y-8 select-none">
          <h2 className="about-text-reveal text-sm font-mono text-emerald-400 tracking-widest uppercase">
            About Me
          </h2>
          
          <h3 className="about-text-reveal text-4xl md:text-6xl font-bold leading-tight">
            Turning complex problems into <span className="text-neutral-500">elegant solutions.</span>
          </h3>

          <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
            <p className="about-text-reveal">
              I&lsquo;m a passionate Full Stack Developer with a keen eye for design and a drive for innovation. 
              My journey began with a curiosity for how things work, which evolved into a career building 
              robust web applications and immersive digital experiences.
            </p>
            <p className="about-text-reveal">
              With expertise in modern frameworks like React, Next.js, and Angular, combined with powerful 
              backend technologies like Spring Boot and Node.js, I bridge the gap between creative vision 
              and technical execution.
            </p>
          </div>

          {/* Stats / Highlights */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-800">
            <div className="about-text-reveal">
              <div className="flex items-baseline">
                <span className="stat-number text-4xl font-bold text-white mb-1" data-target="1">0</span>
                <span className="text-2xl font-bold text-emerald-400">+</span>
              </div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="about-text-reveal">
              <div className="flex items-baseline">
                <span className="stat-number text-4xl font-bold text-white mb-1" data-target="10">0</span>
                <span className="text-2xl font-bold text-emerald-400">+</span>
              </div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">Projects Completed</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, -40px); }
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 40s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}