import type { GenerateContentResult, Schema, Content } from "@google/generative-ai";


const QuizSchema: Schema = {
  type: Schema.Type.OBJECT,
  properties: {
    title: { type: Schema.Type.STRING },
    questions: {
      type: Schema.Type.ARRAY,
      items: {
        type: Schema.Type.OBJECT,
        properties: {
          id: { type: Schema.Type.NUMBER },
          // enum goes directly on the STRING property; no "format"
          type: { type: Schema.Type.STRING, enum: ["true_false", "multiple_choice", "short_answer"] },
          question: { type: Schema.Type.STRING },
          options: { type: Schema.Type.ARRAY, items: { type: Schema.Type.STRING } },
          // keep answer as string for simplicity across types
          answer: { type: Schema.Type.STRING }
        },
        required: ["id", "type", "question"]
      }
    }
  },
  required: ["title", "questions"]
};

const GradeSchema: Schema = {
  type: Schema.Type.OBJECT,
  properties: {
    score: { type: Schema.Type.NUMBER },
    total: { type: Schema.Type.NUMBER },
    summary: { type: Schema.Type.STRING },
    items: {
      type: Schema.Type.ARRAY,
      items: {
        type: Schema.Type.OBJECT,
        properties: {
          id: { type: Schema.Type.NUMBER },
          correct: { type: Schema.Type.BOOLEAN },
          expected: { type: Schema.Type.STRING },
          feedback: { type: Schema.Type.STRING }
        },
        required: ["id", "correct"]
      }
    }
  },
  required: ["score", "total", "items"]
};
