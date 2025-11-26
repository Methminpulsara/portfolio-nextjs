"use client";

import { useSmoothScroll } from "./useSmoothScroll";



export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Call your hook normally — legal & safe
  useSmoothScroll();

  return <>{children}</>;
}
