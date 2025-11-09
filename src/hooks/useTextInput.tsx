import React, { useEffect, useState } from "react";
import { Text, useInput } from "ink";
import Phase from "../types/phase.js";

export default function TextInput({
  prompt = ">",
  color = "green",
  numQuestions,
  setCurrentQuestionNum,
  onSubmit,
  userAnswer = "",
  currentQNum,
  setPhase,
}: {
  prompt?: string;
  color?: string;
  numQuestions: number;
  setCurrentQuestionNum: React.Dispatch<React.SetStateAction<number>>;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  onSubmit: (value: string) => void;
  userAnswer?: string;
  currentQNum: number;
}) {
  const [buffer, setBuffer] = useState(userAnswer);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(t);
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onSubmit(buffer);
      setBuffer("");
      if (currentQNum + 1 >= numQuestions) {
        setPhase("results");
        return;
      }
      setCurrentQuestionNum((prev) => prev + 1);
    }
    if (key.backspace) {
      setBuffer((prev) => prev.slice(0, -1));
      return;
    }

    if (key.ctrl && input.toLowerCase() === "q") {
      process.exit(0);
      return;
    }
    if (input) setBuffer((prev) => prev + input);
  });

  return (
    <Text color={color}>
      {prompt} {buffer}
      {cursorVisible ? <Text inverse> </Text> : " "}
    </Text>
  );
}
