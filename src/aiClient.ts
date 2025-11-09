import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import path from "path";
import "dotenv/config";
import type { QuizFile, UserAnswer, GradeResult } from "./types/quizTypes.js";
import buildQuizPrompt from "./prompts/build-quiz-prompt.js";
import buildAnswerPrompt from "./prompts/build-answer-prompt.js";

const API_KEY = process.env["GOOGLE_API_KEY"];

if (!API_KEY) {
  throw new Error("Missing GOOGLE_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);

/**
 * Uploads a PDF file to Google AI File Manager, generates a quiz from it,
 * and returns the parsed quiz JSON.
 */
export async function generateQuizFromPdf(localPath: string): Promise<QuizFile> {
  if (!fs.existsSync(localPath)) {
    throw new Error(`File not found: ${localPath}`);
  }

  const mimeType = "application/pdf";
  const displayName = path.basename(localPath);

  // Upload file to Google AI file manager
  const uploadResult = await fileManager.uploadFile(localPath, {
    mimeType,
    displayName,
  });

  // Poll until processing is complete
  let fileMeta = await fileManager.getFile(uploadResult.file.name);
  while (fileMeta.state === "PROCESSING") {
    await new Promise(r => setTimeout(r, 2000));
    fileMeta = await fileManager.getFile(uploadResult.file.name);
  }

  if (fileMeta.state === "FAILED") {
    throw new Error("File processing failed");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResult.file.mimeType,
        fileUri: uploadResult.file.uri,
      },
    },
    { text: buildQuizPrompt({ numQuestions: 10, format: "mc,short,tf" }) },
  ]);

  const raw =
    typeof result.response?.text === "function"
      ? result.response.text()
      : result.response?.text ?? null;

  // Clean up remote file
  await fileManager.deleteFile(uploadResult.file.name).catch(() => { });

  if (!raw) {
    throw new Error("No response from model");
  }

  // Parse the JSON response
  try {
    // Remove markdown code fences and extra whitespace
    const cleaned = raw
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const parsed = typeof cleaned === "string" ? JSON.parse(cleaned) : cleaned;
    return parsed as QuizFile;
  } catch (parseErr) {
    throw new Error(`Failed to parse quiz JSON: ${parseErr}`);
  }
}

/**
 * Grades a quiz by comparing user answers to expected answers.
 * Uses simple string comparison for grading.
 */
export async function gradeQuiz(quiz: QuizFile, answers: UserAnswer[]): Promise<GradeResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const result = await model.generateContent([
    {
      text: buildAnswerPrompt(quiz, answers),
    },
  ]);

  const raw =
    typeof result.response?.text === "function"
      ? result.response.text()
      : result.response?.text ?? null;

  if (!raw) {
    throw new Error("No response from model");
  }

  // Parse the JSON response
  try {
    // Remove markdown code fences and extra whitespace
    const cleaned = raw
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    const parsed = typeof cleaned === "string" ? JSON.parse(cleaned) : cleaned;
    return parsed as GradeResult;
  } catch (parseErr) {
    throw new Error(`Failed to parse grade result JSON: ${parseErr}`);
  }
}

/**
 * Ensures the .ansr directory exists and returns its path.
 */
export function ensureDataDir() {
  const dir = path.resolve(".ansr");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  return dir;
}

/**
 * Writes an artifact (quiz, grade result, etc.) to the .ansr directory.
 */
export function writeArtifact(name: string, data: any) {
  const dir = ensureDataDir();
  const p = path.join(dir, name);
  fs.writeFileSync(p, typeof data === "string" ? data : JSON.stringify(data, null, 2), "utf8");
  return p;
}
