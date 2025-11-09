import { ai } from "../config/ai.js";
import { createUserContent, createPartFromUri } from "@google/genai";
import answerPrompt from "../prompts/answer-prompt.js";
import Quiz from "../types/quiz.js";
import fs from "fs";
import cleanMarkdown from "../utils/clean-markdown.js";

export default async function gradeQuiz(quizPath: string) {

  const quizContent = fs.readFileSync(quizPath, "utf-8")

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { text: `${quizContent} ${answerPrompt}` },
    ],
  });

  return JSON.parse(cleanMarkdown(response.text ?? ""));
}
