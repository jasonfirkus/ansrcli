import React from "react";
import { Box, useInput, useApp } from "ink";
import RenderPhase from "./phases/RenderPhase.js";
import QuizFormat from "./types/quiz-format.js";

export default function App({
  sourcePdfPath,
  numQuestions,
  format,
}: {
  sourcePdfPath?: string;
  numQuestions: number;
  format: QuizFormat;
}) {
  const { exit } = useApp();

  useInput((input, key) => {
    if (input === "q") {
      exit();
    }
  });

  return (
    <Box flexDirection="column">
      <RenderPhase
        sourcePdfPath={sourcePdfPath}
        numQuestions={numQuestions}
        quizFormat={format}
      />
    </Box>
  );
}
