/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1481487484168-9b995ecc168d?q=80&w=2080&auto=format&fit=crop",
      year: "2024"
    },
    {
      id: 2,
      title: "AI Dashboard",
      category: "Platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      year: "2024"
    },
    {
      id: 3,
      title: "Social App",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      year: "2023"
    },
    {
      id: 4,
      title: "Portfolio V1",
      category: "Website",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
      year: "2023"
    },
    {
      id: 5,
      title: "Finance Tool",
      category: "SaaS",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026&auto=format&fit=crop",
      year: "2022"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      
      // Horizontal scroll animation
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + (triggerRef.current?.offsetWidth || 0),
        }
      });

      // Highlight animation for each card
      cards.forEach((card: any) => {
        gsap.fromTo(card.querySelector(".card-outline"), 
          { opacity: 0, borderColor: "rgba(255,255,255,0.1)" },
          {
            opacity: 1,
            borderColor: "#8b5cf6", // violet-500
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById("horizontal-scroll"), // We need to link it if we named the tween, but here it's tricky with horizontal scroll
              start: "left center",
              end: "right center",
              toggleActions: "play reverse play reverse",
              horizontal: true, // Important for horizontal scrolling triggers
            }
          }
        );
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <div ref={triggerRef} className="h-screen flex items-center relative">
        <div className="absolute top-12 left-12 z-10 mix-blend-difference">
          <h2 className="text-4xl font-bold tracking-tighter text-white">SELECTED WORKS</h2>
          <p className="text-neutral-400 mt-2">Drag or scroll to explore</p>
        </div>

        <div ref={sectionRef} className="flex gap-12 px-12 h-[60vh] w-full items-center">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card flex-shrink-0 w-[80vw] md:w-[40vw] h-full relative group cursor-pointer"
            >
              {/* Outline Box */}
              <div className="card-outline absolute -inset-4 border-2 border-black/10 dark:border-white/10 rounded-[2rem] opacity-0 transition-all duration-500 pointer-events-none" />

              <div className="w-full h-full overflow-hidden rounded-3xl relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex justify-between items-end">
                <div>
                  <span className="text-sm font-mono text-neutral-400 mb-2 block">{project.category} — {project.year}</span>
                  <h3 className="text-4xl font-bold text-white">{project.title}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
