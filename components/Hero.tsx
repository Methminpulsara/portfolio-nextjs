/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown, Copy, Check } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Word-by-word animation for title (fast and chaotic)
      const words1 = gsap.utils.toArray(".word-line-1");
      const words2 = gsap.utils.toArray(".word-line-2");

      words1.forEach((word: any) => {
        gsap.from(word, {
          y: gsap.utils.random([-200, -150, -100]),
          opacity: 0,
          rotation: gsap.utils.random([-15, 15]),
          duration: gsap.utils.random(0.8, 1.2),
          ease: "back.out(2)",
          delay: gsap.utils.random(0.2, 1),
        });
      });

      words2.forEach((word: any) => {
        gsap.from(word, {
          y: gsap.utils.random([150, 200, 250]),
          opacity: 0,
          rotation: gsap.utils.random([-15, 15]),
          duration: gsap.utils.random(0.8, 1.2),
          ease: "back.out(2)",
          delay: gsap.utils.random(0.5, 1.5),
        });
      });

      // Continuous chaotic movement for words
      words1.forEach((word: any) => {
        gsap.to(word, {
          y: gsap.utils.random([-15, 15]),
          rotation: gsap.utils.random([-3, 3]),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      words2.forEach((word: any) => {
        gsap.to(word, {
          y: gsap.utils.random([-15, 15]),
          rotation: gsap.utils.random([-3, 3]),
          duration: gsap.utils.random(2, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Bottom content animations
      tl.from(".connect-button", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 1,
      })
      .from(".email-container", {
        x: -50,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 1,
      }, "-=0.8")
      .from(".info-item", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      }, "-=0.6");

      // Hover effect on title characters
      const chars = titleRef.current?.querySelectorAll('.char');
      chars?.forEach((char) => {
        char.addEventListener('mouseenter', () => {
          gsap.to(char, {
            color: '#10b981',
            scale: 1.3,
            y: -20,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)',
          });
        });
        char.addEventListener('mouseleave', () => {
          gsap.to(char, {
            color: '#ffffff',
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("methminpulsara10@gmail.com");
    setCopied(true);
    
    gsap.to(".copy-icon", {
      scale: 1.5,
      rotation: 360,
      duration: 0.4,
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden bg-black"
    >
      {/* Heavy Grain/Noise Background - High Contrast */}
      <div className="grain-background absolute inset-0 z-0 pointer-events-none" />
      
      {/* Additional noise layer for intensity */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Animated grain movement */}
      <div className="absolute inset-0 z-0 opacity-30 animate-grain-shift pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Top spacing */}
      <div className="relative z-20 pt-32" />

      {/* Center - Main Title with Word Animation */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-6">
        <div className="max-w-7xl w-full">
          <h1 ref={titleRef} className="text-[18vw] md:text-[15vw] lg:text-[12vw] leading-[0.9] font-black tracking-tighter text-white text-center select-none">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-2 md:mb-4">
              <span className="word-line-1 inline-block will-change-transform">CREATIVE</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <span className="word-line-2 inline-block will-change-transform">DEVELOPER</span>
            </div>
          </h1>
        </div>
      </div>

      {/* Bottom Section - Info & CTA */}
      <div className="relative z-20 pb-8 md:pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            
            {/* Left - Connect Button & Email */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <button className="connect-button group relative px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white text-white font-bold text-base md:text-lg rounded-full overflow-hidden transition-all duration-500 hover:bg-white hover:text-black flex items-center justify-center gap-3 w-full lg:w-auto">
                <span className="relative z-10 uppercase tracking-wider">Let's Connect</span>
                <ArrowDown className="w-5 h-5 rotate-[-90deg] transition-transform duration-500 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
              
              <div 
                onClick={copyEmail}
                className="email-container group flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 border border-neutral-600 rounded flex items-center justify-center group-hover:border-white transition-colors">
                  <div className="w-2 h-2 bg-neutral-600 group-hover:bg-white transition-colors" />
                </div>
                <span className="text-xs md:text-sm font-mono">methminpulsara10@gmail.com</span>
                <div className="copy-icon ml-auto">
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            </div>

            {/* Center - Description */}
            <div className="hero-description">
              <p className="text-neutral-400 text-sm md:text-base lg:text-lg leading-relaxed">
                <span className="text-white font-semibold">Full-stack developer</span> who combines technical expertise with deep business understanding.
              </p>
            </div>

            {/* Right - Info Items */}
            <div className="flex flex-wrap gap-4 lg:gap-6 text-xs md:text-sm lg:justify-end">
              <div className="info-item flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-neutral-500 uppercase tracking-wider">Available now</span>
              </div>
              <div className="info-item flex items-center gap-2">
                <span className="text-neutral-500 uppercase tracking-wider">LK</span>
              </div>
              <div className="info-item flex items-center gap-2">
                <span className="text-neutral-500 uppercase tracking-wider">{currentTime}</span>
              </div>
              <div className="info-item text-neutral-500 uppercase tracking-wider">
                Global projects welcome
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute left-1/2 bottom-4 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <ArrowDown className="w-5 h-5 text-green-500 animate-bounce" />
      </div>

      {/* Toast notification */}
      {copied && (
        <div className="fixed top-8 right-8 z-50 px-6 py-3 bg-green-500 text-white rounded-lg shadow-2xl flex items-center gap-2 animate-fade-in">
          <Check className="w-5 h-5" />
          <span className="font-medium">Email copied!</span>
        </div>
      )}

      <style jsx>{`
        .will-change-transform {
          will-change: transform;
        }

        /* Heavy Film Grain Background */
        .grain-background {
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.03) 2px, rgba(255,255,255,.03) 4px);
          animation: grain 8s steps(10) infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -10%) }
          20% { transform: translate(-15%, 5%) }
          30% { transform: translate(7%, -25%) }
          40% { transform: translate(-5%, 25%) }
          50% { transform: translate(-15%, 10%) }
          60% { transform: translate(15%, 0%) }
          70% { transform: translate(0%, 15%) }
          80% { transform: translate(3%, 35%) }
          90% { transform: translate(-10%, 10%) }
        }

        .animate-grain-shift {
          animation: grain-shift 3s infinite;
        }

        @keyframes grain-shift {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(5px, 5px) scale(1.02);
            opacity: 0.5;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        /* Character hover effects */
        .char {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
