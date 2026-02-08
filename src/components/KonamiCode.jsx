"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Konami Code sequence
// ---------------------------------------------------------------------------

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// School supplies that rain from above
const SCHOOL_SUPPLIES = [
  { emoji: "\u270F\uFE0F", label: "pencil" },
  { emoji: "\uD83D\uDCDA", label: "books" },
  { emoji: "\uD83C\uDF4E", label: "apple" },
  { emoji: "\u2B50", label: "star" },
  { emoji: "\uD83D\uDCD6", label: "open book" },
  { emoji: "\uD83D\uDD14", label: "bell" },
  { emoji: "\uD83C\uDFA8", label: "art" },
  { emoji: "\uD83E\uDDEA", label: "science" },
  { emoji: "\uD83D\uDCDD", label: "memo" },
  { emoji: "\uD83D\uDCD0", label: "triangle" },
  { emoji: "\uD83D\uDCCF", label: "ruler" },
  { emoji: "\u2702\uFE0F", label: "scissors" },
  { emoji: "\uD83D\uDCCE", label: "paperclip" },
  { emoji: "\uD83C\uDF93", label: "grad cap" },
  { emoji: "\uD83E\uDD13", label: "nerd" },
  { emoji: "\uD83D\uDCA1", label: "lightbulb" },
];

// ---------------------------------------------------------------------------
// RainingSupplies
// ---------------------------------------------------------------------------

function RainingSupplies() {
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      const supply = SCHOOL_SUPPLIES[i % SCHOOL_SUPPLIES.length];
      const seed1 = (i * 7919 + 104729) % 100;
      arr.push({
        id: i,
        emoji: supply.emoji,
        left: `${seed1}%`,
        size: 24 + (i % 4) * 10,
        delay: (i % 12) * 0.15,
        duration: 1.8 + (i % 5) * 0.4,
        rotation: ((i * 37) % 360) - 180,
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none"
          style={{
            left: item.left,
            top: -60,
            fontSize: `${item.size}px`,
          }}
          initial={{
            y: -80,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            rotate: item.rotation,
            opacity: [0, 1, 1, 0.8],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: [0.2, 0, 0.8, 1],
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// KonamiCode Component
// ---------------------------------------------------------------------------

export default function KonamiCode() {
  const [triggered, setTriggered] = useState(false);
  const [inputIndex, setInputIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e) => {
      if (triggered) return;

      const expected = KONAMI_SEQUENCE[inputIndex];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        const nextIndex = inputIndex + 1;
        if (nextIndex === KONAMI_SEQUENCE.length) {
          setTriggered(true);
          setInputIndex(0);
        } else {
          setInputIndex(nextIndex);
        }
      } else {
        // Reset on wrong key
        setInputIndex(e.key === KONAMI_SEQUENCE[0] ? 1 : 0);
      }
    },
    [inputIndex, triggered]
  );

  // Listen for keystrokes
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (!triggered) return;
    const timeout = setTimeout(() => {
      setTriggered(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [triggered]);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(42,26,62,0.97) 0%, rgba(26,26,46,0.98) 50%, rgba(15,15,27,0.99) 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Raining school supplies */}
          <RainingSupplies />

          {/* Radial glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(233,69,96,0.2) 0%, rgba(245,197,24,0.1) 30%, rgba(0,210,160,0.05) 60%, transparent 80%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          {/* Central content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-6"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            {/* Game controller icon */}
            <motion.div
              className="text-7xl md:text-8xl"
              animate={{
                rotate: [0, -10, 10, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {"\uD83C\uDFAE"}
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold text-center select-none"
              style={{
                fontFamily: "'Caveat', cursive",
                color: "#fff",
                textShadow: `
                  0 0 10px rgba(233,69,96,0.9),
                  0 0 30px rgba(233,69,96,0.6),
                  0 0 60px rgba(245,197,24,0.35),
                  0 0 100px rgba(0,210,160,0.2)
                `,
              }}
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            >
              You found the secret!
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 text-center tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {"\u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192"}{" "}
              <span className="text-[#f5c518] font-bold">B</span>{" "}
              <span className="text-[#e94560] font-bold">A</span>
            </motion.p>

            {/* Fun badge */}
            <motion.div
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#f5c518]/30 bg-[#f5c518]/10 text-[#f5c518] text-sm font-medium tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {"\u2B50"} Achievement Unlocked: Code Master {"\u2B50"}
            </motion.div>
          </motion.div>

          {/* Decorative corner bursts */}
          {[0, 1, 2, 3].map((corner) => (
            <motion.div
              key={corner}
              className="absolute w-32 h-32 pointer-events-none"
              style={{
                top: corner < 2 ? -20 : "auto",
                bottom: corner >= 2 ? -20 : "auto",
                left: corner % 2 === 0 ? -20 : "auto",
                right: corner % 2 === 1 ? -20 : "auto",
                background: `radial-gradient(circle, ${
                  ["#e94560", "#f5c518", "#00d2a0", "#7b2ff7"][corner]
                }33 0%, transparent 70%)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 1.5,
                delay: corner * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
