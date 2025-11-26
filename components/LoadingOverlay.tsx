"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingOverlayProps {
  onComplete: () => void;
  isPageLoaded: boolean;
}

export default function LoadingOverlay({ onComplete, isPageLoaded }: LoadingOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mLetterRef = useRef<SVGPathElement>(null);
  const pLetterRef = useRef<SVGPathElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canFinish, setCanFinish] = useState(false);

  // Floating particles
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const count = 20;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-emerald-400/20";

      const size = Math.random() * 4 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 4 + 2;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;

      container.appendChild(particle);
    }

    return () => {
      const particles = container.querySelectorAll(".absolute.rounded-full");
      particles.forEach((p) => p.remove());
    };
  }, []);

  // Init animation
  useEffect(() => {
    if (!mLetterRef.current || !pLetterRef.current) return;

    gsap.set([mLetterRef.current, pLetterRef.current], {
      strokeDasharray: (_, t) => t.getTotalLength(),
      strokeDashoffset: (_, t) => t.getTotalLength(),
      fill: "transparent",
    });
  }, []);

  // Update animation
  useEffect(() => {
    if (!mLetterRef.current || !pLetterRef.current) return;

    const m = mLetterRef.current;
    const p = pLetterRef.current;

    const ml = m.getTotalLength();
    const pl = p.getTotalLength();

    const mProg = Math.min(progress / 50, 1);
    const pProg = Math.max((progress - 50) / 50, 0);

    if (progress <= 50) {
      m.style.strokeDashoffset = (ml * (1 - mProg)).toString();
    } else {
      m.style.strokeDashoffset = "0";
      m.style.fill = "rgba(16,185,129,0.8)";
    }

    if (progress > 50) {
      p.style.strokeDashoffset = (pl * (1 - pProg)).toString();
    }

    if (progress >= 100) {
      p.style.strokeDashoffset = "0";
      p.style.fill = "rgba(16,185,129,0.8)";
    }
  }, [progress]);

  // Progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90 && !isPageLoaded) return 90;
        if (prev >= 100) {
          setCanFinish(true);
          clearInterval(interval);
          return 100;
        }
        const inc = prev < 50 ? Math.random() * 3 + 2 : Math.random() * 2 + 1;
        return Math.min(prev + Math.floor(inc), 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isPageLoaded]);

  // Exit animation
  useEffect(() => {
    if (!canFinish || !isPageLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      tl.to([progressTextRef.current, statusTextRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.5,
      })
        .to(
          [mLetterRef.current, pLetterRef.current],
          { scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.1 },
          "-=0.3"
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            scale: 1.1,
            duration: 1,
            onComplete: () => {
              if (containerRef.current) containerRef.current.style.display = "none";
            },
          },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [canFinish, isPageLoaded, onComplete]);

  const getStatusText = () => {
    if (progress < 50) return "DRAWING M...";
    if (progress < 100) return "DRAWING P...";
    return "READY!";
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-emerald-900/10" />

      <div className="relative z-10 flex flex-col items-center gap-16">
        {/* New Larger Centered MP */}
        <svg
          width="300"
          height="200"
          viewBox="0 0 120 90"
          className="filter drop-shadow-2xl"
        >
          {/* NEW M */}
          <path
            ref={mLetterRef}
            d="M20 70 L20 20 L40 45 L60 20 L60 70"
            stroke="#10b981"
            strokeWidth="5"
            fill="transparent"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* NEW P */}
          <path
            ref={pLetterRef}
            d="
            M70 20 L70 70
            M70 20 L95 20 L105 35 L105 50 L95 65 L70 65
            "
            stroke="#10b981"
            strokeWidth="5"
            fill="transparent"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex flex-col items-center gap-6">
          <div ref={progressTextRef} className="text-5xl md:text-6xl font-black text-emerald-400">
            {progress}%
          </div>

          <div ref={statusTextRef} className="text-sm tracking-[0.4em] text-emerald-400/90 font-mono">
            {getStatusText()}
          </div>

          <div className="w-56 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px] animate-pulse" />

      <style jsx>{`
        @keyframes floatParticle {
          0% { transform: translate(0, 0); opacity: 0.3; }
          33% { transform: translate(10px, -15px); opacity: 0.6; }
          66% { transform: translate(-5px, -25px); opacity: 0.8; }
          100% { transform: translate(0, -30px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
