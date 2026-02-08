"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Theme definitions
// ---------------------------------------------------------------------------

const THEMES = {
  neon: {
    label: "Neon",
    attribute: "neon",
    icon: "\u26A1",
    trackBg: "linear-gradient(135deg, #e94560, #7b2ff7)",
    dotColor: "#fff",
  },
  chalkboard: {
    label: "Chalk",
    attribute: "chalkboard",
    icon: "\uD83D\uDCDD",
    trackBg: "linear-gradient(135deg, #1b3a2a, #2a4a3a)",
    dotColor: "#e8e4d9",
  },
};

const STORAGE_KEY = "subplanr-theme";

// ---------------------------------------------------------------------------
// ThemeToggle Component
// ---------------------------------------------------------------------------

export default function ThemeToggle() {
  const [theme, setTheme] = useState("neon");
  const [mounted, setMounted] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES[saved]) {
        setTheme(saved);
        document.documentElement.setAttribute("data-theme", saved);
      }
    } catch {
      // localStorage unavailable, use default
    }
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "neon" ? "chalkboard" : "neon";
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  // Avoid hydration mismatch
  if (!mounted) {
    return <div className="w-[88px] h-[36px]" />;
  }

  const isChalkboard = theme === "chalkboard";
  const currentTheme = THEMES[theme];

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center gap-1.5 h-[36px] rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] select-none"
      style={{
        width: 88,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      whileHover={{
        borderColor: "rgba(233,69,96,0.3)",
        boxShadow:
          "0 4px 16px rgba(233,69,96,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Switch to ${isChalkboard ? "Neon" : "Chalkboard"} mode`}
      title={`Current: ${currentTheme.label} Mode`}
    >
      {/* Track fill */}
      <motion.div
        className="absolute inset-[2px] rounded-full"
        animate={{
          background: isChalkboard
            ? "linear-gradient(135deg, #1b3a2a, #2a4a3a)"
            : "linear-gradient(135deg, rgba(233,69,96,0.2), rgba(123,47,247,0.15))",
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Left label */}
      <motion.span
        className="relative z-10 text-[10px] font-semibold uppercase tracking-wider pl-2.5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        animate={{
          color: isChalkboard ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)",
        }}
        transition={{ duration: 0.3 }}
      >
        {"\u26A1"}
      </motion.span>

      {/* Sliding dot */}
      <motion.div
        className="absolute top-[3px] w-[30px] h-[30px] rounded-full flex items-center justify-center"
        style={{
          boxShadow: `
            0 2px 8px rgba(0,0,0,0.3),
            0 0 12px ${isChalkboard ? "rgba(27,58,42,0.5)" : "rgba(233,69,96,0.4)"}
          `,
        }}
        animate={{
          x: isChalkboard ? 53 : 3,
          background: isChalkboard
            ? "linear-gradient(135deg, #2a4a3a, #3a5a4a)"
            : "linear-gradient(135deg, #e94560, #d63384)",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.span
          className="text-xs"
          animate={{ rotate: isChalkboard ? 0 : 360 }}
          transition={{ duration: 0.5 }}
        >
          {currentTheme.icon}
        </motion.span>
      </motion.div>

      {/* Right label */}
      <motion.span
        className="relative z-10 text-[10px] font-semibold uppercase tracking-wider pr-2.5 ml-auto"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        animate={{
          color: isChalkboard ? "rgba(232,228,217,0.7)" : "rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {"\uD83D\uDCDD"}
      </motion.span>
    </motion.button>
  );
}
