import React, { useEffect, useState } from "react";
import { Text, useInput } from "ink";
import { ANSR_BLUE } from "../constants/colors.js";

export default function TextInput({
  prompt = "➤",
  color = ANSR_BLUE,
  onSubmit,
  defaultAnswer = "",
}: {
  prompt?: string;
  color?: string;
  onSubmit: (value: string) => void;
  defaultAnswer?: string;
}) {
  const [answer, setAnswer] = useState(defaultAnswer);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 500);

    return () => clearInterval(t);
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onSubmit(answer); //writeAnswer(answer);
      return;
    }

    if (key.backspace || key.delete) {
      setAnswer(prev => prev.slice(0, -1));
      return;
    }

    if (input) {
      setAnswer(prev => prev + input);
    }
  });

  return (
    <Text color={color}>
      {prompt} {answer}
      {cursorVisible ? <Text inverse> </Text> : " "}
    </Text>
  );
}
