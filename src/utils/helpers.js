// ─── Class Name Utility ──────────────────────────────────────────────

/**
 * Merge class names, filtering out falsy values.
 * Usage: cn("base", isActive && "active", undefined, "extra")
 *        → "base active extra"
 *
 * @param  {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ─── Random Helpers ──────────────────────────────────────────────────

/**
 * Return a random element from an array.
 * @param {Array} array
 * @returns {*}
 */
export function randomFrom(array) {
  if (!array || array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Return a random number between min (inclusive) and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Fisher-Yates shuffle. Returns a **new** array; original is untouched.
 * @param {Array} arr
 * @returns {Array}
 */
export function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ─── Formatting ──────────────────────────────────────────────────────

/**
 * Format hours + minutes into a 12-hour time string like "8:00 AM".
 * @param {number} hours   - 0–23
 * @param {number} minutes - 0–59
 * @returns {string}
 */
export function formatTime(hours, minutes) {
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;
  const displayMinutes = String(minutes).padStart(2, "0");
  return `${displayHour}:${displayMinutes} ${period}`;
}

// ─── Grade Bands ─────────────────────────────────────────────────────

const GRADE_ORDER = [
  "K", "1", "2", "3", "4", "5",
  "6", "7", "8", "9", "10", "11", "12",
];

const GRADE_BANDS = [
  { label: "K-2", grades: ["K", "1", "2"] },
  { label: "3-5", grades: ["3", "4", "5"] },
  { label: "6-8", grades: ["6", "7", "8"] },
  { label: "9-12", grades: ["9", "10", "11", "12"] },
];

/**
 * Given an array of grade strings (e.g. ["3","4"]), return the
 * matching grade band label ("K-2", "3-5", "6-8", or "9-12").
 * Uses the lowest grade in the array to determine the band.
 *
 * @param {string[]} grades
 * @returns {string}
 */
export function getGradeBand(grades) {
  if (!grades || grades.length === 0) return "K-2";

  // Find the lowest grade by order index
  let lowestIndex = GRADE_ORDER.length;
  for (const g of grades) {
    const idx = GRADE_ORDER.indexOf(String(g));
    if (idx !== -1 && idx < lowestIndex) {
      lowestIndex = idx;
    }
  }

  const lowestGrade = GRADE_ORDER[lowestIndex] || "K";

  for (const band of GRADE_BANDS) {
    if (band.grades.includes(lowestGrade)) {
      return band.label;
    }
  }

  return "K-2";
}

// ─── Subject Colors & Icons ──────────────────────────────────────────

const SUBJECT_COLORS = {
  Math: "#3b82f6",
  Science: "#00d2a0",
  English: "#e94560",
  History: "#f5c518",
  Art: "#7b2ff7",
  Music: "#ec4899",
  PE: "#f97316",
  "World Languages": "#06b6d4",
  "Computer Science": "#8b5cf6",
};

/**
 * Return the hex colour associated with a subject.
 * Falls back to a neutral grey if the subject is unknown.
 *
 * @param {string} subject
 * @returns {string} hex colour
 */
export function getSubjectColor(subject) {
  return SUBJECT_COLORS[subject] || "#6b7280";
}

const SUBJECT_ICONS = {
  Math: "\u{1F4D0}",           // triangular ruler
  Science: "\u{1F52C}",       // microscope
  English: "\u{1F4DA}",       // books
  History: "\u{1F3DB}\uFE0F", // classical building
  Art: "\u{1F3A8}",           // artist palette
  Music: "\u{1F3B5}",         // musical note
  PE: "\u{1F3C3}",            // runner
  "World Languages": "\u{1F30D}", // globe
  "Computer Science": "\u{1F4BB}", // laptop
};

/**
 * Return an emoji icon for a given subject.
 *
 * @param {string} subject
 * @returns {string} emoji
 */
export function getSubjectIcon(subject) {
  return SUBJECT_ICONS[subject] || "\u{1F4CB}"; // clipboard fallback
}

// ─── Clipboard ───────────────────────────────────────────────────────

/**
 * Copy text to the clipboard using the modern Clipboard API.
 * Returns true on success, false on failure.
 *
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.warn("[copyToClipboard] Failed:", error);
    return false;
  }
}

// ─── Plan → Plain Text ──────────────────────────────────────────────

/**
 * Convert a plan object into human-readable plain text suitable for
 * copying or sharing.
 *
 * Expected plan shape:
 * {
 *   title, subject, grades, duration,
 *   overview, objectives, materials,
 *   activities: [{ title, duration, description }],
 *   notes
 * }
 *
 * @param {Object} plan
 * @returns {string}
 */
export function planToText(plan) {
  if (!plan) return "";

  const lines = [];

  lines.push("=".repeat(50));
  lines.push(`SUB PLAN: ${plan.title || "Untitled"}`);
  lines.push("=".repeat(50));
  lines.push("");

  if (plan.subject) lines.push(`Subject:  ${plan.subject}`);
  if (plan.grades) {
    const gradesStr = Array.isArray(plan.grades)
      ? plan.grades.join(", ")
      : plan.grades;
    lines.push(`Grades:   ${gradesStr}`);
  }
  if (plan.duration) lines.push(`Duration: ${plan.duration}`);
  lines.push("");

  if (plan.overview) {
    lines.push("--- Overview ---");
    lines.push(plan.overview);
    lines.push("");
  }

  if (plan.objectives && plan.objectives.length > 0) {
    lines.push("--- Objectives ---");
    plan.objectives.forEach((obj, i) => {
      lines.push(`  ${i + 1}. ${obj}`);
    });
    lines.push("");
  }

  if (plan.materials && plan.materials.length > 0) {
    lines.push("--- Materials ---");
    plan.materials.forEach((mat) => {
      lines.push(`  - ${mat}`);
    });
    lines.push("");
  }

  if (plan.activities && plan.activities.length > 0) {
    lines.push("--- Activities ---");
    plan.activities.forEach((activity, i) => {
      const dur = activity.duration ? ` (${activity.duration})` : "";
      lines.push(`  ${i + 1}. ${activity.title || "Activity"}${dur}`);
      if (activity.description) {
        lines.push(`     ${activity.description}`);
      }
    });
    lines.push("");
  }

  if (plan.notes) {
    lines.push("--- Notes for Substitute ---");
    lines.push(plan.notes);
    lines.push("");
  }

  lines.push("=".repeat(50));
  lines.push("Generated by Sub Plan Builder");
  lines.push("=".repeat(50));

  return lines.join("\n");
}
