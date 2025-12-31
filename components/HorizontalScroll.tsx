"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Evo Plan",
    category: "Web Application",
    description: 'Comprehensive event management platform developed during academic studies.',
    tech: ['Angular', 'Spring Boot', 'MySQL'],
    live: 'https://github.com/iCET-Computer-Engineering-Technology/EVO-Frontend',
    year: "2024",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012"
  },
  {
    id: 2,
    title: 'SkillMatch',
    description: 'Web-based platform to manage employee skills and track development.',
    tech: ['Angular', 'Spring Boot', 'Hibernate'],
    live: 'https://github.com/Methminpulsara/skill-match--Frontend',
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    year: "2024"
  },
  {
    id: 3,
    title: 'YouTube Analyzer',
    description: 'Automated system that extracts transcripts and insights from YouTube videos.',
    tech: ['FastAPI', 'LangChain', 'Ollama'],
    live: 'https://github.com/Methminpulsara/youtube-video-analyzer-with-Ollama',
    category: "AI Backend",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974",
    year: "2025"
  },
  {
    id: 4,
    title: 'Library FX',
    description: 'Desktop application for managing book borrowing, returns, and fines.',
    tech: ['JavaFX', 'MySQL', 'JDBC'],
    live: 'https://github.com/Methminpulsara/Library-ManagmentSysytem',
    category: "Desktop App",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026",
    year: "2024"
  }
];

export default function FinalAnimatedSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card-item");

      cards.forEach((card:any) => {
        gsap.fromTo(
          card,
          { 
            y: 150, 
            opacity: 0, 
            scale: 0.9,
            rotateX: 15 
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 95%", // Card එක පෙනෙන්න ගද්දීම පටන් ගන්නවා
              end: "top 70%",   // ටිකක් දුර scroll වෙද්දී animation එක ඉවර වෙනවා
              scrub: 1.5,       // මේකෙන් තමයි ඔයාගේ scroll එකට අනුව animation එක වෙන්නේ
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="bg-[#050505] py-24 px-6 md:px-12 relative overflow-hidden">
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ඔයා කැමතිම Gradient Heading එක */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
            SELECTED WORKS
          </h2>
          <p className="text-neutral-500 text-lg font-mono mt-2 tracking-widest">/ PROJECTS 2024-2025</p>
        </div>

        {/* Desktop 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="project-card-item h-full">
              <div className="group h-full bg-neutral-900/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-emerald-500/40 transition-all duration-500 flex flex-col">
                
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-bold rounded-full">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase mb-1 block">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <a 
                      href={project.live} 
                      target="_blank"
                      className="p-2 bg-white/5 rounded-full text-white hover:bg-emerald-500 hover:text-black transition-all transform group-hover:rotate-45"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19L19 5M5 5h14v14" />
                      </svg>
                    </a>
                  </div>

                  <p className="text-neutral-400 text-xs leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono text-neutral-400">#{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}