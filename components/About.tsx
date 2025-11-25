/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax & Scale
      gsap.fromTo(imageRef.current, 
        { scale: 1.2, yPercent: 10 },
        {
          scale: 1,
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Text Reveal with Stagger
      const splitText = document.querySelectorAll(".about-text-reveal");
      splitText.forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        });
      });

      // Stats Counter Animation
      const stats = document.querySelectorAll(".stat-number");
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target") || "0");
        gsap.to(stat, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="min-h-screen bg-neutral-900 text-white py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Image Column */}
        <div className="relative aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto md:mx-0 overflow-hidden rounded-2xl group">
          <div className="absolute inset-0 bg-green-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
          <img 
            ref={imageRef}
            src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover object-center"
          />
          {/* Decorative Border */}
          <div className="absolute inset-0 border-2 border-green-500/30 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500" />
        </div>

        {/* Content Column */}
        <div className="space-y-8">
          <h2 className="about-text-reveal text-sm font-mono text-green-500 tracking-widest uppercase">
            About Me
          </h2>
          
          <h3 className="about-text-reveal text-4xl md:text-6xl font-bold leading-tight">
            Turning complex problems into <span className="text-neutral-500">elegant solutions.</span>
          </h3>

          <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
            <p className="about-text-reveal">
              I&lsquo;m a passionate Full Stack Developer with a keen eye for design and a drive for innovation. 
              My journey began with a curiosity for how things work, which evolved into a career building 
              robust web applications and immersive digital experiences.
            </p>
            <p className="about-text-reveal">
              With expertise in modern frameworks like React, Next.js, and Angular, combined with powerful 
              backend technologies like Spring Boot and Node.js, I bridge the gap between creative vision 
              and technical execution.
            </p>
          </div>

          {/* Stats / Highlights */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-800">
            <div className="about-text-reveal">
              <div className="flex items-baseline">
                <span className="stat-number text-4xl font-bold text-white mb-1" data-target="3">0</span>
                <span className="text-2xl font-bold text-green-500">+</span>
              </div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="about-text-reveal">
              <div className="flex items-baseline">
                <span className="stat-number text-4xl font-bold text-white mb-1" data-target="20">0</span>
                <span className="text-2xl font-bold text-green-500">+</span>
              </div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">Projects Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
