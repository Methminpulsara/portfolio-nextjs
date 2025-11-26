/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/types/types";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="w-[70vw] md:w-[50vw] h-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl overflow-hidden group hover:border-emerald-500/50 transition-all duration-500">
    <div className="relative h-[60%] overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-sm rounded-full text-xs font-bold text-black">
          {project.year}
        </span>
        {project.live && project.live !== "#" && (
          <a 
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-neutral-800/80 backdrop-blur-sm rounded-full text-white hover:bg-emerald-500/90 hover:text-black transition-all duration-300 group/link"
            title="View Live Project"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <span className="text-xs text-neutral-500 uppercase tracking-wider">{project.category}</span>
      </div>
      <p className="text-neutral-400 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 pt-2">
        {project.tech?.map((t: string) => (
          <span key={t} className="px-3 py-1 bg-neutral-800/50 rounded-full text-xs text-emerald-400 font-mono">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [showViewAll, setShowViewAll] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Evo Plan",
      category: "Web Application",
      description: 'A comprehensive event management platform developed during my academic studies. Features real-time event booking, attendee management, and live updates using WebSockets for seamless user experience.',
      tech: ['Angular', 'Spring Boot', 'WebSockets', 'MySQL', 'Java'],
      live: 'https://github.com/iCET-Computer-Engineering-Technology/EVO-Frontend',
      year: "2024",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
    },
    {
      id: 2,
      title: 'SkillMatch',
      description: 'Web-based platform to manage employee skills, track development, and support training programs. Designed to help identify internal talent and enhance career growth through structured data and analytics.',
      tech: ['Angular', 'Spring Boot', 'MySQL', 'Hibernate'],
      live: 'https://github.com/Methminpulsara/skill-match--Frontend',
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      year: "2024"
    },
    {
      id: 3,
      title: 'Analytics',
      description: 'Advanced analytics module for the SkillMatch platform. Visualizes employee growth trajectories, skill gaps, and training ROI using interactive charts and data export capabilities.',
      tech: ['Angular', 'D3.js', 'Spring Boot', 'MySQL'],
      live: 'https://github.com/Methminpulsara/skill-match--Frontend',
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      year: "2023"
    },
    {
      id: 4,
      title: "Portfolio V1",
      category: "Website",
      description: "My first personal portfolio website showcasing early projects and design experiments. Built with vanilla HTML/CSS and JavaScript with a focus on clean typography.",
      tech: ["HTML", "CSS", "JavaScript", "GSAP"],
      live: "#",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
      year: "2023"
    },
    {
      id: 5,
      title: 'Library Sys',
      description: 'Desktop application for managing book borrowing, returns, fines, and integrations with MySQL. Features a clean, responsive user interface designed with JavaFX.',
      tech: ['JavaFX', 'MySQL', 'JDBC'],
      live: 'https://github.com/Methminpulsara/Library-ManagmentSysytem',
      category: "Desktop App",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026&auto=format&fit=crop",
      year: "2022"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card-container");
      
      const animation = gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + (triggerRef.current?.offsetWidth || 0),
          onUpdate: (self) => {
            // Show "View All" button when scrolled to the end (progress > 0.9)
            if (self.progress > 0.9) {
              setShowViewAll(true);
            } else {
              setShowViewAll(false);
            }
          }
        }
      });

      return () => {
        animation.kill();
      };
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-[#050505] relative">
      {/* CSS-only animated lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="wave-line" style={{ top: '30%' }} />
        <div className="wave-line" style={{ top: '70%', animationDelay: '3s' }} />
      </div>

      {/* Static Gradient Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px]" />
      </div>

      <div ref={triggerRef} className="h-screen flex items-center relative z-10">
        <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #10b981 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
            SELECTED WORKS
          </h2>
          <p className="text-neutral-400 text-lg">Drag or scroll to explore</p>
        </div>

        <div ref={sectionRef} className="flex pt-5 gap-12 md:gap-24 px-6 md:px-12 h-[65vh] w-full items-center mt-20">
          {projects.map((project) => (
            <div key={project.id} className="project-card-container h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${
          showViewAll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a
            href="https://github.com/Methminpulsara" // Replace with your actual projects page or GitHub
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 rounded-2xl text-white font-semibold hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10">View All Projects</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .wave-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(16, 185, 129, 0.08) 30%, 
            rgba(16, 185, 129, 0.08) 70%, 
            transparent 100%
          );
          animation: wave 8s ease-in-out infinite;
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(30px); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}