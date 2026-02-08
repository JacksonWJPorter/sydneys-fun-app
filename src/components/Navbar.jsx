"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Menu,
  X,
  Home,
  FilePlus,
  LayoutTemplate,
  Info,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { id: "home", label: "Home", icon: Home },
  { id: "create", label: "Create Plan", icon: FilePlus },
  { id: "templates", label: "Templates", icon: LayoutTemplate },
  { id: "about", label: "About", icon: Info },
];

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export default function Navbar({ activeSection = "home", onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToSection = useCallback(
    (sectionId) => {
      setMobileOpen(false);
      if (onNavigate) {
        onNavigate(sectionId);
        return;
      }
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [onNavigate]
  );

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1a1a2e] shadow-lg shadow-black/30"
            : "bg-[#1a1a2e]"
        } backdrop-blur-xl`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
      >
        {/* Gradient bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #e94560 25%, #f5c518 50%, #00d2a0 75%, transparent 100%)",
            opacity: scrolled ? 0.6 : 0.3,
            transition: "opacity 0.3s ease",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ---- Left: Logo ---- */}
            <motion.button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] rounded-lg px-1"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Pencil icon */}
              <motion.div
                className="relative"
                animate={{ rotate: [0, -8, 8, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              >
                <Pencil
                  className="w-5 h-5 text-[#f5c518]"
                  strokeWidth={2.5}
                />
                {/* Pencil glow */}
                <div className="absolute inset-0 blur-md bg-[#f5c518]/30 rounded-full" />
              </motion.div>

              {/* Logo text */}
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
            </motion.button>

            {/* ---- Right: Desktop nav ---- */}
            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        layoutId="activeNavPill"
                        style={{
                          background:
                            "linear-gradient(135deg, #e94560, #7b2ff7)",
                          boxShadow:
                            "0 0 16px rgba(233,69,96,0.5), 0 0 40px rgba(123,47,247,0.2)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <link.icon className="w-3.5 h-3.5" />
                      {link.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* ---- Right: Mobile hamburger ---- */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] cursor-pointer"
              style={{ background: "rgba(255,255,255,0.05)" }}
              onClick={() => setMobileOpen((v) => !v)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ---- Mobile menu overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed top-16 left-0 right-0 z-50 md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <div
                className="mx-4 mt-2 rounded-2xl border border-white/10 p-4 flex flex-col gap-2"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(26,26,46,0.97), rgba(22,33,62,0.97))",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.5), 0 0 1px rgba(233,69,96,0.3)",
                }}
              >
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: isActive
                          ? "linear-gradient(135deg, rgba(233,69,96,0.25), rgba(123,47,247,0.15))"
                          : "transparent",
                        boxShadow: isActive
                          ? "0 0 20px rgba(233,69,96,0.15), inset 0 0 0 1px rgba(233,69,96,0.2)"
                          : "none",
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.08 * i,
                        ease: "easeOut",
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <link.icon
                        className="w-4 h-4"
                        style={{
                          color: isActive ? "#e94560" : "currentColor",
                        }}
                      />
                      {link.label}
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 rounded-full bg-[#e94560]"
                          layoutId="mobileActiveDot"
                          style={{
                            boxShadow: "0 0 8px rgba(233,69,96,0.6)",
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}

                {/* Decorative gradient line */}
                <div
                  className="mt-2 h-[1px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #e94560, #f5c518, #00d2a0, transparent)",
                    opacity: 0.3,
                  }}
                />

                {/* Tiny branding */}
                <p
                  className="text-center text-xs text-gray-600 mt-1 pb-1"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  SubPlan<span className="text-[#e94560]">r</span> v1.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
