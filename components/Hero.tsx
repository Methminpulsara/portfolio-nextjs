"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      
      // Initial state
      gsap.set(items, { 
        opacity: 0, 
        rotateX: 90, 
        y: 50, 
        filter: "blur(10px)",
        transformOrigin: "50% 50% -50px"
      });
      gsap.set(items[0], { 
        opacity: 1, 
        rotateX: 0, 
        y: 0, 
        filter: "blur(0px)" 
      });

      // Sequence: 3D Rotation Transition
      
      // 1 -> 2
      tl.to(items[0], { 
        opacity: 0, 
        rotateX: -90, 
        y: -50, 
        filter: "blur(10px)", 
        duration: 1, 
        ease: "power2.inOut" 
      })
      .to(items[1], { 
        opacity: 1, 
        rotateX: 0, 
        y: 0, 
        filter: "blur(0px)", 
        duration: 1, 
        ease: "power2.inOut" 
      }, "<+=0.1")
      
      // 2 -> 3
      .to(items[1], { 
        opacity: 0, 
        rotateX: -90, 
        y: -50, 
        filter: "blur(10px)", 
        duration: 1, 
        ease: "power2.inOut",
        delay: 0.2
      })
      .to(items[2], { 
        opacity: 1, 
        rotateX: 0, 
        y: 0, 
        filter: "blur(0px)", 
        duration: 1, 
        ease: "power2.inOut" 
      }, "<+=0.1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050505] text-white perspective-1000"
    >
      {/* New Background: Animated Aurora / Nebula */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-slow-spin opacity-30">
           <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
           <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
           <div className="absolute bottom-[20%] left-[30%] w-[40vw] h-[40vw] bg-green-500 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" /> {/* Overlay to darken */}
      </div>

      {/* Top Section - Email (Right Top) */}
      <div className="relative z-50 w-full px-6 pt-8 flex justify-end">
        <div 
          onClick={copyEmail}
          className="group flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-green-500/30"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs md:text-sm font-mono text-neutral-300 group-hover:text-white transition-colors">
            methminpulsara10@gmail.com
          </span>
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
          )}
        </div>
      </div>

      {/* Center - Animated Text */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6 perspective-1000">
        <div className="relative w-full max-w-7xl text-center h-[20vh] flex items-center justify-center">
            <h1 className="hero-text-item absolute text-[8vw] md:text-[7vw] font-black tracking-tighter leading-none text-white whitespace-nowrap drop-shadow-2xl">
              Full Stack Developer
            </h1>
            <h1 className="hero-text-item absolute text-[8vw] md:text-[7vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 whitespace-nowrap drop-shadow-2xl">
              Ai/Ml Developer
            </h1>
            <h1 className="hero-text-item absolute text-[8vw] md:text-[7vw] font-black tracking-tighter leading-none text-white whitespace-nowrap drop-shadow-2xl">
              Creative Developer
            </h1>
        </div>
      </div>

      {/* Bottom Section - Info */}
      <div className="relative z-20 pb-8 md:pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-md">
               <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
                 Crafting digital experiences with <span className="text-green-500 font-medium">code</span> and <span className="text-white font-medium">creativity</span>.
               </p>
            </div>

            <div className="flex flex-wrap gap-6 text-xs md:text-sm font-mono text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-wider hover:text-white transition-colors cursor-default">LK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-wider hover:text-white transition-colors cursor-default">{currentTime}</span>
              </div>
            </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
