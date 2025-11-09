import type Result from "../types/result.js";
import { Box, Text } from "ink";
import React from "react";

const Answer = ({
  currentQuestion,
}: {
  currentQuestion: Result;
}) => {
  return (
    <Box flexDirection="column">
        <Text>{`Q: ${currentQuestion.content}`}</Text>
        <Text>{`Your Answer: ${currentQuestion.answer}`}</Text>
        <Text>{`Correct Answer: ${currentQuestion.grading?.expected}`}</Text>
        {currentQuestion.grading && (
          <Text>{`Grading: ${currentQuestion.grading.correct ? "Correct" : "Incorrect"}${currentQuestion.grading.feedback ? ` - ${currentQuestion.grading.feedback}` : ""}`}</Text>
        )}
    </Box>
  );
}
export default Answer;
