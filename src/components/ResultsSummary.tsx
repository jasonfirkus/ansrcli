import React from "react";

import { Box, Text } from "ink";
import Quiz from "../types/quiz.js";

const ResultsSummary = ({ quiz }: { quiz: Quiz }) => {
  const totalCorrect = calcTotalCorrect();

  function calcTotalCorrect() {
    return quiz.questions.reduce((acc, q) => (q?.grading?.correct ? acc + 1 : acc), 0);
  }

  return (
    <Box flexDirection="column">
      <Text>
        {totalCorrect}/{quiz.questions.length},{" "}
        {((totalCorrect / quiz.questions.length) * 100).toFixed(1)}%
      </Text>
    </Box>
  );
};

export default ResultsSummary;
