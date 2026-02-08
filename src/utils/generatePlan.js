// =============================================================================
// SUB PLAN GENERATOR — Creates realistic, detailed substitute teacher plans
// from wizard form data. Pure client-side; no API calls needed.
// =============================================================================

import {
  gradeBand,
  SUBJECT_ICONS,
  WARMUPS,
  MAIN_ACTIVITIES,
  WRAPUPS,
  BRAIN_BREAKS,
  FILLERS,
  FUN_FACTS,
  MORNING_ROUTINES,
  MANAGEMENT_TIPS,
  RECESS_NOTES,
  LUNCH_NOTES,
  TRANSITIONS,
  END_OF_DAY,
  pickRandom,
  pickRandomN,
} from '@/data/activityBank';

// ---------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------

const HALF_DAY_START = { hour: 8, minute: 0 };
const HALF_DAY_END = { hour: 12, minute: 0 };
const FULL_DAY_START = { hour: 8, minute: 0 };
const FULL_DAY_END = { hour: 15, minute: 0 }; // 3:00 PM

// Period durations (minutes) by grade band
const PERIOD_DURATIONS = {
  'K-2': { short: 20, standard: 30, long: 40, transition: 5 },
  '3-5': { short: 25, standard: 35, long: 45, transition: 5 },
  '6-8': { short: 30, standard: 40, long: 50, transition: 5 },
  '9-12': { short: 35, standard: 45, long: 55, transition: 5 },
};

// Fixed schedule blocks
const FIXED_BLOCKS = {
  'K-2': {
    morningRoutine: 20,
    recess: 20,
    lunch: 30,
    afternoonRecess: 15,
    packUp: 15,
  },
  '3-5': {
    morningRoutine: 15,
    recess: 20,
    lunch: 30,
    packUp: 10,
  },
  '6-8': {
    morningRoutine: 10,
    lunch: 30,
    packUp: 5,
  },
  '9-12': {
    morningRoutine: 10,
    lunch: 35,
    packUp: 5,
  },
};

// ---------------------------------------------------------------------------
// TIME HELPERS
// ---------------------------------------------------------------------------

function formatTime(hour, minute) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const displayMinute = String(minute).padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
}

function addMinutes(hour, minute, mins) {
  const totalMinutes = hour * 60 + minute + mins;
  return {
    hour: Math.floor(totalMinutes / 60),
    minute: totalMinutes % 60,
  };
}

function timeRange(startH, startM, durationMins) {
  const end = addMinutes(startH, startM, durationMins);
  return `${formatTime(startH, startM)} - ${formatTime(end.hour, end.minute)}`;
}

// ---------------------------------------------------------------------------
// CORE GENERATOR
// ---------------------------------------------------------------------------

/**
 * Generate a complete, structured substitute teacher plan.
 *
 * @param {Object} formData — wizard data
 * @param {string}   formData.teacherName
 * @param {string[]} formData.grades         e.g. ["3","4"]
 * @param {Object}   formData.subjects       { [subjectName]: lessonNotes }
 * @param {"half"|"full"} formData.duration
 * @param {"simple"|"normal"|"challenge"} formData.difficulty
 * @param {string}   formData.specialInstructions
 * @param {boolean}  formData.includeEmergency
 * @param {"professional"|"friendly"|"fun"} formData.tone
 *
 * @returns {Object} complete sub plan
 */
export function generateSubPlan(formData) {
  const {
    teacherName = 'Teacher',
    grades = ['3'],
    subjects = {},
    duration = 'full',
    difficulty = 'normal',
    specialInstructions = '',
    includeEmergency = true,
    tone = 'friendly',
  } = formData;

  // Determine grade band from the first (or representative) grade
  const primaryGrade = grades[0] || '3';
  const band = gradeBand(primaryGrade);

  // Build the schedule
  const schedule = buildSchedule({
    subjects,
    band,
    duration,
    difficulty,
    tone,
    primaryGrade,
  });

  // Classroom notes
  const classroomNotes = buildClassroomNotes({
    band,
    tone,
    specialInstructions,
    teacherName,
  });

  // Fun facts
  const funFacts = pickRandomN(FUN_FACTS[band] || FUN_FACTS['3-5'], 6);

  // Emergency info
  const emergencyInfo = includeEmergency
    ? buildEmergencyInfo(teacherName)
    : null;

  // Today's date
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    teacherName,
    date: dateStr,
    grades,
    subjects: Object.keys(subjects),
    duration,
    tone,
    schedule,
    emergencyInfo,
    classroomNotes,
    funFacts,
  };
}

// ---------------------------------------------------------------------------
// SCHEDULE BUILDER
// ---------------------------------------------------------------------------

function buildSchedule({ subjects, band, duration, difficulty, tone, primaryGrade }) {
  const schedule = [];
  const isHalfDay = duration === 'half';
  const fixed = FIXED_BLOCKS[band];
  const periods = PERIOD_DURATIONS[band];

  let currentH = isHalfDay ? HALF_DAY_START.hour : FULL_DAY_START.hour;
  let currentM = isHalfDay ? HALF_DAY_START.minute : FULL_DAY_START.minute;
  const endH = isHalfDay ? HALF_DAY_END.hour : FULL_DAY_END.hour;
  const endM = isHalfDay ? HALF_DAY_END.minute : FULL_DAY_END.minute;
  const endTotal = endH * 60 + endM;

  function currentTotal() { return currentH * 60 + currentM; }
  function remaining() { return endTotal - currentTotal(); }
  function pastEnd() { return currentTotal() >= endTotal; }

  // Helper to push a block and advance the clock
  function pushBlock(block, durationMins) {
    if (pastEnd()) return;
    // Clamp duration so we never exceed end time
    const maxDur = remaining();
    const dur = Math.min(durationMins, maxDur);
    if (dur <= 0) return;
    const time = timeRange(currentH, currentM, dur);
    schedule.push({ ...block, time, duration: dur });
    const next = addMinutes(currentH, currentM, dur);
    currentH = next.hour;
    currentM = next.minute;
  }

  function pushTransition() {
    if (pastEnd() || remaining() < periods.transition) return;
    const transitionPhrase = pickRandom(TRANSITIONS[tone] || TRANSITIONS.friendly);
    pushBlock(
      {
        subject: 'Transition',
        activity: transitionPhrase,
        materials: [],
        notes: 'Allow students a moment to put away materials and prepare for the next activity.',
        icon: 'ArrowRight',
      },
      periods.transition
    );
  }

  function pushBrainBreak() {
    const brainBreak = pickRandom(BRAIN_BREAKS[band]);
    if (brainBreak && remaining() > 10) {
      pushBlock(
        {
          subject: 'Brain Break',
          activity: brainBreak.description,
          materials: [],
          notes: toneWrap(
            tone,
            'A brief movement break to help students refocus.',
            'Time for a quick brain break! This helps everyone reset and refocus.',
            'BRAIN BREAK TIME! Let loose, have fun, and get those wiggles out!'
          ),
          icon: 'Zap',
        },
        brainBreak.duration || 4
      );
    }
  }

  function pushSubjectBlock(subjectName) {
    const lessonNotes = subjects[subjectName] || '';
    const subjectBlock = buildSubjectBlock({
      subjectName,
      lessonNotes,
      band,
      difficulty,
      tone,
      periods,
    });
    for (const part of subjectBlock) {
      if (!pastEnd()) {
        pushBlock(part, part.duration || periods.standard);
      }
    }
  }

  function pushRecess(label = 'Recess', dur) {
    pushBlock(
      {
        subject: label,
        activity: RECESS_NOTES[band],
        materials: ['Whistle (if on duty)', 'First aid kit location knowledge'],
        notes: toneWrap(
          tone,
          'Supervise students during recess. Ensure all students return safely.',
          'Enjoy some fresh air with the kids! Make sure everyone is playing safely and kindly.',
          'Recess is the best part of the day (don\'t tell the other subjects I said that)! Keep an eye out and have fun!'
        ),
        icon: 'TreePine',
      },
      dur || fixed.recess || 20
    );
  }

  function pushLunch() {
    pushBlock(
      {
        subject: 'Lunch',
        activity: LUNCH_NOTES[band],
        materials: ['Lunch count list', 'Dismissal/pickup procedures'],
        notes: toneWrap(
          tone,
          'Follow the school\'s lunch procedures. Verify student count before and after.',
          'Lunch time! Make sure everyone has their lunch and knows where to go. This may also be your break — check with the office.',
          'Fuel up time! Make sure all the kiddos have their grub. Check if you get a break too — you\'ve earned it!'
        ),
        icon: 'UtensilsCrossed',
      },
      fixed.lunch || 30
    );
  }

  function pushPackUp() {
    const endOfDaySteps = (END_OF_DAY[band] || []).join('\n\u2022 ');
    pushBlock(
      {
        subject: 'Pack Up & Dismissal',
        activity: endOfDaySteps
          ? `\u2022 ${endOfDaySteps}`
          : 'Students pack up materials, clean desk area, and prepare for dismissal.',
        materials: ['Dismissal list (bus/car/walker)', 'Homework assignments (check teacher notes)'],
        notes: toneWrap(
          tone,
          'Ensure orderly dismissal. Leave detailed notes for the teacher about the day.',
          'Almost done! Help students pack up calmly. Leave a friendly note for the teacher about how the day went \u2014 they\'ll really appreciate it!',
          'You made it! Give yourself a pat on the back. Leave the teacher a note about the awesome day you all had!'
        ),
        icon: 'Backpack',
      },
      fixed.packUp || 10
    );
  }

  function pushReviewBlock(subjectName, dur) {
    const reviewIcon = SUBJECT_ICONS[subjectName] || SUBJECT_ICONS.default;
    const reviewActivities = {
      professional: `Review and extension period for ${subjectName}. Students revisit earlier work: those who need additional practice may redo or correct assignments, while students who have mastered the material work on an enrichment challenge. Circulate to provide individual support.`,
      friendly: `Let's circle back to ${subjectName}! Students can finish up earlier work, correct any mistakes, or tackle a bonus challenge. Walk around and check in \u2014 this is a great time for one-on-one conversations about their learning.`,
      fun: `${subjectName} Round 2! Students who want to level up can tackle the challenge version, and everyone else can polish their work until it shines. Float around and chat with students about their work!`,
    };
    pushBlock(
      {
        subject: `${subjectName} \u2014 Review & Extension`,
        activity: reviewActivities[tone] || reviewActivities.friendly,
        materials: ['Earlier work (for corrections)', 'Extension activities', 'Student notebooks'],
        notes: `This is a flexible period. Students work at their own pace on ${subjectName}. Prioritize helping students who struggled earlier.`,
        icon: reviewIcon,
      },
      dur
    );
  }

  function pushFreeChoice(dur) {
    const fillerActivities = FILLERS[band] || FILLERS['3-5'];
    const selectedFillers = pickRandomN(fillerActivities, 4);
    pushBlock(
      {
        subject: 'Free Choice / Enrichment',
        activity: toneWrap(
          tone,
          `Students may use this time productively. Options: ${selectedFillers.join('; ')}. Monitor to ensure productive use of time.`,
          `Students have earned some choice time! Options include: ${selectedFillers.join('; ')}. Float around and check in with students.`,
          `Free choice time \u2014 you earned it! Options: ${selectedFillers.join('; ')}. This is a great time to chat with students and build rapport!`
        ),
        materials: ['Various \u2014 depends on student choice'],
        notes: 'If the teacher left additional work, this is a good time to distribute it. Otherwise, productive free choice is perfectly fine.',
        icon: 'Sparkles',
      },
      dur
    );
  }

  // ===================================================================
  // BUILD THE SCHEDULE
  // ===================================================================
  const subjectNames = Object.keys(subjects);
  const subjectQueue = [...subjectNames]; // primary pass
  const packUpTime = fixed.packUp || 10;

  // Recess threshold (minutes from midnight) — only K-2 and 3-5 get recess
  const hasRecess = band === 'K-2' || band === '3-5';
  const recessThreshold = band === 'K-2' ? 9 * 60 + 45 : 10 * 60;
  const hasAfternoonRecess = band === 'K-2' && !isHalfDay && fixed.afternoonRecess;

  // Lunch threshold
  const lunchThreshold =
    band === 'K-2' ? 11 * 60 + 15 :
    band === '3-5' ? 11 * 60 + 30 :
    band === '6-8' ? 11 * 60 + 45 :
    12 * 60;

  // Track inserted fixed blocks
  let recessDone = false;
  let brainBreak1Done = false;
  let lunchDone = false;
  let afternoonRecessDone = false;
  let brainBreak2Done = false;
  let reviewBlockCount = 0;
  const MAX_REVIEW_BLOCKS = 2; // Cap review blocks to prevent repetition

  // ----- MORNING ROUTINE -----
  const morningRoutineText = pickRandom(MORNING_ROUTINES[band]) || 'Students arrive and begin morning routine.';
  pushBlock(
    {
      subject: 'Morning Routine',
      activity: morningRoutineText,
      materials: ['Attendance sheet', 'Seating chart', 'Morning work (check teacher\'s desk)'],
      notes: toneWrap(
        tone,
        'Greet each student at the door with a smile. Introduce yourself and let them know the plan for the day.',
        'Welcome each student warmly. A friendly face goes a long way! Tell them your name and that you\'re excited to spend the day with them.',
        'Give every student a big welcome! High-fives or fist bumps at the door set an awesome tone. Tell them today is going to be great!'
      ),
      icon: 'Sun',
    },
    fixed.morningRoutine
  );

  // ----- MAIN SCHEDULING LOOP -----
  // We keep a "subject pointer" and cycle through subjects, inserting
  // fixed blocks (recess, lunch, brain breaks) at the right times.
  let safetyCounter = 0;
  const MAX_ITERATIONS = 40; // prevent infinite loops

  while (!pastEnd() && safetyCounter < MAX_ITERATIONS) {
    safetyCounter++;
    const r = remaining();

    // ---- PACK-UP when little time remains ----
    if (r <= packUpTime + 3) {
      pushPackUp();
      break;
    }

    // ---- RECESS (morning, K-5 only) ----
    if (hasRecess && !recessDone && currentTotal() >= recessThreshold) {
      recessDone = true;
      pushRecess('Recess', fixed.recess || 20);
      continue;
    }

    // ---- BRAIN BREAK #1 (mid-morning, after 2+ subjects or after 10 AM) ----
    if (!brainBreak1Done && (currentTotal() >= 10 * 60) && recessDone) {
      brainBreak1Done = true;
      pushBrainBreak();
      continue;
    }
    // For bands without recess, insert brain break around 10 AM
    if (!brainBreak1Done && !hasRecess && currentTotal() >= 10 * 60) {
      brainBreak1Done = true;
      pushBrainBreak();
      continue;
    }

    // ---- LUNCH (full day only) ----
    if (!isHalfDay && !lunchDone && currentTotal() >= lunchThreshold) {
      lunchDone = true;
      pushLunch();
      // For K-5, recess right after lunch if not done yet
      if (hasRecess && !recessDone) {
        recessDone = true;
        pushRecess('Recess', fixed.recess || 20);
      }
      continue;
    }

    // ---- AFTERNOON RECESS (K-2 only) ----
    if (hasAfternoonRecess && !afternoonRecessDone && lunchDone && currentTotal() >= 13 * 60 + 15) {
      afternoonRecessDone = true;
      pushRecess('Afternoon Recess', fixed.afternoonRecess);
      continue;
    }

    // ---- BRAIN BREAK #2 (early afternoon, after lunch) ----
    if (!isHalfDay && !brainBreak2Done && lunchDone && currentTotal() >= 13 * 60) {
      brainBreak2Done = true;
      pushBrainBreak();
      continue;
    }

    // ---- SUBJECT BLOCKS ----
    if (subjectQueue.length > 0 && r > packUpTime + 15) {
      const subjectName = subjectQueue.shift();
      pushSubjectBlock(subjectName);
      if (!pastEnd() && remaining() > packUpTime + 5) {
        pushTransition();
      }
      continue;
    }

    // ---- ALL SUBJECTS TAUGHT — fill remaining time ----
    const availableForFill = r - packUpTime - 3;

    if (availableForFill <= 10) {
      pushPackUp();
      break;
    }

    // Before lunch on a full day: cycle back to subjects for review
    if (!isHalfDay && !lunchDone && availableForFill > 20) {
      if (reviewBlockCount < MAX_REVIEW_BLOCKS) {
        const reviewSubject = pickRandom(subjectNames);
        const reviewDur = Math.min(availableForFill, periods.standard);
        pushReviewBlock(reviewSubject, reviewDur);
        reviewBlockCount++;
        pushTransition();
      } else {
        // Already used max review blocks — fill with free choice until lunch
        pushFreeChoice(Math.min(availableForFill, periods.long));
      }
      continue;
    }

    // After lunch (or half day): one review block + free choice, then done
    if (availableForFill >= 50 && reviewBlockCount < MAX_REVIEW_BLOCKS) {
      const reviewSubject = pickRandom(subjectNames);
      const reviewDur = Math.min(Math.floor(availableForFill * 0.4), periods.long);
      pushReviewBlock(reviewSubject, reviewDur);
      reviewBlockCount++;
      pushTransition();

      const afterReview = remaining() - packUpTime - 3;
      if (afterReview > 10) {
        pushFreeChoice(afterReview);
      }
      continue;
    } else if (availableForFill >= 20) {
      pushFreeChoice(availableForFill);
      continue;
    } else {
      pushPackUp();
      break;
    }
  }

  // Ensure pack-up is always the last block (even if time ran out mid-subject)
  const lastBlock = schedule[schedule.length - 1];
  if (!lastBlock || !lastBlock.subject.includes('Pack Up')) {
    // Force pack-up as an annotation at the end time even if technically "past end"
    const packUpEnd = addMinutes(endH, endM, 0);
    schedule.push({
      subject: 'Pack Up & Dismissal',
      activity: 'Students pack up materials, clean desk area, and prepare for dismissal. See classroom notes for detailed end-of-day procedures.',
      materials: ['Dismissal list (bus/car/walker)', 'Homework assignments (check teacher notes)'],
      notes: toneWrap(
        tone,
        'Ensure orderly dismissal. Leave detailed notes for the teacher about the day.',
        'Almost done! Help students pack up calmly. Leave a friendly note for the teacher about how the day went.',
        'You made it! Leave the teacher a note about the awesome day you all had!'
      ),
      icon: 'Backpack',
      time: formatTime(endH, endM),
      duration: 0,
    });
  }

  return schedule;
}

// ---------------------------------------------------------------------------
// SUBJECT BLOCK BUILDER
// ---------------------------------------------------------------------------

function buildSubjectBlock({ subjectName, lessonNotes, band, difficulty, tone, periods }) {
  const parts = [];
  const icon = SUBJECT_ICONS[subjectName] || SUBJECT_ICONS.default;

  // Normalize subject name for lookup (some subjects share banks)
  const lookupName = normalizeLookupName(subjectName);

  // ----- WARM-UP -----
  const warmupBank = WARMUPS[lookupName]?.[band] || WARMUPS.Math?.[band] || [];
  const warmup = pickRandom(warmupBank);

  if (warmup) {
    const warmupNotes = lessonNotes
      ? toneWrap(
          tone,
          `Teacher notes: "${lessonNotes}". Use this warm-up to activate prior knowledge related to the lesson.`,
          `The teacher mentioned: "${lessonNotes}". This warm-up connects nicely — feel free to reference their notes!`,
          `Heads up — the teacher said: "${lessonNotes}". Use the warm-up to get kids hyped for today\'s lesson!`
        )
      : toneWrap(
          tone,
          'Use this warm-up to activate prior knowledge and prepare students for the main lesson.',
          'This warm-up gets everyone\'s brains warmed up and ready to learn!',
          'This warm-up is like stretching before a race — gotta get those brain muscles ready!'
        );

    parts.push({
      subject: `${subjectName} — Warm-Up`,
      activity: `${warmup.title}: ${warmup.description}`,
      materials: warmup.materials || [],
      notes: warmupNotes,
      icon,
      duration: warmup.duration || periods.short,
    });
  }

  // ----- MAIN ACTIVITY -----
  const mainBank = MAIN_ACTIVITIES[lookupName]?.[band] || [];
  const mainActivity = pickRandom(mainBank);

  if (mainActivity) {
    // Adjust description based on difficulty
    const difficultyNote = mainActivity.difficulty?.[difficulty]
      ? `\n\nDifficulty level (${difficulty}): ${mainActivity.difficulty[difficulty]}`
      : '';

    const activityDescription = `${mainActivity.title}: ${mainActivity.description}${difficultyNote}`;

    const mainNotes = buildMainActivityNotes({
      subjectName,
      lessonNotes,
      difficulty,
      tone,
      band,
    });

    parts.push({
      subject: `${subjectName} — Main Lesson`,
      activity: activityDescription,
      materials: mainActivity.materials || [],
      notes: mainNotes,
      icon,
      duration: mainActivity.duration || periods.long,
    });
  } else {
    // Fallback: generate a generic main activity from the lesson notes
    parts.push({
      subject: `${subjectName} — Main Lesson`,
      activity: buildGenericMainActivity(subjectName, lessonNotes, difficulty, tone, band),
      materials: buildGenericMaterials(subjectName),
      notes: buildMainActivityNotes({ subjectName, lessonNotes, difficulty, tone, band }),
      icon,
      duration: periods.long,
    });
  }

  // ----- WRAP-UP -----
  const subjectWrapups = WRAPUPS[lookupName] || [];
  const generalWrapups = WRAPUPS.general || [];
  const wrapup = pickRandom([...subjectWrapups, ...generalWrapups]);

  if (wrapup) {
    parts.push({
      subject: `${subjectName} — Wrap-Up`,
      activity: `${wrapup.title}: ${wrapup.description}`,
      materials: wrapup.materials || [],
      notes: toneWrap(
        tone,
        'Collect student work. Note any students who need additional support or did exceptional work.',
        'Collect work and give encouraging feedback. Note any students who really shined or might need extra help when the teacher returns.',
        'Collect that awesome work! Give high-fives for great effort. Jot down any superstars or anyone who might need a little extra love from the teacher.'
      ),
      icon,
      duration: wrapup.duration || 5,
    });
  }

  return parts;
}

// ---------------------------------------------------------------------------
// HELPERS: Build notes, activities, materials
// ---------------------------------------------------------------------------

function buildMainActivityNotes({ subjectName, lessonNotes, difficulty, tone, band }) {
  const difficultyTips = {
    simple: 'This lesson has been simplified. Focus on the core concept and provide extra support. It\'s okay if students don\'t finish everything — understanding is more important than completion.',
    normal: 'Follow the activity as described. Monitor student progress and offer help as needed. Most students should be able to complete this with moderate support.',
    challenge: 'This is an enriched/challenge version. Students should be pushed to think deeper. Encourage them to explain their reasoning and try extension activities if they finish early.',
  };

  const lessonRef = lessonNotes
    ? `\n\nTeacher's lesson notes: "${lessonNotes}"`
    : '';

  const earlyFinishers = pickRandomN(FILLERS[band] || FILLERS['3-5'], 2);
  const earlyFinisherNote = `\n\nIf students finish early: ${earlyFinishers.join('; ')}.`;

  return toneWrap(
    tone,
    `${difficultyTips[difficulty]}${lessonRef}${earlyFinisherNote}`,
    `${difficultyTips[difficulty]}${lessonRef}\n\nRemember: you\'re doing great! If something doesn\'t go perfectly, that\'s completely normal.${earlyFinisherNote}`,
    `${difficultyTips[difficulty]}${lessonRef}\n\nDon\'t stress if things go off-script — the best lessons sometimes take unexpected turns!${earlyFinisherNote}`
  );
}

function buildGenericMainActivity(subjectName, lessonNotes, difficulty, tone, band) {
  const difficultyDescriptions = {
    simple: 'review and practice of foundational concepts',
    normal: 'guided practice with grade-level material',
    challenge: 'independent work with extension challenges',
  };

  if (lessonNotes && lessonNotes.trim().length > 0) {
    return toneWrap(
      tone,
      `Follow the teacher's lesson plan for ${subjectName}: ${lessonNotes}. Students should work on ${difficultyDescriptions[difficulty]}. Circulate the room to monitor progress and provide assistance as needed.`,
      `The teacher left these notes for ${subjectName}: "${lessonNotes}". Based on this, guide students through ${difficultyDescriptions[difficulty]}. Walk around the room, check in with students, and offer help where needed. You\'ve got this!`,
      `Here\'s what the teacher wants for ${subjectName}: "${lessonNotes}". Today we\'re doing ${difficultyDescriptions[difficulty]}. Move around the room, chat with students about their work, and keep the energy positive!`
    );
  }

  return toneWrap(
    tone,
    `Conduct a ${subjectName} lesson focused on ${difficultyDescriptions[difficulty]}. Check the teacher\'s desk for any prepared materials or worksheets. If none are available, use the classroom textbook for the current chapter/unit.`,
    `For ${subjectName} today, let\'s do ${difficultyDescriptions[difficulty]}. Look on the teacher\'s desk for any prepared materials. If you can\'t find specific plans, the textbook for the current unit is always a great fallback!`,
    `Time for ${subjectName}! We\'re going with ${difficultyDescriptions[difficulty]} today. Check the teacher\'s desk for materials — and if nothing\'s there, the textbook will save the day!`
  );
}

function buildGenericMaterials(subjectName) {
  const baseMaterials = ['Textbook (current chapter)', 'Student notebooks', 'Pencils'];
  const subjectMaterials = {
    Math: ['Whiteboard and markers', 'Manipulatives (check math shelf)', 'Calculators (if applicable)'],
    Reading: ['Current reading book or anthology', 'Reading journals', 'Sticky notes for annotation'],
    Writing: ['Writing folders', 'Lined paper', 'Dictionaries/thesaurus'],
    Science: ['Science notebooks', 'Lab materials (check teacher prep area)', 'Safety goggles (if lab)'],
    'Social Studies': ['Atlas/maps', 'Textbook', 'Colored pencils for mapping'],
    Art: ['Drawing paper', 'Colored pencils', 'Markers', 'Paints (check art supply area)'],
    Music: ['Instruments (check music room)', 'Sheet music/song lyrics'],
    PE: ['Equipment (check PE closet)', 'Cones', 'Whistle'],
  };

  return [...baseMaterials, ...(subjectMaterials[subjectName] || [])];
}

// ---------------------------------------------------------------------------
// CLASSROOM NOTES BUILDER
// ---------------------------------------------------------------------------

function buildClassroomNotes({ band, tone, specialInstructions, teacherName }) {
  const tips = pickRandomN(MANAGEMENT_TIPS[band] || MANAGEMENT_TIPS['3-5'], 4);

  const layoutTips = {
    'K-2': 'Students sit at table groups (usually 4-6 per table). The carpet area is used for whole-group instruction and read-alouds. Check the posted seating chart near the teacher\'s desk.',
    '3-5': 'Students sit in desk clusters or rows (check the room layout). The teacher\'s desk usually has a seating chart, class list, and schedule. Small group table is typically near the back or side of the room.',
    '6-8': 'Desks may be in rows or groups depending on the teacher\'s preference. A seating chart should be on the teacher\'s desk or podium. Use it — knowing names makes everything easier.',
    '9-12': 'Check the teacher\'s desk for a seating chart and class rosters. The layout may vary by period if the teacher rearranges for different classes.',
  };

  const helperTips = {
    'K-2': 'Ask the class: "Who are the classroom helpers today?" Young students LOVE having jobs and will eagerly tell you who does what. Common jobs: line leader, door holder, paper passer, pencil sharpener, calendar helper.',
    '3-5': 'Identify 2-3 reliable students early on. Ask: "Who usually helps the teacher with things like passing out papers?" These students can be invaluable for knowing routines and procedures.',
    '6-8': 'Each period may have different dynamics. If you find a responsible student in each class, they can help with procedures you\'re unsure about. Ask: "What do you usually do first in this class?"',
    '9-12': 'Students in this age group generally know the routines well. If you\'re unsure about a procedure, it\'s okay to ask a student you trust: "Help me out — what\'s the usual protocol for ___?"',
  };

  let notes = '';

  notes += `## Classroom Layout\n${layoutTips[band]}\n\n`;
  notes += `## Student Helpers\n${helperTips[band]}\n\n`;
  notes += `## Behavior Management Tips\n`;
  tips.forEach((tip) => {
    notes += `• ${tip}\n`;
  });

  if (specialInstructions && specialInstructions.trim().length > 0) {
    notes += `\n## Special Instructions from ${teacherName}\n${specialInstructions}\n`;
  }

  notes += `\n## End-of-Day Checklist\n`;
  notes += `• Leave a note for ${teacherName} about how the day went (behavior, completed work, any issues)\n`;
  notes += `• Return any materials to their proper places\n`;
  notes += `• Make sure student work is collected and placed on the teacher's desk\n`;
  notes += `• Check that the room is reasonably tidy\n`;
  notes += `• Note any students who were absent, needed extra support, or did exceptional work\n`;

  return notes;
}

// ---------------------------------------------------------------------------
// EMERGENCY INFO BUILDER
// ---------------------------------------------------------------------------

function buildEmergencyInfo(teacherName) {
  // Clearly fake/demo data
  const firstNames = ['Sarah', 'Michael', 'Jennifer', 'David', 'Emily', 'Robert', 'Lisa', 'James'];
  const lastNames = ['Johnson', 'Williams', 'Anderson', 'Martinez', 'Thompson', 'Garcia', 'Robinson'];
  const roles = ['Principal', 'Vice Principal', 'School Nurse', 'Office Secretary', 'Counselor'];

  const contacts = roles.map((role) => ({
    role,
    name: `${pickRandom(firstNames)} ${pickRandom(lastNames)}`,
    extension: `x${Math.floor(100 + Math.random() * 900)}`,
    location: role === 'Principal' ? 'Main Office' :
              role === 'Vice Principal' ? 'Main Office' :
              role === 'School Nurse' ? 'Health Office (Room 102)' :
              role === 'Office Secretary' ? 'Front Desk' :
              'Counseling Office (Room 108)',
  }));

  const procedures = {
    fireAlarm: {
      title: 'Fire Alarm / Evacuation',
      steps: [
        'Stop all activities immediately',
        'Have students line up quickly and quietly',
        'Take the attendance clipboard (red folder near the door)',
        'Exit through the designated route posted by the door',
        'Walk — do not run — to the assembly area',
        'Take attendance at the assembly area using the class list',
        'Report any missing students to the administrator immediately',
        'Wait for the all-clear signal before returning to the building',
      ],
    },
    lockdown: {
      title: 'Lockdown',
      steps: [
        'Lock the classroom door immediately',
        'Turn off the lights',
        'Move students away from windows and doors',
        'Have students sit quietly against the interior wall',
        'Do NOT open the door for anyone until an administrator gives the all-clear',
        'Take attendance and be prepared to report',
        'Keep students calm and quiet',
        'Wait for official all-clear announcement',
      ],
    },
    medical: {
      title: 'Medical Emergency',
      steps: [
        'Stay calm — your composure helps the student stay calm',
        'Do NOT move an injured student unless they are in immediate danger',
        'Call the front office immediately (press 0 on the classroom phone)',
        'Send a reliable student with the red emergency card to the office if the phone is unavailable',
        'If trained and comfortable, provide basic first aid (band-aids and ice packs in the teacher\'s desk drawer)',
        'Stay with the student until the nurse or administrator arrives',
        'Document what happened for the incident report',
      ],
    },
    severeWeather: {
      title: 'Severe Weather / Tornado',
      steps: [
        'Move students to the designated shelter area (check posted map by the door)',
        'Students should crouch low, facing the wall, covering their heads',
        'Stay away from windows, doors, and outside walls',
        'Take attendance',
        'Wait for the all-clear announcement',
      ],
    },
  };

  return {
    contacts,
    procedures,
    importantNote: 'DEMO DATA — These contacts and procedures are examples. In a real scenario, check the emergency procedures poster near the classroom door and the school\'s emergency binder (usually in the top desk drawer or on a shelf near the door).',
  };
}

// ---------------------------------------------------------------------------
// TONE HELPER
// ---------------------------------------------------------------------------

function toneWrap(tone, professional, friendly, fun) {
  switch (tone) {
    case 'professional':
      return professional;
    case 'fun':
      return fun;
    case 'friendly':
    default:
      return friendly;
  }
}

// ---------------------------------------------------------------------------
// SUBJECT NAME NORMALIZER
// ---------------------------------------------------------------------------

function normalizeLookupName(subjectName) {
  const normalized = subjectName.trim();

  // Map common variants to our activity bank keys
  const aliases = {
    'ELA': 'Language Arts',
    'Language Arts': 'Language Arts',
    'English Language Arts': 'Language Arts',
    'English': 'English',
    'Math': 'Math',
    'Mathematics': 'Math',
    'Reading': 'Reading',
    'Writing': 'Writing',
    'Science': 'Science',
    'Social Studies': 'Social Studies',
    'History': 'History',
    'Geography': 'Geography',
    'Art': 'Art',
    'Visual Art': 'Art',
    'Visual Arts': 'Art',
    'Music': 'Music',
    'PE': 'PE',
    'Physical Education': 'PE',
    'Gym': 'PE',
    'Health': 'Health',
    'Technology': 'Technology',
    'Computer Science': 'Technology',
    'Foreign Language': 'Foreign Language',
    'Spanish': 'Foreign Language',
    'French': 'Foreign Language',
    'World Languages': 'Foreign Language',
  };

  return aliases[normalized] || normalized;
}

// ---------------------------------------------------------------------------
// SIMULATED AI DELAY
// ---------------------------------------------------------------------------

/**
 * Returns a promise that resolves after a random delay (2000-3500ms)
 * to simulate AI processing/generation time.
 */
export function simulateAIDelay() {
  const delay = 2000 + Math.random() * 1500; // 2000–3500ms
  return new Promise((resolve) => setTimeout(resolve, delay));
}
