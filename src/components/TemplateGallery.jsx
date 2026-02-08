"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  BookOpen,
  Flame,
  Sparkles,
  Beaker,
  GraduationCap,
  Palette,
  Target,
  PenTool,
  Cpu,
  Award,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Color palette
// ---------------------------------------------------------------------------
const COLORS = {
  bg: "#1a1a2e",
  bgDeep: "#16213e",
  neonPink: "#e94560",
  neonYellow: "#f5c518",
  neonGreen: "#00d2a0",
  neonPurple: "#7b2ff7",
};

// ---------------------------------------------------------------------------
// Template Data
// ---------------------------------------------------------------------------
const TEMPLATES = [
  {
    id: "elementary-fun-day",
    name: "Elementary Fun Day",
    grade: "K-2",
    subjects: ["Multi-Subject"],
    duration: "Half Day",
    tone: "Fun",
    accent: "#f5c518",
    accentGradient: "linear-gradient(135deg, #f5c518, #e94560, #00d2a0)",
    icon: Sparkles,
    popular: true,
    description:
      "A colorful half-day of hands-on activities designed to keep little learners engaged and giggling. Includes art, storytime, and movement breaks.",
    schedule: ["Morning Meeting", "Story Circle", "Art Exploration"],
    formData: {
      teacherName: "",
      schoolName: "",
      gradeLevel: "K-2",
      subjects: ["Reading", "Math", "Art", "Social Studies"],
      date: "",
      duration: "half-day",
      tone: "fun",
      specialNotes: "Students love movement breaks and interactive stories.",
      periods: [
        {
          name: "Morning Meeting & Calendar",
          time: "8:30 - 9:00",
          subject: "Social Studies",
          notes:
            "Gather students on the carpet. Do calendar routine: day of week, weather, counting days in school. Let students share one fun thing. Use the 'Good Morning' song poster on the wall.",
        },
        {
          name: "Story Circle & Phonics",
          time: "9:00 - 9:45",
          subject: "Reading",
          notes:
            "Read aloud: 'The Very Hungry Caterpillar' from the classroom library. After reading, review letter sounds for the week (posted on board). Students practice writing letters on mini whiteboards. Early finishers can draw their favorite part of the story.",
        },
        {
          name: "Math Games & Manipulatives",
          time: "9:45 - 10:30",
          subject: "Math",
          notes:
            "Counting activity: Use the base-ten blocks in the blue bin. Students work in pairs to count collections of objects (buttons, cubes) up to 50. Worksheet in the sub folder: 'Count and Color.' Play 'Number Bingo' if time remains.",
        },
        {
          name: "Art Exploration & Craft",
          time: "10:45 - 11:30",
          subject: "Art",
          notes:
            "Supplies are in the art caddy on the back counter. Students create a caterpillar collage using pre-cut circles and glue sticks. Play quiet music during work time. Display finished art on the drying rack.",
        },
      ],
    },
  },
  {
    id: "middle-math-marathon",
    name: "Middle School Math Marathon",
    grade: "6-8",
    subjects: ["Math"],
    duration: "Full Day",
    tone: "Normal",
    accent: "#3b82f6",
    accentGradient: "linear-gradient(135deg, #3b82f6, #7b2ff7)",
    icon: Target,
    popular: false,
    description:
      "A structured full-day math plan with warm-ups, practice sets, and problem-solving challenges. Keeps students focused all day.",
    schedule: ["Warm-Up Problems", "Guided Practice", "Challenge Round"],
    formData: {
      teacherName: "",
      schoolName: "",
      gradeLevel: "6-8",
      subjects: ["Math"],
      date: "",
      duration: "full-day",
      tone: "normal",
      specialNotes:
        "Calculator use allowed for periods 3 and 5 only. No phones.",
      periods: [
        {
          name: "Period 1 - Pre-Algebra Warm-Up",
          time: "8:00 - 8:50",
          subject: "Math",
          notes:
            "Warm-up problems on the board (5 review problems from Chapter 7). Students work independently for 15 min, then pair-share answers. Main lesson: Order of Operations worksheet (in sub binder, Section B). Answer key is in the red folder.",
        },
        {
          name: "Period 2 - Algebra Foundations",
          time: "9:00 - 9:50",
          subject: "Math",
          notes:
            "Bell ringer: Solve for x (3 equations on slide 1 of the USB presentation). Guided practice: Solving one-step equations. Worksheet has 20 problems — students should complete at least 15. Fast finishers work on the bonus challenge on the back.",
        },
        {
          name: "Period 3 - Geometry Exploration",
          time: "10:00 - 10:50",
          subject: "Math",
          notes:
            "Hands-on: Students measure classroom objects with protractors and rulers (supplies in drawer 3). Record measurements on the data sheet. Calculate area and perimeter for at least 5 objects. Calculators allowed this period.",
        },
        {
          name: "Period 4 - Lunch & Study Hall",
          time: "11:00 - 12:00",
          subject: "Math",
          notes:
            "Lunch from 11:00-11:30. Study hall 11:30-12:00. Students may work on incomplete assignments or read quietly. No devices.",
        },
        {
          name: "Period 5 - Data & Statistics",
          time: "12:10 - 1:00",
          subject: "Math",
          notes:
            "Students survey classmates on a topic of choice (favorite sport, food, etc). Create a bar graph and calculate mean, median, mode of their data. Graph paper in the supply closet. Present findings to table group.",
        },
        {
          name: "Period 6 - Math Challenge & Review",
          time: "1:10 - 2:00",
          subject: "Math",
          notes:
            "Team challenge: Split class into groups of 4. Each group gets a problem set (envelope on my desk). First team to complete all problems correctly wins a homework pass. Review answers as a class in the last 10 minutes.",
        },
      ],
    },
  },
  {
    id: "hs-ap-review",
    name: "High School AP Review",
    grade: "9-12",
    subjects: ["Multi-Subject"],
    duration: "Full Day",
    tone: "Professional",
    accent: "#7b2ff7",
    accentGradient: "linear-gradient(135deg, #7b2ff7, #e94560)",
    icon: GraduationCap,
    popular: true,
    description:
      "Professional-grade AP review day covering multiple subjects. Structured independent work with clear expectations and accountability.",
    schedule: ["AP Lit Essay Prep", "AP Calc Practice", "AP Gov Review"],
    formData: {
      teacherName: "",
      schoolName: "",
      gradeLevel: "9-12",
      subjects: [
        "AP Literature",
        "AP Calculus",
        "AP Government",
        "AP Biology",
      ],
      date: "",
      duration: "full-day",
      tone: "professional",
      specialNotes:
        "AP exams are in 3 weeks. Students know the drill. Maintain quiet, focused atmosphere. No early dismissals.",
      periods: [
        {
          name: "Period 1 - AP Literature: Essay Workshop",
          time: "7:45 - 8:55",
          subject: "AP Literature",
          notes:
            "Timed essay practice: Students select one of three prompts (printed, on the front table). They have 40 minutes to write a complete essay. Remaining time for peer review using the rubric in the purple folder. Collect all essays at the end of the period.",
        },
        {
          name: "Period 2 - AP Calculus AB: Integration Review",
          time: "9:05 - 10:15",
          subject: "AP Calculus",
          notes:
            "Students work through the 'Integration Techniques Review' packet (stapled sets on my desk). Covers: u-substitution, integration by parts, partial fractions. Answer key is sealed in the manila envelope — only open in the last 10 minutes for students to self-check.",
        },
        {
          name: "Period 3 - AP Government: FRQ Practice",
          time: "10:25 - 11:35",
          subject: "AP Government",
          notes:
            "Free Response Question practice. Two FRQs from the 2023 released exam (copies in sub binder). Students write responses individually — no group work. Remind them to use specific Supreme Court cases and constitutional amendments in their answers.",
        },
        {
          name: "Period 4 - Lunch",
          time: "11:35 - 12:15",
          subject: "Lunch",
          notes: "Students dismissed for lunch. Room should be locked.",
        },
        {
          name: "Period 5 - AP Biology: Lab Report Completion",
          time: "12:25 - 1:35",
          subject: "AP Biology",
          notes:
            "Students finalize lab reports on the enzyme kinetics experiment from last week. All data is in their lab notebooks. Reports must include: hypothesis, procedure summary, data table, graph, analysis, and conclusion. Due at end of period — no exceptions.",
        },
        {
          name: "Period 6 - AP Study Hall / Flex",
          time: "1:45 - 2:55",
          subject: "Study Hall",
          notes:
            "Open study period. Students choose which AP subject to review. Must be visibly working — no sleeping, no phones. Quiet conversation about coursework is acceptable. Take attendance at the start.",
        },
      ],
    },
  },
  {
    id: "science-lab-explorer",
    name: "Science Lab Explorer",
    grade: "3-5",
    subjects: ["Science"],
    duration: "Full Day",
    tone: "Fun",
    accent: "#00d2a0",
    accentGradient: "linear-gradient(135deg, #00d2a0, #3b82f6)",
    icon: Beaker,
    popular: false,
    description:
      "Hands-on science experiments and observation activities. Students explore the natural world through guided discovery and journaling.",
    schedule: ["Plant Observation", "Water Cycle Demo", "Science Journal"],
    formData: {
      teacherName: "",
      schoolName: "",
      gradeLevel: "3-5",
      subjects: ["Science", "Writing", "Math"],
      date: "",
      duration: "full-day",
      tone: "fun",
      specialNotes:
        "Lab supplies are pre-set on tables. Safety goggles required for Period 3. One student (Jamie R.) has a latex allergy — use nitrile gloves only.",
      periods: [
        {
          name: "Morning Warm-Up: Nature Journal",
          time: "8:15 - 9:00",
          subject: "Science",
          notes:
            "Students take science journals (cubby bins) and observe the classroom plants. Sketch one plant, label parts (root, stem, leaf, flower). Write 3 sentences about what they notice. Early finishers can observe the class pet (hermit crab) and draw it.",
        },
        {
          name: "Water Cycle Investigation",
          time: "9:10 - 10:00",
          subject: "Science",
          notes:
            "Demo: Boil water in electric kettle (teacher does this), hold cold plate above steam to show condensation. Students draw and label the water cycle in journals. Key vocab on anchor chart: evaporation, condensation, precipitation, collection. Complete the fill-in-the-blank worksheet (green folder).",
        },
        {
          name: "States of Matter Experiments",
          time: "10:15 - 11:05",
          subject: "Science",
          notes:
            "Lab stations (already set up on tables): Station 1 - ice melting race (insulation experiment), Station 2 - cornstarch and water (non-Newtonian fluid), Station 3 - balloon inflation with baking soda and vinegar. Groups rotate every 12 minutes. Safety goggles ON. Record observations in journal.",
        },
        {
          name: "Lunch & Recess",
          time: "11:05 - 12:00",
          subject: "Break",
          notes:
            "Walk students to cafeteria. Pick up at 11:35 for recess. Return to classroom at 12:00. Remind students to wash hands before afternoon labs.",
        },
        {
          name: "Measurement & Data: Science Math",
          time: "12:05 - 12:50",
          subject: "Math",
          notes:
            "Using morning plant observations, students measure plant heights with rulers (cm). Create a class bar graph on the board. Each student records data in their journal. Practice reading the graph: 'Which plant is tallest? What is the difference between...?' Worksheet: 'Measure It!' in the yellow folder.",
        },
        {
          name: "Science Writing & Share-Out",
          time: "1:00 - 1:45",
          subject: "Writing",
          notes:
            "Students write a 'Science Report' about their favorite experiment today. Must include: What we did, What happened, Why I think it happened. Share-out: 5-6 volunteers read their reports aloud. Celebrate with a class cheer!",
        },
      ],
    },
  },
  {
    id: "reading-writing-workshop",
    name: "Reading & Writing Workshop",
    grade: "3-5",
    subjects: ["English"],
    duration: "Half Day",
    tone: "Friendly",
    accent: "#f87171",
    accentGradient: "linear-gradient(135deg, #f87171, #f5c518)",
    icon: PenTool,
    popular: false,
    description:
      "A cozy literacy-focused half-day with independent reading, creative writing prompts, and partner discussions. Perfect for calm, productive mornings.",
    schedule: ["Silent Reading", "Writing Prompt", "Partner Share"],
    formData: {
      teacherName: "",
      schoolName: "",
      gradeLevel: "3-5",
      subjects: ["Reading", "Writing", "Vocabulary"],
      date: "",
      duration: "half-day",
      tone: "friendly",
      specialNotes:
        "Classroom library is organized by level (colored stickers). Students know their reading levels. One student (Alex T.) uses an audiobook accommodation — headphones in desk.",
      periods: [
        {
          name: "Independent Reading & Reading Log",
          time: "8:30 - 9:15",
          subject: "Reading",
          notes:
            "Students select a 'just right' book from the classroom library. Read silently for 30 minutes. Then complete reading log entry: title, pages read, one-sentence summary, and a 'wondering' question. Soft instrumental music is encouraged (playlist on the class iPad, password: read123).",
        },
        {
          name: "Vocabulary Builder",
          time: "9:20 - 9:50",
          subject: "Vocabulary",
          notes:
            "Word Wall activity: 10 vocabulary words are posted on the Word Wall with definitions. Students copy words into vocabulary notebooks and write one original sentence for each word. Challenge: Use 3 words in one creative sentence. Review as a class by calling on volunteers to share favorite sentences.",
        },
        {
          name: "Creative Writing Workshop",
          time: "10:00 - 10:45",
          subject: "Writing",
          notes:
            "Writing prompt (write on board): 'You wake up and discover you can talk to animals. What happens on your first day?' Students brainstorm for 5 min (bubble map), then write for 25 min. Encourage descriptive language and dialogue. Remind about paragraph structure. No erasing — cross out and keep going!",
        },
        {
          name: "Partner Share & Reflection",
          time: "10:50 - 11:30",
          subject: "Reading",
          notes:
            "Students pair up (partner chart is on the bulletin board). Each student reads their story aloud to their partner. Partners give 'Two Stars and a Wish' feedback (two things they liked, one suggestion). Students revise one paragraph based on feedback. Collect all writing in the 'Turn In' basket.",
        },
      ],
    },
  },
  {
    id: "stem-challenge-day",
    name: "STEM Challenge Day",
    grade: "6-8",
    subjects: ["Science", "Math"],
    duration: "Full Day",
    tone: "Challenge",
    accent: "#14b8a6",
    accentGradient: "linear-gradient(135deg, #14b8a6, #00d2a0, #3b82f6)",
    icon: Cpu,
    popular: true,
    description:
      "An exciting day of engineering challenges and mathematical problem-solving. Teams compete, build, test, and iterate on real-world design problems.",
    schedule: ["Bridge Building", "Catapult Design", "Data Analysis"],
    formData: {
      teacherName: "",
      schoolName: "",
      gradeLevel: "6-8",
      subjects: ["Science", "Math", "Engineering"],
      date: "",
      duration: "full-day",
      tone: "challenge",
      specialNotes:
        "All STEM supplies are in the labeled bins on the back shelf. Groups are pre-assigned (list on clipboard at my desk). Students may get competitive — remind them about respectful collaboration.",
      periods: [
        {
          name: "Period 1 - Bridge Building Challenge",
          time: "8:00 - 9:15",
          subject: "Engineering",
          notes:
            "Challenge: Build a bridge using only popsicle sticks and hot glue that can hold the most weight. Materials per team: 50 popsicle sticks, 1 glue gun (adult use only for hot glue — sub handles this). Design phase: 15 min. Build phase: 35 min. Test phase: 15 min. Record max weight held on the class data sheet.",
        },
        {
          name: "Period 2 - Catapult Design & Launch",
          time: "9:25 - 10:40",
          subject: "Science",
          notes:
            "Teams build catapults from kits (rubber bands, plastic spoons, cardboard, tape). Goal: Launch a marshmallow the farthest distance. Each team gets 3 official launches. Measure distance in meters using measuring tape. Record all data. Discuss: What variables affect distance? (angle, tension, projectile weight).",
        },
        {
          name: "Period 3 - Math of Engineering",
          time: "10:50 - 11:45",
          subject: "Math",
          notes:
            "Using data from Periods 1-2, students calculate: mean bridge strength per class, median catapult distance, create scatter plots of catapult angle vs. distance. Graphing paper and rulers in the supply bin. Each team presents one finding to the class.",
        },
        {
          name: "Lunch",
          time: "11:45 - 12:30",
          subject: "Break",
          notes: "Lunch break. Clean up all lab materials before leaving.",
        },
        {
          name: "Period 4 - Egg Drop Engineering",
          time: "12:35 - 1:50",
          subject: "Engineering",
          notes:
            "Classic egg drop challenge! Materials per team: 10 straws, 1 sheet of newspaper, 30cm of tape, 1 plastic bag, cotton balls. Design a container to protect a raw egg from a 2-meter drop. Design: 15 min. Build: 30 min. Test: drop from the top of a step ladder in the hallway. Record results: survived or cracked.",
        },
        {
          name: "Period 5 - Reflection & Awards",
          time: "2:00 - 2:45",
          subject: "Science",
          notes:
            "Teams complete the STEM Reflection worksheet: What worked? What would you change? What did you learn about engineering design? Award ceremony: 'Strongest Bridge,' 'Farthest Launch,' 'Best Egg Protector,' and 'Best Team Spirit.' Certificates in the folder on my desk.",
        },
      ],
    },
  },
  {
    id: "creative-arts-day",
    name: "Creative Arts Day",
    grade: "K-2",
    subjects: ["Art", "Music"],
    duration: "Full Day",
    tone: "Fun",
    accent: "#eab308",
    accentGradient: "linear-gradient(135deg, #eab308, #f97316, #e94560)",
    icon: Palette,
    popular: false,
    description:
      "A full day of creative exploration through drawing, painting, music, and dramatic play. Perfect for keeping young students joyful and engaged.",
    schedule: ["Drawing Time", "Music & Movement", "Puppet Show"],
    formData: {
      teacherName: "",
      schoolName: "",
      gradeLevel: "K-2",
      subjects: ["Art", "Music", "Drama", "Reading"],
      date: "",
      duration: "full-day",
      tone: "fun",
      specialNotes:
        "Smocks are in the coat closet for painting activities. Paper towels and water cups pre-set. One student (Mia L.) is sensitive to loud noises — give her noise-canceling headphones during music (in her desk).",
      periods: [
        {
          name: "Morning Art: Self-Portrait Drawing",
          time: "8:30 - 9:15",
          subject: "Art",
          notes:
            "Give each student a mirror (hand mirrors in the art bin) and drawing paper. Model how to draw a self-portrait: start with face shape, add eyes, nose, mouth, hair. Use crayons and colored pencils. Walk around and encourage — 'I love how you drew your curly hair!' Display on the art wall.",
        },
        {
          name: "Music & Movement",
          time: "9:20 - 10:00",
          subject: "Music",
          notes:
            "Use the class iPad to play 'GoNoodle' videos (bookmarked in Safari). Start with 'Banana Banana Meatball' for warm-up. Then: freeze dance game — play music, students dance, pause music, students freeze. End with the 'Shake Your Sillies Out' song. Keep energy HIGH but controlled.",
        },
        {
          name: "Painting Exploration",
          time: "10:15 - 11:00",
          subject: "Art",
          notes:
            "Watercolor painting! Smocks ON. Topic: 'Paint Your Happy Place.' Show 3 example paintings (posted on the easel). Demonstrate watercolor technique: wet brush, dip in paint, gentle strokes. Students paint freely. Play calm music. Clean-up routine: rinse brushes, pour out water, hang paintings on drying line.",
        },
        {
          name: "Lunch & Recess",
          time: "11:00 - 12:00",
          subject: "Break",
          notes:
            "Walk to cafeteria. Pick up for recess at 11:30. Return at 12:00.",
        },
        {
          name: "Story & Puppet Making",
          time: "12:05 - 12:50",
          subject: "Reading",
          notes:
            "Read aloud: 'The Three Billy Goats Gruff.' After reading, students make paper bag puppets of the characters (troll, 3 goats). Supplies: brown paper bags, googly eyes, construction paper, glue, markers. Show a finished example. Help students write character names on their puppets.",
        },
        {
          name: "Puppet Show & Dance Party",
          time: "1:00 - 1:45",
          subject: "Drama",
          notes:
            "Groups of 4 perform 'The Three Billy Goats Gruff' with their puppets using the reading corner as a stage. Each group gets 3-4 minutes. Audience gives snaps (quiet applause). End the day with a 5-minute dance party — play 'Happy' by Pharrell. High-fives at the door during dismissal!",
        },
      ],
    },
  },
  {
    id: "test-prep-power-day",
    name: "Test Prep Power Day",
    grade: "9-12",
    subjects: ["Multi-Subject"],
    duration: "Full Day",
    tone: "Professional",
    accent: "#e94560",
    accentGradient: "linear-gradient(135deg, #e94560, #dc2626)",
    icon: Award,
    popular: false,
    description:
      "Focused, no-nonsense test preparation across core subjects. Practice exams, timed sections, and strategic review. Built for results.",
    schedule: ["ELA Practice Test", "Math Section", "Science Review"],
    formData: {
      teacherName: "",
      schoolName: "",
      gradeLevel: "9-12",
      subjects: ["English", "Math", "Science", "Social Studies"],
      date: "",
      duration: "full-day",
      tone: "professional",
      specialNotes:
        "State testing is next week. Maintain test-like conditions: no talking during practice sections, desks separated, no phones visible. Provide scratch paper. Students with accommodations have extended time (list on clipboard).",
      periods: [
        {
          name: "Period 1 - ELA: Reading Comprehension Practice",
          time: "7:45 - 8:55",
          subject: "English",
          notes:
            "Distribute Practice Test Booklet A (on my desk, pre-counted). Students complete the Reading Comprehension section (Passages 1-3 with multiple choice and short answer). Strict timing: 60 minutes. No talking. When finished, students review answers silently. Collect all booklets at the bell.",
        },
        {
          name: "Period 2 - Math: Problem-Solving Section",
          time: "9:05 - 10:15",
          subject: "Math",
          notes:
            "Practice Test Booklet B: Math section. Covers algebra, geometry, and data analysis. 40 multiple choice + 5 open response. Calculators allowed for Part 2 only (problems 21-45). Timing: 65 minutes. Reference sheets are stapled to the back of the booklet. Collect all materials.",
        },
        {
          name: "Period 3 - Science: Lab-Based Questions",
          time: "10:25 - 11:35",
          subject: "Science",
          notes:
            "Practice Test Booklet C: Science section. Stimulus-based questions using data tables, graphs, and experimental scenarios. Students interpret data and answer questions. No outside resources. Timing: 55 minutes. Remaining time: students may review any section.",
        },
        {
          name: "Lunch",
          time: "11:35 - 12:15",
          subject: "Break",
          notes:
            "Lunch break. Encourage students to rest their minds — no studying during lunch.",
        },
        {
          name: "Period 5 - Social Studies: Document Analysis",
          time: "12:25 - 1:35",
          subject: "Social Studies",
          notes:
            "Practice Test Booklet D: Social Studies section. Primary source analysis, map reading, and civic literacy questions. Timing: 55 minutes. Students should annotate documents before answering questions. Collect all booklets.",
        },
        {
          name: "Period 6 - Review & Strategy Session",
          time: "1:45 - 2:55",
          subject: "Multi-Subject",
          notes:
            "Answer keys distributed (one per student). Students self-score each section using the scoring guide. Identify their 3 weakest areas. Write a 'Test Strategy Plan' on the provided template: areas to review, study methods, confidence level. Collect strategy plans. Encourage students — they've got this!",
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Filter options
// ---------------------------------------------------------------------------
const GRADE_FILTERS = ["All", "K-2", "3-5", "6-8", "9-12"];
const SUBJECT_FILTERS = ["All", "Math", "Science", "English", "Multi-Subject"];

// ---------------------------------------------------------------------------
// Badge component
// ---------------------------------------------------------------------------
function Badge({ children, color, small = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${
        small ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs"
      }`}
      style={{
        color: color,
        borderColor: `${color}44`,
        backgroundColor: `${color}18`,
      }}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Filter Pill
// ---------------------------------------------------------------------------
function FilterPill({ label, isActive, onClick, color }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      style={{
        color: isActive ? "#fff" : "#9ca3af",
        backgroundColor: isActive ? `${color}30` : "transparent",
        border: `1px solid ${isActive ? `${color}88` : "#ffffff15"}`,
      }}
      whileHover={{
        backgroundColor: isActive ? `${color}30` : "#ffffff10",
        scale: 1.03,
      }}
      whileTap={{ scale: 0.97 }}
      layout
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `${color}20`,
            boxShadow: `0 0 12px ${color}33`,
          }}
          layoutId={`pill-glow-${color}`}
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Schedule pill (tiny)
// ---------------------------------------------------------------------------
function SchedulePill({ text, accent }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[10px] font-medium truncate max-w-[140px]"
      style={{
        color: accent,
        backgroundColor: `${accent}15`,
        border: `1px solid ${accent}30`,
      }}
    >
      {text}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Template Card
// ---------------------------------------------------------------------------
function TemplateCard({ template, index, onSelect }) {
  const Icon = template.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 22,
      }}
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: -1.5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: "#1e2140",
        border: "1px solid #ffffff10",
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      onClick={() => onSelect(template.formData)}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 30px ${template.accent}25, 0 8px 40px ${template.accent}15, inset 0 0 30px ${template.accent}08`,
        }}
      />

      {/* Color-coded top border */}
      <div
        className="h-1.5 w-full flex-shrink-0"
        style={{ background: template.accentGradient }}
      />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `${template.accent}20`,
                border: `1px solid ${template.accent}35`,
              }}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: template.accent }}
              />
            </div>
            <h3
              className="text-base font-bold text-white leading-tight truncate"
              title={template.name}
            >
              {template.name}
            </h3>
          </div>

          {template.popular && (
            <motion.div
              className="flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                background:
                  "linear-gradient(135deg, #f97316, #e94560)",
                color: "#fff",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: index * 0.08 + 0.3,
                type: "spring",
                stiffness: 500,
              }}
            >
              <Flame className="w-3 h-3" />
              Popular
            </motion.div>
          )}
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge color={template.accent}>{template.grade}</Badge>
          {template.subjects.map((s) => (
            <Badge key={s} color="#9ca3af" small>
              {s}
            </Badge>
          ))}
          <Badge
            color={template.duration === "Full Day" ? "#3b82f6" : "#f5c518"}
            small
          >
            <Clock className="w-2.5 h-2.5 mr-1" />
            {template.duration}
          </Badge>
          <Badge color="#7b2ff7" small>
            {template.tone}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Schedule preview */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-medium">
            Schedule Preview
          </p>
          <div className="flex flex-wrap gap-1.5">
            {template.schedule.map((item) => (
              <SchedulePill
                key={item}
                text={item}
                accent={template.accent}
              />
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Use Template button */}
        <motion.button
          className="w-full py-2.5 rounded-xl text-sm font-bold tracking-wide cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          style={{
            color: "#fff",
            background: `linear-gradient(135deg, ${template.accent}cc, ${template.accent}88)`,
            border: `1px solid ${template.accent}55`,
          }}
          whileHover={{
            boxShadow: `0 0 20px ${template.accent}40`,
            background: `linear-gradient(135deg, ${template.accent}, ${template.accent}aa)`,
          }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template.formData);
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            Use Template
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function TemplateGallery({ onSelectTemplate }) {
  const [gradeFilter, setGradeFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const filteredTemplates = TEMPLATES.filter((t) => {
    const gradeMatch = gradeFilter === "All" || t.grade === gradeFilter;
    const subjectMatch =
      subjectFilter === "All" ||
      t.subjects.some(
        (s) =>
          s.toLowerCase().includes(subjectFilter.toLowerCase()) ||
          subjectFilter.toLowerCase().includes(s.toLowerCase())
      );
    return gradeMatch && subjectMatch;
  });

  const handleSelect = useCallback(
    (formData) => {
      if (onSelectTemplate) {
        onSelectTemplate({ ...formData });
      }
    },
    [onSelectTemplate]
  );

  return (
    <section
      className="relative py-20 md:py-28 px-4 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDeep} 0%, ${COLORS.bg} 40%, ${COLORS.bgDeep} 100%)`,
      }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative neon lines */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #e94560, #f5c518, #00d2a0, transparent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "70%", opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ---- Section Header ---- */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4"
            style={{
              textShadow: `0 0 20px ${COLORS.neonPink}40, 0 0 60px ${COLORS.neonPink}15`,
            }}
          >
            Ready-Made{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.neonPink}, ${COLORS.neonYellow}, ${COLORS.neonGreen})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Templates
            </span>
          </motion.h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            Start from a template and customize, or use as-is
          </p>
        </motion.div>

        {/* ---- Filter Bar ---- */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Grade Level Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold min-w-[90px]">
              Grade Level
            </span>
            <div className="flex flex-wrap gap-2">
              {GRADE_FILTERS.map((g) => (
                <FilterPill
                  key={g}
                  label={g}
                  isActive={gradeFilter === g}
                  onClick={() => setGradeFilter(g)}
                  color={COLORS.neonPink}
                />
              ))}
            </div>
          </div>

          {/* Subject Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold min-w-[90px]">
              Subject
            </span>
            <div className="flex flex-wrap gap-2">
              {SUBJECT_FILTERS.map((s) => (
                <FilterPill
                  key={s}
                  label={s}
                  isActive={subjectFilter === s}
                  onClick={() => setSubjectFilter(s)}
                  color={COLORS.neonGreen}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---- Template Cards Grid ---- */}
        <AnimatePresence mode="popLayout">
          {filteredTemplates.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredTemplates.map((template, idx) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    index={idx}
                    onSelect={handleSelect}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: `${COLORS.neonPurple}15`,
                  border: `1px solid ${COLORS.neonPurple}30`,
                }}
              >
                <BookOpen
                  className="w-8 h-8"
                  style={{ color: COLORS.neonPurple }}
                />
              </div>
              <p className="text-gray-400 text-lg font-medium mb-2">
                No templates match your filters
              </p>
              <p className="text-gray-500 text-sm mb-5">
                Try adjusting your grade level or subject selection
              </p>
              <motion.button
                className="px-6 py-2 rounded-xl text-sm font-medium cursor-pointer"
                style={{
                  color: COLORS.neonGreen,
                  border: `1px solid ${COLORS.neonGreen}44`,
                  background: `${COLORS.neonGreen}10`,
                }}
                whileHover={{
                  background: `${COLORS.neonGreen}20`,
                  scale: 1.03,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setGradeFilter("All");
                  setSubjectFilter("All");
                }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Bottom count ---- */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Showing {filteredTemplates.length} of {TEMPLATES.length} templates
        </motion.p>
      </div>

      {/* Decorative bottom neon line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00d2a0, #f5c518, #e94560, transparent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "60%", opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />
    </section>
  );
}
