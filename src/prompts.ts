export const QUIZ_GEN_PROMPT = `
You are given a PDF of slides. Generate 20 mixed questions
(short answer, multiple choice, true/false) that fairly cover the material.

Return ONLY valid JSON matching this TypeScript type:

{
  "title": string,
  "questions": Array<
    | {"id": number, "type":"true_false", "question": string, "answer": boolean}
    | {"id": number, "type":"multiple_choice", "question": string, "options": string[], "answer": string}
    | {"id": number, "type":"short_answer", "question": string, "answer": string}
  >
}

Rules:
- Multiple choice options must be 3-5 items, labeled text like "A) ...", "B) ...".
- Answers must be concise and unambiguous.
- Do not include explanations, markdown, or any text outside the JSON.
`;

export const QUIZ_GRADE_PROMPT = `
You will receive:
1) The quiz JSON (title, questions with correct answers),
2) The user's answers.

Grade each question strictly but fairly. For short answers, accept equivalent wording.
Return ONLY JSON:

{
  "score": number,
  "total": number,
  "items": Array<{
    "id": number,
    "correct": boolean,
    "expected"?: string,
    "feedback"?: string
  }>,
  "summary"?: string
}

Keep feedback short. No extra text outside JSON.
`;
