"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsapClient";
import Portal from "./Portal";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  /* --- GSAP NAVBAR ANIMATION --- */
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

  /* --- Smooth Scroll --- */
  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md 
          border border-black/5 dark:border-white/5 rounded-full px-10 py-4 
          flex items-center gap-10 shadow-xl transition-colors duration-500">

          {/* LOGO */}
          <div
            className="text-neutral-900 dark:text-emerald-600 font-bold text-xl cursor-pointer"
            onClick={() => scrollTo("hero")}
          >
            MP.
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-10 text-sm text-neutral-700 dark:text-neutral-300">
            <button onClick={() => scrollTo("about")} className="hover:text-green-600">About</button>
            <button onClick={() => scrollTo("work")} className="hover:text-green-600">Work</button>
            <button onClick={() => scrollTo("skills")} className="hover:text-green-600">Skills</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-green-600">Contact</button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-neutral-900 dark:text-white hover:text-green-500"
            onClick={() => setIsOpen(true)}
          >
            Menu
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU (PORTAL) */}
      {isOpen && (
        <Portal>
          <div className="fixed inset-0 z-50 bg-white/95 dark:bg-black/95
            flex flex-col items-center justify-center gap-10 text-3xl
            text-neutral-900 dark:text-white backdrop-blur-xl text-transparent ">

            <button onClick={() => scrollTo("about")} className="hover:text-green-500">
              About
            </button>
            <button onClick={() => scrollTo("work")} className="hover:text-green-500">
              Work
            </button>
            <button onClick={() => scrollTo("skills")} className="hover:text-green-500">
              Skills
            </button>
            <button onClick={() => scrollTo("contact")} className="hover:text-green-500">
              Contact
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-sm opacity-50 hover:text-green-500"
            >
              CLOSE
            </button>
          </div>
        </Portal>
      )}
    </>
  );
}
