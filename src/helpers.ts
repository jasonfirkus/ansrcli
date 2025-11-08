import type { QuizFile, UserAnswer, GradeResult } from "./types/quizTypes.js";
// import { callModelForQuiz, callModelForGrading } from "./aiClient.js";
import { QUIZ_GEN_PROMPT, QUIZ_GRADE_PROMPT } from "./prompts.js";
import { callModelForQuiz, callModelForGrading } from "./aiClient.gemini.js";
import fs from "fs";
import path from "path";

export async function generateQuizFromPdf(pdfPath: string): Promise<QuizFile> {
  const res = await callModelForQuiz(pdfPath, QUIZ_GEN_PROMPT);
  const json = safeJson(res.content, "Quiz JSON");
  validateQuiz(json);
  return json as QuizFile;
}

export async function gradeQuiz(quiz: QuizFile, answers: UserAnswer[]): Promise<GradeResult> {
  const payloadQuiz = JSON.stringify(quiz);
  const payloadAns = JSON.stringify({ answers });
  const res = await callModelForGrading(payloadQuiz, payloadAns, QUIZ_GRADE_PROMPT);
  const json = safeJson(res.content, "Grade JSON");
  validateGrade(json);
  return json as GradeResult;
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
