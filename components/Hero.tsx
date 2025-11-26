"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
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
        },
      });

      const items = gsap.utils.toArray(".hero-text-item");

      gsap.set(items, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      gsap.set(items[0], { opacity: 1, y: 0, scale: 1 });

      tl.to(items[0], { duration: 1, scale: 1.02, ease: "sine.inOut" })
        .to(
          items[0],
          { duration: 1, opacity: 0, y: -30, scale: 0.95, ease: "power2.in" },
          "+=0.8"
        )
        .to(
          items[1],
          { duration: 1, opacity: 1, y: 0, scale: 1, ease: "power2.out" },
          "-=0.5"
        )
        .to(items[1], { duration: 1, scale: 1.02, ease: "sine.inOut" })
        .to(
          items[1],
          { duration: 1, opacity: 0, y: -30, scale: 0.95, ease: "power2.in" },
          "+=0.8"
        )
        .to(
          items[2],
          { duration: 1, opacity: 1, y: 0, scale: 1, ease: "power2.out" },
          "-=0.5"
        )
        .to(items[2], {
          duration: 2,
          scale: 1.02,
          ease: "sine.inOut",
          repeat: 1,
          yoyo: true,
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
      {/* Static gradient overlays - no animation */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-green-500/5 rounded-full blur-[200px]" />
      </div>

      {/* CSS-only animated lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="wave-line" style={{ top: "20%" }} />
        <div
          className="wave-line"
          style={{ top: "40%", animationDelay: "1s" }}
        />
        <div
          className="wave-line"
          style={{ top: "60%", animationDelay: "2s" }}
        />
        <div
          className="wave-line"
          style={{ top: "80%", animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-50 w-full px-6 pt-8 flex justify-end"></div>

      <div
        ref={textContainerRef}
        className="relative z-20 flex-1 flex items-center justify-center px-6 overflow-hidden"
      >
        <div className="relative w-full max-w-7xl text-center">
          <div className="relative h-[200px] md:h-[250px] flex items-center justify-center">
            <h1
              className="hero-text-item absolute text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black tracking-tight leading-none"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DIGITAL CRAFTSMAN
            </h1>

            <h1
              className="hero-text-item absolute text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black tracking-tight leading-none"
              style={{
                background:
                  "linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              INNOVATION ARCHITECT
            </h1>

            <h1
              className="hero-text-item absolute text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black tracking-tight leading-none"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #10b981 50%, #34d399 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              EXPERIENCE DESIGNER
            </h1>
          </div>

          <div
            className="mt-8 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-neutral-400 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
              Transforming{" "}
              <span className="text-emerald-400 font-medium">ideas</span> into{" "}
              <span className="text-white font-medium">
                immersive digital experiences
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-20 pb-12 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
            <div className="flex gap-2 items-center order-2 md:order-1">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-emerald-500/50" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse-slow" />
              <div className="h-[1px] w-12 bg-gradient-to-r from-emerald-500/50 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-mono order-1 md:order-2">
              <div
                onClick={copyEmail}
                className="group relative flex items-center gap-3 px-6 py-3 bg-black/50 backdrop-blur-2xl border border-white/20 rounded-2xl cursor-pointer overflow-hidden transition-all duration-700 hover:scale-110  hover:border-emerald-500/50"
                style={{ boxShadow: "0 0 10px rgba(16, 185, 129, 0.2)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-green-500/20 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
                <span className="text-sm font-mono text-neutral-300 group-hover:text-white transition-colors duration-300 relative z-10">
                  methminpulsara10@gmail.com
                </span>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400 relative z-10" />
                ) : (
                  <Copy className="w-4 h-4 text-neutral-400 group-hover:text-emerald-300 transition-all duration-300 relative z-10" />
                )}
              </div>
             
             <div className="px-6 py-3 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 transition-all duration-500 hover:border-emerald-500/50 cursor-default">
                <span className="text-neutral-400 hover:text-white transition-colors tracking-wider uppercase">
                  Sri Lanka
                </span>
              </div>

              <div className="px-6 py-3 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 transition-all duration-500 hover:border-emerald-500/50 cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-slow" />
                  <span className="text-neutral-400 hover:text-white transition-colors tracking-wider uppercase">
                    {currentTime}
                  </span>
                </div>
              </div>

              <div className="px-6 py-3 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 transition-all duration-500 hover:border-emerald-500/50 cursor-default">
                <span className="text-neutral-400 hover:text-white transition-colors tracking-wider uppercase">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wave-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(16, 185, 129, 0.1) 30%,
            rgba(16, 185, 129, 0.1) 70%,
            transparent 100%
          );
          animation: wave 8s ease-in-out infinite;
        }

        @keyframes wave {
          0%,
          100% {
            transform: translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateX(30px);
            opacity: 0.6;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
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
      `}</style>
    </section>
  );
}
