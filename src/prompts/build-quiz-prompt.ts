import QuizFormat from "../types/quiz-format.js";

interface FormatMap {
  [key: string]: string;
}

const FORMAT_MAP: FormatMap = {
  mc: "multiple choice",
  tf: "true/false",
  short: "short answer",
};

export default function buildQuizPrompt({
  numQuestions,
  format,
}: {
  numQuestions: number;
  format: QuizFormat;
}) {
  const quizFormat = format
    .split(",")
    .map(f => FORMAT_MAP[f])
    .join(", ");

  return `
    Analyze ALL the information in this pdf and categorize it. Rank these by their importance and how challenging they are. Generate a quiz of ${numQuestions} questions consisting of the MOST IMPORTANT and MOST CHALLENGING information. Use ${quizFormat} questions. DO NOT GIVE ANY ANSWERS.

    Return ONLY valid JSON matching this TypeScript type:

    {
        "title": string,
        "questions": Array<
            | {"id": number, "type":"tf", "question": string}
            | {"id": number, "type":"mc", "question": string, "options": string[]}
            | {"id": number, "type":"short", "question": string}
        >
    }

    Rules:
    Multiple choice options must be 3-5 items, with ONLY the text answer, not label.
    Answers must be concise and unambiguous.
    Do not include explanations, markdown, text or formatting outside the JSON.
    `;
}
