/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const skills = [
    {
      name: "Python",
      category: "Language",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "from-blue-500 to-yellow-500",
      accent: "border-blue-500/50"
    },
    {
      name: "LangChain",
      category: "AI Framework",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/langchain/langchain-original.svg",
      color: "from-emerald-500 to-teal-500",
      accent: "border-emerald-500/50"
    },
    {
      name: "Hugging Face",
      category: "ML Platform",
      icon: "https://huggingface.co/front/assets/huggingface_logo.svg",
      color: "from-yellow-500 to-orange-500",
      accent: "border-yellow-500/50"
    },
    {
      name: "OpenAI API",
      category: "AI Service",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg",
      color: "from-gray-400 to-gray-600",
      accent: "border-gray-500/50"
    },
    {
      name: "OpenCV",
      category: "Computer Vision",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
      color: "from-red-500 to-blue-500",
      accent: "border-red-500/50"
    },
    {
      name: "FastAPI",
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      color: "from-teal-500 to-green-500",
      accent: "border-teal-500/50"
    },
    {
      name: "TypeScript",
      category: "Language",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "from-blue-600 to-blue-400",
      accent: "border-blue-600/50"
    },
    {
      name: "React",
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "from-cyan-500 to-blue-500",
      accent: "border-cyan-500/50"
    },
    {
      name: "Next.js",
      category: "Framework",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "from-white to-gray-400",
      accent: "border-white/50"
    },
    {
      name: "Vite",
      category: "Build Tool",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
      color: "from-purple-500 to-yellow-500",
      accent: "border-purple-500/50"
    },
    {
      name: "PostgreSQL",
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "from-blue-700 to-blue-400",
      accent: "border-blue-700/50"
    },
    {
      name: "Prisma",
      category: "ORM",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
      color: "from-indigo-500 to-cyan-500",
      accent: "border-indigo-500/50"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".skill-card");
      
      // Staggered wave entrance animation
      gsap.fromTo(
        cards,
        {
          y: 100,
          opacity: 0,
          rotateX: -45,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: {
            each: 0.15,
            from: "start",
            ease: "power2.out"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax scroll effect for each card
      cards.forEach((card: any, index: number) => {
        const speed = 1 + (index % 3) * 0.3; // Varying speeds
        
        gsap.to(card, {
          y: -150 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });

        // Rotation on scroll
        gsap.to(card.querySelector(".icon-container"), {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        });

        // Outline glow animation on scroll
        gsap.to(card.querySelector(".outline-glow"), {
          opacity: 1,
          duration: 0.3,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          }
        });
      });

      // Magnetic hover effect
      cards.forEach((card: any) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(card, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.6,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative bg-black overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div ref={triggerRef} className="relative min-h-screen py-32 px-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-24 text-center">
          <p className="text-sm font-mono text-green-500 mb-4 tracking-widest uppercase animate-pulse">
            MY SKILLS
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
            BUILDING PRODUCTION
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 animate-gradient">
              AI SYSTEMS
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            That solve real problems with cutting-edge technology
          </p>
        </div>

        {/* Skills Grid with Bento Layout */}
        <div 
          ref={sectionRef}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          style={{ perspective: "1000px" }}
        >
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="skill-card group relative cursor-pointer"
              style={{ 
                transformStyle: "preserve-3d",
                opacity: 0,
              }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${skill.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-700`} />
              
              {/* Card */}
              <div className="relative h-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 overflow-hidden transition-all duration-500 group-hover:border-neutral-700 group-hover:shadow-2xl">
                {/* Animated border - always visible */}
                <div className={`absolute inset-0 border-2 ${skill.accent} rounded-3xl transition-all duration-500 group-hover:border-opacity-100`} 
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255,255,255,0.05) 100%)`
                  }}
                />
                
                {/* Animated outline glow */}
                <div 
                  className="outline-glow absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    boxShadow: `0 0 20px 2px rgba(74, 222, 128, 0.3)`,
                    opacity: 0,
                  }}
                />

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-6 h-full min-h-[240px]">
                  {/* Icon */}
                  <div className="icon-container relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-2xl blur-xl opacity-50`} />
                    <div className="relative w-24 h-24 flex items-center justify-center bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-neutral-700 group-hover:scale-110 group-hover:bg-neutral-800 transition-all duration-500">
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = `<span class="text-4xl font-bold text-white">${skill.name[0]}</span>`;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center space-y-2">
                    <h3 className={`text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${skill.color} transition-all duration-500`}>
                      {skill.name}
                    </h3>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-3 right-3 w-2 h-2 bg-gradient-to-br ${skill.color} rounded-full animate-ping`} />
                  <div className={`absolute top-3 right-3 w-2 h-2 bg-gradient-to-br ${skill.color} rounded-full`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}