"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BackgroundEffect() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(blobRef.current, {
        x: clientX,
        y: clientY,
        duration: 3, // Slow lag for smooth effect
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div 
        ref={blobRef}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-green-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply dark:mix-blend-screen opacity-50"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay dark:mix-blend-overlay"></div>
    </div>
  );
}
