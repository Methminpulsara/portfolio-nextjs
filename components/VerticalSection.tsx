"use client"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VerticalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = textRef.current;
      if (!text) return;

      // Split text by words (simple implementation without SplitText plugin which is paid)
      const words = text.innerText.split(" ");
      text.innerHTML = "";
      words.forEach(word => {
        const span = document.createElement("span");
        span.innerText = word + " ";
        span.className = "inline-block opacity-20 transition-opacity duration-300";
        text.appendChild(span);
      });

      const spans = text.querySelectorAll("span");

      gsap.to(spans, {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-6 py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        <span className="text-violet-500 font-mono text-sm mb-8 block">ABOUT ME</span>
        <p ref={textRef} className="text-4xl md:text-6xl font-bold leading-tight text-neutral-900 dark:text-white">
          I am a multidisciplinary developer focused on creating immersive web experiences. 
          I combine technical expertise with design sensibilities to build products that look great and perform perfectly.
          Always exploring new technologies and pushing the boundaries of what is possible on the web.
        </p>
      </div>
    </section>
  );
}
