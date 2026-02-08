"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Github,
  Mail,
  ArrowUp,
  Pencil,
  Heart,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#blog" },
  ],
  Support: [
    { label: "Help Center", href: "#support" },
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Twitter, label: "Twitter", href: "#twitter" },
  { icon: Github, label: "GitHub", href: "#github" },
  { icon: Mail, label: "Email", href: "#mail" },
];

// ---------------------------------------------------------------------------
// Animated gradient border (top of footer)
// ---------------------------------------------------------------------------

function AnimatedBorderTop() {
  return (
    <div className="relative h-[2px] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #e94560, #f5c518, #00d2a0, #7b2ff7, #e94560)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export default function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="relative" style={{ background: "#0f0f1b" }}>
      {/* Animated gradient top border */}
      <AnimatedBorderTop />

      {/* Glass card container */}
      <div
        className="relative mx-auto max-w-7xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,26,46,0.6) 0%, rgba(15,15,27,0.95) 100%)",
        }}
      >
        {/* Subtle glow behind content */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] blur-sm"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(233,69,96,0.3), rgba(245,197,24,0.3), transparent)",
          }}
        />

        <div className="px-6 sm:px-8 lg:px-12 pt-14 pb-8">
          {/* ---- Top row: Logo + links ---- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Logo & tagline – spans 5 cols */}
            <motion.div
              className="md:col-span-5 flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Pencil
                    className="w-5 h-5 text-[#f5c518]"
                    strokeWidth={2.5}
                  />
                  <div className="absolute inset-0 blur-md bg-[#f5c518]/30 rounded-full" />
                </div>
                <span
                  className="text-2xl font-bold tracking-tight select-none"
                  style={{
                    fontFamily: "'Caveat', cursive",
                    textShadow:
                      "0 0 12px rgba(233,69,96,0.4), 0 0 30px rgba(233,69,96,0.15)",
                  }}
                >
                  <span className="text-white">SubPlan</span>
                  <span className="text-[#e94560]">r</span>
                </span>
              </div>

              {/* Tagline */}
              <p
                className="text-gray-400 text-sm leading-relaxed max-w-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Making substitute teaching a breeze, one plan at a time.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-2">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    whileHover={{
                      scale: 1.15,
                      background: "rgba(233,69,96,0.15)",
                      borderColor: "rgba(233,69,96,0.3)",
                    }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link columns – span remaining 7 cols */}
            {Object.entries(FOOTER_LINKS).map(([heading, links], colIdx) => (
              <motion.div
                key={heading}
                className="md:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 * (colIdx + 1) }}
              >
                <h4
                  className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-500 hover:text-[#e94560] transition-colors duration-200 cursor-pointer"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Back to top button – last col on desktop */}
            <motion.div
              className="md:col-span-1 flex md:flex-col md:items-end md:justify-start items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button
                onClick={scrollToTop}
                className="group w-10 h-10 flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                whileHover={{
                  scale: 1.15,
                  background: "rgba(233,69,96,0.2)",
                  borderColor: "rgba(233,69,96,0.4)",
                  boxShadow: "0 0 20px rgba(233,69,96,0.25)",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </motion.button>
              <span
                className="ml-2 md:ml-0 md:mt-2 text-[10px] text-gray-600 uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Top
              </span>
            </motion.div>
          </div>

          {/* ---- Divider ---- */}
          <div
            className="mt-12 mb-6 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            }}
          />

          {/* ---- Bottom row ---- */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Made with love */}
            <motion.p
              className="text-xs text-gray-500 flex items-center gap-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Made with
              <motion.span
                className="inline-flex"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  className="w-3.5 h-3.5 text-[#e94560]"
                  fill="#e94560"
                />
              </motion.span>
              by teachers, for teachers
            </motion.p>

            {/* Copyright */}
            <motion.p
              className="text-xs text-gray-600"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              &copy; 2026 SubPlanr. All rights reserved.
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
