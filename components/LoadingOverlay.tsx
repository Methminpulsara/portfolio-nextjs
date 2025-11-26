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

  // Create floating particles
  useEffect(() => {
    if (!containerRef.current) return;

    const particlesContainer = containerRef.current;
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-emerald-400/20';
      
      // Random properties
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 4 + 2;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
      
      particlesContainer.appendChild(particle);
    }

    return () => {
      if (particlesContainer) {
        const particles = particlesContainer.querySelectorAll('.absolute.rounded-full');
        particles.forEach(particle => particle.remove());
      }
    };
  }, []);

  // Initialize SVG animations
  useEffect(() => {
    if (!mLetterRef.current || !pLetterRef.current) return;

    const mPath = mLetterRef.current;
    const pPath = pLetterRef.current;

    // Set initial state
    gsap.set([mPath, pPath], {
      strokeDasharray: (i, target) => target.getTotalLength(),
      strokeDashoffset: (i, target) => target.getTotalLength(),
      fill: "transparent"
    });

  }, []);

  // Update animations based on progress
  useEffect(() => {
    if (!mLetterRef.current || !pLetterRef.current) return;

    const mPath = mLetterRef.current;
    const pPath = pLetterRef.current;

    const mLength = mPath.getTotalLength();
    const pLength = pPath.getTotalLength();

    // Calculate progress for each letter
    const mProgress = Math.min(progress / 50, 1);
    const pProgress = Math.max((progress - 50) / 50, 0);

    // Animate M letter
    if (progress <= 50) {
      mPath.style.strokeDashoffset = (mLength * (1 - mProgress)).toString();
    } else {
      mPath.style.strokeDashoffset = "0";
      mPath.style.fill = "rgba(16, 185, 129, 0.8)";
    }

    // Animate P letter
    if (progress > 50) {
      pPath.style.strokeDashoffset = (pLength * (1 - pProgress)).toString();
    }

    if (progress >= 100) {
      pPath.style.strokeDashoffset = "0";
      pPath.style.fill = "rgba(16, 185, 129, 0.8)";
    }

  }, [progress]);

  // Progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const simulateProgress = () => {
      interval = setInterval(() => {
        setProgress(prev => {
          // Stall at 90% if page isn't loaded
          if (prev >= 90 && !isPageLoaded) {
            return 90;
          }
          // Go to 100% if page is loaded
          if (prev >= 100) {
            clearInterval(interval);
            setCanFinish(true);
            return 100;
          }
          // Increment progress
          const increment = prev < 50 ? 
            Math.floor(Math.random() * 3) + 2 : // Faster at start
            Math.floor(Math.random() * 2) + 1;  // Slower at end
          return Math.min(prev + increment, 100);
        });
      }, 80);
    };

    simulateProgress();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPageLoaded]);

  // Exit animation when complete
  useEffect(() => {
    if (canFinish && isPageLoaded) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        // Animate elements out
        tl.to([progressTextRef.current, statusTextRef.current], {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: "power2.in"
        })
        .to([mLetterRef.current, pLetterRef.current], {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.1
        }, "-=0.3")
        .to(containerRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 1,
          ease: "power4.inOut",
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = 'none';
            }
          }
        }, "-=0.5");
      }, containerRef);

      return () => ctx.revert();
    }
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
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-emerald-900/10" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-16">
        {/* MP Logo Container */}
        <div className="relative">
          <svg 
            width="240" 
            height="140" 
            viewBox="0 0 240 140" 
            className="filter drop-shadow-2xl"
          >
            {/* M Letter */}
            <path
              ref={mLetterRef}
              d="M30,30 L30,100 L65,65 L100,100 L100,30"
              stroke="#10b981"
              strokeWidth="5"
              fill="transparent"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200"
            />
            
            {/* P Letter */}
            <path
              ref={pLetterRef}
              d="M140,30 L140,100 L185,100 L210,75 L185,50 L140,50"
              stroke="#10b981"
              strokeWidth="5"
              fill="transparent"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200"
            />
          </svg>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col items-center gap-6">
          {/* Progress Percentage */}
          <div 
            ref={progressTextRef}
            className="text-5xl md:text-6xl font-black tracking-tighter text-emerald-400"
          >
            {progress}%
          </div>
          
          {/* Status Text */}
          <div 
            ref={statusTextRef}
            className="text-sm font-mono text-emerald-400/90 tracking-[0.4em] uppercase"
          >
            {getStatusText()}
          </div>

          {/* Progress Bar */}
          <div className="w-56 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px] animate-pulse" />

      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(10px, -15px) scale(1.1);
            opacity: 0.6;
          }
          66% {
            transform: translate(-5px, -25px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(0px, -30px) scale(1);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}