"use client";

import BackgroundEffect from "./BackgroundEffect";

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden selection:bg-green-500/30 selection:text-green-200">
      <BackgroundEffect />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
