import type { QuizFile, UserAnswer } from "../types/quizTypes.js";

export default function buildAnswerPrompt(quiz: QuizFile, answers: UserAnswer[]) {
  return `You previously generated a quiz with the following questions and correct answers:
${JSON.stringify(quiz)}

The user provided the following answers:
${JSON.stringify(answers)}

Grade the user's answers. For short answer questions, be lenient with
spelling/capitalization and accept semantically equivalent answers.

Return ONLY valid JSON matching this TypeScript type:

[
  {
    "content": string,
    "correct": boolean,
    "expected": string,
    "feedback"?: string
  },
]

Rules:
- Mark true/false and multiple choice as correct only if they match exactly (case-insensitive).
- For short answers, be flexible and accept equivalent meanings.
- Provide brief feedback for incorrect answers.
- Include a summary with encouragement.
- If an answer is blank, assume the user failed to answer and mark it incorrect.
- Do not include explanations, markdown, text or formatting outside the JSON.`;
}
