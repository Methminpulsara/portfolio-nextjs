/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const skills = [
    { name: "Python", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "from-blue-500 to-yellow-500" },
    { name: "Java", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "from-red-600 to-orange-400" },
    { name: "JavaScript", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "from-yellow-400 to-yellow-600" },
    { name: "TypeScript", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "from-blue-600 to-blue-400" },
    { name: "HTML", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "from-orange-500 to-red-500" },
    { name: "CSS", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "from-blue-500 to-blue-700" },
    { name: "SCSS", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", color: "from-pink-500 to-purple-500" },
    { name: "React", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "from-cyan-500 to-blue-500" },
    { name: "Next.js", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "from-white to-gray-400" },
    { name: "Angular", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", color: "from-red-500 to-red-700" },
    { name: "Bootstrap", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", color: "from-purple-500 to-purple-700" },
    { name: "Tailwind", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", color: "from-teal-400 to-blue-500" },
    { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "from-green-500 to-green-600" },
    { name: "Express.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "from-gray-500 to-gray-700" },
    { name: "Spring Boot", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", color: "from-green-600 to-green-400" },
    { name: "FastAPI", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", color: "from-teal-500 to-green-500" },
    { name: "MySQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "from-blue-600 to-blue-400" },
    { name: "MongoDB", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "from-green-600 to-green-400" },
    { name: "PostgreSQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "from-blue-700 to-blue-400" },
    { name: "LangChain", category: "AI & Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/langchain/langchain-original.svg", color: "from-emerald-500 to-teal-500" },
    { name: "OpenAI API", category: "AI & Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg", color: "from-gray-400 to-gray-600" },
    { name: "Ollama", category: "AI & Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ollama/ollama-original.svg", color: "from-purple-500 to-purple-700" },
    { name: "Docker", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "from-blue-500 to-cyan-500" },
    { name: "Selenium", category: "DevOps", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg", color: "from-green-500 to-gray-700" },
    { name: "Figma", category: "Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "from-pink-500 to-red-500" },
    { name: "GSAP", category: "Design", icon: "https://seeklogo.com/images/G/greensock-gsap-icon-logo-2B3E38419F-seeklogo.com.png", color: "from-green-500 to-teal-500" },
    { name: "GitHub", category: "Version Control", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "from-gray-700 to-gray-900" },
    { name: "GitLab", category: "Version Control", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", color: "from-orange-500 to-red-500" },
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
    <section id="skills" ref={containerRef} className="min-h-screen bg-[#050505] text-white py-32 px-6 relative overflow-hidden">
      {/* CSS-only animated lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="wave-line" style={{ top: '20%' }} />
        <div className="wave-line" style={{ top: '50%', animationDelay: '2s' }} />
        <div className="wave-line" style={{ top: '80%', animationDelay: '4s' }} />
      </div>

      {/* Static Gradient Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-green-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #10b981 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
            Technical Arsenal
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                activeCategory === tab 
                  ? "bg-emerald-500 text-black scale-105 shadow-[0_0_30px_rgba(16,185,129,0.5)]" 
                  : "bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white hover:border-emerald-500/30"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div 
              key={`${skill.name}-${idx}`}
              className="skill-card group relative bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-emerald-500/50 hover:bg-neutral-800/80 transition-all duration-300 cursor-pointer"
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

              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color || 'from-green-500/10 to-transparent'} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
            </div>
          ))}
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