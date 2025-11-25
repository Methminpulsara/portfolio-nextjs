/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const skills = [
    // Languages
    {
      name: "Python",
      category: "Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "from-blue-500 to-yellow-500",
      accent: "border-blue-500/50"
    },
    {
      name: "Java",
      category: "Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "from-red-600 to-orange-400",
      accent: "border-red-500/50"
    },
    {
      name: "JavaScript",
      category: "Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "from-yellow-400 to-yellow-600",
      accent: "border-yellow-500/50"
    },
    {
      name: "TypeScript",
      category: "Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "from-blue-600 to-blue-400",
      accent: "border-blue-600/50"
    },
    {
      name: "HTML",
      category: "Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "from-orange-500 to-red-500",
      accent: "border-orange-500/50"
    },
    {
      name: "CSS",
      category: "Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "from-blue-500 to-blue-700",
      accent: "border-blue-500/50"
    },
    {
      name: "SCSS",
      category: "Languages",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      color: "from-pink-500 to-purple-500",
      accent: "border-pink-500/50"
    },

    // Frontend
    {
      name: "React",
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "from-cyan-500 to-blue-500",
      accent: "border-cyan-500/50"
    },
    {
      name: "Next.js",
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "from-white to-gray-400",
      accent: "border-white/50"
    },
    {
      name: "Angular",
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      color: "from-red-500 to-red-700",
      accent: "border-red-500/50"
    },
    {
      name: "Bootstrap",
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      color: "from-purple-500 to-purple-700",
      accent: "border-purple-500/50"
    },
    {
      name: "Tailwind",
      category: "Frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      color: "from-teal-400 to-blue-500",
      accent: "border-teal-500/50"
    },

    // Backend
    {
      name: "Node.js",
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "from-green-500 to-green-600",
      accent: "border-green-500/50"
    },
    {
      name: "Express.js",
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      color: "from-gray-500 to-gray-700",
      accent: "border-gray-500/50"
    },
    {
      name: "Spring Boot",
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      color: "from-green-600 to-green-400",
      accent: "border-green-500/50"
    },
    {
      name: "FastAPI",
      category: "Backend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      color: "from-teal-500 to-green-500",
      accent: "border-teal-500/50"
    },

    // Database
    {
      name: "MySQL",
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "from-blue-600 to-blue-400",
      accent: "border-blue-500/50"
    },
    {
      name: "MongoDB",
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "from-green-600 to-green-400",
      accent: "border-green-500/50"
    },
    {
      name: "PostgreSQL",
      category: "Database",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "from-blue-700 to-blue-400",
      accent: "border-blue-700/50"
    },

    // AI & Tools
    {
      name: "LangChain",
      category: "AI & Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/langchain/langchain-original.svg",
      color: "from-emerald-500 to-teal-500",
      accent: "border-emerald-500/50"
    },
    {
      name: "OpenAI API",
      category: "AI & Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg",
      color: "from-gray-400 to-gray-600",
      accent: "border-gray-500/50"
    },
    {
      name: "Ollama",
      category: "AI & Tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ollama/ollama-original.svg",
      color: "from-purple-500 to-purple-700",
      accent: "border-purple-500/50"
    },

    // DevOps
    {
      name: "Docker",
      category: "DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "from-blue-500 to-cyan-500",
      accent: "border-blue-500/50"
    },
    {
      name: "Selenium",
      category: "DevOps",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
      color: "from-green-500 to-gray-700",
      accent: "border-green-500/50"
    },

    // Design
    {
      name: "Figma",
      category: "Design",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      color: "from-pink-500 to-red-500",
      accent: "border-pink-500/50"
    },
    {
      name: "GSAP",
      category: "Design",
      icon: "https://seeklogo.com/images/G/greensock-gsap-icon-logo-2B3E38419F-seeklogo.com.png",
      color: "from-green-500 to-teal-500",
      accent: "border-green-500/50"
    },

    // Version Control
    {
      name: "GitHub",
      category: "Version Control",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      color: "from-gray-700 to-gray-900",
      accent: "border-gray-800/50"
    },
    {
      name: "GitLab",
      category: "Version Control",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
      color: "from-orange-500 to-red-500",
      accent: "border-orange-500/50"
    },
  ];

  const categories = ["All", ...Array.from(new Set(skills.map(s => s.category)))];
  const filteredSkills = activeCategory === "All" ? skills : skills.filter(s => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-card", 
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.5)",
          overwrite: "auto"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section id="skills" ref={containerRef} className="min-h-screen bg-neutral-950 text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Technical Arsenal</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === tab 
                  ? "bg-emerald-500 text-black scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div 
              key={`${skill.name}-${idx}`}
              className="skill-card group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-green-500/50 hover:bg-neutral-800/80 transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-16 h-16 flex items-center justify-center bg-black/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              
              <h3 className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">
                {skill.name}
              </h3>

              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color || 'from-green-500/10 to-transparent'} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
