"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// ---------------------------------------------------------------------------
// ScrollProgress
// ---------------------------------------------------------------------------

export default function ScrollProgress({ visible = true }) {
  const scrollPercent = useMotionValue(0);
  const smoothPercent = useSpring(scrollPercent, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const rafId = useRef(null);

  const handleScroll = useCallback(() => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollPercent.set(percent);
      rafId.current = null;
    });
  }, [scrollPercent]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial value
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] pointer-events-none"
          style={{ height: 3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Track background */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(255,255,255,0.03)" }}
          />

          {/* Progress bar */}
          <motion.div
            className="h-full origin-left"
            style={{
              width: smoothPercent.get() + "%",
              scaleX: 1,
              background:
                "linear-gradient(90deg, #e94560 0%, #f5c518 50%, #00d2a0 100%)",
              boxShadow:
                "0 0 8px rgba(233,69,96,0.5), 0 0 20px rgba(245,197,24,0.3), 0 0 30px rgba(0,210,160,0.2)",
              borderRadius: "0 2px 2px 0",
            }}
            // Use the spring value directly for smooth animation
            ref={(el) => {
              if (!el) return;
              // Subscribe to the spring value to update width
              const unsubscribe = smoothPercent.on("change", (v) => {
                el.style.width = `${v}%`;
              });
              // Store unsubscribe for cleanup
              el._unsubscribe = unsubscribe;
              return () => {
                if (el._unsubscribe) el._unsubscribe();
              };
            }}
          />

          {/* Glowing tip at the end of the bar */}
          <motion.div
            className="absolute top-0 h-full w-[6px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.8), transparent)",
              borderRadius: "50%",
              filter: "blur(1px)",
            }}
            ref={(el) => {
              if (!el) return;
              const unsubscribe = smoothPercent.on("change", (v) => {
                el.style.left = `calc(${v}% - 3px)`;
                el.style.opacity = v > 0.5 ? "1" : "0";
              });
              el._unsubscribe = unsubscribe;
              return () => {
                if (el._unsubscribe) el._unsubscribe();
              };
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
