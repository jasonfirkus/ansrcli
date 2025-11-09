type QuizOption = "mc" | "short" | "tf";

type QuizFormat =
  | QuizOption
  | `${QuizOption},${QuizOption}`
  | `${QuizOption},${QuizOption},${QuizOption}`;

export default QuizFormat;
