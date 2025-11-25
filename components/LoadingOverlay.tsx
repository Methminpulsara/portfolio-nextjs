"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingOverlayProps {
  onComplete: () => void;
  isPageLoaded: boolean;
}

export default function LoadingOverlay({ onComplete, isPageLoaded }: LoadingOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canFinish, setCanFinish] = useState(false);

  useEffect(() => {
    // Progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        // If page isn't loaded, stall at 90%
        if (prev >= 90 && !isPageLoaded) {
          return 90;
        }
        // If page is loaded, we can go to 100%
        if (prev >= 100) {
          clearInterval(interval);
          setCanFinish(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPageLoaded]);

  useEffect(() => {
    if (canFinish && isPageLoaded) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in"
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [canFinish, isPageLoaded, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
    >
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div ref={textRef} className="text-6xl md:text-8xl font-black tracking-tighter">
          {progress}%
        </div>
        
        <div className="w-64 h-1 bg-neutral-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-sm font-mono text-neutral-500 tracking-[0.5em] uppercase animate-pulse">
          {progress < 100 ? "Initializing..." : "Ready"}
        </div>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black -z-10" />
    </div>
  );
}
