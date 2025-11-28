import React, { useEffect } from "react";
import { Box, Text, useStdout, useInput, useApp } from "ink";
import RenderPhase from "./phases/RenderPhase.js";
import QuizFormat from "./types/quiz-format.js";
import cliCursor from "cli-cursor";

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
  const { stdout } = useStdout();

  useEffect(() => {
    if (!stdout) return;

    // Hammer the hide-escape every 100ms
    const intervalId = setInterval(() => {
      stdout.write("\x1B[?25l");
    }, 100);

    // Make sure cursor is shown again on exit
    return () => {
      clearInterval(intervalId);
      stdout.write("\x1B[?25h");
    };
  }, [stdout]);

  useInput((input, key) => {
    if (key.escape || (key.ctrl && input === "c")) {
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
