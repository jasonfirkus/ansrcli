// quizTypes.ts
export type Question =
  | { id: number; type: "true_false"; question: string; answer?: boolean }
  | { id: number; type: "multiple_choice"; question: string; options: string[]; answer?: string }
  | { id: number; type: "short_answer"; question: string; answer?: string };

export interface QuizFile {
  title: string;
  questions: Question[];
}

export interface UserAnswer {
  id: number;
  value: string;           // raw user input, e.g., "A" or "true" or free text
  startedAt?: string;
  answeredAt?: string;
}

export interface GradeItem {
  id: number;
  correct: boolean;
  expected?: string;       // model’s canonical answer
  feedback?: string;       // brief explanation or rubric comment
}

export interface GradeResult {
  score: number;           // e.g., 17
  total: number;           // e.g., 20
  items: GradeItem[];
  output?: string;        // output to console
}
