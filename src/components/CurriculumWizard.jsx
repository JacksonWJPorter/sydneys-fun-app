"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Settings,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Zap,
  AlertTriangle,
  GraduationCap,
  Clock,
  Brain,
  Smile,
  Briefcase,
  PartyPopper,
  Star,
  Heart,
  Music,
  Palette,
  Globe,
  Monitor,
  Dumbbell,
  FlaskConical,
  Calculator,
  BookOpenText,
  Scroll,
} from "lucide-react";

// ─── SAMPLE DATA ────────────────────────────────────────────────────────────────

const SAMPLE_DATA = {
  teacherName: "Ms. Sydney Parker",
  gradeLevel: ["3", "4"],
  subjects: ["Math", "Science", "English", "Art"],
  lessonDetails: {
    Math: "Students are working on multiplication facts (3s and 4s). They have been using arrays and skip counting strategies. The current chapter is Chapter 7 in the Go Math textbook. Students should complete workbook pages 145-147.",
    Science: "We are in our weather and climate unit. Students are tracking daily weather patterns and recording data in their science journals. They should complete the cloud identification worksheet in the blue folder on my desk.",
    English: "Reading groups are working on Charlotte's Web. Group A is on Chapter 12, Group B is on Chapter 9. All students should do 20 minutes of independent reading and complete their reading response journals.",
    Art: "Students are creating self-portraits using mixed media. Supplies are in the art cart by the window. They can continue working on their pieces -- smocks are required!",
  },
  duration: "full",
  difficulty: "business",
  specialInstructions:
    "Jayden has a nut allergy -- epipen is in the front office. Maria leaves early at 2:15 for orthodontist. Table 4 tends to get chatty -- try proximity seating. The class loves brain breaks -- GoNoodle is bookmarked on the laptop!",
  emergencyProcedures: true,
  tone: "friendly",
};

// ─── CONSTANTS ──────────────────────────────────────────────────────────────────

const GRADES = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

const SUBJECTS = [
  { name: "Math", icon: Calculator, color: "#e94560" },
  { name: "Science", icon: FlaskConical, color: "#00d2a0" },
  { name: "English", icon: BookOpenText, color: "#f5c518" },
  { name: "History", icon: Scroll, color: "#ff8c42" },
  { name: "Art", icon: Palette, color: "#7b2ff7" },
  { name: "Music", icon: Music, color: "#ff6bd6" },
  { name: "PE", icon: Dumbbell, color: "#00b4d8" },
  { name: "World Languages", icon: Globe, color: "#06d6a0" },
  { name: "Computer Science", icon: Monitor, color: "#4cc9f0" },
];

const QUICK_FILLS = {
  Math: "Students are working through Chapter 5 on fractions. They should complete the practice worksheet in the math folder and play Prodigy Math for 15 minutes.",
  Science:
    "We are studying the life cycle of butterflies. Students should observe the caterpillars in the terrarium and draw what they see in their science journals.",
  English:
    'Independent reading time followed by vocabulary practice. Students pick a book from the classroom library and complete a "Story Elements" graphic organizer.',
  History:
    "Students are learning about ancient civilizations. They should watch the BrainPOP video on Ancient Egypt (login on the whiteboard) and complete the quiz.",
  Art: "Free draw day! Students can use any materials from the art supply shelf. Remind them to put smocks on and clean up 10 minutes before the bell.",
  Music:
    "Students are practicing for the spring concert. Sheet music is in their folders. Run through songs #1-3 at least twice each.",
  PE: "Warm-up stretches (poster on gym wall), then relay races. Equipment is in the storage closet. Students need to be back in the classroom 5 minutes early to change.",
  "World Languages":
    "Spanish: Students are learning colors and numbers. Play the vocabulary Kahoot (link on teacher laptop) then complete the coloring worksheet.",
  "Computer Science":
    "Students are working on Scratch projects. They should log in to Scratch (class login on the board) and continue their animation projects. Help cards are on the back table.",
};

const STEPS = [
  { label: "Your Info", icon: User },
  { label: "This Week's Lessons", icon: BookOpen },
  { label: "Sub Preferences", icon: Settings },
  { label: "Review & Generate", icon: Sparkles },
];

const DIFFICULTY_OPTIONS = [
  {
    value: "simple",
    label: "Keep it simple",
    description: "Review & easy activities",
    icon: Smile,
    color: "#00d2a0",
  },
  {
    value: "business",
    label: "Business as usual",
    description: "Continue regular lessons",
    icon: Briefcase,
    color: "#f5c518",
  },
  {
    value: "challenge",
    label: "Challenge them",
    description: "Push forward & extend",
    icon: Brain,
    color: "#e94560",
  },
];

const TONE_OPTIONS = [
  {
    value: "professional",
    label: "Professional",
    emoji: "📋",
    description: "Formal and structured",
  },
  {
    value: "friendly",
    label: "Friendly",
    emoji: "😊",
    description: "Warm and approachable",
  },
  {
    value: "fun",
    label: "Fun & Engaging",
    emoji: "🎉",
    description: "Energetic and playful",
  },
];

// ─── CONFETTI PARTICLE ──────────────────────────────────────────────────────────

function ConfettiParticle({ delay, color, startX, startY }) {
  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      initial={{
        x: startX,
        y: startY,
        scale: 1,
        opacity: 1,
        rotate: 0,
      }}
      animate={{
        x: startX + (Math.random() - 0.5) * 600,
        y: startY + Math.random() * 500 + 200,
        scale: 0,
        opacity: 0,
        rotate: Math.random() * 720 - 360,
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay: delay,
        ease: "easeOut",
      }}
      style={{
        width: Math.random() * 10 + 5,
        height: Math.random() * 10 + 5,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      }}
    />
  );
}

// ─── CONFETTI BURST ─────────────────────────────────────────────────────────────

function ConfettiBurst() {
  const colors = ["#e94560", "#f5c518", "#00d2a0", "#7b2ff7", "#4cc9f0", "#ff6bd6", "#ff8c42"];
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    startX: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
    startY: typeof window !== "undefined" ? window.innerHeight / 3 : 300,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {particles.map((p) => (
        <ConfettiParticle key={p.id} {...p} />
      ))}
    </div>
  );
}

// ─── GLOWING INPUT ──────────────────────────────────────────────────────────────

function GlowInput({ label, value, onChange, placeholder, glowColor = "#7b2ff7" }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <motion.div
        animate={{
          boxShadow: focused
            ? `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
        className="rounded-xl"
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-white/20 focus:outline-none"
          style={{
            borderColor: focused ? `${glowColor}60` : undefined,
          }}
        />
      </motion.div>
    </div>
  );
}

// ─── GLOWING TEXTAREA ───────────────────────────────────────────────────────────

function GlowTextarea({
  label,
  value,
  onChange,
  placeholder,
  glowColor = "#7b2ff7",
  rows = 4,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <motion.div
        animate={{
          boxShadow: focused
            ? `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
        className="rounded-xl"
      >
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-white/20 focus:outline-none"
          style={{
            borderColor: focused ? `${glowColor}60` : undefined,
          }}
        />
      </motion.div>
    </div>
  );
}

// ─── STEP INDICATOR ─────────────────────────────────────────────────────────────

function StepIndicator({ currentStep, steps }) {
  return (
    <div className="mb-10 flex items-center justify-center">
      {steps.map((s, i) => {
        const StepIcon = s.icon;
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div key={i} className="flex items-center">
            {/* Step circle */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                scale: isActive ? 1.15 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow ring for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 15px #7b2ff7, 0 0 30px #7b2ff780",
                      "0 0 25px #e94560, 0 0 50px #e9456080",
                      "0 0 15px #7b2ff7, 0 0 30px #7b2ff780",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 48, height: 48, borderRadius: "50%" }}
                />
              )}

              <div
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  isCompleted
                    ? "border-[#00d2a0] bg-[#00d2a0]/20"
                    : isActive
                      ? "border-[#7b2ff7] bg-[#7b2ff7]/20"
                      : "border-white/20 bg-white/5"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check size={20} className="text-[#00d2a0]" />
                  </motion.div>
                ) : (
                  <StepIcon
                    size={20}
                    className={
                      isActive ? "text-[#7b2ff7]" : "text-gray-500"
                    }
                  />
                )}
              </div>

              {/* Label below */}
              <span
                className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : isCompleted
                      ? "text-[#00d2a0]"
                      : "text-gray-600"
                }`}
              >
                {s.label}
              </span>
            </motion.div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="mx-2 h-0.5 w-12 overflow-hidden rounded-full bg-white/10 sm:mx-3 sm:w-16 md:mx-4 md:w-20">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: isCompleted ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    background:
                      "linear-gradient(90deg, #7b2ff7, #00d2a0)",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN WIZARD COMPONENT ──────────────────────────────────────────────────────

export default function CurriculumWizard({ onGenerate }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  // Form state
  const [teacherName, setTeacherName] = useState("");
  const [gradeLevel, setGradeLevel] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessonDetails, setLessonDetails] = useState({});
  const [duration, setDuration] = useState("full");
  const [difficulty, setDifficulty] = useState("business");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [emergencyProcedures, setEmergencyProcedures] = useState(false);
  const [tone, setTone] = useState("friendly");

  // Fill demo data
  const fillDemoData = useCallback(() => {
    setTeacherName(SAMPLE_DATA.teacherName);
    setGradeLevel([...SAMPLE_DATA.gradeLevel]);
    setSubjects([...SAMPLE_DATA.subjects]);
    setLessonDetails({ ...SAMPLE_DATA.lessonDetails });
    setDuration(SAMPLE_DATA.duration);
    setDifficulty(SAMPLE_DATA.difficulty);
    setSpecialInstructions(SAMPLE_DATA.specialInstructions);
    setEmergencyProcedures(SAMPLE_DATA.emergencyProcedures);
    setTone(SAMPLE_DATA.tone);
  }, []);

  // Toggle grade selection
  const toggleGrade = (grade) => {
    setGradeLevel((prev) =>
      prev.includes(grade)
        ? prev.filter((g) => g !== grade)
        : [...prev, grade]
    );
  };

  // Toggle subject selection
  const toggleSubject = (subjectName) => {
    setSubjects((prev) => {
      if (prev.includes(subjectName)) {
        const newDetails = { ...lessonDetails };
        delete newDetails[subjectName];
        setLessonDetails(newDetails);
        return prev.filter((s) => s !== subjectName);
      }
      return [...prev, subjectName];
    });
  };

  // Update lesson detail
  const updateLessonDetail = (subject, value) => {
    setLessonDetails((prev) => ({ ...prev, [subject]: value }));
  };

  // Quick fill a subject
  const quickFillSubject = (subject) => {
    updateLessonDetail(subject, QUICK_FILLS[subject] || "");
  };

  // Navigation
  const nextStep = () => {
    if (step < 3) {
      setDirection(1);
      setStep(step + 1);
      if (step + 1 === 3) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  // Generate handler
  const handleGenerate = () => {
    const formData = {
      teacherName,
      gradeLevel,
      subjects,
      lessonDetails,
      duration,
      difficulty,
      specialInstructions,
      emergencyProcedures,
      tone,
    };
    onGenerate?.(formData);
  };

  // Check if next is allowed
  const canProceed = () => {
    switch (step) {
      case 0:
        return teacherName.trim().length > 0 && gradeLevel.length > 0 && subjects.length > 0;
      case 1:
        return subjects.every(
          (s) => lessonDetails[s] && lessonDetails[s].trim().length > 0
        );
      case 2:
        return true;
      default:
        return true;
    }
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  // ── STEP 1: YOUR INFO ──────────────────────────────────────────────────

  const renderStep1 = () => (
    <motion.div
      key="step1"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="space-y-8"
    >
      {/* Teacher Name */}
      <div>
        <div className="mb-1 flex items-center gap-2">
          <GraduationCap size={18} className="text-[#f5c518]" />
          <h3 className="text-lg font-semibold text-white">
            Who&apos;s the teacher?
          </h3>
        </div>
        <GlowInput
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          placeholder="e.g., Ms. Parker, Mr. Johnson..."
          glowColor="#f5c518"
        />
      </div>

      {/* Grade Level */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-white">
          Grade Level(s)
        </h3>
        <div className="flex flex-wrap gap-2">
          {GRADES.map((grade) => {
            const isSelected = gradeLevel.includes(grade);
            return (
              <motion.button
                key={grade}
                onClick={() => toggleGrade(grade)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: isSelected
                    ? "0 0 15px #e9456080, 0 0 30px #e9456040"
                    : "0 0 0px transparent",
                }}
                className={`relative h-10 w-10 rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                  isSelected
                    ? "border-[#e94560] bg-[#e94560]/20 text-[#e94560]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {grade}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Subjects */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-white">
          Subjects You Teach
        </h3>
        <div className="flex flex-wrap gap-3">
          {SUBJECTS.map((subject) => {
            const isSelected = subjects.includes(subject.name);
            const Icon = subject.icon;
            return (
              <motion.button
                key={subject.name}
                onClick={() => toggleSubject(subject.name)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: isSelected
                    ? `0 0 15px ${subject.color}60, 0 0 30px ${subject.color}30`
                    : "0 0 0px transparent",
                }}
                className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? "bg-opacity-20"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: subject.color,
                        backgroundColor: `${subject.color}15`,
                        color: subject.color,
                      }
                    : {}
                }
              >
                <Icon size={16} />
                {subject.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  // ── STEP 2: LESSON DETAILS ─────────────────────────────────────────────

  const renderStep2 = () => (
    <motion.div
      key="step2"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="space-y-6"
    >
      {subjects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <BookOpen size={40} className="mx-auto mb-3 text-gray-500" />
          <p className="text-gray-400">
            Go back and select at least one subject first.
          </p>
        </div>
      ) : (
        subjects.map((subjectName) => {
          const subjectConfig = SUBJECTS.find(
            (s) => s.name === subjectName
          );
          const Icon = subjectConfig?.icon || BookOpen;
          const color = subjectConfig?.color || "#7b2ff7";

          return (
            <motion.div
              key={subjectName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              {/* Card header */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{
                  background: `linear-gradient(135deg, ${color}15, transparent)`,
                  borderBottom: `1px solid ${color}30`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <h3
                    className="text-base font-semibold"
                    style={{ color }}
                  >
                    {subjectName}
                  </h3>
                </div>

                <motion.button
                  onClick={() => quickFillSubject(subjectName)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <Zap size={12} className="text-[#f5c518]" />
                  Quick Fill
                </motion.button>
              </div>

              {/* Card body */}
              <div className="p-5">
                <GlowTextarea
                  value={lessonDetails[subjectName] || ""}
                  onChange={(e) =>
                    updateLessonDetail(subjectName, e.target.value)
                  }
                  placeholder="What are students currently working on?"
                  glowColor={color}
                  rows={4}
                />
              </div>
            </motion.div>
          );
        })
      )}
    </motion.div>
  );

  // ── STEP 3: SUB PREFERENCES ────────────────────────────────────────────

  const renderStep3 = () => (
    <motion.div
      key="step3"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="space-y-8"
    >
      {/* Duration */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <Clock size={18} className="text-[#00d2a0]" />
          Duration
        </h3>
        <div className="flex gap-3">
          {[
            { value: "half", label: "Half Day" },
            { value: "full", label: "Full Day" },
          ].map((opt) => {
            const isSelected = duration === opt.value;
            return (
              <motion.button
                key={opt.value}
                onClick={() => setDuration(opt.value)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: isSelected
                    ? "0 0 20px #00d2a060, 0 0 40px #00d2a030"
                    : "0 0 0px transparent",
                }}
                className={`flex-1 rounded-xl border-2 px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? "border-[#00d2a0] bg-[#00d2a0]/15 text-[#00d2a0]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {opt.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <Brain size={18} className="text-[#f5c518]" />
          Difficulty Level
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {DIFFICULTY_OPTIONS.map((opt) => {
            const isSelected = difficulty === opt.value;
            const Icon = opt.icon;
            return (
              <motion.button
                key={opt.value}
                onClick={() => setDifficulty(opt.value)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: isSelected
                    ? `0 0 20px ${opt.color}50, 0 0 40px ${opt.color}25`
                    : "0 0 0px transparent",
                }}
                className={`rounded-xl border-2 px-4 py-4 text-left transition-all duration-300 ${
                  isSelected
                    ? ""
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: opt.color,
                        backgroundColor: `${opt.color}12`,
                      }
                    : {}
                }
              >
                <Icon
                  size={24}
                  className="mb-2"
                  style={{ color: isSelected ? opt.color : "#6b7280" }}
                />
                <div
                  className={`text-sm font-semibold ${isSelected ? "" : "text-gray-300"}`}
                  style={isSelected ? { color: opt.color } : {}}
                >
                  {opt.label}
                </div>
                <div className="mt-0.5 text-xs text-gray-500">
                  {opt.description}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Special Instructions */}
      <div>
        <GlowTextarea
          label="Special Instructions"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="Allergies, behavior notes, important reminders, schedule changes..."
          glowColor="#e94560"
          rows={3}
        />
      </div>

      {/* Emergency Procedures Toggle */}
      <div>
        <motion.button
          onClick={() => setEmergencyProcedures(!emergencyProcedures)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`flex w-full items-center justify-between rounded-xl border-2 px-5 py-4 transition-all duration-300 ${
            emergencyProcedures
              ? "border-[#e94560] bg-[#e94560]/10"
              : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle
              size={20}
              className={
                emergencyProcedures ? "text-[#e94560]" : "text-gray-500"
              }
            />
            <div className="text-left">
              <div
                className={`text-sm font-semibold ${emergencyProcedures ? "text-[#e94560]" : "text-gray-300"}`}
              >
                Include Emergency Procedures
              </div>
              <div className="text-xs text-gray-500">
                Fire drill, lockdown, and evacuation info
              </div>
            </div>
          </div>

          {/* Toggle switch */}
          <div
            className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
              emergencyProcedures ? "bg-[#e94560]" : "bg-white/10"
            }`}
          >
            <motion.div
              className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md"
              animate={{ x: emergencyProcedures ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </div>
        </motion.button>
      </div>

      {/* Tone Selector */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <Star size={18} className="text-[#7b2ff7]" />
          Sub Plan Tone
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TONE_OPTIONS.map((opt) => {
            const isSelected = tone === opt.value;
            return (
              <motion.button
                key={opt.value}
                onClick={() => setTone(opt.value)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: isSelected
                    ? "0 0 20px #7b2ff760, 0 0 40px #7b2ff730"
                    : "0 0 0px transparent",
                }}
                className={`rounded-xl border-2 px-4 py-4 text-center transition-all duration-300 ${
                  isSelected
                    ? "border-[#7b2ff7] bg-[#7b2ff7]/12"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="mb-1 text-2xl">{opt.emoji}</div>
                <div
                  className={`text-sm font-semibold ${isSelected ? "text-[#7b2ff7]" : "text-gray-300"}`}
                >
                  {opt.label}
                </div>
                <div className="mt-0.5 text-xs text-gray-500">
                  {opt.description}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  // ── STEP 4: REVIEW & GENERATE ──────────────────────────────────────────

  const renderStep4 = () => {
    const selectedSubjectsConfig = subjects.map((name) =>
      SUBJECTS.find((s) => s.name === name)
    );
    const difficultyConfig = DIFFICULTY_OPTIONS.find(
      (d) => d.value === difficulty
    );
    const toneConfig = TONE_OPTIONS.find((t) => t.value === tone);

    return (
      <motion.div
        key="step4"
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="space-y-6"
      >
        {/* Summary Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          {/* Header */}
          <div
            className="px-6 py-4"
            style={{
              background:
                "linear-gradient(135deg, #7b2ff710, #e9456010, #00d2a010)",
            }}
          >
            <h3 className="text-lg font-bold text-white">
              Sub Plan Summary
            </h3>
            <p className="text-sm text-gray-400">
              Review everything before generating
            </p>
          </div>

          <div className="space-y-5 p-6">
            {/* Teacher */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f5c518]/15">
                <User size={16} className="text-[#f5c518]" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500">
                  Teacher
                </div>
                <div className="text-sm font-semibold text-white">
                  {teacherName || "Not specified"}
                </div>
              </div>
            </div>

            {/* Grades */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e94560]/15">
                <GraduationCap size={16} className="text-[#e94560]" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500">
                  Grade Level(s)
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {gradeLevel.length > 0 ? (
                    gradeLevel.map((g) => (
                      <span
                        key={g}
                        className="rounded-md bg-[#e94560]/15 px-2 py-0.5 text-xs font-medium text-[#e94560]"
                      >
                        Grade {g}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      None selected
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Subjects & Lessons */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7b2ff7]/15">
                <BookOpen size={16} className="text-[#7b2ff7]" />
              </div>
              <div className="w-full min-w-0">
                <div className="text-xs font-medium text-gray-500">
                  Subjects & Lessons
                </div>
                <div className="mt-2 space-y-3">
                  {selectedSubjectsConfig.map((subj) => {
                    if (!subj) return null;
                    return (
                      <div key={subj.name}>
                        <div
                          className="flex items-center gap-1.5 text-xs font-semibold"
                          style={{ color: subj.color }}
                        >
                          <subj.icon size={12} />
                          {subj.name}
                        </div>
                        <p className="mt-0.5 text-sm leading-relaxed text-gray-400">
                          {lessonDetails[subj.name] ||
                            "No details provided"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Duration & Difficulty */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00d2a0]/15">
                  <Clock size={16} className="text-[#00d2a0]" />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500">
                    Duration
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {duration === "full" ? "Full Day" : "Half Day"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${difficultyConfig?.color || "#f5c518"}15`,
                  }}
                >
                  {difficultyConfig && (
                    <difficultyConfig.icon
                      size={16}
                      style={{
                        color: difficultyConfig.color,
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500">
                    Difficulty
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {difficultyConfig?.label}
                  </div>
                </div>
              </div>
            </div>

            {/* Tone */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7b2ff7]/15">
                <Star size={16} className="text-[#7b2ff7]" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500">
                  Tone
                </div>
                <div className="text-sm font-semibold text-white">
                  {toneConfig?.emoji} {toneConfig?.label}
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {specialInstructions && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e94560]/15">
                  <AlertTriangle
                    size={16}
                    className="text-[#e94560]"
                  />
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500">
                    Special Instructions
                  </div>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-400">
                    {specialInstructions}
                  </p>
                </div>
              </div>
            )}

            {/* Emergency */}
            {emergencyProcedures && (
              <div className="rounded-lg border border-[#e94560]/30 bg-[#e94560]/10 px-4 py-2 text-xs font-medium text-[#e94560]">
                Emergency procedures will be included
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGenerate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative w-full overflow-hidden rounded-2xl px-8 py-5 text-lg font-bold text-white"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, #7b2ff7, #e94560, #f5c518)",
                "linear-gradient(135deg, #e94560, #f5c518, #00d2a0)",
                "linear-gradient(135deg, #f5c518, #00d2a0, #7b2ff7)",
                "linear-gradient(135deg, #00d2a0, #7b2ff7, #e94560)",
                "linear-gradient(135deg, #7b2ff7, #e94560, #f5c518)",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              ],
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            style={{ width: "200%" }}
          />

          {/* Button text */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles size={22} />
            Generate Sub Plan
          </span>

          {/* Outer glow */}
          <motion.div
            className="absolute -inset-1 -z-10 rounded-2xl opacity-50 blur-lg"
            animate={{
              background: [
                "linear-gradient(135deg, #7b2ff7, #e94560)",
                "linear-gradient(135deg, #e94560, #00d2a0)",
                "linear-gradient(135deg, #00d2a0, #7b2ff7)",
                "linear-gradient(135deg, #7b2ff7, #e94560)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.button>
      </motion.div>
    );
  };

  // ── RENDER ─────────────────────────────────────────────────────────────

  const stepRenderers = [renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <div
      className="min-h-screen w-full px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
      }}
    >
      {showConfetti && <ConfettiBurst />}

      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-1 text-3xl font-black tracking-tight text-white">
            Sub Plan Builder
          </h1>
          <p className="text-sm text-gray-400">
            Create detailed substitute teacher plans in minutes
          </p>

          {/* Fill Demo Data button */}
          <motion.button
            onClick={fillDemoData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto mt-4 flex items-center gap-2 rounded-lg border border-[#f5c518]/30 bg-[#f5c518]/10 px-4 py-2 text-xs font-semibold text-[#f5c518] transition-all hover:bg-[#f5c518]/20"
          >
            <Zap size={14} />
            Fill Demo Data
          </motion.button>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={step} steps={STEPS} />

        {/* Step Content */}
        <div className="mt-14 overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            {stepRenderers[step]()}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          className="mt-8 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Back Button */}
          <div>
            {step > 0 && (
              <motion.button
                onClick={prevStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 backdrop-blur-xl transition-all hover:border-white/20 hover:text-white"
              >
                <ChevronLeft size={18} />
                Back
              </motion.button>
            )}
          </div>

          {/* Next Button (not on last step) */}
          <div>
            {step < 3 && (
              <motion.button
                onClick={nextStep}
                disabled={!canProceed()}
                whileHover={canProceed() ? { scale: 1.05, x: 3 } : {}}
                whileTap={canProceed() ? { scale: 0.95 } : {}}
                animate={{
                  boxShadow: canProceed()
                    ? "0 0 20px #7b2ff760, 0 0 40px #7b2ff730"
                    : "0 0 0px transparent",
                }}
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  canProceed()
                    ? "bg-[#7b2ff7] text-white hover:bg-[#8b3fff]"
                    : "cursor-not-allowed bg-white/5 text-gray-600"
                }`}
              >
                Next
                <ChevronRight size={18} />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
