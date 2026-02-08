// =============================================================================
// ACTIVITY BANK — Extensive curriculum-aligned activities, materials, fun facts,
// brain breaks, and filler activities organized by subject & grade band.
// =============================================================================

// ---------------------------------------------------------------------------
// GRADE BAND HELPERS
// ---------------------------------------------------------------------------
export const GRADE_BANDS = {
  'K-2': ['K', '1', '2'],
  '3-5': ['3', '4', '5'],
  '6-8': ['6', '7', '8'],
  '9-12': ['9', '10', '11', '12'],
};

export function gradeBand(grade) {
  const g = String(grade).trim();
  for (const [band, grades] of Object.entries(GRADE_BANDS)) {
    if (grades.includes(g)) return band;
  }
  return '3-5'; // sensible default
}

// ---------------------------------------------------------------------------
// SUBJECT ICONS  (lucide-react icon names)
// ---------------------------------------------------------------------------
export const SUBJECT_ICONS = {
  Math: 'Calculator',
  Reading: 'BookOpen',
  Writing: 'PenTool',
  Science: 'FlaskConical',
  'Social Studies': 'Globe',
  Art: 'Palette',
  Music: 'Music',
  PE: 'Dumbbell',
  'Language Arts': 'BookOpen',
  English: 'BookOpen',
  History: 'Landmark',
  Geography: 'Map',
  'Foreign Language': 'Languages',
  Technology: 'Monitor',
  Health: 'Heart',
  default: 'ClipboardList',
};

// ---------------------------------------------------------------------------
// WARM-UP ACTIVITIES
// ---------------------------------------------------------------------------
export const WARMUPS = {
  Math: {
    'K-2': [
      {
        title: 'Number of the Day',
        description: 'Write today\'s date number on the board. Students draw that many objects, write the number word, show it with tally marks, find it on a number line, and write one addition fact that equals it.',
        materials: ['Whiteboard', 'Math journals', 'Number line poster'],
        duration: 10,
      },
      {
        title: 'Pattern Detectives',
        description: 'Display a simple AB, ABB, or ABC pattern using shapes or colors on the board. Students identify the pattern rule, then create their own pattern using manipulatives at their desks. Have 2-3 students share their pattern with the class.',
        materials: ['Pattern blocks', 'Colored tiles', 'Whiteboard'],
        duration: 10,
      },
      {
        title: 'Count-Around Circle',
        description: 'Students stand in a circle and count by 1s, 2s, 5s, or 10s. Each student says the next number. If someone hesitates, they sit down (gently — no pressure). Last few standing get a sticker.',
        materials: ['Stickers (optional)'],
        duration: 8,
      },
      {
        title: 'Shape Scavenger Hunt',
        description: 'Give students 3 minutes to find and sketch 5 different shapes they can see in the classroom. Then share: "I found a rectangle — the door!" Builds geometry vocabulary naturally.',
        materials: ['Paper', 'Pencils'],
        duration: 10,
      },
      {
        title: 'Math Stretch',
        description: 'Combine movement with math: "Touch your toes 3+2 times!" "Do 10-4 jumping jacks!" Great for kinesthetic learners and getting wiggles out before focused math work.',
        materials: ['Open space'],
        duration: 8,
      },
    ],
    '3-5': [
      {
        title: 'Mystery Number',
        description: 'Write 3-4 clues on the board: "I am a 3-digit number. My hundreds digit is 5. My tens digit is the product of 2×3. My ones digit is the difference of 9-2." Students solve individually, then compare with a partner.',
        materials: ['Whiteboard', 'Math notebooks'],
        duration: 10,
      },
      {
        title: 'Multiplication Sprint',
        description: 'Give students a half-sheet with 20 multiplication facts. Set a timer for 2 minutes. Students try to beat their own personal best from last time (write previous score at the top). Focus is on growth, not competition.',
        materials: ['Printed fact sheets', 'Timer', 'Pencils'],
        duration: 8,
      },
      {
        title: 'Problem of the Day',
        description: 'Display a multi-step word problem. Students solve it using the CUBES strategy (Circle numbers, Underline question, Box key words, Evaluate steps, Solve and check). Discuss strategies as a class.',
        materials: ['Whiteboard or projector', 'Math notebooks'],
        duration: 12,
      },
      {
        title: 'Estimation Station',
        description: 'Show a jar of objects (or image on screen). Students estimate the quantity and write their estimate on a sticky note. Reveal the answer. Closest estimates earn a class point. Discuss estimation strategies.',
        materials: ['Estimation jar or image', 'Sticky notes'],
        duration: 10,
      },
      {
        title: 'Math Talk: Would You Rather',
        description: '"Would you rather have 1/2 of a large pizza or 3/4 of a small pizza?" Students discuss in pairs, then defend their answer using math reasoning. Great for fractions, money, or measurement concepts.',
        materials: ['Whiteboard', 'Discussion prompts'],
        duration: 10,
      },
    ],
    '6-8': [
      {
        title: 'Equation of the Day',
        description: 'Write a multi-step equation on the board (e.g., 3x + 7 = 22). Students solve independently in their notebooks, showing all steps. First five correct solutions get to check the next student\'s work.',
        materials: ['Whiteboard', 'Notebooks'],
        duration: 10,
      },
      {
        title: 'Error Analysis',
        description: 'Display a worked-out problem with a deliberate mistake. Students must find the error, explain why it\'s wrong, and correct it. Great for developing mathematical reasoning and attention to detail.',
        materials: ['Projector or whiteboard', 'Notebooks'],
        duration: 10,
      },
      {
        title: 'Number Puzzle',
        description: 'Present a KenKen or Sudoku-style puzzle appropriate to current skill level. Students work in pairs for 5 minutes, then share strategies. Builds logical reasoning skills.',
        materials: ['Printed puzzles', 'Pencils'],
        duration: 12,
      },
      {
        title: 'Real-World Math',
        description: 'Show a real scenario: a receipt, a sports statistic, a floor plan. Ask 2-3 questions about it that connect to current unit. Students discuss in table groups before whole-class share.',
        materials: ['Projected image', 'Notebooks'],
        duration: 10,
      },
    ],
    '9-12': [
      {
        title: 'Concept Check',
        description: 'Project 3-4 quick problems from the previous lesson. Students solve on mini whiteboards and hold up answers simultaneously. Immediate formative assessment without grades — low stakes.',
        materials: ['Mini whiteboards', 'Markers', 'Erasers'],
        duration: 10,
      },
      {
        title: 'Mathematical Modeling Prompt',
        description: 'Present a real-world scenario (gas prices over time, population growth, projectile motion). Students sketch a rough graph predicting the relationship. Discuss: linear? Exponential? Quadratic?',
        materials: ['Graph paper', 'Projector'],
        duration: 12,
      },
      {
        title: 'Vocabulary Review',
        description: 'Display 5 key math terms from the current unit. Students write definitions in their own words and sketch a visual representation for each. Share with an elbow partner.',
        materials: ['Notebooks', 'Vocabulary list'],
        duration: 10,
      },
    ],
  },

  Reading: {
    'K-2': [
      {
        title: 'Letter Sound Warm-Up',
        description: 'Flash letter cards. Students say the letter name AND sound. Mix in sight words. For advanced readers, flash simple CVC words for blending practice. Use the "popcorn" method — pop up when you know it!',
        materials: ['Letter/sight word flash cards'],
        duration: 8,
      },
      {
        title: 'Read Aloud & Predict',
        description: 'Read the first 2-3 pages of a picture book. Stop and ask: "What do you think will happen next? Turn and tell your neighbor." Continue reading to confirm or revise predictions.',
        materials: ['Selected picture book from classroom library'],
        duration: 12,
      },
      {
        title: 'Phonics Chant',
        description: 'Lead the class in a phonics chant for the current letter/sound being studied (check the phonics wall for current focus). Clap syllables in 5 vocabulary words.',
        materials: ['Phonics wall reference', 'Vocabulary cards'],
        duration: 8,
      },
      {
        title: 'Story Retell with Puppets',
        description: 'After reading a short story, students use finger puppets or stuffed animals to retell the beginning, middle, and end to a partner. Builds comprehension and sequencing skills.',
        materials: ['Finger puppets or stuffed animals', 'Recently read book'],
        duration: 10,
      },
    ],
    '3-5': [
      {
        title: 'Silent Read & Respond',
        description: 'Students read independently for 8 minutes from their current book (check book bins or reading logs for current selections). Then write a 3-sentence response: summary, connection, and prediction.',
        materials: ['Student books', 'Reading response journals'],
        duration: 15,
      },
      {
        title: 'Vocabulary in Context',
        description: 'Write 4 vocabulary words on the board with sentences from the current text. Students use context clues to predict meanings, then verify with a dictionary. Discuss strategies used.',
        materials: ['Whiteboard', 'Dictionaries (or classroom word wall)'],
        duration: 12,
      },
      {
        title: 'Reading Strategy Review',
        description: 'Review one reading strategy poster (visualizing, questioning, connecting, inferring). Students practice with a short paragraph: "Read this and show me how you use [strategy]."',
        materials: ['Strategy anchor charts', 'Short text passage'],
        duration: 10,
      },
    ],
    '6-8': [
      {
        title: 'Quickwrite',
        description: 'Display a thought-provoking quote related to the current reading theme. Students write for 5 minutes without stopping — stream of consciousness. Share voluntarily. No grades, just thinking.',
        materials: ['Projected quote', 'Journals'],
        duration: 10,
      },
      {
        title: 'Vocabulary Sketch',
        description: 'Give students 5 vocabulary words from the current unit. They sketch a quick visual for each word (no words allowed in the drawing). Partners guess the word from the sketch.',
        materials: ['Paper', 'Colored pencils', 'Vocabulary list'],
        duration: 12,
      },
      {
        title: 'Genre Study Quick-Sort',
        description: 'Display 8 book titles/descriptions. Students categorize them by genre (fiction, nonfiction, poetry, drama). Discuss borderline cases — "Why might this fit in two categories?"',
        materials: ['Projected or printed book descriptions'],
        duration: 10,
      },
    ],
    '9-12': [
      {
        title: 'Socratic Question Prep',
        description: 'Students write 2 discussion questions about last night\'s reading — one factual, one analytical. Share with a partner and refine. Best questions lead today\'s discussion.',
        materials: ['Current text', 'Notebooks'],
        duration: 10,
      },
      {
        title: 'Close Reading Snippet',
        description: 'Project a key passage (4-6 sentences) from the current text. Students annotate for literary devices, tone, and author\'s purpose. Discuss: "Why did the author choose these specific words?"',
        materials: ['Projected passage', 'Annotation tools'],
        duration: 12,
      },
    ],
  },

  Writing: {
    'K-2': [
      {
        title: 'Journal Free-Write',
        description: 'Students write (or draw and label) in their journals for 5 minutes. Prompt: "Draw and write about your favorite thing to do on the weekend." Encourage invented spelling — the goal is getting ideas on paper!',
        materials: ['Writing journals', 'Pencils', 'Crayons'],
        duration: 10,
      },
      {
        title: 'Shared Writing: Class Story',
        description: 'Start a story on the board: "Once upon a time, a little _____ found a magical _____." Students raise hands to contribute the next sentence. Write exactly what they say, modeling conventions.',
        materials: ['Chart paper', 'Markers'],
        duration: 12,
      },
    ],
    '3-5': [
      {
        title: 'Quick-Write Prompt',
        description: 'Display a creative writing prompt: "You wake up and discover you can talk to animals. What\'s the first conversation you have?" Students write for 7 minutes without stopping. Share with a partner.',
        materials: ['Journals', 'Timer'],
        duration: 12,
      },
      {
        title: 'Sentence Surgeon',
        description: 'Write a boring sentence on the board: "The dog ran." Students "operate" on it by adding adjectives, adverbs, prepositional phrases. Transform it into a vivid, exciting sentence together.',
        materials: ['Whiteboard', 'Markers'],
        duration: 10,
      },
    ],
    '6-8': [
      {
        title: 'Six-Word Memoir',
        description: 'Share examples of six-word memoirs ("For sale: baby shoes, never worn."). Students write 3 of their own. Share favorites. Teaches word economy and impact — every word must earn its place.',
        materials: ['Index cards', 'Pens'],
        duration: 10,
      },
      {
        title: 'Grammar Warm-Up',
        description: 'Display 3 sentences with errors (comma splices, fragments, run-ons). Students identify and correct the errors independently, then discuss with a partner. Review correct answers as a class.',
        materials: ['Projected sentences', 'Notebooks'],
        duration: 10,
      },
    ],
    '9-12': [
      {
        title: 'Rhetorical Analysis Snippet',
        description: 'Display a short persuasive text (ad, speech excerpt, editorial). Students identify ethos, pathos, logos appeals. Discuss effectiveness in pairs before whole-class debrief.',
        materials: ['Projected text', 'Analysis framework'],
        duration: 12,
      },
      {
        title: 'Peer Review Warm-Up',
        description: 'Students swap their current draft with a partner. Read for 3 minutes silently, then write one "Glow" (strength) and one "Grow" (suggestion) on a sticky note. Return and discuss.',
        materials: ['Student drafts', 'Sticky notes', 'Pens'],
        duration: 12,
      },
    ],
  },

  Science: {
    'K-2': [
      {
        title: 'Observation Journal',
        description: 'Students observe something in the classroom (a plant, the weather outside, an ice cube melting). Draw what they see, label 3 things they notice. Practice being "science detectives" — use your senses!',
        materials: ['Science journals', 'Crayons', 'Magnifying glasses (if available)'],
        duration: 10,
      },
      {
        title: 'Science Question of the Day',
        description: '"Why do leaves change color?" or "Where does rain come from?" Students share ideas with a partner (no wrong answers!). Chart ideas on the board. Builds curiosity and prior knowledge activation.',
        materials: ['Chart paper', 'Markers'],
        duration: 10,
      },
    ],
    '3-5': [
      {
        title: 'Science Vocabulary Match',
        description: 'Write 6 science vocabulary words on one side of the board and definitions (scrambled) on the other. Students match them in their notebooks. Discuss tricky ones as a class.',
        materials: ['Whiteboard', 'Science notebooks'],
        duration: 10,
      },
      {
        title: 'Predict & Explain',
        description: 'Show a short science demonstration (drop a raisin in soda — it dances! or mix baking soda and vinegar). Before the demo: predict. After: explain what happened and why using science words.',
        materials: ['Demo materials (varies)', 'Science journals'],
        duration: 12,
      },
    ],
    '6-8': [
      {
        title: 'Scientific Method Review',
        description: 'Display a scenario: "A student notices their plant grows faster near the window." Students write a hypothesis, identify variables (independent, dependent, controlled), and sketch an experiment design.',
        materials: ['Notebooks', 'Scientific method poster'],
        duration: 12,
      },
      {
        title: 'Claim-Evidence-Reasoning',
        description: 'Present a scientific claim: "All metals are magnetic." Students must agree or disagree using evidence and reasoning. Practice the CER framework that strengthens scientific argumentation.',
        materials: ['CER framework sheet', 'Notebooks'],
        duration: 10,
      },
    ],
    '9-12': [
      {
        title: 'Data Analysis Warm-Up',
        description: 'Project a graph or data table from a real scientific study. Students answer: What is the trend? What\'s the independent/dependent variable? What conclusion can you draw? Any limitations?',
        materials: ['Projected data', 'Notebooks'],
        duration: 12,
      },
      {
        title: 'Current Event in Science',
        description: 'Share a brief science news headline (pre-selected). Students discuss in pairs: How does this connect to what we\'re studying? What questions does this raise? Write a 2-sentence summary.',
        materials: ['Printed or projected article'],
        duration: 10,
      },
    ],
  },

  'Social Studies': {
    'K-2': [
      {
        title: 'Community Helpers',
        description: 'Show pictures of community helpers (firefighter, teacher, doctor, mail carrier). Students identify each helper and explain how they help our community. Draw their favorite community helper.',
        materials: ['Community helper pictures', 'Paper', 'Crayons'],
        duration: 10,
      },
      {
        title: 'Map Exploration',
        description: 'Display a simple map (classroom, school, or neighborhood). Practice map vocabulary: up/down, left/right, near/far. Students draw a simple map of their desk area.',
        materials: ['Simple maps', 'Paper', 'Pencils'],
        duration: 12,
      },
    ],
    '3-5': [
      {
        title: 'Geography Quick-Draw',
        description: 'Name a state or country. Students have 30 seconds to sketch its shape from memory. Compare sketches and look at the real map. Do 3-4 rounds. Great for building spatial awareness.',
        materials: ['Paper', 'Pencils', 'Map or globe for reference'],
        duration: 10,
      },
      {
        title: 'Primary Source Detective',
        description: 'Show a historical photograph or document. Students observe for 1 minute silently, then answer: What do you SEE? What do you THINK is happening? What do you WONDER? Chart responses.',
        materials: ['Historical image or document', 'Chart paper'],
        duration: 12,
      },
    ],
    '6-8': [
      {
        title: 'This Day in History',
        description: 'Share 2-3 events that happened on today\'s date in history. Students choose one and write a quick paragraph explaining why it matters. Connects history to the present day.',
        materials: ['Pre-researched events', 'Notebooks'],
        duration: 10,
      },
      {
        title: 'Map Skills Challenge',
        description: 'Project a map. Ask 5 rapid-fire questions: "Which country borders ___?" "What ocean is east of ___?" "What is the capital of ___?" Students write answers, then check together.',
        materials: ['Projected map', 'Notebooks'],
        duration: 10,
      },
    ],
    '9-12': [
      {
        title: 'Document Analysis',
        description: 'Distribute a short primary source excerpt (speech, letter, treaty clause). Students annotate for: historical context, author\'s purpose, intended audience, and bias. Discuss in pairs.',
        materials: ['Primary source copies', 'Annotation guides'],
        duration: 12,
      },
      {
        title: 'Debate Prep',
        description: 'Present a historical "Would You Have...?" question related to the current unit. Students take 5 minutes to outline arguments for both sides. Share strongest arguments.',
        materials: ['Notebooks', 'Debate prompt'],
        duration: 12,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// MAIN LESSON ACTIVITIES
// ---------------------------------------------------------------------------
export const MAIN_ACTIVITIES = {
  Math: {
    'K-2': [
      {
        title: 'Math Station Rotations',
        description: 'Students rotate through 3-4 stations every 10 minutes: (1) Manipulative station — use base ten blocks to build numbers, (2) Worksheet station — practice problems at their level, (3) Game station — math card games like "War" with addition, (4) Teacher table — small group with substitute for targeted support.',
        materials: ['Base ten blocks', 'Practice worksheets', 'Number cards', 'Dice', 'Timer'],
        duration: 35,
        difficulty: { simple: 'Use single-digit numbers and basic counting', normal: 'Use grade-level operations as planned', challenge: 'Include story problems and multi-step challenges' },
      },
      {
        title: 'Math Story Problems',
        description: 'Read aloud 4-5 story problems (or have students read to partners). Students draw pictures to solve each one. Model the first one together. Use the "draw a picture, write a number sentence, write the answer" framework.',
        materials: ['Story problem sheets', 'Crayons', 'Math journals'],
        duration: 30,
        difficulty: { simple: 'Single-step addition/subtraction within 10', normal: 'Mixed operations appropriate to grade level', challenge: 'Two-step problems with larger numbers' },
      },
      {
        title: 'Hands-On Measurement',
        description: 'Students measure classroom objects using non-standard units (paper clips, linking cubes, hand spans). Record measurements on a chart. Compare: "The desk is 12 paper clips long but only 4 hand spans. Why?" Builds measurement concepts.',
        materials: ['Paper clips', 'Linking cubes', 'Rulers', 'Recording sheets'],
        duration: 30,
        difficulty: { simple: 'Measure 4 objects with one unit type', normal: 'Measure 6 objects with two unit types and compare', challenge: 'Estimate before measuring, calculate differences' },
      },
    ],
    '3-5': [
      {
        title: 'Collaborative Problem Solving',
        description: 'Students work in groups of 3-4 to solve a multi-step challenge problem. Each group gets a different problem on chart paper. They must show all work, explain their strategy, and present their solution to the class. Builds communication and reasoning skills.',
        materials: ['Chart paper', 'Markers', 'Challenge problems (differentiated)'],
        duration: 35,
        difficulty: { simple: 'Two-step problems with whole numbers', normal: 'Multi-step with grade-level concepts', challenge: 'Open-ended problems with multiple solution paths' },
      },
      {
        title: 'Math Games Tournament',
        description: 'Partners play math games that reinforce current skills: Multiplication War (flip two cards, multiply, highest product wins), Fraction Bingo, or Place Value Yahtzee. Rotate partners every 10 minutes.',
        materials: ['Card decks', 'Dice', 'Game boards', 'Score sheets'],
        duration: 30,
        difficulty: { simple: 'Basic fact games', normal: 'Strategy games with grade-level skills', challenge: 'Games requiring mental math and estimation' },
      },
      {
        title: 'Real-World Math Project',
        description: 'Students plan a class party with a $50 budget. They price items from a "store flyer" (printed sheet), calculate costs, make choices within budget, and figure out totals with tax. Present their party plan to a partner.',
        materials: ['Store flyer handouts', 'Calculators', 'Budget planning sheets'],
        duration: 40,
        difficulty: { simple: 'Whole dollar amounts, no tax', normal: 'Dollars and cents with simple tax', challenge: 'Include percentages, compare unit prices' },
      },
    ],
    '6-8': [
      {
        title: 'Problem-Based Learning Task',
        description: 'Present a real-world scenario requiring mathematical analysis. Students work in groups to develop a solution, create visual representations (graphs, tables, equations), and prepare a brief presentation. Example: "Design a school garden — calculate area, perimeter, cost of materials, and soil needed."',
        materials: ['Task cards', 'Graph paper', 'Rulers', 'Calculators', 'Presentation materials'],
        duration: 40,
        difficulty: { simple: 'Guided steps provided', normal: 'Open-ended with suggested starting points', challenge: 'Minimal scaffolding, multiple constraints' },
      },
      {
        title: 'Gallery Walk: Error Analysis',
        description: 'Post 8-10 worked problems around the room — each with a different error. Students circulate with clipboards, identify each error, explain the mistake, and provide the correct solution. Discuss the most common errors as a class.',
        materials: ['Posted problems with errors', 'Clipboards', 'Answer sheets'],
        duration: 30,
        difficulty: { simple: 'Single-step errors', normal: 'Multi-step with procedural errors', challenge: 'Conceptual errors requiring deep explanation' },
      },
    ],
    '9-12': [
      {
        title: 'Collaborative Practice Set',
        description: 'Students work through a practice set in pairs using the "Rally Coach" method: Partner A solves while Partner B coaches (no touching the pencil!). Switch roles each problem. Builds mathematical communication and catches errors in real-time.',
        materials: ['Practice problem sets', 'Pencils', 'Reference sheets'],
        duration: 35,
        difficulty: { simple: 'Scaffolded problems with examples', normal: 'Grade-level practice set', challenge: 'Extension problems connecting multiple concepts' },
      },
      {
        title: 'Mathematical Investigation',
        description: 'Students investigate a mathematical pattern or conjecture. Collect data, organize in a table, look for patterns, write a rule/formula, and test it. Example: "What happens to the area of a rectangle when you double one side? Both sides?"',
        materials: ['Investigation guide', 'Graph paper', 'Calculators'],
        duration: 40,
        difficulty: { simple: 'Structured investigation with guiding questions', normal: 'Semi-structured with room for exploration', challenge: 'Open investigation with proof component' },
      },
    ],
  },

  Reading: {
    'K-2': [
      {
        title: 'Guided Reading Groups',
        description: 'Run 3 reading groups (15 min each): (1) Read with the sub — students read aloud from leveled readers while you listen and help, (2) Independent reading — students read from book boxes at their desks, (3) Literacy station — listen to audiobooks at the listening center, practice sight words with flashcards, or do a phonics activity.',
        materials: ['Leveled readers', 'Book boxes', 'Listening center', 'Sight word cards'],
        duration: 40,
        difficulty: { simple: 'Focus on familiar re-reads', normal: 'Introduce new leveled text', challenge: 'Add written response component' },
      },
      {
        title: 'Interactive Read Aloud',
        description: 'Read a picture book with expression and enthusiasm. Stop at pre-planned points to ask questions: "Why did the character do that? How would YOU feel? What might happen next?" Use think-pair-share. After reading, students draw their favorite part and write a sentence about it.',
        materials: ['Selected picture book', 'Drawing paper', 'Crayons'],
        duration: 30,
        difficulty: { simple: 'Focus on retelling beginning, middle, end', normal: 'Include character analysis and predictions', challenge: 'Compare to another story, identify theme' },
      },
    ],
    '3-5': [
      {
        title: 'Literature Circles',
        description: 'Students meet in pre-assigned groups (check teacher\'s notes for groupings). Each student has a role: Discussion Director (asks questions), Summarizer (retells key events), Word Wizard (shares interesting vocabulary), Connector (links to other texts/life). Groups discuss for 20 minutes, then share one highlight with the class.',
        materials: ['Current reading books', 'Role sheets', 'Reading notebooks'],
        duration: 35,
        difficulty: { simple: 'Provide discussion questions', normal: 'Students generate own questions with roles', challenge: 'Add literary analysis component' },
      },
      {
        title: 'Reading Comprehension Workshop',
        description: 'Mini-lesson (8 min) on a reading strategy (check teacher plans for focus strategy — likely visualizing, questioning, or inferring). Students practice with a shared text passage. Then independent reading time where they apply the strategy and mark examples with sticky notes.',
        materials: ['Shared text copies', 'Sticky notes', 'Independent reading books', 'Anchor chart'],
        duration: 35,
        difficulty: { simple: 'Heavily modeled strategy practice', normal: 'Gradual release to independent practice', challenge: 'Apply strategy across multiple text types' },
      },
    ],
    '6-8': [
      {
        title: 'Socratic Seminar',
        description: 'Arrange desks in two circles (inner and outer). Inner circle discusses the current text using prepared questions while outer circle takes notes on discussion quality. After 10 minutes, switch. Debrief together: What were the strongest arguments? What evidence was most compelling?',
        materials: ['Current text', 'Discussion questions', 'Note-taking sheets'],
        duration: 35,
        difficulty: { simple: 'Provide questions and text evidence starters', normal: 'Student-generated questions', challenge: 'Connect to broader themes and other texts' },
      },
      {
        title: 'Close Reading & Annotation',
        description: 'Students read a challenging passage three times: (1) Read for gist — what is this about? (2) Read for craft — how does the author create meaning? (3) Read for connections — why does this matter? Annotate margins each round with different colored pencils.',
        materials: ['Text copies', 'Colored pencils (3 colors)', 'Annotation guide'],
        duration: 35,
        difficulty: { simple: 'Focus on comprehension only', normal: 'Include author\'s craft analysis', challenge: 'Evaluate author\'s argument and bias' },
      },
    ],
    '9-12': [
      {
        title: 'Analytical Essay Workshop',
        description: 'Students work on analytical writing related to the current text. Mini-lesson on incorporating textual evidence (ICE method: Introduce, Cite, Explain). Students draft one body paragraph, then peer review with a partner using a checklist.',
        materials: ['Current text', 'Essay prompts', 'ICE anchor chart', 'Peer review checklist'],
        duration: 40,
        difficulty: { simple: 'Paragraph writing with sentence starters', normal: 'Full body paragraph with evidence', challenge: 'Synthesize multiple sources in analysis' },
      },
    ],
  },

  Science: {
    'K-2': [
      {
        title: 'Science Exploration Stations',
        description: 'Set up 4 stations around the room: (1) Magnet exploration — test objects to see what magnets attract, (2) Water table — sink or float experiments, (3) Plant observation — draw and measure classroom plants, (4) Sorting station — classify objects by properties (color, size, texture). Rotate every 8 minutes.',
        materials: ['Magnets', 'Various objects', 'Water table', 'Plants', 'Sorting objects', 'Recording sheets'],
        duration: 35,
        difficulty: { simple: 'Explore freely and draw observations', normal: 'Make predictions before each test', challenge: 'Record data in a simple chart and draw conclusions' },
      },
      {
        title: 'Life Cycle Activity',
        description: 'Read a short book about a life cycle (butterfly, frog, or plant — check current unit). Students create a life cycle wheel: fold a paper plate into 4 sections, draw each stage, add arrows showing the cycle. Display on bulletin board.',
        materials: ['Paper plates', 'Crayons', 'Scissors', 'Brass fasteners', 'Life cycle book'],
        duration: 30,
        difficulty: { simple: 'Draw and label 3 stages', normal: 'Draw, label, and write one sentence per stage', challenge: 'Compare two life cycles' },
      },
    ],
    '3-5': [
      {
        title: 'Hands-On Investigation',
        description: 'Students conduct a guided experiment following the scientific method. Example: "Does the type of surface affect how far a ball rolls?" Students predict, test 4 surfaces, measure distances, record data in a table, and write a conclusion. Work in groups of 3-4.',
        materials: ['Balls (same size)', 'Measuring tape', 'Various surfaces (carpet sample, tile, sandpaper, foil)', 'Data recording sheets'],
        duration: 40,
        difficulty: { simple: 'Follow step-by-step procedure', normal: 'Design fair test with guidance', challenge: 'Independent experimental design with multiple variables' },
      },
      {
        title: 'Research & Present',
        description: 'Students research an assigned topic using classroom reference books or pre-selected articles. Create a mini-poster with: 3 key facts, a labeled diagram, and one "I wonder" question. Gallery walk to share learning.',
        materials: ['Reference books', 'Articles', 'Poster paper', 'Markers', 'Colored pencils'],
        duration: 40,
        difficulty: { simple: 'Graphic organizer provided', normal: 'Independent research with topic choice', challenge: 'Add "how this connects to our lives" section' },
      },
    ],
    '6-8': [
      {
        title: 'Lab Investigation',
        description: 'Students follow a structured lab procedure (check teacher\'s lab folder for pre-planned experiments). Emphasize safety procedures first. Students work in lab groups, collect data, create graphs, and answer analysis questions. Complete lab report format.',
        materials: ['Lab materials (per teacher prep)', 'Lab notebooks', 'Safety goggles', 'Graph paper'],
        duration: 45,
        difficulty: { simple: 'Guided procedure with analysis questions', normal: 'Procedure with open-ended analysis', challenge: 'Design extension experiment' },
      },
    ],
    '9-12': [
      {
        title: 'Case Study Analysis',
        description: 'Present a real-world scientific case study (disease outbreak, environmental disaster, engineering challenge). Students analyze data, identify patterns, propose explanations, and evaluate solutions. Work in groups and present findings.',
        materials: ['Case study packet', 'Data sets', 'Analysis framework'],
        duration: 45,
        difficulty: { simple: 'Guided analysis with scaffold questions', normal: 'Independent analysis with data', challenge: 'Evaluate competing hypotheses with evidence' },
      },
    ],
  },

  'Social Studies': {
    'K-2': [
      {
        title: 'Community Building Activity',
        description: 'Read a book about community/citizenship (check classroom library). Discuss: "What makes a good community member?" Students create a "Good Citizen" badge with drawings of ways they help at school and home. Share with the class.',
        materials: ['Community book', 'Paper circles', 'Crayons', 'Yarn for necklaces'],
        duration: 30,
        difficulty: { simple: 'Draw one way to be a good citizen', normal: 'Draw and write about 3 ways', challenge: 'Create a class book of citizenship examples' },
      },
    ],
    '3-5': [
      {
        title: 'Map Skills Workshop',
        description: 'Students practice map skills using atlases or printed maps. Activities include: identifying continents and oceans, using a compass rose, calculating distances with a map scale, and locating specific places using coordinates or grid references.',
        materials: ['Atlases', 'Printed maps', 'Worksheets', 'Colored pencils'],
        duration: 35,
        difficulty: { simple: 'Locate major features', normal: 'Use scale and coordinates', challenge: 'Plan a route with distance calculations' },
      },
      {
        title: 'Historical Timeline Project',
        description: 'Students create an illustrated timeline of key events from the current unit. Work in pairs to research dates, write brief descriptions, and add illustrations. Display timelines around the room for a gallery walk.',
        materials: ['Long paper strips', 'Rulers', 'Markers', 'Reference materials', 'Textbooks'],
        duration: 40,
        difficulty: { simple: '5 events with dates and pictures', normal: '8 events with cause-and-effect connections', challenge: '10+ events with analysis of significance' },
      },
    ],
    '6-8': [
      {
        title: 'DBQ (Document-Based Question) Analysis',
        description: 'Students analyze 4-5 primary source documents related to the current unit. For each document: identify the source, summarize the main idea, evaluate reliability, and explain how it connects to the essential question. Conclude with a written response using evidence from multiple documents.',
        materials: ['Document packets', 'Analysis worksheets', 'Notebooks'],
        duration: 40,
        difficulty: { simple: 'Guided questions per document', normal: 'Independent analysis with rubric', challenge: 'Synthesize documents into an argumentative paragraph' },
      },
    ],
    '9-12': [
      {
        title: 'Structured Academic Controversy',
        description: 'Students examine a debatable historical/political question from multiple perspectives. Work in groups of 4: pairs research opposing sides, present arguments, switch sides and argue the opposite, then find common ground. Write a group consensus statement.',
        materials: ['Source documents (2 perspectives)', 'Note-taking sheets', 'Rubric'],
        duration: 45,
        difficulty: { simple: 'Sources provided with guiding questions', normal: 'Sources provided, independent analysis', challenge: 'Research and synthesize own sources' },
      },
    ],
  },

  Writing: {
    'K-2': [
      {
        title: 'Writer\'s Workshop',
        description: 'Mini-lesson (5 min): model one writing skill (adding details, using capital letters, finger spaces). Then students write independently for 15 minutes on their current piece. Conference with 3-4 students individually while others write. End with 2 students sharing from the "Author\'s Chair."',
        materials: ['Writing folders', 'Pencils', 'Crayons', 'Word wall reference'],
        duration: 30,
        difficulty: { simple: 'Focus on drawing and labeling', normal: 'Write 3-5 sentences with details', challenge: 'Write a full page with beginning, middle, end' },
      },
    ],
    '3-5': [
      {
        title: 'Narrative Writing: Character Development',
        description: 'Students develop a character for a short story using a Character Blueprint graphic organizer (name, appearance, personality, wants, fears, special ability). Then write the opening paragraph of their story, introducing the character through action — "Show, don\'t tell!"',
        materials: ['Character Blueprint sheets', 'Writing notebooks', 'Example mentor texts'],
        duration: 35,
        difficulty: { simple: 'Complete graphic organizer and write 1 paragraph', normal: 'Write opening scene with dialogue', challenge: 'Write from character\'s point of view using interior monologue' },
      },
    ],
    '6-8': [
      {
        title: 'Argumentative Writing Workshop',
        description: 'Students write a persuasive paragraph on a provided topic using the OREO method (Opinion, Reason, Evidence, Opinion restated). Mini-lesson on strong transitions and counterarguments. Draft, then peer review using "Two Stars and a Wish" feedback method.',
        materials: ['OREO anchor chart', 'Writing prompts', 'Draft paper', 'Peer review forms'],
        duration: 40,
        difficulty: { simple: 'Single paragraph with sentence frames', normal: 'Full paragraph with transition words', challenge: 'Include counterargument and rebuttal' },
      },
    ],
    '9-12': [
      {
        title: 'Timed Writing Practice',
        description: 'Students respond to an essay prompt under timed conditions (25 minutes). Model the planning process first (3-min outline). Students write, focusing on thesis, evidence, and organization. Self-assess using provided rubric after writing.',
        materials: ['Essay prompts', 'Lined paper', 'Rubrics', 'Timer'],
        duration: 35,
        difficulty: { simple: 'Guided outline provided', normal: 'Independent planning and writing', challenge: 'Analyze and synthesize multiple perspectives' },
      },
    ],
  },

  Art: {
    'K-2': [
      {
        title: 'Symmetry Butterflies',
        description: 'Fold paper in half. Students paint or dot paint on ONE side only. Fold, press, and open to reveal a symmetrical butterfly! Add details with markers when dry. Connects to math (symmetry) and science (butterflies).',
        materials: ['White paper', 'Tempera paint', 'Brushes or cotton swabs', 'Markers', 'Newspapers for desks'],
        duration: 30,
        difficulty: { simple: 'Free paint and fold', normal: 'Discuss symmetry, be intentional with colors', challenge: 'Add symmetrical details with markers' },
      },
    ],
    '3-5': [
      {
        title: 'One-Point Perspective Drawing',
        description: 'Teach basic one-point perspective: draw a horizon line, vanishing point, and guide lines. Students draw a road with buildings, trees, or a hallway. Focus on objects getting smaller as they get "farther away." Display finished work.',
        materials: ['Drawing paper', 'Rulers', 'Pencils', 'Colored pencils or markers'],
        duration: 35,
        difficulty: { simple: 'Follow step-by-step road drawing', normal: 'Add buildings and details', challenge: 'Create a full scene with shading' },
      },
    ],
    '6-8': [
      {
        title: 'Zentangle Design',
        description: 'Introduce zentangle art: structured patterns within defined spaces. Students create a 4x4 grid on paper, then fill each square with a different pattern (stripes, dots, waves, spirals, crosshatch, etc.). Meditative and calming, with impressive results.',
        materials: ['White cardstock', 'Fine-tip black markers', 'Rulers', 'Example patterns'],
        duration: 35,
        difficulty: { simple: '8 squares with simple patterns', normal: '16 squares with varied complexity', challenge: 'Create a zentangle within a silhouette shape' },
      },
    ],
    '9-12': [
      {
        title: 'Observational Drawing',
        description: 'Set up a still life arrangement. Students spend the full period drawing from observation, focusing on proportion, shading, and value. Quick mini-lesson on measuring with pencil and thumb technique. Soft music in background.',
        materials: ['Drawing paper', 'Pencils (various grades)', 'Erasers', 'Still life objects'],
        duration: 40,
        difficulty: { simple: 'Contour line drawing only', normal: 'Add light and shadow', challenge: 'Full value study with background' },
      },
    ],
  },

  Music: {
    'K-2': [
      {
        title: 'Rhythm and Movement',
        description: 'Teach simple rhythms using body percussion (clap, stomp, pat knees, snap). Echo clapping: teacher claps a pattern, students repeat. Then learn a simple song with movements. End with a rhythm freeze game — dance when music plays, freeze when it stops!',
        materials: ['Rhythm instruments (if available)', 'Music player'],
        duration: 30,
        difficulty: { simple: 'Echo simple 4-beat patterns', normal: 'Create own patterns', challenge: 'Layer two rhythms together' },
      },
    ],
    '3-5': [
      {
        title: 'Bucket Drumming',
        description: 'Use classroom buckets (or desks) for a drumming circle. Teach 3 basic patterns, then layer them together. Half the class plays Pattern A while the other half plays Pattern B. Build to the full arrangement. Loud and fun but structured!',
        materials: ['Buckets or desk surfaces', 'Drumsticks or unsharpened pencils'],
        duration: 30,
        difficulty: { simple: 'One pattern, steady beat', normal: 'Two patterns layered', challenge: 'Student-composed patterns in groups' },
      },
    ],
    '6-8': [
      {
        title: 'Music Appreciation & Analysis',
        description: 'Play 3 short musical excerpts from different genres/periods. Students complete a listening log: What instruments do you hear? What mood does it create? How does it compare to the others? Discuss as a class. Connect to historical context.',
        materials: ['Music player', 'Listening log sheets', 'Headphones (optional)'],
        duration: 35,
        difficulty: { simple: 'Identify instruments and mood', normal: 'Compare and contrast pieces', challenge: 'Analyze musical elements (tempo, dynamics, form)' },
      },
    ],
    '9-12': [
      {
        title: 'Composition Workshop',
        description: 'Students compose a short 8-measure melody using notation or a digital tool. Review basic notation/compositional elements first. Students work individually, then share with a partner for feedback. Volunteers perform for the class.',
        materials: ['Staff paper', 'Pencils', 'Instruments (if available)', 'Computers (if available)'],
        duration: 40,
        difficulty: { simple: 'Use provided rhythmic framework', normal: 'Independent composition', challenge: 'Add harmony or a second voice' },
      },
    ],
  },

  PE: {
    'K-2': [
      {
        title: 'Movement Stations',
        description: 'Set up 5 stations: (1) Jump rope, (2) Hula hoops, (3) Bean bag toss, (4) Balance beam (tape line on floor), (5) Ball bouncing. Students rotate every 3 minutes. Focus on having fun and trying their best!',
        materials: ['Jump ropes', 'Hula hoops', 'Bean bags', 'Tape', 'Bouncy balls', 'Timer'],
        duration: 30,
        difficulty: { simple: 'Free exploration at each station', normal: 'Specific skill challenges at each', challenge: 'Record personal bests, try to improve' },
      },
    ],
    '3-5': [
      {
        title: 'Cooperative Games',
        description: 'Play team-building games that require cooperation over competition: Human Knot, Partner Relay Challenges, Group Juggle (keep multiple balls in the air), or Hoop Pass (pass a hula hoop around a circle while holding hands). Debrief teamwork skills.',
        materials: ['Hula hoops', 'Soft balls', 'Cones', 'Open space'],
        duration: 35,
        difficulty: { simple: 'Simple partner activities', normal: 'Team challenges with strategy', challenge: 'Time trials with improvement goals' },
      },
    ],
    '6-8': [
      {
        title: 'Fitness Circuit',
        description: 'Set up 8 fitness stations (jumping jacks, wall sits, push-ups, planks, mountain climbers, high knees, squats, stretching). 45 seconds per station, 15 seconds transition. Do 2 rounds. Students record their counts on a fitness log.',
        materials: ['Station signs', 'Timer', 'Fitness logs', 'Pencils', 'Mats (optional)'],
        duration: 35,
        difficulty: { simple: 'Modified exercises available', normal: 'Standard exercises', challenge: 'Advanced variations and extra round' },
      },
    ],
    '9-12': [
      {
        title: 'Sport Skills & Scrimmage',
        description: 'Warm up with dynamic stretches (5 min). Practice sport-specific skills in pairs (10 min). Then organize a modified scrimmage game. Focus on sportsmanship, teamwork, and inclusion. Cool down with static stretches.',
        materials: ['Sport equipment (per current unit)', 'Pinnies/jerseys', 'Cones', 'Whistle'],
        duration: 45,
        difficulty: { simple: 'Skills practice only, no scrimmage', normal: 'Modified scrimmage with rules review', challenge: 'Full gameplay with student referees' },
      },
    ],
  },

  'Language Arts': {
    'K-2': [
      {
        title: 'Readers Theater',
        description: 'Assign parts from a simple readers theater script (check the literacy bin or use a familiar fairy tale). Students practice reading their lines with expression. Perform for each other! No memorization needed — reading from the script IS the skill.',
        materials: ['Readers theater scripts', 'Simple props (optional)'],
        duration: 30,
        difficulty: { simple: 'Echo-read lines first', normal: 'Independent reading of parts', challenge: 'Add stage directions and expression coaching' },
      },
    ],
    '3-5': [
      {
        title: 'Grammar & Mechanics Practice',
        description: 'Mini-lesson on a grammar concept (check teacher notes for current focus — likely subject-verb agreement, punctuation, or paragraph structure). Practice with guided examples on the board, then independent worksheet. End with a quick grammar game.',
        materials: ['Grammar worksheets', 'Whiteboard', 'Notebooks'],
        duration: 35,
        difficulty: { simple: 'Sentence-level practice', normal: 'Paragraph-level editing', challenge: 'Apply to own writing piece' },
      },
    ],
    '6-8': [
      {
        title: 'Vocabulary in Context',
        description: 'Students encounter 8-10 vocabulary words within a short text passage. They use context clues to determine meaning, then verify with a dictionary. Create vocabulary cards with: word, definition, part of speech, sentence, and illustration.',
        materials: ['Text passages', 'Vocabulary cards', 'Dictionaries', 'Colored pencils'],
        duration: 35,
        difficulty: { simple: 'Match words to definitions', normal: 'Use context clues independently', challenge: 'Write original sentences using words correctly' },
      },
    ],
    '9-12': [
      {
        title: 'Rhetorical Analysis',
        description: 'Students analyze a speech, editorial, or advertisement for rhetorical strategies. Identify: purpose, audience, tone, and use of ethos/pathos/logos. Write a one-paragraph analysis using evidence from the text. Share in small groups.',
        materials: ['Text copies', 'Analysis framework', 'Notebooks'],
        duration: 40,
        difficulty: { simple: 'Guided analysis with questions', normal: 'Independent analysis with framework', challenge: 'Compare two texts\' rhetorical strategies' },
      },
    ],
  },

  English: {
    'K-2': [],
    '3-5': [],
    '6-8': [
      {
        title: 'Novel Study Discussion',
        description: 'Students discuss the current class novel in small groups using discussion roles (questioner, summarizer, connector, vocabulary finder). Each group shares key insights with the class. Follow up with a written reflection.',
        materials: ['Class novels', 'Role cards', 'Discussion guides', 'Journals'],
        duration: 40,
        difficulty: { simple: 'Teacher-provided questions', normal: 'Student-generated questions with roles', challenge: 'Thematic analysis and literary critique' },
      },
    ],
    '9-12': [
      {
        title: 'Literary Analysis Workshop',
        description: 'Focus on a literary element (symbolism, theme, characterization) in the current text. Mini-lesson with examples, then students find 3 examples in the text and explain their significance. Write a paragraph connecting the element to the larger meaning of the work.',
        materials: ['Current text', 'Literary terms reference', 'Notebooks', 'Highlighters'],
        duration: 40,
        difficulty: { simple: 'Identify examples with guiding questions', normal: 'Analyze significance independently', challenge: 'Connect to broader literary movements/criticism' },
      },
    ],
  },

  History: {
    'K-2': [],
    '3-5': [
      {
        title: 'Living Timeline',
        description: 'Each student or pair is assigned a historical event. They create a sign with the date, event name, and illustration. Then the class physically arranges themselves in chronological order along the hallway or classroom. Take a photo for the class wall!',
        materials: ['Event cards', 'Large paper', 'Markers', 'Tape'],
        duration: 35,
        difficulty: { simple: '5 major events, pre-sequenced', normal: '8 events, students sequence themselves', challenge: '12 events with written explanations' },
      },
    ],
    '6-8': [
      {
        title: 'Historical Role-Play Simulation',
        description: 'Students take on roles of historical figures or common citizens from the period being studied. Present a scenario or dilemma they would have faced. Students discuss and make decisions in character, then reflect on how this helps them understand the time period.',
        materials: ['Role cards', 'Scenario descriptions', 'Reflection sheets'],
        duration: 40,
        difficulty: { simple: 'Provided roles and guided responses', normal: 'Research role and respond independently', challenge: 'Write a diary entry from character\'s perspective' },
      },
    ],
    '9-12': [
      {
        title: 'Historiography Discussion',
        description: 'Present two contrasting historical interpretations of the same event. Students evaluate each argument, identify evidence used, assess bias, and determine which interpretation is better supported. Write a brief analytical response.',
        materials: ['Two source excerpts', 'Analysis framework', 'Notebooks'],
        duration: 40,
        difficulty: { simple: 'Guided comparison questions', normal: 'Independent analysis', challenge: 'Propose a third interpretation with evidence' },
      },
    ],
  },

  Geography: {
    'K-2': [
      {
        title: 'Map My World',
        description: 'Students draw a map of a familiar place (their bedroom, the playground, the classroom). Practice using simple symbols and a map key. Label important features. Share maps and see if a partner can "navigate" them.',
        materials: ['Large paper', 'Crayons', 'Pencils'],
        duration: 25,
        difficulty: { simple: 'Draw and label 5 things', normal: 'Add a key and compass rose', challenge: 'Include a scale and grid system' },
      },
    ],
    '3-5': [],
    '6-8': [],
    '9-12': [],
  },

  'Foreign Language': {
    'K-2': [
      {
        title: 'Language Through Songs',
        description: 'Teach a simple song in the target language (numbers, colors, greetings). Use hand motions and repetition. Students practice in pairs. End with the whole class performing together.',
        materials: ['Song lyrics', 'Audio recording', 'Visual aids'],
        duration: 25,
        difficulty: { simple: 'Sing along with motions', normal: 'Memorize key phrases', challenge: 'Create new verses using learned vocabulary' },
      },
    ],
    '3-5': [],
    '6-8': [],
    '9-12': [],
  },

  Technology: {
    'K-2': [],
    '3-5': [
      {
        title: 'Typing Practice & Digital Citizenship',
        description: 'Students practice typing skills using the classroom typing program (check bookmarks). Then discuss one digital citizenship topic: "What should you do if someone is being mean online?" Create a digital citizenship poster in pairs.',
        materials: ['Computers', 'Poster paper', 'Markers'],
        duration: 30,
        difficulty: { simple: 'Typing practice only', normal: 'Add digital citizenship discussion', challenge: 'Create a digital citizenship presentation' },
      },
    ],
    '6-8': [],
    '9-12': [],
  },

  Health: {
    'K-2': [
      {
        title: 'Healthy Choices Sorting',
        description: 'Show pictures of foods and activities. Students sort them into "Healthy" and "Not-So-Healthy" categories. Discuss: "These aren\'t BAD foods — we eat them sometimes — but we want to eat MORE of these healthy ones." Make a healthy plate collage.',
        materials: ['Food pictures (magazines or printed)', 'Paper plates', 'Glue', 'Scissors'],
        duration: 25,
        difficulty: { simple: 'Sort and glue', normal: 'Sort, glue, and label food groups', challenge: 'Plan a healthy meal for the day' },
      },
    ],
    '3-5': [],
    '6-8': [],
    '9-12': [],
  },
};

// ---------------------------------------------------------------------------
// WRAP-UP / REVIEW ACTIVITIES (Subject-general and subject-specific)
// ---------------------------------------------------------------------------
export const WRAPUPS = {
  general: [
    {
      title: 'Exit Ticket',
      description: 'Students answer 1-2 questions on a sticky note or slip of paper about what they learned today. Collect as they leave. Options: "Write one thing you learned," "Draw something from today\'s lesson," or "Rate your understanding 1-5."',
      materials: ['Sticky notes or paper slips'],
      duration: 5,
    },
    {
      title: 'Thumbs Up/Down Check',
      description: 'Ask 3-4 quick review questions. Students show thumbs up (yes/agree/understand), thumbs sideways (kind of/not sure), or thumbs down (no/disagree/confused). Quick formative assessment the teacher can review.',
      materials: [],
      duration: 5,
    },
    {
      title: 'Two Stars and a Wish',
      description: 'Students write two things they did well today (stars) and one thing they want to improve (wish). Great for self-reflection and gives the regular teacher insight into the day.',
      materials: ['Paper or reflection journal'],
      duration: 5,
    },
    {
      title: 'Partner Share',
      description: 'Students turn to a partner and share: "One thing I learned today was..." and "One question I still have is..." Select 2-3 volunteers to share with the whole class.',
      materials: [],
      duration: 5,
    },
    {
      title: '3-2-1 Reflection',
      description: '3 things you learned, 2 things you found interesting, 1 question you still have. Students write on paper and drop in the class basket on the way out.',
      materials: ['Paper', 'Collection basket'],
      duration: 5,
    },
  ],
  Math: [
    {
      title: 'Math Journal Reflection',
      description: 'Students write in their math journal: "Today in math I learned... The strategy I used was... I still need help with..."',
      materials: ['Math journals'],
      duration: 5,
    },
  ],
  Reading: [
    {
      title: 'Reading Log Update',
      description: 'Students update their reading logs with today\'s book, pages read, and a one-sentence summary. Check that all students have recorded their reading.',
      materials: ['Reading logs'],
      duration: 5,
    },
  ],
  Science: [
    {
      title: 'Science Journal Summary',
      description: 'Students write a "Scientist\'s Summary" in their science notebook: hypothesis, what we did, what we observed, what we concluded.',
      materials: ['Science notebooks'],
      duration: 5,
    },
  ],
};

// ---------------------------------------------------------------------------
// BRAIN BREAKS (by grade band)
// ---------------------------------------------------------------------------
export const BRAIN_BREAKS = {
  'K-2': [
    {
      title: 'GoNoodle Dance Break',
      description: 'Play a GoNoodle video (check teacher bookmarks) or lead "Head, Shoulders, Knees, and Toes" at increasing speeds. 3 minutes of movement to reset energy.',
      duration: 3,
    },
    {
      title: 'Animal Walks',
      description: 'Students move around the room like different animals: bear walk (on all fours), crab walk (belly up), flamingo stand (one leg), frog jumps. Great for vestibular input and giggles.',
      duration: 3,
    },
    {
      title: 'Freeze Dance',
      description: 'Play music — students dance. Stop the music — everyone freezes. Anyone still moving sits down for one round. Keep it light and fun. Everyone gets back in after each round.',
      duration: 4,
    },
    {
      title: 'Simon Says',
      description: 'Classic Simon Says but with a twist — use academic vocabulary: "Simon says touch something rectangular," "Simon says take 3 steps," "Simon says make a symmetrical shape with your body."',
      duration: 4,
    },
    {
      title: 'Yoga Poses',
      description: 'Guide students through 5-6 simple yoga poses: tree, warrior, downward dog, butterfly, cat-cow. Use a calm voice. Great for transitioning from active to focused time.',
      duration: 4,
    },
    {
      title: 'Would You Rather',
      description: '"Would you rather be a dinosaur or a dragon?" Students move to one side of the room for their choice. Pick 2-3 students to explain their reasoning. Fun, quick, and gets them moving.',
      duration: 3,
    },
  ],
  '3-5': [
    {
      title: 'Four Corners',
      description: 'Label corners 1-4 with different options (favorite season, favorite subject, etc.). Students move to their choice. Share reasons with someone in their corner. Good for transitions between subjects.',
      duration: 4,
    },
    {
      title: 'Stand Up, Hand Up, Pair Up',
      description: 'Students stand, raise a hand, and find a partner (hand up means "I need a partner"). Ask a review question or fun question. Discuss for 1 minute, then find a NEW partner for the next question.',
      duration: 5,
    },
    {
      title: 'Stretching Station',
      description: 'Lead students through 2 minutes of stretches: reach for the ceiling, touch toes, arm circles, neck rolls, wrist rotations (important for writers!). Deep breathing to finish.',
      duration: 3,
    },
    {
      title: 'Silent Ball',
      description: 'Students stand at desks. Toss a soft ball silently — no talking, no sounds. If you make noise, miss the catch, or make a bad throw, sit down. Last 5 standing are champions. Builds focus and self-control.',
      duration: 5,
    },
    {
      title: 'Desk Drumming',
      description: 'Lead a call-and-response rhythm pattern on desks. Start simple, get complex. Students echo each pattern. End with everyone playing the same beat together. Energizing and musical!',
      duration: 3,
    },
    {
      title: 'Mindfulness Minute',
      description: 'Students close their eyes, sit comfortably. Guide: "Take a deep breath in... and out... Notice how your body feels... Listen to the sounds around you... Take one more deep breath..." Open eyes refreshed.',
      duration: 2,
    },
  ],
  '6-8': [
    {
      title: 'Quick Stretch Break',
      description: 'Everyone stands. 60 seconds of stretching: reach up, touch toes, twist side to side, shoulder rolls, wrist circles. Simple but effective for resetting attention after screen time or writing.',
      duration: 2,
    },
    {
      title: 'Trivia Challenge',
      description: 'Ask 3-4 random trivia questions. Students discuss in pairs before answering. Mix academic and pop culture. Keep it light — wrong answers get laughs, not shame.',
      duration: 4,
    },
    {
      title: 'Would You Rather (Academic Edition)',
      description: '"Would you rather live during the Renaissance or the Space Age?" "Would you rather only use addition or only use multiplication for the rest of your life?" Students move to sides of the room and defend their choice.',
      duration: 4,
    },
    {
      title: 'Two Truths and a Lie',
      description: 'Play academically: "Two of these facts about photosynthesis are true, one is false. Which is the lie?" Or play socially to build community. 3-4 rounds.',
      duration: 5,
    },
    {
      title: 'Doodle Break',
      description: 'Give students 2 minutes to doodle freely on scratch paper. No rules, no sharing required, just decompression. Research shows doodling improves focus and memory.',
      duration: 2,
    },
  ],
  '9-12': [
    {
      title: 'Stand and Stretch',
      description: 'Everyone stands for 60 seconds. Stretch, walk to the window, refill water bottles. Simple, dignified, and necessary for long block periods.',
      duration: 2,
    },
    {
      title: 'Think-Pair-Share (Fun Edition)',
      description: 'Ask a fun, low-stakes question: "What\'s the best movie you\'ve seen recently?" "If you could have dinner with any historical figure, who?" Students share with a neighbor. Builds community.',
      duration: 3,
    },
    {
      title: 'Music Moment',
      description: 'Play 60 seconds of instrumental music (lo-fi, classical, or nature sounds). Students close eyes and just listen. Reset the room energy before diving back into work.',
      duration: 2,
    },
    {
      title: 'Desk Yoga',
      description: 'Guide 3-4 seated stretches: seated twist, wrist stretches, neck rolls, ankle circles, shoulder shrugs. Especially important before or after typing/writing sessions.',
      duration: 2,
    },
  ],
};

// ---------------------------------------------------------------------------
// EMERGENCY FILLER ACTIVITIES ("If students finish early...")
// ---------------------------------------------------------------------------
export const FILLERS = {
  'K-2': [
    'Free drawing in art journals',
    'Read a book from the classroom library (check their book bin)',
    'Practice writing letters or sight words on a whiteboard',
    'Play with math manipulatives (pattern blocks, linking cubes)',
    'Color a coloring page from the "early finisher" bin',
    'Build with LEGOs or blocks from the free-choice shelf',
    'Practice cutting and gluing with scraps from the art bin',
    'Complete a simple puzzle from the puzzle shelf',
    'Draw a picture and write a sentence about it',
    'Play an educational game on the classroom tablet (check teacher policy)',
  ],
  '3-5': [
    'Silent reading from independent reading book',
    'Work on unfinished assignments from other subjects',
    'Free write in journal — topic of their choice',
    'Logic puzzles or Sudoku from the "Brain Buster" folder',
    'Draw in sketchbook',
    'Practice multiplication facts with flashcards (partner activity)',
    'Complete a word search or crossword related to current unit',
    'Write a letter to a friend or family member',
    'Read a magazine from the class magazine rack',
    'Work on an ongoing passion project (check teacher notes)',
  ],
  '6-8': [
    'Silent reading of independent choice book',
    'Work ahead on current assignments',
    'Journal writing — free topic or provided prompts on the board',
    'Sketch in notebook',
    'Review notes from other classes',
    'Complete extra credit or enrichment worksheets from the "Challenge" folder',
    'Help a classmate who is still working (quietly)',
    'Write a reflection on today\'s learning',
    'Organize binder or notebook',
    'Read a nonfiction article from the "Current Events" folder',
  ],
  '9-12': [
    'Silent reading of choice text',
    'Work on assignments from other classes (quietly)',
    'Review and organize notes',
    'Journal or creative writing',
    'Sketch or doodle',
    'Read from the classroom library',
    'Study for upcoming assessments',
    'Complete enrichment or extension activities',
    'Reflect on learning goals for the week',
    'Help a peer with the current assignment',
  ],
};

// ---------------------------------------------------------------------------
// FUN FACTS (by grade band)
// ---------------------------------------------------------------------------
export const FUN_FACTS = {
  'K-2': [
    'A group of flamingos is called a "flamboyance." How fancy!',
    'Honey never spoils — archaeologists found 3,000-year-old honey in Egyptian tombs, and it was still good to eat!',
    'Octopuses have three hearts and blue blood.',
    'Bananas are technically berries, but strawberries aren\'t!',
    'A snail can sleep for up to three years. That\'s one long nap!',
    'Butterflies taste with their feet.',
    'The shortest war in history lasted only 38 to 45 minutes (between Britain and Zanzibar in 1896).',
    'Cows have best friends and get stressed when they\'re separated.',
    'A day on Venus is longer than a year on Venus!',
    'Sea otters hold hands while they sleep so they don\'t drift apart.',
    'The average person walks the equivalent of three times around the world in a lifetime.',
    'Elephants are the only animals that can\'t jump.',
    'A cloud can weigh more than a million pounds!',
    'There are more stars in the universe than grains of sand on all of Earth\'s beaches.',
    'Dolphins give each other names — they use unique whistles to call specific friends.',
  ],
  '3-5': [
    'If you could drive a car straight up, you\'d reach space in about an hour.',
    'The Eiffel Tower can be 6 inches taller during the summer because heat makes iron expand.',
    'A bolt of lightning is five times hotter than the surface of the sun.',
    'There are more trees on Earth than stars in the Milky Way galaxy.',
    'The human brain uses about 20% of all the energy your body produces — thinking is hard work!',
    'Sharks have been on Earth longer than trees. Sharks: 450 million years. Trees: 350 million years.',
    'The Great Wall of China is not actually visible from space with the naked eye — that\'s a common myth!',
    'Astronauts grow up to 2 inches taller in space because there\'s no gravity compressing their spine.',
    'A jiffy is an actual unit of time — it\'s 1/100th of a second.',
    'The inventor of the Pringles can is buried in one. Seriously.',
    'Wombat poop is cube-shaped. Scientists are still studying why.',
    'Your nose can remember 50,000 different scents.',
    'The total weight of all ants on Earth is about the same as the total weight of all humans.',
    'Venus is the only planet that spins clockwise. All other planets spin counterclockwise.',
    'A single teaspoon of honey represents the life\'s work of 12 bees.',
  ],
  '6-8': [
    'The average person produces enough saliva in their lifetime to fill two swimming pools.',
    'There\'s a basketball court on the top floor of the U.S. Supreme Court building. It\'s known as "the highest court in the land."',
    'Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.',
    'Oxford University is older than the Aztec Empire.',
    'A teaspoonful of neutron star would weigh about 6 billion tons.',
    'The inventor of the fire hydrant is unknown because the patent was destroyed in a fire.',
    'Humans share 60% of their DNA with bananas.',
    'If you shuffle a deck of cards properly, the resulting order has likely never existed before in the history of the universe.',
    'The world\'s quietest room, at Microsoft\'s headquarters, is so silent that the longest anyone has endured it is 45 minutes.',
    'Scotland\'s national animal is the unicorn.',
    'Every planet in the solar system could fit between Earth and the Moon (with room to spare).',
    'The longest hiccuping spree lasted 68 years. Charles Osborne hiccupped from 1922 to 1990.',
    'There are more possible iterations of a game of chess than atoms in the known universe.',
    'Maine is the closest U.S. state to Africa.',
    'Vending machines are statistically more dangerous than sharks.',
  ],
  '9-12': [
    'The Oxford English Dictionary took 70 years to complete, and by the time it was finished, it was already outdated.',
    'If the history of Earth were compressed into 24 hours, humans would appear at 11:58:43 PM.',
    'The number of possible legal board positions in the game of Go exceeds the number of atoms in the observable universe.',
    'MIT once offered a class on the physics of The Simpsons.',
    'There are more public libraries in the U.S. than McDonald\'s restaurants.',
    'The moon is slowly drifting away from Earth at a rate of about 1.5 inches per year.',
    'A single strand of spider silk is stronger than a steel wire of the same thickness.',
    'The total length of DNA in a single human body, if uncoiled, would stretch from the Sun to Pluto and back — multiple times.',
    'Byzantine Emperor Justinian once made an entire army retreat by refusing to leave his throne room. They thought it was a trap.',
    'Your brain generates enough electricity to power a small lightbulb.',
    'There is a species of jellyfish (Turritopsis dohrnii) that is biologically immortal — it can revert back to its juvenile state.',
    'The chance of being born is estimated at about 1 in 400 trillion.',
    'GPS satellites have to account for Einstein\'s theory of relativity — without the correction, your location would drift by about 6 miles per day.',
    'In a room of just 23 people, there\'s a 50% chance two share a birthday (the Birthday Paradox).',
    'The first computer programmer was Ada Lovelace, who wrote algorithms for Charles Babbage\'s Analytical Engine in the 1840s.',
  ],
};

// ---------------------------------------------------------------------------
// MORNING ROUTINES (by grade band)
// ---------------------------------------------------------------------------
export const MORNING_ROUTINES = {
  'K-2': [
    'Students arrive and unpack: hang up backpack, put folder in bin, move lunch choice clip, sharpen pencils.',
    'Morning work is on their desks (check the "morning work" bin). Students complete independently while you take attendance.',
    'After morning work, gather on the carpet for morning meeting: greeting, share, activity, and morning message.',
  ],
  '3-5': [
    'Students enter, unpack, and begin morning work (check the "morning work" tray — usually math review or journal prompt).',
    'Take attendance while students work. Check the lunch count system (usually a clip chart or digital sign-in).',
    'After 10 minutes, go over morning work answers together. Review the day\'s schedule on the board.',
  ],
  '6-8': [
    'Students arrive to a "Do Now" or bell-ringer activity posted on the board. They begin immediately upon entering.',
    'Take attendance during the Do Now (5 minutes). Check seating chart for names.',
    'Review Do Now answers, then preview today\'s learning objectives.',
  ],
  '9-12': [
    'Students enter and begin the warm-up/bell-ringer activity displayed on the board or projector.',
    'Take attendance during the warm-up using the seating chart. Note: some students may arrive late with passes.',
    'Review warm-up briefly, then outline the plan for today\'s class period.',
  ],
};

// ---------------------------------------------------------------------------
// CLASSROOM MANAGEMENT TIPS (by grade band)
// ---------------------------------------------------------------------------
export const MANAGEMENT_TIPS = {
  'K-2': [
    'Use a call-and-response attention getter. Common ones: "Class, class!" / "Yes, yes!" or "1-2-3, eyes on me!" / "1-2-3, eyes on you!" Check the teacher\'s posted signals.',
    'Transitions take time at this age. Give clear, specific directions: "Put your pencil in your desk. Push your chair in. Walk to the carpet. Sit criss-cross." One step at a time.',
    'Positive reinforcement works best. "I love how Table 3 is ready!" rather than "Table 1, stop talking!" Use the classroom reward system if one exists (check for clip charts, class dojo, marble jar, etc.).',
    'Keep them busy. Idle hands = chaos. If you finish early, have a backup activity ready (book, coloring page, whiteboard free-draw).',
    'If a child is upset or crying, stay calm and speak quietly. Ask if they need a drink of water or a minute in the calm-down corner. Most upsets pass quickly with gentle acknowledgment.',
    'Bathroom: most K-2 classes have a system (sign out sheet, bathroom passes, hand signals). Check the posted rules. Send one at a time.',
  ],
  '3-5': [
    'Be consistent with expectations from the first minute. Introduce yourself confidently: "Good morning! I\'m your substitute teacher today. Your teacher left great plans, and we\'re going to have a productive day."',
    'Use the classroom reward/consequence system that\'s already in place. Ask a responsible student to explain it if you\'re unsure.',
    'Give countdowns for transitions: "You have 2 minutes to clean up... 1 minute... 30 seconds... pencils down, eyes up."',
    'For chatty students: try proximity (stand near them), a gentle redirect ("I need everyone\'s eyes"), or moving seats if needed.',
    'Appoint student helpers: "I need a door holder, a paper passer, and a line leader. Who would like to help me today?"',
    'If the noise level rises, try a quiet signal before raising your voice. Popular ones: lights off for 3 seconds, hand raised and wait, or "If you can hear me, clap once... clap twice."',
  ],
  '6-8': [
    'Middle schoolers test boundaries. Be friendly but firm from the start. Set expectations clearly: "I\'m looking forward to working with you today. Here\'s what I expect: respect for me, each other, and yourself."',
    'Don\'t take disruptions personally. Stay calm, address behaviors privately when possible (quiet conversation at their desk, not in front of the class).',
    'The seating chart is your best friend. Use it for attendance AND for addressing students by name. Using names builds respect immediately.',
    'Phone policy: follow the teacher\'s established rules. If there\'s no posted policy, a reasonable default is "phones away and silent during instruction."',
    'If a student refuses to work: don\'t engage in a power struggle. Calmly say, "I\'d love your participation, but I understand if you need a minute. I\'ll check back with you shortly." Then move on.',
    'Leave detailed notes for the teacher about behavior — both positive and negative. Be specific: "Period 3 was excellent. In Period 5, [student name] had difficulty following directions and was moved to a different seat."',
  ],
  '9-12': [
    'Treat high schoolers with respect and they\'ll generally return it. Introduce yourself professionally and outline the plan for the period.',
    'Follow the teacher\'s established procedures. Students will tell you "We always get free time on Fridays" — trust the written plans, not student claims.',
    'The biggest challenge is usually engagement, not behavior. If students seem disengaged, circulate the room, ask questions, and show interest in their work.',
    'For off-task behavior: a quiet, private redirect is far more effective than a public one. Walk over and quietly say, "I need you back on task, please."',
    'Don\'t confiscate phones unless it\'s school policy. Simply ask students to put them away. If they refuse, note it for the teacher and don\'t escalate.',
    'Leave organized, detailed notes. High school teachers especially appreciate knowing: What was completed? Were there any issues? How far did you get in the lesson?',
  ],
};

// ---------------------------------------------------------------------------
// RECESS & LUNCH NOTES (by grade band)
// ---------------------------------------------------------------------------
export const RECESS_NOTES = {
  'K-2': 'Walk students in a line to the playground/recess area. Remind them of playground rules (hands to yourself, take turns, include everyone). Pick up is at [check schedule]. Count students before heading back inside!',
  '3-5': 'Students may line up for recess independently. Remind them of expected behavior. If indoor recess (weather), students may play board games, draw, or read quietly. Avoid screen time unless teacher explicitly approved it.',
  '6-8': 'Students typically have a short break between periods or a designated lunch/recess time. Follow the posted schedule. If supervising, be visible and circulate.',
  '9-12': 'Students are generally self-directed during passing periods and lunch. Follow the teacher\'s posted schedule for class times.',
};

export const LUNCH_NOTES = {
  'K-2': 'Walk students to the cafeteria in a line. Make sure everyone has their lunch or lunch money. Students who brought lunch from home should grab it from their cubbies. Stay with them or hand off to the lunch aide (check school procedures). Pick up is at [check schedule].',
  '3-5': 'Students line up for lunch. Some may need to grab lunch boxes from cubbies. Walk them to the cafeteria. You may have a duty-free lunch while an aide supervises — check with the office. Pick up students at [check schedule].',
  '6-8': 'Students go to lunch per the bell schedule. If you have lunch duty, circulate and monitor. If duty-free, this is your break. Check your schedule for when the next period starts.',
  '9-12': 'Students dismiss for lunch per the bell. They return when the next period bell rings. Use this time as your break if you don\'t have duty.',
};

// ---------------------------------------------------------------------------
// TRANSITION PHRASES (by tone)
// ---------------------------------------------------------------------------
export const TRANSITIONS = {
  professional: [
    'Please transition to your next activity.',
    'Let\'s move on to our next subject.',
    'Take a moment to organize your materials for the next lesson.',
    'We\'re going to shift our focus now.',
    'Please put away your current work and prepare for the next activity.',
  ],
  friendly: [
    'Great job with that! Now let\'s move on to something new.',
    'You all did so well! Time for our next adventure.',
    'Awesome work, everyone. Let\'s switch gears!',
    'That was fantastic! Ready for what\'s next?',
    'Nice work! Take a deep breath and get ready for our next activity.',
  ],
  fun: [
    'Whoa, you crushed that! Who\'s ready for the next challenge?',
    'High fives all around! Now let\'s see what\'s next on our epic agenda!',
    'That was AMAZING! But wait — there\'s more!',
    'Boom! Nailed it! Now let\'s level up!',
    'You\'re on fire today! Let\'s keep this awesome energy going!',
  ],
};

// ---------------------------------------------------------------------------
// END-OF-DAY ROUTINES
// ---------------------------------------------------------------------------
export const END_OF_DAY = {
  'K-2': [
    'Pack up: Students put folders in backpacks, check cubbies for lunch boxes, and stack chairs.',
    'Clean up: Each table group has a clean-up job (check the posted job chart). Wipe tables, pick up floor scraps, push in chairs.',
    'End-of-day meeting on the carpet: share one thing you learned today. Sing the goodbye song if the class has one.',
    'Dismissal: check the dismissal list (bus riders, car riders, walkers, after-school care). Call each group to line up.',
  ],
  '3-5': [
    'Give a 10-minute warning before pack-up time.',
    'Students clean their desk area, return materials, and pack backpacks.',
    'Check that homework folders have the correct papers (check teacher notes for homework assignments).',
    'Dismiss by table groups or rows — "quietest table lines up first."',
    'Walk students to dismissal location or wait for the bell.',
  ],
  '6-8': [
    'Give a 5-minute warning before the end of class.',
    'Students should record homework in their planners if applicable.',
    'Remind students to push in chairs and clean their area.',
    'Dismiss when the bell rings, not before.',
    'For the last period: ensure all materials are returned and the room is reasonably tidy for the teacher\'s return.',
  ],
  '9-12': [
    'Give a 3-minute warning before the bell.',
    'Students should note any homework or upcoming deadlines.',
    'Remind them to check that they have all their belongings.',
    'Dismiss at the bell.',
    'For your last period: leave detailed notes for the teacher about each period, tidy the room, and return any materials to their proper places.',
  ],
};

// ---------------------------------------------------------------------------
// HELPER: pick a random item from an array
// ---------------------------------------------------------------------------
export function pickRandom(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

// Pick N unique random items from an array
export function pickRandomN(arr, n) {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, arr.length));
}
