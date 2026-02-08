"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ACCENT_COLORS = {
  red: "#e94560",
  yellow: "#f5c518",
  green: "#00d2a0",
  purple: "#7b2ff7",
};

const FEATURES = [
  {
    emoji: "\u26A1",
    title: "One-Click Plans",
    description: "Generate complete sub plans in seconds, not hours",
    accent: ACCENT_COLORS.red,
  },
  {
    emoji: "\uD83C\uDFAF",
    title: "Grade-Specific",
    description:
      "Tailored activities for K-12, age-appropriate and engaging",
    accent: ACCENT_COLORS.yellow,
  },
  {
    emoji: "\uD83E\uDDE0",
    title: "AI-Powered",
    description: "Smart scheduling that understands your curriculum",
    accent: ACCENT_COLORS.purple,
  },
  {
    emoji: "\uD83D\uDDA8\uFE0F",
    title: "Print-Ready",
    description: "Beautiful formatted plans ready for your substitute",
    accent: ACCENT_COLORS.green,
  },
  {
    emoji: "\uD83D\uDD04",
    title: "Instant Regenerate",
    description: "Don't love it? Get a fresh plan with one click",
    accent: ACCENT_COLORS.red,
  },
  {
    emoji: "\u2728",
    title: "Multiple Tones",
    description:
      "Professional, friendly, or fun \u2014 match your teaching style",
    accent: ACCENT_COLORS.yellow,
  },
];

const STEPS = [
  {
    number: 1,
    emoji: "\uD83D\uDCDD",
    title: "Enter Your Curriculum",
    description:
      "Tell us your grade level, subjects, and any special instructions. It only takes 30 seconds.",
    accent: ACCENT_COLORS.red,
  },
  {
    number: 2,
    emoji: "\uD83E\uDD16",
    title: "AI Generates Your Plan",
    description:
      "Our AI crafts a detailed, time-blocked substitute plan tailored to your classroom.",
    accent: ACCENT_COLORS.yellow,
  },
  {
    number: 3,
    emoji: "\uD83D\uDDA8\uFE0F",
    title: "Print & Go!",
    description:
      "Download your print-ready plan and leave it on your desk. Your sub will thank you.",
    accent: ACCENT_COLORS.green,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SubPlanr saved my sanity during flu season. I was able to create a full week of sub plans in under 10 minutes. My substitute said they were the best plans she\u2019d ever received!",
    name: "Jessica M.",
    school: "Riverside Elementary",
    grade: "3rd Grade Teacher",
    stars: 5,
  },
  {
    quote:
      "I used to spend my sick days worrying about what my sub was doing. Now I just open SubPlanr, click generate, and actually rest. The plans are detailed, engaging, and perfectly aligned with my curriculum.",
    name: "Marcus T.",
    school: "Lincoln Middle School",
    grade: "7th Grade Science",
    stars: 5,
  },
  {
    quote:
      "As a first-year teacher, I had no idea how to write sub plans. SubPlanr made me look like a veteran. My principal even complimented how organized my plans were. This app is a game-changer!",
    name: "Priya K.",
    school: "Oakwood High School",
    grade: "10th Grade English",
    stars: 5,
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FeatureCard({ emoji, title, description, accent, index }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      }}
      className="group relative rounded-2xl p-6 md:p-8 cursor-default"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Hover glow border overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${accent}55, 0 0 20px ${accent}22, 0 0 40px ${accent}11`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      {/* Emoji */}
      <motion.div
        className="text-5xl md:text-6xl mb-4 select-none"
        whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.4 }}
      >
        {emoji}
      </motion.div>

      {/* Title */}
      <h3
        className="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300"
        style={{ color: "#f0f0f0" }}
      >
        <span
          className="group-hover:drop-shadow-lg transition-all duration-300"
          style={{
            textShadow: "none",
          }}
        >
          {title}
        </span>
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base leading-relaxed" style={{ color: "#a0a0b0" }}>
        {description}
      </p>

      {/* Bottom accent dot */}
      <div
        className="mt-5 w-8 h-1 rounded-full opacity-50 group-hover:opacity-100 group-hover:w-12 transition-all duration-500"
        style={{ background: accent }}
      />
    </motion.div>
  );
}

function StepCard({ number, emoji, title, description, accent, index }) {
  return (
    <motion.div
      custom={index}
      variants={stepVariants}
      className="relative flex flex-col items-center text-center flex-1 px-4 md:px-6"
    >
      {/* Pulsing numbered circle */}
      <div className="relative mb-6">
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${accent}` }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
        />
        {/* Inner pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${accent}` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4 + 0.3,
          }}
        />
        {/* Circle with number */}
        <div
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-extrabold"
          style={{
            background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
            border: `2px solid ${accent}`,
            color: accent,
            boxShadow: `0 0 20px ${accent}33, 0 0 40px ${accent}11`,
          }}
        >
          {number}
        </div>
      </div>

      {/* Emoji */}
      <div className="text-4xl md:text-5xl mb-3 select-none">{emoji}</div>

      {/* Title */}
      <h3
        className="text-lg md:text-xl font-bold mb-2"
        style={{ color: "#f0f0f0" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="text-sm md:text-base leading-relaxed max-w-xs"
        style={{ color: "#a0a0b0" }}
      >
        {description}
      </p>
    </motion.div>
  );
}

function ConnectingLine({ accent }) {
  return (
    <div className="hidden md:flex items-center justify-center flex-shrink-0 -mx-2 mt-[-60px]">
      <motion.div
        className="h-[2px] w-16 lg:w-24 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${ACCENT_COLORS.red}66, ${ACCENT_COLORS.yellow}66, ${ACCENT_COLORS.green}66)`,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </div>
  );
}

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="text-lg"
          style={{ color: ACCENT_COLORS.yellow }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          {"\u2605"}
        </motion.span>
      ))}
    </div>
  );
}

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonialVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: 0.96,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.96,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  const t = TESTIMONIALS[current];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Decorative quote marks */}
      <div
        className="absolute -top-6 -left-2 md:-left-6 text-7xl md:text-8xl font-serif select-none pointer-events-none leading-none"
        style={{ color: `${ACCENT_COLORS.purple}30` }}
      >
        {"\u201C"}
      </div>
      <div
        className="absolute -bottom-10 -right-2 md:-right-6 text-7xl md:text-8xl font-serif select-none pointer-events-none leading-none"
        style={{ color: `${ACCENT_COLORS.purple}30` }}
      >
        {"\u201D"}
      </div>

      {/* Testimonial card */}
      <div
        className="relative rounded-2xl p-8 md:p-10 min-h-[280px] md:min-h-[260px] flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(22,33,62,0.8), rgba(26,26,46,0.9))",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(123, 47, 247, 0.2)",
          boxShadow: `0 4px 30px rgba(0,0,0,0.3), 0 0 40px ${ACCENT_COLORS.purple}11`,
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={testimonialVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {/* Stars */}
            <div className="mb-4">
              <StarRating count={t.stars} />
            </div>

            {/* Quote */}
            <p
              className="text-base md:text-lg leading-relaxed mb-6 italic"
              style={{ color: "#d0d0e0" }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg font-bold"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_COLORS.purple}44, ${ACCENT_COLORS.red}44)`,
                  color: ACCENT_COLORS.yellow,
                  border: `1px solid ${ACCENT_COLORS.purple}44`,
                }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p
                  className="font-bold text-sm md:text-base"
                  style={{ color: "#f0f0f0" }}
                >
                  {t.name}
                </p>
                <p className="text-xs md:text-sm" style={{ color: "#a0a0b0" }}>
                  {t.grade} &middot; {t.school}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2.5 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative p-1 cursor-pointer bg-transparent border-none"
            aria-label={`Go to testimonial ${i + 1}`}
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background:
                  i === current
                    ? ACCENT_COLORS.purple
                    : "rgba(255,255,255,0.2)",
              }}
              animate={{
                scale: i === current ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            {i === current && (
              <motion.div
                className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full"
                style={{ background: ACCENT_COLORS.purple }}
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Decorative elements
// ---------------------------------------------------------------------------

function NeonUnderline({ color = ACCENT_COLORS.red }) {
  return (
    <motion.div
      className="mx-auto mt-3 h-[3px] rounded-full"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, ${ACCENT_COLORS.yellow}, ${color}, transparent)`,
        boxShadow: `0 0 12px ${color}66, 0 0 30px ${color}33`,
      }}
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: "180px", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    />
  );
}

function SectionDivider() {
  return (
    <motion.div
      className="mx-auto my-16 md:my-24 h-[1px] max-w-md"
      style={{
        background: `linear-gradient(90deg, transparent, ${ACCENT_COLORS.red}33, ${ACCENT_COLORS.yellow}44, ${ACCENT_COLORS.green}33, transparent)`,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    />
  );
}

// ---------------------------------------------------------------------------
// FEATURES SECTION (main export)
// ---------------------------------------------------------------------------

export default function Features() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0f0f1b 0%, #1a1a2e 8%, #16213e 50%, #1a1a2e 92%, #0f0f1b 100%)",
      }}
    >
      {/* Background decorative gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 20% 30%, ${ACCENT_COLORS.red}08 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 70%, ${ACCENT_COLORS.purple}08 0%, transparent 70%),
            radial-gradient(ellipse 60% 30% at 50% 50%, ${ACCENT_COLORS.green}06 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        {/* ----------------------------------------------------------------
            SECTION 1: WHY TEACHERS LOVE SUBPLANR
        ---------------------------------------------------------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="text-center mb-14 md:mb-20"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            style={{
              fontFamily: "'Caveat', cursive",
              color: "#f0f0f0",
              textShadow: `0 0 20px ${ACCENT_COLORS.red}44, 0 0 60px ${ACCENT_COLORS.red}22`,
            }}
          >
            Why Teachers Love SubPlanr
          </h2>
          <NeonUnderline />
          <p
            className="mt-5 text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "#a0a0b0" }}
          >
            Everything you need to create professional substitute teacher plans
            in record time.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} index={i} />
          ))}
        </motion.div>

        {/* ----------------------------------------------------------------
            SECTION 2: HOW IT WORKS
        ---------------------------------------------------------------- */}
        <SectionDivider />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="text-center mb-14 md:mb-20"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            style={{
              fontFamily: "'Caveat', cursive",
              color: "#f0f0f0",
              textShadow: `0 0 20px ${ACCENT_COLORS.yellow}44, 0 0 60px ${ACCENT_COLORS.yellow}22`,
            }}
          >
            How It Works
          </h2>
          <NeonUnderline color={ACCENT_COLORS.yellow} />
          <p
            className="mt-5 text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "#a0a0b0" }}
          >
            Three simple steps to never stress about sub plans again.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {STEPS.map((step, i) => (
            <div key={step.number} className="contents">
              <StepCard {...step} index={i} />
              {i < STEPS.length - 1 && <ConnectingLine />}
            </div>
          ))}
        </motion.div>

        {/* ----------------------------------------------------------------
            SECTION 3: TESTIMONIALS
        ---------------------------------------------------------------- */}
        <SectionDivider />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
            style={{
              fontFamily: "'Caveat', cursive",
              color: "#f0f0f0",
              textShadow: `0 0 20px ${ACCENT_COLORS.green}44, 0 0 60px ${ACCENT_COLORS.green}22`,
            }}
          >
            Teachers Are Talking
          </h2>
          <NeonUnderline color={ACCENT_COLORS.green} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <TestimonialCarousel />
        </motion.div>
      </div>

      {/* Bottom neon accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${ACCENT_COLORS.green}, ${ACCENT_COLORS.yellow}, ${ACCENT_COLORS.red}, transparent)`,
        }}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "60%", opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </section>
  );
}
