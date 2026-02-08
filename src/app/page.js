"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TemplateGallery from "@/components/TemplateGallery";
import CurriculumWizard from "@/components/CurriculumWizard";
import SubPlanDisplay from "@/components/SubPlanDisplay";
import GeneratingLoader from "@/components/GeneratingLoader";
import ParticleField from "@/components/ParticleField";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import ScrollProgress from "@/components/ScrollProgress";
import KonamiCode from "@/components/KonamiCode";
// Plan generation is now handled by /api/generate-plan (OpenAI)

// ---------------------------------------------------------------------------
// Page transition variants
// ---------------------------------------------------------------------------
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
};

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function Home() {
  const [view, setView] = useState("landing"); // 'landing' | 'wizard' | 'result'
  const [plan, setPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  // ---- Handle generating a plan from wizard form data ----
  const handleGenerate = useCallback(async (data) => {
    setFormData(data);
    setIsGenerating(true);
    setView("result");

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to generate plan");
      const generatedPlan = await res.json();
      setPlan(generatedPlan);
    } catch (err) {
      console.error("Plan generation failed:", err);
      setView("wizard");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // ---- Handle selecting a pre-made template ----
  const handleTemplateSelect = useCallback(async (templateData) => {
    // Build lessonDetails from the template's periods array
    const lessonDetails = {};
    if (templateData.periods) {
      for (const period of templateData.periods) {
        const subj = period.subject;
        if (subj && subj !== "Break") {
          lessonDetails[subj] = lessonDetails[subj]
            ? lessonDetails[subj] + " | " + period.notes
            : period.notes;
        }
      }
    }

    // Map template tone to API tone/difficulty
    const toneLower = (templateData.tone || "friendly").toLowerCase();
    const toneMap = { fun: "fun", normal: "friendly", professional: "professional", friendly: "friendly", challenge: "friendly" };
    const difficultyMap = { fun: "simple", normal: "business", professional: "business", friendly: "business", challenge: "challenge" };

    const apiData = {
      teacherName: templateData.teacherName || "Teacher",
      gradeLevel: [templateData.gradeLevel || "K-2"],
      subjects: templateData.subjects || [],
      lessonDetails,
      difficulty: difficultyMap[toneLower] || "business",
      specialInstructions: templateData.specialNotes || "",
      emergencyProcedures: false,
      tone: toneMap[toneLower] || "friendly",
    };

    setFormData(apiData);
    setIsGenerating(true);
    setView("result");

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });
      if (!res.ok) throw new Error("Failed to generate plan");
      const generatedPlan = await res.json();
      setPlan(generatedPlan);
    } catch (err) {
      console.error("Template plan generation failed:", err);
      setView("wizard");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // ---- Regenerate with same form data ----
  const handleRegenerate = useCallback(async () => {
    if (!formData) return;
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to regenerate plan");
      const generatedPlan = await res.json();
      setPlan(generatedPlan);
    } catch (err) {
      console.error("Plan regeneration failed:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [formData]);

  // ---- Navigation handler ----
  const handleNavigate = useCallback((section) => {
    switch (section) {
      case "home":
        setView("landing");
        break;
      case "create":
        setView("wizard");
        break;
      case "templates":
        if (view !== "landing") {
          setView("landing");
          // scroll to templates after view changes
          setTimeout(() => {
            const el = document.getElementById("templates");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          const el = document.getElementById("templates");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        break;
      case "about":
        if (view !== "landing") {
          setView("landing");
          setTimeout(() => {
            const el = document.getElementById("features");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } else {
          const el = document.getElementById("features");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        break;
      default:
        break;
    }
  }, [view]);

  // Map view to nav section name
  const activeSection =
    view === "wizard" ? "create" :
    view === "result" ? "create" :
    "home";

  return (
    <main className="min-h-screen bg-[#1a1a2e] text-[#f0f0f0] overflow-x-hidden relative">
      {/* Background particles — always visible */}
      <ParticleField count={40} />

      {/* Scroll progress bar */}
      <ScrollProgress visible={view === "landing"} />

      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Easter egg */}
      <KonamiCode />

      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Hero onGetStarted={() => setView("wizard")} />

            <div id="features">
              <Features />
            </div>

            <div id="templates">
              <TemplateGallery onSelectTemplate={handleTemplateSelect} />
            </div>

            <Footer />
          </motion.div>
        )}

        {view === "wizard" && (
          <motion.div
            key="wizard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-20"
          >
            <CurriculumWizard onGenerate={handleGenerate} />
          </motion.div>
        )}

        {view === "result" && (
          <motion.div
            key="result"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="pt-20"
          >
            {plan && !isGenerating && (
              <SubPlanDisplay
                plan={plan}
                onBack={() => setView("wizard")}
                onRegenerate={handleRegenerate}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generating overlay */}
      <GeneratingLoader isVisible={isGenerating} />

      {/* Floating action button on landing page */}
      <FloatingActionButton
        visible={view === "landing"}
        onClick={() => setView("wizard")}
      />
    </main>
  );
}
