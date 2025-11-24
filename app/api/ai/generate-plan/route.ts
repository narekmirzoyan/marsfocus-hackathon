import { NextRequest, NextResponse } from "next/server";
import type { StudyPlanRequest, StudyPlanResponse, QuizQuestion } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: StudyPlanRequest = await request.json();
    const { topic, duration } = body;

    if (!topic || !duration) {
      return NextResponse.json(
        { error: "Topic and duration are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no API key, return a fallback plan
    if (!apiKey) {
      const fallbackPlan = generateFallbackPlan(topic, duration);
      return NextResponse.json(fallbackPlan);
    }

    // Call Gemini API
    try {
      const prompt = `Create a study plan for "${topic}" that takes ${duration} minutes. Return ONLY a valid JSON object (no markdown, no explanation) with:
1. "tasks": array of 3-5 specific study tasks
2. "quizQuestions": array of 2-3 quiz questions with structure {id, question, options: [4 options], correctAnswer: index, answer: "", completed: false}

Example format:
{
  "tasks": ["Review key concepts", "Practice 5 problems", "Summarize notes"],
  "quizQuestions": [
    {
      "id": "q1",
      "question": "What is the main concept?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "answer": "",
      "completed": false
    }
  ]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error("No content in Gemini response");
      }

      // Parse JSON from response (remove markdown code blocks if present)
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const plan = JSON.parse(jsonMatch[0]) as StudyPlanResponse;

      // Ensure quiz questions have proper structure
      plan.quizQuestions = plan.quizQuestions.map((q, i) => ({
        id: q.id || `q${i + 1}`,
        question: q.question,
        options: q.options || ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: q.correctAnswer ?? 0,
        answer: "",
        completed: false,
      }));

      return NextResponse.json(plan);
    } catch (aiError) {
      console.error("AI generation error:", aiError);
      // Fall back to generated plan if AI fails
      const fallbackPlan = generateFallbackPlan(topic, duration);
      return NextResponse.json(fallbackPlan);
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to generate study plan" },
      { status: 500 }
    );
  }
}

function generateFallbackPlan(topic: string, duration: number): StudyPlanResponse {
  const tasks: string[] = [];
  const numTasks = Math.min(Math.ceil(duration / 10), 5);

  // Generate generic but useful tasks
  const taskTemplates = [
    `Review core concepts of ${topic}`,
    `Study examples and applications`,
    `Practice problems or exercises`,
    `Create summary notes or flashcards`,
    `Test understanding with practice questions`,
  ];

  for (let i = 0; i < numTasks && i < taskTemplates.length; i++) {
    tasks.push(taskTemplates[i]);
  }

  const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      question: `What are the key concepts in ${topic}?`,
      options: ["Concept A", "Concept B", "Concept C", "Concept D"],
      correctAnswer: 0,
      answer: "",
      completed: false,
    },
    {
      id: "q2",
      question: `How can you apply ${topic} in real-world scenarios?`,
      options: ["Application A", "Application B", "Application C", "Application D"],
      correctAnswer: 0,
      answer: "",
      completed: false,
    },
  ];

  return { tasks, quizQuestions };
}
