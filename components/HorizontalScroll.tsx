"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/types";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
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
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="overflow-hidden bg-black">
      <div ref={triggerRef} className="h-screen flex items-center relative">
        {/* Title Section - Adjusted spacing and removed padding issues */}
        <div className="absolute top-12 left-6 md:left-12 z-10 pointer-events-none mix-blend-difference">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">SELECTED WORKS</h2>
          <p className="text-neutral-400 text-lg">Drag or scroll to explore</p>
        </div>

        {/* Projects Container - Added gap and adjusted layout */}
        <div ref={sectionRef} className="flex pt-5 gap-12 md:gap-24  px-6 md:px-12 h-[65vh] w-full items-center mt-20">
          {projects.map((project) => (
            <div key={project.id} className="project-card-container h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
