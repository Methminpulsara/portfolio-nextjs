"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  onComplete: () => void;
  isPageLoaded: boolean;
}

export default function TechLoadingOverlay({
  onComplete,
  isPageLoaded,
}: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  /* ---------------- Progress Logic ---------------- */
  useEffect(() => {
    if (!visible) return;

    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setProgress((p) => {
        // hold until real page loaded
        if (p >= 94 && !isPageLoaded) return 94;

        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 600);
          return 100;
        }

        return Math.min(p + (p < 60 ? 0.9 : 0.4), 100);
      });
    }, 32);

    return () => clearInterval(interval);
  }, [isPageLoaded, visible]);

  /* ---------------- Exit callback ---------------- */
  useEffect(() => {
    if (!visible && progress >= 100) {
      onComplete();
    }
  }, [visible, progress, onComplete]);

  const scanlines = useMemo(() => Array.from({ length: 5 }), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] bg-[#070707] flex items-center justify-center font-mono overflow-hidden"
        >
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:48px_48px]" />

          {/* Ambient */}
          <div className="absolute w-[360px] h-[360px] bg-emerald-500/5 rounded-full blur-[120px]" />

          {/* Content */}
          <div className="relative z-10 w-[320px]">
            {/* Header */}
            <div className="mb-8">
              <div className="text-[10px] tracking-[0.4em] text-emerald-500/70">
                SYSTEM_BOOT
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-3xl text-white tracking-tight">
                  MP<span className="text-emerald-500">.</span>
                </div>
                <div className="text-xl text-white">
                  {Math.floor(progress)}%
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="h-px w-full bg-white/10">
              <motion.div
                className="h-full bg-emerald-500"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.03 }}
              />
            </div>

            {/* Status */}
            <div className="mt-6 text-[10px] text-emerald-500/50 tracking-widest uppercase">
              {progress < 35 && "Initializing runtime environment"}
              {progress >= 35 && progress < 70 && "Loading application modules"}
              {progress >= 70 && "Finalizing system state"}
            </div>
          </div>

          {/* Scanlines */}
          {scanlines.map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-emerald-500/10"
              animate={{ top: ["-10%", "110%"] }}
              transition={{
                duration: 6,
                delay: i * 1.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
