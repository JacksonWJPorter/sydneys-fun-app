"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  Zap,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Animate a number from 0 -> target over `duration` ms */
function useCountUp(target, duration = 2000, startDelay = 600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        setValue(Math.floor(eased * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, startDelay]);
  return value;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/* Floating emoji decorations */
const FLOATERS = [
  { emoji: "\u270F\uFE0F", x: "8%", y: "18%", size: "text-4xl md:text-5xl", dur: 5.2, delay: 0 },
  { emoji: "\uD83C\uDF4E", x: "85%", y: "22%", size: "text-3xl md:text-5xl", dur: 6.8, delay: 0.4 },
  { emoji: "\uD83D\uDCDA", x: "78%", y: "65%", size: "text-3xl md:text-4xl", dur: 7.5, delay: 1.1 },
  { emoji: "\u2B50", x: "12%", y: "70%", size: "text-3xl md:text-5xl", dur: 4.6, delay: 0.7 },
  { emoji: "\uD83C\uDFD3", x: "92%", y: "45%", size: "text-2xl md:text-3xl", dur: 8.0, delay: 1.5 },
  { emoji: "\uD83D\uDD14", x: "5%", y: "48%", size: "text-2xl md:text-3xl", dur: 6.2, delay: 0.2 },
];

function FloatingEmoji({ emoji, x, y, size, dur, delay }) {
  return (
    <motion.div
      className={`absolute select-none pointer-events-none ${size}`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 0, rotate: -10 }}
      animate={{
        opacity: [0, 0.85, 0.85, 0],
        y: [0, -30, 10, -20, 0],
        rotate: [-10, 12, -8, 10, -10],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}

/* Particle / dot field – purely decorative */
function ParticleField() {
  // Deterministic "random" positions seeded from index
  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 40; i++) {
      const seed = (i * 7919 + 104729) % 100;
      const seed2 = (i * 6271 + 32749) % 100;
      pts.push({
        id: i,
        left: `${seed}%`,
        top: `${seed2}%`,
        size: 2 + (i % 4),
        dur: 3 + (i % 5) * 1.2,
        delay: (i % 7) * 0.4,
      });
    }
    return pts;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "#e94560"
                : p.id % 3 === 1
                ? "#f5c518"
                : "#00d2a0",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* Staggered subtitle text */
function StaggeredSubtitle({ text }) {
  const chars = text.split("");
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.02, delayChildren: 0.8 } },
      }}
      className="inline-block"
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: ch === " " ? "pre" : undefined }}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* Stat card */
function StatCard({ icon: Icon, value, label, color, delay }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 px-4 md:px-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
    >
      <Icon className="w-5 h-5 mb-1" style={{ color }} />
      <span
        className="text-2xl md:text-3xl font-extrabold tracking-tight"
        style={{ color }}
      >
        {value}
      </span>
      <span className="text-xs md:text-sm text-gray-400 tracking-wide uppercase">
        {label}
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// HERO
// ---------------------------------------------------------------------------

export default function Hero({ onGetStarted }) {
  const plansCount = useCountUp(12000, 2200, 1200);
  const schoolsCount = useCountUp(500, 2000, 1400);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #2a1a3e 0%, #1a1a2e 50%, #0f0f1b 100%)",
      }}
    >
      {/* ---- Layered gradient overlays ---- */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(233,69,96,0.04) 40%, rgba(0,210,160,0.03) 70%, transparent 100%)",
        }}
      />
      {/* Chalkboard grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Particles */}
      <ParticleField />

      {/* Floating emojis */}
      {FLOATERS.map((f, i) => (
        <FloatingEmoji key={i} {...f} />
      ))}

      {/* Neon line accent – top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
        style={{
          background: "linear-gradient(90deg, transparent, #e94560, #f5c518, #00d2a0, transparent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "60%", opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      {/* ---- Main content ---- */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#e94560]/30 bg-[#e94560]/10 text-[#e94560] text-xs md:text-sm font-medium tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Zap className="w-3.5 h-3.5" />
          AI-Powered Substitute Plans
          <Zap className="w-3.5 h-3.5" />
        </motion.div>

        {/* ---------- TITLE ---------- */}
        <motion.h1
          className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-none select-none"
          style={{
            fontFamily: "'Caveat', cursive",
            color: "#fff",
            textShadow: `
              0 0 10px rgba(233,69,96,0.9),
              0 0 30px rgba(233,69,96,0.6),
              0 0 60px rgba(233,69,96,0.35),
              0 0 100px rgba(245,197,24,0.2),
              0 0 140px rgba(0,210,160,0.12)
            `,
          }}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
        >
          {/* Shimmer overlay */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] bg-clip-text"
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
          SubPlanr
        </motion.h1>

        {/* ---------- SUBTITLE ---------- */}
        <motion.p
          className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-300 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <StaggeredSubtitle text="One-Click Substitute Teacher Plans" />
          <span className="mx-2 text-[#f5c518]">{"\u2726"}</span>
          <StaggeredSubtitle text="Powered by AI" />
        </motion.p>

        {/* ---------- CTA BUTTON ---------- */}
        <motion.button
          onClick={onGetStarted}
          className="group relative mt-10 md:mt-12 px-10 py-4 rounded-2xl text-lg md:text-xl font-bold text-white cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518]"
          style={{
            background: "linear-gradient(135deg, #e94560, #d63384, #f5c518)",
            boxShadow: `
              0 0 20px rgba(233,69,96,0.5),
              0 0 60px rgba(233,69,96,0.2),
              inset 0 1px 0 rgba(255,255,255,0.15)
            `,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 150, damping: 18 }}
          whileHover={{
            scale: 1.07,
            boxShadow:
              "0 0 30px rgba(233,69,96,0.7), 0 0 80px rgba(245,197,24,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Pulsing ring behind button */}
          <motion.span
            className="absolute inset-0 rounded-2xl"
            style={{ border: "2px solid rgba(245,197,24,0.4)" }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          {/* Shimmer sweep */}
          <motion.span
            className="absolute inset-0 rounded-2xl opacity-30"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />

          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Generate Plan
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>

        {/* Tiny helper text */}
        <motion.p
          className="mt-3 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          No sign-up needed. Try it free.
        </motion.p>

        {/* ---------- STATS BAR ---------- */}
        <motion.div
          className="mt-14 md:mt-20 flex flex-wrap justify-center gap-6 md:gap-0 md:divide-x md:divide-gray-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <StatCard
            icon={TrendingUp}
            value={`${plansCount.toLocaleString()}+`}
            label="Plans Generated"
            color="#e94560"
            delay={1.5}
          />
          <StatCard
            icon={Users}
            value={`${schoolsCount.toLocaleString()}+`}
            label="Schools"
            color="#f5c518"
            delay={1.7}
          />
          <StatCard
            icon={Star}
            value="4.9★"
            label="Rating"
            color="#00d2a0"
            delay={1.9}
          />
        </motion.div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* ---- Bottom neon line ---- */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00d2a0, #f5c518, #e94560, transparent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "50%", opacity: 0.6 }}
        transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
      />
    </section>
  );
}
