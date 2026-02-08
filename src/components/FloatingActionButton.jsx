"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// ---------------------------------------------------------------------------
// FloatingActionButton
// ---------------------------------------------------------------------------

export default function FloatingActionButton({ onClick, visible = true }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ scale: 0, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 40 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Pulsing glow ring behind the button */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #e94560, #7b2ff7)",
              filter: "blur(16px)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden
          />

          {/* Second, slower glow layer */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #f5c518, #e94560)",
              filter: "blur(24px)",
            }}
            animate={{
              scale: [1.1, 1.5, 1.1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            aria-hidden
          />

          {/* Main button */}
          <motion.button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center gap-2 cursor-pointer rounded-2xl text-white font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e] overflow-hidden"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background:
                "linear-gradient(135deg, rgba(233,69,96,0.25), rgba(123,47,247,0.2))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(233,69,96,0.3)",
              boxShadow: `
                0 8px 32px rgba(233,69,96,0.25),
                0 2px 8px rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.1)
              `,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 12px 40px rgba(233,69,96,0.4), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.95 }}
            layout
            transition={{
              layout: { type: "spring", stiffness: 400, damping: 30 },
            }}
          >
            {/* Shimmer sweep */}
            <motion.span
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />

            {/* Content wrapper with padding */}
            <motion.div
              className="relative z-10 flex items-center gap-2"
              layout
              style={{
                padding: isHovered ? "14px 24px" : "14px 14px",
              }}
              transition={{
                layout: { type: "spring", stiffness: 400, damping: 30 },
              }}
            >
              <motion.div
                animate={{
                  rotate: isHovered ? [0, -15, 15, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-5 h-5 text-[#f5c518] flex-shrink-0" />
              </motion.div>

              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    className="whitespace-nowrap text-sm"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                      width: { type: "spring", stiffness: 400, damping: 30 },
                      opacity: { duration: 0.15 },
                    }}
                    style={{ overflow: "hidden", display: "inline-block" }}
                  >
                    Quick Plan
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
