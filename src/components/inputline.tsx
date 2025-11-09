import React, { useEffect, useState } from "react";
import { Text, useInput } from "ink";

export default function InputLine({
  prompt = ">",
  color = "green",
  numQuestions,
  index,
  setIndex,
  onSubmit,
  onExit,
}: {
  prompt?: string;
  color?: string;
  numQuestions: number;
  index: number;
  setIndex: (index: number) => void;
  onSubmit?: (value: string) => void;
  onExit?: () => void;
}) {
  const [buffer, setBuffer] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(t);
  }, []);

  useInput((input, key) => {
    if (key.return) {
      onSubmit?.(buffer);
      setBuffer("");
      return;
    }
    if (key.backspace) {
      setBuffer((prev) => prev.slice(0, -1));
      return;
    }

    if (key.leftArrow) {
      const prevQIndex = index - 1;
      if (prevQIndex < 0) return;
      setIndex(prevQIndex);
      setBuffer("");
      return;
    }

    if (key.rightArrow) {
      const nextQIndex = index + 1;
      if (nextQIndex > numQuestions) return;
      setIndex(nextQIndex);
      setBuffer("");
      return;
    }

    if (key.ctrl && input.toLowerCase() === "q") {
      onExit?.();
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
