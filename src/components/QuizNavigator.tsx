import React from "react";
import { Box, Text } from "ink";
import { ANSR_BLUE_BG } from "../constants/colors.js";
import Question from "../types/question.js";
import { BOX } from "../constants/grid.js";

const QuizNavigator = ({
  questions,
  indexSelected,
}: {
  questions: Question[];
  indexSelected: (index: number) => boolean;
}) => {
  const totalCorrect = calcTotalCorrect();
  const numQuestions = questions.length;

  function calcTotalCorrect() {
    return questions.reduce((acc, q) => (q?.grading?.correct ? acc + 1 : acc), 0);
  }

  return (
    // FIXME center while still justify left, maybe with fixed width?
    <Box
      flexDirection="column"
      alignItems="center"
      gap={1}
      borderDimColor
      borderStyle={"round"}
      height={"70%"}>
      <Box flexWrap="wrap" justifyContent="flex-start">
        {questions.map((q, index) => (
          <Box
            key={index}
            borderStyle={"round"}
            borderColor={q.grading?.correct ? "green" : "red"}
            backgroundColor={indexSelected(index) ? ANSR_BLUE_BG : "transparent"}
            padding={0}
            width={BOX.WIDTH}
            height={BOX.HEIGHT}
            justifyContent="center">
            <Text>{index + 1}</Text>
          </Box>
        ))}
      </Box>
      <Text>
        <Text color={"green"}> {totalCorrect}</Text>/{numQuestions},{" "}
        {((totalCorrect / numQuestions) * 100).toFixed(1)}%
      </Text>
    </Box>
  );
};

export default QuizNavigator;
