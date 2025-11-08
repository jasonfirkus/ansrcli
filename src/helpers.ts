import type { QuizFile, UserAnswer, GradeResult } from "./types/quizTypes.js";
import fs from "fs";
import path from "path";

export async function gradeQuiz(quiz: QuizFile, answers: UserAnswer[]): Promise<GradeResult> {
  // Simple client-side grading
  const items = answers.map((a) => {
    const q = quiz.questions.find(q => q.id === a.id);
    if (!q) {
      return {
        id: a.id,
        correct: false,
        feedback: "Question not found"
      };
    }

    let correct = false;
    const userValue = a.value.trim().toLowerCase();
    
    if (q.type === "true_false") {
      correct = userValue === String(q.answer).toLowerCase();
    } else if (q.type === "multiple_choice") {
      correct = userValue === q.answer?.toLowerCase();
    } else if (q.type === "short_answer") {
      correct = userValue === q.answer?.toLowerCase();
    }

    return {
      id: a.id,
      correct,
      expected: String(q.answer),
      feedback: correct ? "Correct!" : `Expected: ${q.answer}`
    };
  });

  const score = items.filter(item => item.correct).length;

  return {
    score,
    total: answers.length,
    items,
    summary: `You got ${score} out of ${answers.length} correct (${Math.round(score / answers.length * 100)}%).`
  };
}

// robust JSON parse with helpful errors
function safeJson(s: string, label: string) {
  try { return JSON.parse(cleanJson(s)); }
  catch (e: any) {
    const sample = s.slice(0, 400);
    throw new Error(`${label} parse failed: ${e?.message}\nStart of response:\n${sample}`);
  }
}

// sometimes models wrap in code fences or add text
function cleanJson(s: string) {
  return s
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

// quick shape checks
function validateQuiz(obj: any) {
  if (!obj?.title || !Array.isArray(obj?.questions) || obj.questions.length === 0) {
    throw new Error("Quiz JSON invalid: missing title or questions");
  }
}

function validateGrade(obj: any) {
  if (typeof obj?.score !== "number" || typeof obj?.total !== "number" || !Array.isArray(obj?.items)) {
    throw new Error("Grade JSON invalid: missing score/total/items");
  }
}

// file utils for caching
export function ensureDataDir() {
  const dir = path.resolve(".ansr");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
}

export function writeArtifact(name: string, data: any) {
  const dir = ensureDataDir();
  const p = path.join(dir, name);
  fs.writeFileSync(p, typeof data === "string" ? data : JSON.stringify(data, null, 2), "utf8");
  return p;
}
