"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [copied, setCopied] = useState(false);

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("methminpulsara10@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.2;
          particle.vy -= (dy / dist) * force * 0.2;
        }

        // Boundaries
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return;
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Text animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      const items = gsap.utils.toArray(".hero-text-item");
      
      // Initial state - more dramatic 3D effect
      gsap.set(items, { 
        opacity: 0, 
        rotateX: 90, 
        scale: 0.8,
        y: 100, 
        filter: "blur(20px)",
        transformOrigin: "50% 50% -100px"
      });
      gsap.set(items[0], { 
        opacity: 1, 
        rotateX: 0, 
        scale: 1,
        y: 0, 
        filter: "blur(0px)" 
      });

      // Enhanced transitions
      tl.to(items[0], { 
        opacity: 0, 
        rotateX: -90, 
        scale: 0.8,
        y: -100, 
        filter: "blur(20px)", 
        duration: 1, 
        ease: "power3.inOut" 
      })
      .to(items[1], { 
        opacity: 1, 
        rotateX: 0, 
        scale: 1,
        y: 0, 
        filter: "blur(0px)", 
        duration: 1, 
        ease: "power3.inOut" 
      }, "<+=0.15")
      
      .to(items[1], { 
        opacity: 0, 
        rotateX: -90, 
        scale: 0.8,
        y: -100, 
        filter: "blur(20px)", 
        duration: 1, 
        ease: "power3.inOut",
        delay: 0.3
      })
      .to(items[2], { 
        opacity: 1, 
        rotateX: 0, 
        scale: 1,
        y: 0, 
        filter: "blur(0px)", 
        duration: 1, 
        ease: "power3.inOut" 
      }, "<+=0.15");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050505] text-white perspective-1000"
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Top Section - Email */}
      <div className="relative z-50 w-full px-6 pt-8 flex justify-end">
        <div 
          onClick={copyEmail}
          className="group flex items-center gap-3 px-5 py-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full cursor-pointer hover:bg-black/60 transition-all duration-500 hover:scale-105 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs md:text-sm font-mono text-neutral-300 group-hover:text-white transition-colors">
            methminpulsara10@gmail.com
          </span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-green-400 transition-colors" />
          )}
        </div>
      </div>

      {/* Center - Animated Text */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6 perspective-1000">
        <div className="relative w-full max-w-7xl text-center h-[20vh] flex items-center justify-center">
            <h1 className="hero-text-item absolute text-[8vw] md:text-[7vw] font-black tracking-tighter leading-none text-white whitespace-nowrap drop-shadow-2xl" style={{ textShadow: '0 0 60px rgba(16, 185, 129, 0.3)' }}>
              Full Stack Developer
            </h1>
            <h1 className="hero-text-item absolute text-[8vw] md:text-[7vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 whitespace-nowrap drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.5))' }}>
              AI/ML Developer
            </h1>
            <h1 className="hero-text-item absolute text-[8vw] md:text-[7vw] font-black tracking-tighter leading-none text-white whitespace-nowrap drop-shadow-2xl" style={{ textShadow: '0 0 60px rgba(16, 185, 129, 0.3)' }}>
              Creative Developer
            </h1>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-20 pb-8 md:pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-md">
               <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                 Crafting digital experiences with <span className="text-green-500 font-medium">code</span> and <span className="text-white font-medium">creativity</span>.
               </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs md:text-sm font-mono text-neutral-500">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                <span className="uppercase tracking-wider hover:text-white transition-colors cursor-default">LK</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
                <span className="uppercase tracking-wider hover:text-white transition-colors cursor-default">{currentTime}</span>
              </div>
            </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}