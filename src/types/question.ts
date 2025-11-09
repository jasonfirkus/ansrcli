interface Question {
  type: "tf" | "mc" | "short";
  content: string;
  options?: string[];
}

export default Question;
