"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Animated background matching hero
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
      gsap.from(".contact-text-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      gsap.from(".contact-form-reveal", {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Form submitted:", formState);
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
      
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={containerRef} className="min-h-screen bg-[#050505] text-white px-6 py-32 flex items-center relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-green-500/5 rounded-full blur-[200px] animate-float-slower" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-32 relative z-10">
        {/* Left Column: Text Info */}
        <div className="flex flex-col justify-center">
          <h2 className="contact-text-reveal text-[12vw] md:text-[8vw] leading-[0.9] font-black tracking-tighter mb-8"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #10b981 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
            HELLO.
          </h2>
          <p className="contact-text-reveal text-xl md:text-2xl text-neutral-400 max-w-md leading-relaxed">
            Have a project in mind? Let&apos;s build something amazing together.
            Reach out for collaborations or just to say hi.
          </p>
          
          <div className="contact-text-reveal mt-16 space-y-6">
            <a href="mailto:info@methminpulsara.dev" 
               className="block text-2xl md:text-3xl font-light hover:text-emerald-400 transition-colors duration-300">
              info@methminpulsara.dev
            </a>
            <p className="text-neutral-500 font-mono text-lg">+94 76 091 9266</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="space-y-10 mt-12 md:mt-0 flex flex-col justify-center">
          <div className="contact-form-reveal group relative">
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({...formState, name: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-800 py-6 text-xl md:text-2xl text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-700"
              placeholder="Your Name"
            />
          </div>
          <div className="contact-form-reveal group relative">
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({...formState, email: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-800 py-6 text-xl md:text-2xl text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-neutral-700"
              placeholder="Your Email"
            />
          </div>
          <div className="contact-form-reveal group relative">
            <textarea
              required
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState({...formState, message: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-800 py-6 text-xl md:text-2xl text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none placeholder:text-neutral-700"
              placeholder="Message"
            />
          </div>

          <div className="contact-form-reveal pt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative px-10 py-5 bg-transparent border border-white/30 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:text-black hover:border-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? "SENDING..." : isSent ? "SENT!" : "SEND MESSAGE"}
                {!isSubmitting && !isSent && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, -40px); }
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 40s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}