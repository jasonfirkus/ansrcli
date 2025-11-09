import fs from "fs";
import buildQuizPrompt from "../prompts/build-quiz-prompt.js";
import type QuizFormat from "../types/quiz-format.js";
import { ai } from "../config/ai.js";
import cleanMarkdown from "../utils/clean-markdown.js";

export default async function genQuiz(
  sourcePdfPath: string,
  numQuestions = 10,
  quizFormat = "mc,short,tf" as QuizFormat
): Promise<{
  sourcePdfPath: string;
  numQuestions: number;
  quizFormat: QuizFormat;
}> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "application/pdf",
          data: Buffer.from(fs.readFileSync(sourcePdfPath)).toString("base64"),
        },
      },
      { text: buildQuizPrompt(numQuestions, quizFormat) },
    ],
  });

  return JSON.parse(cleanMarkdown(response.text ?? ""));
}
