"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
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

  // Modern flat animated background with flowing lines
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

    // Flowing lines data
    const lines: Array<{
      y: number;
      speed: number;
      amplitude: number;
      frequency: number;
      offset: number;
      opacity: number;
      color: string;
    }> = [];

    // Create flowing lines
    for (let i = 0; i < 8; i++) {
      lines.push({
        y: (canvas.height / 9) * (i + 1),
        speed: 0.0005 + Math.random() * 0.001,
        amplitude: 30 + Math.random() * 50,
        frequency: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
        opacity: 0.03 + Math.random() * 0.05,
        color: i % 2 === 0 ? '16, 185, 129' : '52, 211, 153'
      });
    }

    let time = 0;

    const animate = () => {
      time += 1;
      
      // Clear with dark background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing waves
      lines.forEach((line, index) => {
        ctx.beginPath();
        ctx.moveTo(0, line.y);

        // Create smooth wave
        for (let x = 0; x < canvas.width; x += 2) {
          const y = line.y + Math.sin(x * line.frequency + time * line.speed + line.offset) * line.amplitude;
          ctx.lineTo(x, y);
        }

        // Create gradient stroke
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(${line.color}, 0)`);
        gradient.addColorStop(0.3, `rgba(${line.color}, ${line.opacity})`);
        gradient.addColorStop(0.7, `rgba(${line.color}, ${line.opacity})`);
        gradient.addColorStop(1, `rgba(${line.color}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${line.color}, ${line.opacity * 2})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Draw subtle grid dots
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + 
            Math.pow(y - canvas.height / 2, 2)
          );
          const opacity = Math.max(0, 0.15 - (distanceFromCenter / canvas.width) * 0.3);
          
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

  // Smooth text morphing animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      const items = gsap.utils.toArray(".hero-text-item");
      
      // Initial state
      gsap.set(items, { 
        opacity: 0,
        y: 50,
        scale: 0.9,
      });
      
      gsap.set(items[0], { opacity: 1, y: 0, scale: 1 });

      // Text sequence animations
      tl
        // First text appears and breathes
        .to(items[0], {
          duration: 1,
          scale: 1.02,
          ease: "sine.inOut"
        })
        
        // Transition to second
        .to(items[0], {
          duration: 1,
          opacity: 0,
          y: -30,
          scale: 0.95,
          ease: "power2.in"
        }, "+=0.8")
        
        .to(items[1], {
          duration: 1,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out"
        }, "-=0.5")
        
        // Second text breathes
        .to(items[1], {
          duration: 1,
          scale: 1.02,
          ease: "sine.inOut"
        })
        
        // Transition to third
        .to(items[1], {
          duration: 1,
          opacity: 0,
          y: -30,
          scale: 0.95,
          ease: "power2.in"
        }, "+=0.8")
        
        .to(items[2], {
          duration: 1,
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out"
        }, "-=0.5")
        
        // Final breathing
        .to(items[2], {
          duration: 2,
          scale: 1.02,
          ease: "sine.inOut",
          repeat: 1,
          yoyo: true
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050505] text-white"
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Minimal Gradient Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-green-500/5 rounded-full blur-[200px] animate-float-slower" />
      </div>

      {/* Top Section - Email */}
      <div className="relative z-50 w-full px-6 pt-8 flex justify-end">
        <div 
          onClick={copyEmail}
          className="group relative flex items-center gap-3 px-6 py-3 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:border-emerald-500/50 hover:bg-neutral-900/90"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          
          <div className="relative flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-slow" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full absolute animate-ping" />
          </div>
          
          <span className="text-sm font-mono text-neutral-400 group-hover:text-white transition-colors duration-300 relative z-10">
            methminpulsara10@gmail.com
          </span>
          
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400 relative z-10" />
          ) : (
            <Copy className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors relative z-10" />
          )}
        </div>
      </div>

      {/* Center - Main Text */}
      <div ref={textContainerRef} className="relative z-20 flex-1 flex items-center justify-center px-6">
        <div className="relative w-full max-w-7xl text-center">
          <div className="relative h-[200px] md:h-[250px] flex items-center justify-center">
            <h1 
              className="hero-text-item absolute text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black tracking-tight leading-none"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 80px rgba(255, 255, 255, 0.1)',
              }}
            >
              DIGITAL CRAFTSMAN
            </h1>
            
            <h1 
              className="hero-text-item absolute text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black tracking-tight leading-none"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 40px rgba(16, 185, 129, 0.3))',
              }}
            >
              INNOVATION ARCHITECT
            </h1>
            
            <h1 
              className="hero-text-item absolute text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black tracking-tight leading-none"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #34d399 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 60px rgba(16, 185, 129, 0.4))',
              }}
            >
              EXPERIENCE DESIGNER
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-neutral-400 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
              Transforming <span className="text-emerald-400 font-medium">ideas</span> into 
              {' '}<span className="text-white font-medium">immersive digital experiences</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-20 pb-12 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
            {/* Decorative Line */}
            <div className="flex gap-2 items-center order-2 md:order-1">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-emerald-500/50" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse-slow" />
              <div className="h-[1px] w-12 bg-gradient-to-r from-emerald-500/50 to-transparent" />
            </div>

            {/* Info Cards */}
            <div className="flex flex-wrap gap-4 text-sm font-mono order-1 md:order-2">
              <div className="group px-6 py-3 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 transition-all duration-500 hover:border-emerald-500/50 hover:bg-neutral-900/70 cursor-default info-card">
                <span className="text-neutral-400 group-hover:text-white transition-colors tracking-wider uppercase">
                  Sri Lanka
                </span>
              </div>
              
              <div className="group px-6 py-3 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 transition-all duration-500 hover:border-emerald-500/50 hover:bg-neutral-900/70 cursor-default info-card">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-slow" />
                  <span className="text-neutral-400 group-hover:text-white transition-colors tracking-wider uppercase">
                    {currentTime}
                  </span>
                </div>
              </div>
              
              <div className="group px-6 py-3 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 transition-all duration-500 hover:border-emerald-500/50 hover:bg-neutral-900/70 cursor-default info-card">
                <span className="text-neutral-400 group-hover:text-white transition-colors tracking-wider uppercase">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(50px, 50px);
          }
        }
        
        @keyframes float-slower {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, -40px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 40s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .info-card {
          animation: card-float 6s ease-in-out infinite;
        }
        
        .info-card:nth-child(2) {
          animation-delay: 1s;
        }
        
        .info-card:nth-child(3) {
          animation-delay: 2s;
        }
        
        @keyframes card-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
}