import React, { useEffect, useState } from "react";
import { Text, useInput } from "ink";

export default function InputLine({
  prompt = ">",
  color = "green",
  numQuestions,
  setCurrentQuestionNum,
  onSubmit,
}: {
  prompt?: string;
  color?: string;
  numQuestions: number;
  setCurrentQuestionNum: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (value: string) => void;
}) {
  const [buffer, setBuffer] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(t);
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onSubmit?.(buffer);
      setBuffer("");
      return;
    }
    if (key.backspace) {
      setBuffer(prev => prev.slice(0, -1));
      return;
    }

    if (key.leftArrow) {
      setCurrentQuestionNum(qNum => {
        const prevQIndex = qNum - 1;

        if (prevQIndex < 0) return qNum;

        return prevQIndex;
      });
      setBuffer("");

      return;
    }

    if (key.rightArrow) {
      setCurrentQuestionNum(qNum => {
        const nextQIndex = qNum + 1;

        if (nextQIndex > numQuestions) return qNum;

        return nextQIndex;
      });
      setBuffer("");

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
