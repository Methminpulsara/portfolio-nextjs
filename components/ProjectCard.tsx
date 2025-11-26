/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Project } from "@/types/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hover Animation Timeline
      const tl = gsap.timeline({ paused: true });

      tl.to(outlineRef.current, {
        opacity: 1,
        borderColor: "#10b981", // green-500 to match hero
        duration: 0.3,
        ease: "power2.out",
      })
      .to(imageRef.current, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      }, 0)
      .to(detailsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, 0.1)
      .from(techRef.current?.children || [], {
        y: 10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "back.out(1.7)",
      }, 0.2);

      // Event Listeners
      const card = cardRef.current;
      if (card) {
        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      }

      return () => {
        if (card) {
          card.removeEventListener("mouseenter", () => tl.play());
          card.removeEventListener("mouseleave", () => tl.reverse());
        }
      };
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cardRef}
      className="project-card flex-shrink-0 w-[85vw] md:w-[45vw] h-full relative group cursor-pointer"
    >
      {/* Outline Box */}
      <div 
        ref={outlineRef}
        className="card-outline absolute -inset-4 border-2 border-white/10 rounded-[2.5rem] opacity-0 transition-all duration-500 pointer-events-none" 
      />

      <div className="w-full h-full overflow-hidden rounded-[2rem] relative shadow-2xl bg-neutral-900">
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />
        
        <img 
          ref={imageRef}
          src={project.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80"} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
        />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
          {/* Header (Always Visible) */}
          <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-mono text-green-400 bg-green-500/10 px-3 py-1 rounded-full backdrop-blur-md border border-green-500/20">
                {project.category} — {project.year}
              </span>
              {project.live && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group-hover:scale-110 border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight className="w-6 pt-8 h-6" />
                </a>
              )}
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-2">
              {project.title}
            </h3>
          </div>

          {/* Expanded Details (Hidden by default, slides up) */}
          <div 
            ref={detailsRef}
            className="opacity-0 translate-y-10"
          >
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-6 max-w-2xl line-clamp-3 md:line-clamp-none">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div ref={techRef} className="flex flex-wrap gap-2 mb-6">
              {project.tech?.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs md:text-sm font-medium text-white bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Action Buttons - Matched to Hero Style */}
            <div className="flex gap-4">
               {project.live && (
                <a 
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative px-6 py-3 bg-transparent border border-white text-white rounded-full font-medium transition-all overflow-hidden flex items-center gap-2 hover:text-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ExternalLink size={18} />
                    View Live
                  </span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
