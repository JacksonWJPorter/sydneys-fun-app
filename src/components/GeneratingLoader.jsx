"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TIPS = [
  "Scheduling periods...",
  "Creating activities...",
  "Adding fun facts...",
  "Formatting for print...",
];

const ACCENT_COLORS = ["#e94560", "#f5c518", "#00d2a0", "#7b2ff7"];

const CLASSROOM_ITEMS = [
  { emoji: "\u270F\uFE0F", label: "pencil" },
  { emoji: "\uD83D\uDCD6", label: "book" },
  { emoji: "\uD83C\uDF4E", label: "apple" },
  { emoji: "\u2B50", label: "star" },
  { emoji: "\uD83D\uDCDA", label: "books" },
  { emoji: "\uD83D\uDD14", label: "bell" },
  { emoji: "\uD83C\uDFA8", label: "art" },
  { emoji: "\uD83E\uDDEA", label: "science" },
];

// ---------------------------------------------------------------------------
// Floating Classroom Items (CSS animation for 60fps)
// ---------------------------------------------------------------------------

function FloatingItems() {
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 14; i++) {
      const item = CLASSROOM_ITEMS[i % CLASSROOM_ITEMS.length];
      const seed1 = ((i * 7919 + 104729) % 100);
      const seed2 = ((i * 6271 + 32749) % 100);
      arr.push({
        id: i,
        emoji: item.emoji,
        left: `${seed1}%`,
        startY: 100 + (seed2 % 40),
        size: 20 + (i % 3) * 8,
        duration: 8 + (i % 5) * 2.5,
        delay: (i % 7) * 1.2,
        opacity: 0.15 + (i % 4) * 0.05,
      });
    }
    return arr;
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--item-opacity);
          }
          85% {
            opacity: var(--item-opacity);
          }
          100% {
            transform: translateY(calc(-100vh - 60px)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: item.left,
            bottom: `-${item.size + 20}px`,
            fontSize: `${item.size}px`,
            "--item-opacity": item.opacity,
            animation: `floatUp ${item.duration}s ${item.delay}s linear infinite`,
            willChange: "transform, opacity",
          }}
          aria-hidden
        >
          {item.emoji}
        </div>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Rising Particles (CSS animation)
// ---------------------------------------------------------------------------

function RisingParticles() {
  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 50; i++) {
      const seed = ((i * 3571 + 7489) % 100);
      pts.push({
        id: i,
        left: `${seed}%`,
        size: 2 + (i % 3),
        duration: 4 + (i % 6) * 1.1,
        delay: (i * 0.3) % 4,
        color: ACCENT_COLORS[i % ACCENT_COLORS.length],
        opacity: 0.2 + (i % 5) * 0.08,
      });
    }
    return pts;
  }, []);

  return (
    <>
      <style>{`
        @keyframes particleRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          15% {
            opacity: var(--p-opacity);
          }
          80% {
            opacity: var(--p-opacity);
          }
          100% {
            transform: translateY(-100vh) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            bottom: "-4px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            "--p-opacity": p.opacity,
            animation: `particleRise ${p.duration}s ${p.delay}s linear infinite`,
            willChange: "transform, opacity",
          }}
          aria-hidden
        />
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Typewriter Text
// ---------------------------------------------------------------------------

function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        // Blink cursor a few times then hide
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="inline-block">
      {displayed}
      <span
        className={`inline-block w-[3px] h-[1em] ml-1 align-middle bg-[#e94560] ${
          showCursor ? "animate-pulse" : "opacity-0"
        }`}
        style={{ transition: "opacity 0.3s" }}
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Rotating Tips
// ---------------------------------------------------------------------------

function RotatingTips() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TIPS.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-6 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="absolute inset-0 text-sm text-gray-400 text-center"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {TIPS[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main: GeneratingLoader
// ---------------------------------------------------------------------------

export default function GeneratingLoader({ isVisible, duration = 2800 }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #2a1a3e 0%, #1a1a2e 50%, #0f0f1b 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* ---- Background effects ---- */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <FloatingItems />
            <RisingParticles />
          </div>

          {/* ---- Radial glow behind center ---- */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(233,69,96,0.12) 0%, rgba(123,47,247,0.06) 40%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          {/* ---- Central content ---- */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-6">
            {/* Brain / Sparkle icon */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #e94560, #f5c518, #00d2a0, #7b2ff7, #e94560)",
                  filter: "blur(12px)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                aria-hidden
              />
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                  boxShadow:
                    "0 0 30px rgba(233,69,96,0.3), 0 0 60px rgba(123,47,247,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="w-10 h-10 text-[#e94560]" />
                </motion.div>
                {/* Orbiting sparkle */}
                <motion.div
                  className="absolute"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ width: 64, height: 64 }}
                >
                  <Sparkles
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 text-[#f5c518]"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Title with typewriter */}
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-center">
              <TypewriterText text="Generating Your Sub Plan..." />
            </h2>

            {/* Rotating tips */}
            <RotatingTips />

            {/* Progress bar */}
            <div className="w-72 md:w-96 h-2 rounded-full overflow-hidden bg-white/5 mt-2">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #e94560, #f5c518, #00d2a0, #7b2ff7)",
                  backgroundSize: "300% 100%",
                }}
                initial={{ width: "0%" }}
                animate={{
                  width: "100%",
                  backgroundPosition: ["0% 50%", "100% 50%"],
                }}
                transition={{
                  width: { duration: duration / 1000, ease: [0.4, 0, 0.2, 1] },
                  backgroundPosition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </div>

            {/* Percentage text */}
            <ProgressPercent duration={duration} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Progress Percentage counter
// ---------------------------------------------------------------------------

function ProgressPercent({ duration }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.floor(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [duration]);

  return (
    <p className="text-xs text-gray-500 tabular-nums tracking-widest">
      {pct}%
    </p>
  );
}
