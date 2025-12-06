import React from "react";
import { Box, Text } from "ink";
import { BOX, QUESTION_NAVIGATOR } from "../../constants/grid.js";
import Question from "../../types/question.js";

const ResultsSummary = ({
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
    <Box
      flexDirection="column"
      borderStyle="round"
      borderDimColor
      width={`${QUESTION_NAVIGATOR.WIDTH * 100}%`}
      height={`${QUESTION_NAVIGATOR.HEIGHT * 100}%`}
      alignItems="center">
      {/* FIXME center while still justify left, maybe with fixed width? */}
      <Box flexWrap="wrap" justifyContent="flex-start">
        {questions.map((q, index) => (
          <Box
            key={index}
            borderStyle={"round"}
            borderColor={q.grading?.correct ? "green" : "red"}
            backgroundColor={indexSelected(index) ? "rgb(35, 96, 227)" : "transparent"}
            padding={0}
            width={BOX.WIDTH}
            height={BOX.HEIGHT}
            justifyContent="center">
            <Text>{index + 1}</Text>
          </Box>
        ))}
      </Box>

      <Text>
        {totalCorrect}/{numQuestions}, {((totalCorrect / numQuestions) * 100).toFixed(1)}%
      </Text>

      {/* TODO add topics to focus on (get from ai) */}
    </Box>
  );
};

export default ResultsSummary;
