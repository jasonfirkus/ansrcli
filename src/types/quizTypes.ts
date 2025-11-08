export type TFAnswer = boolean;

export type Question =
  | {
      id: number;
      type: "true_false";
      question: string;
      answer: TFAnswer;
    }
  | {
      id: number;
      type: "multiple_choice";
      question: string;
      options: string[]; // e.g., ["A) ...","B) ...","C) ...","D) ..."]
      answer: string;    // e.g., "A"
    }
  | {
      id: number;
      type: "short_answer";
      question: string;
      answer: string;    // expected string (we do a forgiving compare)
    };

export interface QuizFile {
  title: string;
  questions: Question[];
}
