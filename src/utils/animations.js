/**
 * Reusable Framer Motion variant objects for the Sub Plan Builder app.
 *
 * Usage:
 *   import { fadeInUp, staggerContainer } from "@/utils/animations";
 *   <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *     <motion.p variants={fadeInUp}>Hello</motion.p>
 *   </motion.div>
 */

// ─── Fade In Up ──────────────────────────────────────────────────────

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.5,
    },
  },
};

// ─── Fade In (simple opacity) ────────────────────────────────────────

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ─── Stagger Container ──────────────────────────────────────────────

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// ─── Scale In ────────────────────────────────────────────────────────

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.4,
    },
  },
};

// ─── Slide In Left ──────────────────────────────────────────────────

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      duration: 0.5,
    },
  },
};

// ─── Slide In Right ─────────────────────────────────────────────────

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
      duration: 0.5,
    },
  },
};

// ─── Card Hover ─────────────────────────────────────────────────────
// Use with <motion.div whileHover="hover" variants={cardHover}>

export const cardHover = {
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// ─── Page Transition ────────────────────────────────────────────────
// Use with AnimatePresence + motion.div:
//   <motion.div
//     initial="initial"
//     animate="animate"
//     exit="exit"
//     variants={pageTransition}
//   >

export const pageTransition = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easeOut
    },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
