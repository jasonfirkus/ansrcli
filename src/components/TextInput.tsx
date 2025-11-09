import React, { useEffect, useState } from "react";
import { Text, useInput } from "ink";
import Phase from "../types/phase.js";

export default function TextInput({
  prompt = ">",
  color = "green",
  numQuestions,
  setCurrentQuestionNum,
  onSubmit,
  defaultValue = "",
  setPhase,
}: {
  prompt?: string;
  color?: string;
  numQuestions: number;
  setCurrentQuestionNum: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (value: string) => void;
  defaultValue?: string;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
}) {
  const [buffer, setBuffer] = useState(defaultValue);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(t);
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onSubmit(buffer);
      setBuffer("");
      setCurrentQuestionNum(qNum => {
        const nextQIndex = qNum + 1;

        if (nextQIndex > numQuestions) {
          setPhase("gen-answers");
          return qNum;
        }

        return nextQIndex;
      });
      return;
    }
    if (key.backspace) {
      setBuffer(prev => prev.slice(0, -1));
      return;
    }

    if (key.ctrl && input.toLowerCase() === "q") {
      process.exit(0);
      return;
    }
    if (input) setBuffer(prev => prev + input);
  });

  return (
    <Text color={color}>
      {prompt} {buffer}
      {cursorVisible ? <Text inverse> </Text> : " "}
    </Text>
  );
}
