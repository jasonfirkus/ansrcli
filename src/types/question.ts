interface Question {
  type: "tf" | "mc" | "short";
  content: string;
  options?: string[];
  answer?: string;
}

export default Question;
