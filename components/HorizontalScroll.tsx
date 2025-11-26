"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mock ProjectCard component - replace with your actual component
const ProjectCard = ({ project }: { project: any }) => (
  <div className="w-[70vw] md:w-[50vw] h-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl overflow-hidden group hover:border-emerald-500/50 transition-all duration-500">
    <div className="relative h-[60%] overflow-hidden">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
      <span className="absolute top-4 right-4 px-4 py-2 bg-emerald-500/90 backdrop-blur-sm rounded-full text-xs font-bold text-black">
        {project.year}
      </span>
    </div>
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <span className="text-xs text-neutral-500 uppercase tracking-wider">{project.category}</span>
      </div>
      <p className="text-neutral-400 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 pt-2">
        {project.tech.map((t: string) => (
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Animated background
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

    const lines: Array<{
      y: number;
      speed: number;
      amplitude: number;
      frequency: number;
      offset: number;
      opacity: number;
      color: string;
    }> = [];

    for (let i = 0; i < 6; i++) {
      lines.push({
        y: (canvas.height / 7) * (i + 1),
        speed: 0.0005 + Math.random() * 0.001,
        amplitude: 30 + Math.random() * 40,
        frequency: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
        opacity: 0.03 + Math.random() * 0.04,
        color: i % 2 === 0 ? '16, 185, 129' : '52, 211, 153'
      });
    }

    let time = 0;

    const animate = () => {
      time += 1;
      
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(0, line.y);

        for (let x = 0; x < canvas.width; x += 2) {
          const y = line.y + Math.sin(x * line.frequency + time * line.speed + line.offset) * line.amplitude;
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, `rgba(${line.color}, 0)`);
        gradient.addColorStop(0.3, `rgba(${line.color}, ${line.opacity})`);
        gradient.addColorStop(0.7, `rgba(${line.color}, ${line.opacity})`);
        gradient.addColorStop(1, `rgba(${line.color}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${line.color}, ${line.opacity * 2})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + 
            Math.pow(y - canvas.height / 2, 2)
          );
          const opacity = Math.max(0, 0.12 - (distanceFromCenter / canvas.width) * 0.3);
          
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card-container");
      
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
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-[#050505] relative">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] animate-float-slow" />
      </div>

      <div ref={triggerRef} className="h-screen flex items-center relative z-10">
        {/* Title Section */}
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

        {/* Projects Container */}
        <div ref={sectionRef} className="flex pt-5 gap-12 md:gap-24 px-6 md:px-12 h-[65vh] w-full items-center mt-20">
          {projects.map((project) => (
            <div key={project.id} className="project-card-container h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, 50px); }
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}