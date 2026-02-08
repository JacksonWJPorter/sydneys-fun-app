import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.SUBPLANR_OPENAI_KEY });

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      teacherName = "Teacher",
      gradeLevel = [],
      subjects = [],
      lessonDetails = {},
      duration = "full",
      difficulty = "business",
      specialInstructions = "",
      emergencyProcedures = false,
      tone = "friendly",
    } = body;

    const toneDescription = {
      professional: "formal and structured",
      friendly: "warm and approachable",
      fun: "energetic, playful, and encouraging",
    }[tone] || "warm and approachable";

    const difficultyDescription = {
      simple: "Keep activities simple — focus on review and easy practice. Students should feel successful.",
      business: "Continue regular lessons at grade level. Standard expectations.",
      challenge: "Push students with enrichment and extension activities. Encourage deeper thinking.",
    }[difficulty] || "Continue regular lessons at grade level.";

    const subjectDetails = subjects
      .map((s) => `- ${s}: ${lessonDetails[s] || "No specific notes provided."}`)
      .join("\n");

    const durationStr = duration === "full" ? "full day (8:00 AM - 3:00 PM)" : "half day (8:00 AM - 12:00 PM)";
    const gradeStr = gradeLevel.map((g) => `Grade ${g}`).join(", ");

    const prompt = `You are creating a detailed substitute teacher plan. Generate a complete, realistic plan in JSON format.

TEACHER: ${teacherName}
GRADES: ${gradeStr}
DURATION: ${durationStr}
DIFFICULTY: ${difficultyDescription}
TONE: ${toneDescription}

SUBJECTS AND LESSON NOTES:
${subjectDetails}

SPECIAL INSTRUCTIONS: ${specialInstructions || "None"}
INCLUDE EMERGENCY PROCEDURES: ${emergencyProcedures ? "Yes" : "No"}

Generate a JSON object with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "teacherName": "${teacherName}",
  "date": "today's date formatted like 'Monday, February 7, 2026'",
  "grades": ${JSON.stringify(gradeLevel.map((g) => `Grade ${g}`))},
  "subjects": ${JSON.stringify(subjects)},
  "duration": "${duration}",
  "tone": "${tone}",
  "schedule": [
    {
      "time": "8:00 AM - 8:15 AM",
      "subject": "Morning Routine",
      "activity": "description of what happens",
      "materials": "list of materials needed",
      "notes": "helpful notes for the sub"
    }
  ],
  "emergencyInfo": ${emergencyProcedures ? '{ "contacts": "multi-line string with contact info", "procedures": "multi-line string with fire/lockdown/medical procedures" }' : "null"},
  "classroomNotes": "multi-line string with classroom layout, behavior tips, and management notes",
  "funFacts": ["fun fact 1", "fun fact 2", "fun fact 3", "fun fact 4", "fun fact 5", "fun fact 6"]
}

IMPORTANT RULES:
- The schedule should have 8-15 time blocks filling the entire ${durationStr}
- Include transitions, brain breaks, recess (for elementary), and lunch (for full day)
- Each schedule item MUST have time, subject, activity, materials (as a string), and notes
- The tone of ALL text should be ${toneDescription}
- Fun facts should be interesting, age-appropriate facts for ${gradeStr} students
- Classroom notes should include layout tips, behavior management, and student helper suggestions
- Make the plan feel realistic and genuinely helpful for a substitute teacher
- Use the teacher's actual lesson notes when creating subject-specific schedule blocks
- Return ONLY valid JSON, no other text`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert substitute teacher plan generator. You always respond with valid JSON only, no markdown formatting or code fences.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 4000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return Response.json({ error: "No response from AI" }, { status: 500 });
    }

    // Parse the JSON — strip any accidental markdown fences
    const cleaned = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const plan = JSON.parse(cleaned);

    return Response.json(plan);
  } catch (error) {
    console.error("Generate plan error:", error);
    return Response.json(
      { error: error.message || "Failed to generate plan" },
      { status: 500 }
    );
  }
}
