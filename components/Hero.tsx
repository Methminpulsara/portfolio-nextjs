"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-char", {
        y: 150,
        opacity: 0,
        rotateX: -90,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.5,
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=1")
      .from(".scroll-indicator", {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.5");

      // Hover effect on title
      const chars = document.querySelectorAll(".hero-char");
      chars.forEach((char) => {
        char.addEventListener("mouseenter", () => {
          gsap.to(char, {
            color: "#4ade80", // green-400
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        char.addEventListener("mouseleave", () => {
          gsap.to(char, {
            color: "var(--hero-text-color, white)", // Use CSS variable or fallback
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const title = "CREATIVE DEVELOPER";

  return (
    <section ref={containerRef} className="h-screen w-full flex flex-col justify-center items-center relative px-4 overflow-hidden">
      
      {/* Abstract shapes (kept as fallback/layering) */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-900/10 rounded-full blur-[120px] animate-pulse delay-1000 pointer-events-none" />

      <h1 ref={titleRef} className="text-[12vw] leading-none font-black tracking-tighter text-center z-10 cursor-default select-none perspective-1000 mix-blend-overlay dark:mix-blend-normal text-neutral-900 dark:text-white [--hero-text-color:theme(colors.neutral.900)] dark:[--hero-text-color:white]">
        {title.split("").map((char, i) => (
          <span key={i} className="hero-char inline-block transform-style-3d">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <p ref={subtitleRef} className="mt-8 text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl text-center font-light tracking-wide z-10">
        Crafting digital experiences with <span className="text-green-600 dark:text-green-400 font-medium">motion</span> and <span className="text-green-600 dark:text-green-400 font-medium">code</span>.
      </p>

      <div className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-2 text-neutral-500 z-10">
        <span className="text-xs uppercase tracking-widest group-hover:text-green-400 transition-colors">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-green-500" />
      </div>
    </section>
  );
}
