interface Result {
  type: "tf" | "mc" | "short";
  content: string;
  options?: string[];
  answer?: string;
  grading?: {
    correct: boolean;
    expected: string;
    feedback?: string;
  };
}

export default Result;
