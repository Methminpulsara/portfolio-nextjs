"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use CSS transforms for better performance
    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const handleHover = () => {
      gsap.to(cursor, { 
        scale: 2.5, 
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleUnhover = () => {
      gsap.to(cursor, { 
        scale: 1,
        backgroundColor: "rgba(16, 185, 129, 1)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    
    const interactiveElements = document.querySelectorAll("a, button, .cursor-pointer");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      style={{
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
}