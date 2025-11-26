"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsapClient";
import Portal from "./Portal";
import Logo from "./Logo"; // <--- IMPORT LOGO

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div
          className="
          bg-white/20 dark:bg-black/10 
          backdrop-blur-xl
          border border-white/10 dark:border-white/5 
          rounded-full px-8 py-3
          flex items-center gap-10 
          shadow-lg shadow-black/5 dark:shadow-white/5
          transition-all duration-500
        ">
          
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollTo("hero")}
          >
            <Logo className="h-8 w-8 text-emerald-500 group-hover:text-emerald-400 transition-colors duration-300" />
         
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-15 text-sm text-neutral-700 dark:text-neutral-300">
            <button onClick={() => scrollTo("about")} className="hover:text-emerald-500 transition-colors duration-300">About</button>
            <button onClick={() => scrollTo("work")}  className="hover:text-emerald-500 transition-colors duration-300">Work</button>
            <button onClick={() => scrollTo("skills")} className="hover:text-emerald-500 transition-colors duration-300">Skills</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-emerald-500 transition-colors duration-300">Contact</button>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden text-neutral-900 dark:text-white hover:text-emerald-500 transition"
            onClick={() => setIsOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-white/95 dark:bg-black/95 flex flex-col items-center justify-center gap-12 text-3xl backdrop-blur-xl">

            <div className="flex items-center gap-4 mb-8">
              <Logo className="h-12 w-12 text-emerald-500" />
              <span className="text-emerald-500 font-bold text-2xl">Methmin</span>
            </div>

            <button onClick={() => scrollTo("about")} className="hover:text-emerald-500">About</button>
            <button onClick={() => scrollTo("work")} className="hover:text-emerald-500">Work</button>
            <button onClick={() => scrollTo("skills")} className="hover:text-emerald-500">Skills</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-emerald-500">Contact</button>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 opacity-70 hover:text-emerald-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </Portal>
      )}
    </>
  );
}
