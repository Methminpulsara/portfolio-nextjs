/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";

const ALL_SKILLS = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "from-blue-400/20 to-yellow-400/20" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "from-red-500/20 to-orange-400/20" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "from-yellow-400/20 to-yellow-600/20" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "from-blue-500/20 to-blue-600/20" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "from-cyan-400/20 to-blue-500/20" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "from-white/20 to-gray-400/20" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", color: "from-teal-400/20 to-cyan-500/20" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "from-green-500/20 to-green-600/20" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "from-gray-500/20 to-gray-700/20" },
  { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", color: "from-green-500/20 to-green-600/20" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", color: "from-teal-500/20 to-emerald-500/20" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "from-blue-500/20 to-blue-600/20" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "from-green-500/20 to-green-600/20" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "from-blue-600/20 to-blue-700/20" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "from-pink-500/20 to-purple-500/20" },
  { name: "GSAP", icon: "https://seeklogo.com/images/G/greensock-gsap-icon-logo-2B3E38419F-seeklogo.com.png", color: "from-green-500/20 to-emerald-500/20" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "from-gray-600/20 to-gray-800/20" },
  { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", color: "from-orange-500/20 to-red-500/20" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", color: "from-indigo-500/20 to-purple-500/20" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "from-orange-500/20 to-red-600/20" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "from-blue-500/20 to-blue-700/20" },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", color: "from-purple-500/20 to-yellow-500/20" },
  { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", color: "from-red-500/20 to-red-700/20" },
];

export default function ModernSkillsGlass() {
  const row1 = ALL_SKILLS.slice(0, 6);
  const row2 = ALL_SKILLS.slice(6, 12);
  const row3 = ALL_SKILLS.slice(12, 18);
  const row4 = ALL_SKILLS.slice(18, 24);

  return (
    <section id="skills" className="min-h-screen bg-[#050505] py-32 px-4 overflow-hidden relative">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[180px] animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 rounded-full blur-[200px] animate-float" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(16, 185, 129, 0.5) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl">
            <span className="text-emerald-400 text-sm font-medium tracking-wider">TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Tools and technologies I master to build exceptional digital experiences
          </p>
        </div>

        {/* Scrolling Rows Container */}
        <div className="flex flex-col gap-6 ">
          {/* Row 1 - Left to Right */}
          <div className="marquee-wrapper">
            <div className="marquee-content scroll-left">
              {[...row1, ...row1, ...row1, ...row1].map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="marquee-wrapper">
            <div className="marquee-content scroll-right">
              {[...row2, ...row2, ...row2, ...row2].map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </div>

          {/* Row 3 - Left to Right */}
          <div className="marquee-wrapper">
            <div className="marquee-content scroll-left-slow">
              {[...row3, ...row3, ...row3, ...row3].map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </div>

          {/* Row 4 - Right to Left */}
          <div className="marquee-wrapper">
            <div className="marquee-content scroll-right-slow">
              {[...row4, ...row4, ...row4, ...row4].map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </div>
        </div>

     
      </div>

      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .marquee-content {
          display: flex;
          flex-shrink: 0;
          gap: 1.25rem;
          min-width: 100%;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .scroll-right {
          animation: scroll-right 65s linear infinite;
        }

        .scroll-left-slow {
          animation: scroll-left 60s linear infinite;
        }

        .scroll-right-slow {
          animation: scroll-right 65s linear infinite;
        }

        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
        }

        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .scroll-left, .scroll-right, .scroll-left-slow, .scroll-right-slow {
            animation-duration: 85s;
          }
        }
      `}</style>
    </section>
  );
}

function SkillCard({ skill }: { skill: any }) {
  return (
    <div className="group relative flex-shrink-0">
      {/* Glass Card */}
      <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-emerald-500/20 hover:scale-105 min-w-max">
        {/* Icon Container with Glow */}
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="relative w-10 h-10 flex items-center justify-center bg-black/40 rounded-xl backdrop-blur-sm border border-white/10 group-hover:border-emerald-500/50 transition-all duration-300">
            <img 
              src={skill.icon} 
              alt={skill.name} 
              className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
        
        {/* Skill Name */}
        <span className="text-neutral-300 group-hover:text-white font-medium text-sm tracking-wide transition-colors duration-300 whitespace-nowrap">
          {skill.name}
        </span>
      </div>

      {/* Hover Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl`} />
    </div>
  );
}