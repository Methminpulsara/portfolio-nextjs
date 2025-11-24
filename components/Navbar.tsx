"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Sun, Moon } from "lucide-react";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-full px-8 py-4 flex items-center gap-12 shadow-2xl shadow-green-900/10 hover:border-green-500/30 transition-colors duration-500">
          <div className="text-neutral-900 dark:text-white font-bold tracking-tighter cursor-pointer text-xl hover:text-green-600 dark:hover:text-green-400 transition-colors" onClick={() => scrollTo("hero")}>
            MP.
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <button onClick={() => scrollTo("about")} className="hover:text-green-600 dark:hover:text-green-400 transition-colors hover:scale-105 transform duration-200">About</button>
            <button onClick={() => scrollTo("work")} className="hover:text-green-600 dark:hover:text-green-400 transition-colors hover:scale-105 transform duration-200">Work</button>
            <button onClick={() => scrollTo("skills")} className="hover:text-green-600 dark:hover:text-green-400 transition-colors hover:scale-105 transform duration-200">Skills</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-green-600 dark:hover:text-green-400 transition-colors hover:scale-105 transform duration-200">Contact</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="text-neutral-600 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              className="md:hidden text-neutral-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center gap-8 text-3xl font-light text-neutral-900 dark:text-white">
          <button onClick={() => { setIsOpen(false); scrollTo("about"); }} className="hover:text-green-600 dark:hover:text-green-400">About</button>
          <button onClick={() => { setIsOpen(false); scrollTo("work"); }} className="hover:text-green-600 dark:hover:text-green-400">Work</button>
          <button onClick={() => { setIsOpen(false); scrollTo("skills"); }} className="hover:text-green-600 dark:hover:text-green-400">Skills</button>
          <button onClick={() => { setIsOpen(false); scrollTo("contact"); }} className="hover:text-green-600 dark:hover:text-green-400">Contact</button>
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-sm opacity-50 hover:text-green-600 dark:hover:text-green-400">CLOSE</button>
        </div>
      )}
    </>
  );
}
