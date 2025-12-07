import React from "react";
import { Box, Text } from "ink";
import Question from "../../types/question.js";
import { ANSR_BLUE, ANSR_BLUE_BG } from "../../constants/colors.js";

const ResultsSummary = ({ questions }: { questions: Question[] }) => {
  const totalCorrect = calcTotalCorrect();
  const numQuestions = questions.length;

  function calcTotalCorrect() {
    return questions.reduce((acc, q) => (q?.grading?.correct ? acc + 1 : acc), 0);
  }

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderDimColor
      alignItems="center"
      height={"30%"}>
      <Text>
        {totalCorrect}/{numQuestions}, {((totalCorrect / numQuestions) * 100).toFixed(1)}%
      </Text>

      {/* TODO add topics to focus on (get from ai) */}
      <Text color={ANSR_BLUE} bold>
        Topics To Focus On
      </Text>
    </Box>
  );
};

export default ResultsSummary;
