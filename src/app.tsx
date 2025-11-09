import React from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import RenderPhase from "./phases/RenderPhase.js";
import QuizFormat from "./types/quiz-format.js";

export default function App({
  sourcePdfPath,
  numQuestions = 10,
  format = "mc,short,tf",
}: {
  sourcePdfPath?: string;
  numQuestions?: number;
  format?: QuizFormat;
}) {
  return (
    <Box flexDirection="column">
      <Gradient name="mind">
        <BigText text="ansr" font="block" letterSpacing={3} />
      </Gradient>

      <RenderPhase sourcePdfPath={sourcePdfPath} numQuestions={numQuestions} quizFormat={format} />
    </Box>
  );
}
