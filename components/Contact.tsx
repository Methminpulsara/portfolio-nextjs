"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for text content
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

      // Staggered reveal for form inputs
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", formState);
    setIsSubmitting(false);
    setIsSent(true);
    setFormState({ name: "", email: "", message: "" });
    
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <section id="contact" ref={containerRef} className="min-h-screen bg-black text-white px-6 py-32 flex items-center relative overflow-hidden">
      {/* Background Gradient Accent */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-32 relative z-10">
        {/* Left Column: Text Info */}
        <div className="flex flex-col justify-center">
          <h2 className="contact-text-reveal text-[12vw] md:text-[8vw] leading-[0.9] font-black tracking-tighter mb-8 text-white">
            HELLO.
          </h2>
          <p className="contact-text-reveal text-xl md:text-2xl text-neutral-400 max-w-md leading-relaxed">
            Have a project in mind? Let&apos;s build something amazing together.
            Reach out for collaborations or just to say hi.
          </p>
          
          <div className="contact-text-reveal mt-16 space-y-6">
            <a href="mailto:info@methminpulsara.dev" className="block text-2xl md:text-3xl font-light hover:text-green-400 transition-colors">
              info@methminpulsara.dev
            </a>
            <p className="text-neutral-500 font-mono text-lg">+94 XX XXX XXXX</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={handleSubmit} className="space-y-10 mt-12 md:mt-0 flex flex-col justify-center">
          <div className="contact-form-reveal group relative">
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({...formState, name: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-800 py-6 text-xl md:text-2xl text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-neutral-700"
              placeholder="Your Name"
            />
          </div>
          <div className="contact-form-reveal group relative">
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({...formState, email: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-800 py-6 text-xl md:text-2xl text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-neutral-700"
              placeholder="Your Email"
            />
          </div>
          <div className="contact-form-reveal group relative">
            <textarea
              required
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState({...formState, message: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-800 py-6 text-xl md:text-2xl text-white focus:outline-none focus:border-green-500 transition-colors resize-none placeholder:text-neutral-700"
              placeholder="Message"
            />
          </div>

          <div className="contact-form-reveal pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-10 py-5 bg-transparent border border-white text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:text-black disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? "SENDING..." : isSent ? "SENT!" : "SEND MESSAGE"}
                {!isSubmitting && !isSent && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
