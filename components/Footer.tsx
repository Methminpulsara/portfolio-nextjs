"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white py-24 px-6 border-t border-neutral-900 overflow-hidden">
      {/* CSS-only animated lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="wave-line" style={{ top: '33%' }} />
        <div className="wave-line" style={{ top: '66%', animationDelay: '3s' }} />
      </div>

      {/* Static Gradient Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
        <div>
          <h2 className="text-[12vw] md:text-[10vw] leading-none font-black tracking-tighter select-none"
              style={{
                background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
            LET&apos;S TALK
          </h2>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 text-white transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/methmin-pulsara/" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 text-white transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:methminpulsara10@gmail.com" 
              className="p-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 hover:bg-emerald-500 hover:border-emerald-400 text-white transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className="text-neutral-500 text-sm font-mono">
            © {new Date().getFullYear()} MethminPulsara. All rights reserved.
          </p>
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
            rgba(16, 185, 129, 0.06) 30%, 
            rgba(16, 185, 129, 0.06) 70%, 
            transparent 100%
          );
          animation: wave 8s ease-in-out infinite;
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50% { transform: translateX(30px); opacity: 0.6; }
        }
      `}</style>
    </footer>
  );
}