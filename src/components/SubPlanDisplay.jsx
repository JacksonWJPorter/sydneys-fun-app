"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Printer,
  RefreshCw,
  ArrowLeft,
  Copy,
  Share2,
  Clock,
  BookOpen,
  CalendarDays,
  AlertTriangle,
  ChevronDown,
  Sparkles,
  CheckCircle,
  Phone,
  FileText,
  Star,
  Lightbulb,
  GraduationCap,
  Beaker,
  Palette,
  Music,
  Dumbbell,
  Globe,
  Calculator,
  PenLine,
  Heart,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  COLOUR MAP  – subject -> neon accent                              */
/* ------------------------------------------------------------------ */
const SUBJECT_COLORS = {
  math:       { bg: "rgba(59,130,246,0.15)",  border: "#3b82f6", dot: "#3b82f6", text: "#93c5fd" },
  science:    { bg: "rgba(0,210,160,0.15)",   border: "#00d2a0", dot: "#00d2a0", text: "#6ee7b7" },
  english:    { bg: "rgba(233,69,96,0.15)",   border: "#e94560", dot: "#e94560", text: "#fca5a5" },
  reading:    { bg: "rgba(233,69,96,0.15)",   border: "#e94560", dot: "#e94560", text: "#fca5a5" },
  history:    { bg: "rgba(245,197,24,0.15)",  border: "#f5c518", dot: "#f5c518", text: "#fde68a" },
  social:     { bg: "rgba(245,197,24,0.15)",  border: "#f5c518", dot: "#f5c518", text: "#fde68a" },
  art:        { bg: "rgba(168,85,247,0.15)",  border: "#a855f7", dot: "#a855f7", text: "#d8b4fe" },
  music:      { bg: "rgba(236,72,153,0.15)",  border: "#ec4899", dot: "#ec4899", text: "#f9a8d4" },
  pe:         { bg: "rgba(249,115,22,0.15)",  border: "#f97316", dot: "#f97316", text: "#fdba74" },
  gym:        { bg: "rgba(249,115,22,0.15)",  border: "#f97316", dot: "#f97316", text: "#fdba74" },
  lunch:      { bg: "rgba(0,210,160,0.12)",   border: "#00d2a0", dot: "#00d2a0", text: "#6ee7b7" },
  recess:     { bg: "rgba(0,210,160,0.12)",   border: "#00d2a0", dot: "#00d2a0", text: "#6ee7b7" },
  morning:    { bg: "rgba(123,47,247,0.15)",  border: "#7b2ff7", dot: "#7b2ff7", text: "#c4b5fd" },
  default:    { bg: "rgba(123,47,247,0.15)",  border: "#7b2ff7", dot: "#7b2ff7", text: "#c4b5fd" },
};

const SUBJECT_ICONS = {
  math: Calculator,
  science: Beaker,
  english: PenLine,
  reading: BookOpen,
  history: Globe,
  social: Globe,
  art: Palette,
  music: Music,
  pe: Dumbbell,
  gym: Dumbbell,
  lunch: Heart,
  recess: Star,
  morning: Sparkles,
  default: BookOpen,
};

function getSubjectKey(subject) {
  const lower = (subject || "").toLowerCase();
  for (const key of Object.keys(SUBJECT_COLORS)) {
    if (key !== "default" && lower.includes(key)) return key;
  }
  return "default";
}

function getSubjectColor(subject) {
  return SUBJECT_COLORS[getSubjectKey(subject)];
}

function getSubjectIcon(subject) {
  return SUBJECT_ICONS[getSubjectKey(subject)] || BookOpen;
}

/* ------------------------------------------------------------------ */
/*  DECORATIVE BACKGROUND                                              */
/* ------------------------------------------------------------------ */
function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden print-hidden" aria-hidden>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(123,47,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,247,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Floating shapes */}
      {[
        { x: "10%", y: "15%", size: 120, color: "#e94560", delay: 0 },
        { x: "85%", y: "25%", size: 80, color: "#7b2ff7", delay: 1.5 },
        { x: "70%", y: "60%", size: 100, color: "#00d2a0", delay: 3 },
        { x: "20%", y: "75%", size: 60, color: "#f5c518", delay: 2 },
        { x: "50%", y: "40%", size: 90, color: "#3b82f6", delay: 4 },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            background: `radial-gradient(circle, ${shape.color}15, transparent 70%)`,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Corner glow */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #7b2ff7, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #e94560, transparent 70%)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GLASS CARD PRIMITIVE                                               */
/* ------------------------------------------------------------------ */
function GlassCard({ children, className = "", style = {}, ...rest }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 backdrop-blur-md ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1. PLAN HEADER                                                     */
/* ------------------------------------------------------------------ */
function PlanHeader({ plan }) {
  return (
    <motion.header className="text-center mb-12 pt-8">
      {/* Tiny sparkle pre-title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 mb-4"
      >
        <Sparkles size={16} className="text-[#f5c518]" />
        <span className="uppercase tracking-[0.3em] text-xs text-white/40 font-sans">
          Substitute Teacher Plan
        </span>
        <Sparkles size={16} className="text-[#f5c518]" />
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        style={{ fontFamily: "'Caveat', cursive", color: "#e94560" }}
      >
        Sub Plan for{" "}
        <span
          className="relative inline-block"
          style={{
            background: "linear-gradient(135deg, #f5c518, #e94560, #7b2ff7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {plan.teacherName || "Teacher"}&apos;s
          <motion.span
            className="absolute -bottom-1 left-0 h-[3px] rounded-full"
            style={{ background: "linear-gradient(90deg, #f5c518, #e94560, #7b2ff7)" }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </span>{" "}
        Class
      </motion.h1>

      {/* Meta row — date + badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-3 mt-4"
      >
        {/* Date */}
        <span className="flex items-center gap-1.5 text-white/60 text-sm font-sans">
          <CalendarDays size={14} />
          {plan.date || "Date TBD"}
        </span>

        <span className="text-white/20">|</span>

        {/* Grade badges */}
        {(plan.grades || []).map((grade, i) => (
          <motion.span
            key={grade}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="px-3 py-1 rounded-full text-xs font-semibold font-sans border"
            style={{
              background: "rgba(123,47,247,0.15)",
              borderColor: "rgba(123,47,247,0.4)",
              color: "#c4b5fd",
            }}
          >
            <GraduationCap size={12} className="inline mr-1 -mt-0.5" />
            {grade}
          </motion.span>
        ))}

        {/* Duration badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="px-3 py-1 rounded-full text-xs font-semibold font-sans border"
          style={{
            background: plan.duration === "full"
              ? "rgba(0,210,160,0.15)"
              : "rgba(245,197,24,0.15)",
            borderColor: plan.duration === "full"
              ? "rgba(0,210,160,0.4)"
              : "rgba(245,197,24,0.4)",
            color: plan.duration === "full" ? "#6ee7b7" : "#fde68a",
          }}
        >
          <Clock size={12} className="inline mr-1 -mt-0.5" />
          {plan.duration === "full" ? "Full Day" : "Half Day"}
        </motion.span>
      </motion.div>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  2. QUICK INFO BAR                                                  */
/* ------------------------------------------------------------------ */
function QuickInfoBar({ plan }) {
  const items = [
    {
      icon: Clock,
      label: "Periods",
      value: plan.schedule?.length || 0,
      color: "#e94560",
    },
    {
      icon: BookOpen,
      label: "Subjects",
      value: plan.subjects?.length || new Set(plan.schedule?.map((s) => s.subject)).size || 0,
      color: "#7b2ff7",
    },
    {
      icon: CalendarDays,
      label: "Duration",
      value: plan.duration === "full" ? "Full Day" : "Half Day",
      color: "#00d2a0",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
          >
            <GlassCard className="p-5 text-center group hover:scale-[1.03] transition-transform duration-300 cursor-default">
              <div
                className="mx-auto w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-shadow duration-300"
                style={{
                  background: `${item.color}20`,
                  boxShadow: `0 0 0 0 ${item.color}00`,
                }}
              >
                <Icon size={20} style={{ color: item.color }} />
              </div>
              <p className="text-2xl font-bold text-white font-sans">{item.value}</p>
              <p className="text-xs text-white/40 uppercase tracking-widest mt-1 font-sans">
                {item.label}
              </p>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. SCHEDULE TIMELINE — THE HERO                                    */
/* ------------------------------------------------------------------ */
function TimelineItem({ item, index, total }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const colors = getSubjectColor(item.subject);
  const Icon = getSubjectIcon(item.subject);
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-4 md:gap-8 group"
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ---- LEFT: time + line ---- */}
      <div className="flex flex-col items-center w-28 md:w-36 shrink-0 relative">
        {/* Time label */}
        <span
          className="text-xs md:text-sm font-semibold font-sans whitespace-nowrap mb-3 text-right w-full pr-4"
          style={{ color: colors.text }}
        >
          {item.time}
        </span>

        {/* Animated dot */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          whileHover={{ scale: 1.3 }}
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute w-8 h-8 rounded-full"
            style={{ border: `2px solid ${colors.dot}` }}
            animate={isInView ? { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
          />
          {/* Core dot */}
          <div
            className="w-4 h-4 rounded-full z-10 shadow-lg"
            style={{
              background: colors.dot,
              boxShadow: `0 0 12px ${colors.dot}60, 0 0 24px ${colors.dot}30`,
            }}
          />
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 mt-0 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${colors.dot}60, ${colors.dot}10)` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
          />
        )}
      </div>

      {/* ---- RIGHT: card ---- */}
      <div className="flex-1 pb-8 md:pb-12">
        <motion.div
          className="rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300"
          style={{
            background: colors.bg,
            borderColor: expanded ? colors.border : `${colors.border}40`,
            boxShadow: expanded
              ? `0 0 30px ${colors.border}20, 0 8px 32px rgba(0,0,0,0.3)`
              : "0 4px 16px rgba(0,0,0,0.2)",
          }}
          onClick={() => setExpanded(!expanded)}
          whileHover={{
            borderColor: colors.border,
            boxShadow: `0 0 24px ${colors.border}15, 0 8px 32px rgba(0,0,0,0.3)`,
          }}
          layout
        >
          {/* Card header */}
          <div className="flex items-center justify-between p-4 md:p-5">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${colors.border}25` }}
              >
                <Icon size={18} style={{ color: colors.border }} />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-white font-sans leading-tight">
                  {item.subject}
                </h3>
                <p className="text-xs text-white/40 font-sans mt-0.5 line-clamp-1">
                  {item.activity?.slice(0, 60)}{item.activity?.length > 60 ? "..." : ""}
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-white/30"
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>

          {/* Expanded body */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-4 md:px-5 pb-5 space-y-4 border-t" style={{ borderColor: `${colors.border}20` }}>
                  {/* Activity */}
                  <div className="pt-4">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-1 font-sans">
                      Activity
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed font-sans">
                      {item.activity}
                    </p>
                  </div>

                  {/* Materials */}
                  {item.materials && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/30 mb-1 font-sans">
                        Materials Needed
                      </p>
                      <p className="text-sm text-white/70 font-sans">{item.materials}</p>
                    </div>
                  )}

                  {/* Notes */}
                  {item.notes && (
                    <div
                      className="rounded-lg p-3 border"
                      style={{
                        background: `${colors.border}08`,
                        borderColor: `${colors.border}20`,
                      }}
                    >
                      <p className="text-xs uppercase tracking-widest text-white/30 mb-1 font-sans">
                        Special Notes
                      </p>
                      <p className="text-sm font-sans" style={{ color: colors.text }}>
                        {item.notes}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ScheduleTimeline({ schedule }) {
  return (
    <section className="mb-14">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="text-3xl md:text-4xl font-bold mb-8"
        style={{ fontFamily: "'Caveat', cursive", color: "#f5c518" }}
      >
        Today&apos;s Schedule
      </motion.h2>

      <div className="relative">
        {(schedule || []).map((item, i) => (
          <TimelineItem key={i} item={item} index={i} total={schedule?.length || 0} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. EMERGENCY INFO CARD                                             */
/* ------------------------------------------------------------------ */
function EmergencyCard({ emergencyInfo }) {
  if (!emergencyInfo) return null;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      <div
        className="rounded-2xl border p-6 md:p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(233,69,96,0.08) 0%, rgba(233,69,96,0.03) 100%)",
          borderColor: "rgba(233,69,96,0.3)",
          boxShadow: "0 0 40px rgba(233,69,96,0.08), 0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Accent bar */}
        <div
          className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #e94560, #f97316, #e94560)" }}
        />

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#e94560]/15">
            <AlertTriangle size={20} className="text-[#e94560]" />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "'Caveat', cursive", color: "#e94560" }}
          >
            Emergency Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {emergencyInfo.contacts && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-[#e94560]/60" />
                <p className="text-xs uppercase tracking-widest text-white/40 font-sans">
                  Emergency Contacts
                </p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-sans whitespace-pre-line">
                {emergencyInfo.contacts}
              </p>
            </div>
          )}
          {emergencyInfo.procedures && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText size={14} className="text-[#e94560]/60" />
                <p className="text-xs uppercase tracking-widest text-white/40 font-sans">
                  Procedures
                </p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-sans whitespace-pre-line">
                {emergencyInfo.procedures}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. CLASSROOM NOTES — CHALKBOARD STYLE                              */
/* ------------------------------------------------------------------ */
function ClassroomNotes({ notes }) {
  if (!notes) return null;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      <div
        className="rounded-2xl border p-6 md:p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1e3a2f 0%, #1a2e26 50%, #162822 100%)",
          borderColor: "rgba(0,210,160,0.2)",
          boxShadow: "inset 0 2px 20px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Chalkboard texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M5 0h1L0 5V4zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Wooden frame top */}
        <div
          className="absolute top-0 left-0 w-full h-1.5"
          style={{ background: "linear-gradient(90deg, #5c3d2e, #8b5e3c, #5c3d2e)" }}
        />

        <div className="flex items-center gap-3 mb-5 relative">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#00d2a0]/10">
            <FileText size={20} className="text-[#00d2a0]" />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "'Caveat', cursive", color: "#00d2a0" }}
          >
            Classroom Notes
          </h2>
        </div>

        <p
          className="text-base md:text-lg leading-relaxed relative whitespace-pre-line"
          style={{ fontFamily: "'Caveat', cursive", color: "rgba(255,255,255,0.85)", fontSize: "1.25rem" }}
        >
          {notes}
        </p>
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. FUN FACTS SIDEBAR                                               */
/* ------------------------------------------------------------------ */
function FunFacts({ facts }) {
  if (!facts || facts.length === 0) return null;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const factColors = ["#f5c518", "#e94560", "#00d2a0", "#7b2ff7", "#3b82f6"];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f5c518]/15">
          <Lightbulb size={20} className="text-[#f5c518]" />
        </div>
        <h2
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "'Caveat', cursive", color: "#f5c518" }}
        >
          Fun Facts to Share
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facts.map((fact, i) => {
          const color = factColors[i % factColors.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="cursor-default"
            >
              <GlassCard
                className="p-5 h-full relative overflow-hidden"
                style={{ borderColor: `${color}30` }}
              >
                {/* Number badge */}
                <div
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-sans"
                  style={{ background: `${color}20`, color }}
                >
                  {i + 1}
                </div>
                <Star size={16} style={{ color }} className="mb-3 opacity-60" />
                <p className="text-sm text-white/80 leading-relaxed font-sans pr-6">
                  {fact}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. ACTION BAR (sticky bottom)                                      */
/* ------------------------------------------------------------------ */
function ActionBar({ onBack, onRegenerate, plan }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopy = useCallback(async () => {
    const text = buildPlainText(plan);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [plan]);

  const handleShare = useCallback(async () => {
    const text = buildPlainText(plan);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Sub Plan for ${plan.teacherName}'s Class`,
          text,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  }, [plan]);

  const buttons = [
    {
      label: "Back to Editor",
      icon: ArrowLeft,
      onClick: onBack,
      style: "ghost",
    },
    {
      label: "Regenerate",
      icon: RefreshCw,
      onClick: onRegenerate,
      style: "ghost",
    },
    {
      label: copied ? "Copied!" : "Copy as Text",
      icon: copied ? CheckCircle : Copy,
      onClick: handleCopy,
      style: "ghost",
    },
    {
      label: shared ? "Link Copied!" : "Share Link",
      icon: shared ? CheckCircle : Share2,
      onClick: handleShare,
      style: "ghost",
    },
    {
      label: "Print Plan",
      icon: Printer,
      onClick: handlePrint,
      style: "primary",
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 print-hidden"
    >
      <div
        className="border-t backdrop-blur-xl"
        style={{
          background: "linear-gradient(180deg, rgba(22,33,62,0.85) 0%, rgba(26,26,46,0.95) 100%)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          {buttons.map((btn) => {
            const Icon = btn.icon;
            const isPrimary = btn.style === "primary";
            return (
              <button
                key={btn.label}
                onClick={btn.onClick}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-sans
                  transition-all duration-200 cursor-pointer
                  ${isPrimary
                    ? "text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    : "text-white/70 hover:text-white hover:bg-white/10 active:scale-95"
                  }
                `}
                style={
                  isPrimary
                    ? {
                        background: "linear-gradient(135deg, #e94560, #7b2ff7)",
                        boxShadow: "0 4px 20px rgba(233,69,96,0.3)",
                      }
                    : {}
                }
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  PLAIN-TEXT BUILDER                                                 */
/* ------------------------------------------------------------------ */
function buildPlainText(plan) {
  let text = "";
  text += `SUB PLAN FOR ${(plan.teacherName || "Teacher").toUpperCase()}'S CLASS\n`;
  text += `Date: ${plan.date || "TBD"}\n`;
  text += `Grades: ${(plan.grades || []).join(", ")}\n`;
  text += `Duration: ${plan.duration === "full" ? "Full Day" : "Half Day"}\n`;
  text += `Subjects: ${(plan.subjects || []).join(", ")}\n`;
  text += "\n" + "=".repeat(50) + "\n\n";

  text += "SCHEDULE\n" + "-".repeat(30) + "\n\n";
  (plan.schedule || []).forEach((item) => {
    text += `${item.time}  |  ${item.subject}\n`;
    text += `  Activity: ${item.activity}\n`;
    if (item.materials) text += `  Materials: ${item.materials}\n`;
    if (item.notes) text += `  Notes: ${item.notes}\n`;
    text += "\n";
  });

  if (plan.emergencyInfo) {
    text += "EMERGENCY INFORMATION\n" + "-".repeat(30) + "\n";
    if (plan.emergencyInfo.contacts) text += `Contacts: ${plan.emergencyInfo.contacts}\n`;
    if (plan.emergencyInfo.procedures) text += `Procedures: ${plan.emergencyInfo.procedures}\n`;
    text += "\n";
  }

  if (plan.classroomNotes) {
    text += "CLASSROOM NOTES\n" + "-".repeat(30) + "\n";
    text += plan.classroomNotes + "\n\n";
  }

  if (plan.funFacts?.length) {
    text += "FUN FACTS\n" + "-".repeat(30) + "\n";
    plan.funFacts.forEach((f, i) => {
      text += `${i + 1}. ${f}\n`;
    });
  }

  return text;
}

/* ------------------------------------------------------------------ */
/*  PRINT STYLES — injected via <style> tag                            */
/* ------------------------------------------------------------------ */
const PRINT_STYLES = `
@media print {
  /* Reset background */
  body, html {
    background: #ffffff !important;
    color: #111111 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Hide non-printable elements */
  .print-hidden {
    display: none !important;
  }

  /* Remove animations */
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  /* Make glass cards print-friendly */
  .sub-plan-display {
    background: #ffffff !important;
    padding: 0 !important;
  }

  .sub-plan-display * {
    color: #111111 !important;
    border-color: #cccccc !important;
    background: transparent !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    text-shadow: none !important;
    -webkit-text-fill-color: #111111 !important;
  }

  .sub-plan-display h1,
  .sub-plan-display h2,
  .sub-plan-display h3 {
    color: #000000 !important;
    -webkit-text-fill-color: #000000 !important;
  }

  /* Cards get simple borders */
  .sub-plan-display [class*="rounded"] {
    border: 1px solid #dddddd !important;
    border-radius: 8px !important;
    padding: 12px !important;
    margin-bottom: 8px !important;
    page-break-inside: avoid;
  }

  /* Timeline simplification */
  .sub-plan-display .timeline-dot {
    background: #333333 !important;
    border: 2px solid #333333 !important;
  }

  .sub-plan-display .timeline-line {
    background: #cccccc !important;
  }

  /* Force expanded state for print */
  .sub-plan-display [data-schedule-item] [data-expanded-body] {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Page setup */
  @page {
    margin: 0.75in;
    size: letter;
  }

  /* Add bottom padding so action bar space is reclaimed */
  .sub-plan-display {
    padding-bottom: 0 !important;
  }
}
`;

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */
export default function SubPlanDisplay({ plan, onBack, onRegenerate }) {
  if (!plan) return null;

  return (
    <>
      {/* Inject print styles */}
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />

      {/* Import fonts */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
          `,
        }}
      />

      <div
        className="sub-plan-display relative min-h-screen pb-24"
        style={{
          background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <BackgroundDecor />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 1. Header */}
          <PlanHeader plan={plan} />

          {/* 2. Quick Info */}
          <QuickInfoBar plan={plan} />

          {/* 3. Schedule Timeline */}
          <ScheduleTimeline schedule={plan.schedule} />

          {/* 4. Emergency Info */}
          <EmergencyCard emergencyInfo={plan.emergencyInfo} />

          {/* 5. Classroom Notes */}
          <ClassroomNotes notes={plan.classroomNotes} />

          {/* 6. Fun Facts */}
          <FunFacts facts={plan.funFacts} />
        </div>

        {/* 7. Action Bar */}
        <ActionBar onBack={onBack} onRegenerate={onRegenerate} plan={plan} />
      </div>
    </>
  );
}
