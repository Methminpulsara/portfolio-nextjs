/* eslint-disable react/no-unescaped-entities */
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
      gsap.from(".contact-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
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
    <section id="contact" ref={containerRef} className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white px-6 py-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-24">
        <div>
          <h2 className="contact-reveal text-[10vw] leading-none font-black tracking-tighter mb-8 text-neutral-900 dark:text-white">
            HELLO.
          </h2>
          <p className="contact-reveal text-xl text-neutral-600 dark:text-neutral-400 max-w-md">
            Have a project in mind? Let's build something amazing together.
            Reach out for collaborations or just to say hi.
          </p>
          
          <div className="contact-reveal mt-12 space-y-4">
            <a href="mailto:info@methminpulsara.dev" className="block text-2xl hover:text-violet-500 transition-colors">
              info@methminpulsara.dev
            </a>
            <p className="text-neutral-500">+94 XX XXX XXXX</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-reveal space-y-8 mt-12 md:mt-0">
          <div className="group relative">
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({...formState, name: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-800 py-4 text-xl focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="Your Name"
            />
          </div>
          <div className="group relative">
            <input
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({...formState, email: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-800 py-4 text-xl focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="Your Email"
            />
          </div>
          <div className="group relative">
            <textarea
              required
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState({...formState, message: e.target.value})}
              className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-800 py-4 text-xl focus:outline-none focus:border-violet-500 transition-colors resize-none"
              placeholder="Message"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-3 px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold hover:bg-violet-500 hover:text-white dark:hover:bg-violet-500 dark:hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "SENDING..." : isSent ? "SENT!" : "SEND MESSAGE"}
            {!isSubmitting && !isSent && <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </section>
  );
}
