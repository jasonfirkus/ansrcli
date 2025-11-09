import type Result from "../types/result.js";
import { Box, Text } from "ink";
import React from "react";

const Answer = ({
  currentQuestion,
}: {
  currentQuestion: Result;
}) => {
  const isCorrect = currentQuestion.grading?.correct;
  
  return (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1} flexDirection="column">
        <Text bold>Question:</Text>
        <Text>{currentQuestion.content}</Text>
      </Box>
      
      <Box flexDirection="column">
        <Text bold>Your Answer:</Text>
        <Text>{currentQuestion.answer}</Text>
      </Box>
      
      {!isCorrect && (
        <Box marginTop={1} flexDirection="column">
          <Text bold>Expected Answer:</Text>
          <Text>{currentQuestion.grading?.expected}</Text>
        </Box>
      )}
      
      <Box marginTop={1} flexDirection="column">
        <Text bold>Result:</Text>
        <Text>{isCorrect ? "✓ Correct" : "✗ Incorrect"}</Text>
      </Box>
      
      {currentQuestion.grading?.feedback && (
        <Box marginTop={1} flexDirection="column">
          <Text bold>Feedback:</Text>
          <Text dimColor>{currentQuestion.grading.feedback}</Text>
        </Box>
      )}
    </Box>
  );
}

export default Answer;
