import type Question from "./question.js";

interface Quiz {
  title: string;
  questions: Question[];
}

export default Quiz;
