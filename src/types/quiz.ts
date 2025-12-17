import type Question from "./question.js";

interface Quiz {
  title: string;
  secondsElapsed?: number;
  questions: Question[];
}

export default Quiz;
