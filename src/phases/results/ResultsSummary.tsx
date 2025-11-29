import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import Quiz from "../../types/quiz.js";
import Gradient from "ink-gradient";

const SELECTED_BORDER_STYLE = {
  topLeft: ".",
  top: "-",
  topRight: ".",
  left: "|",
  bottomLeft: ".",
  bottom: "-",
  bottomRight: ".",
  right: "|",
};

const ResultsSummary = ({ quiz }: { quiz: Quiz }) => {
  const [selectedQIndex, setSelectedQIndex] = useState(4);

  const totalCorrect = calcTotalCorrect();
  const { questions } = quiz;
  const numQuestions = questions.length;

  useInput((input, key) => {
    if (key.rightArrow) {
      setSelectedQIndex(qNum => {
        const nextQIndex = qNum + 1;

        if (nextQIndex > numQuestions - 1) return qNum;

        return nextQIndex;
      });

      return;
    }

    if (key.leftArrow) {
      setSelectedQIndex(qNum => {
        const nextQIndex = qNum - 1;

        if (nextQIndex < 0) return qNum;

        return nextQIndex;
      });

      return;
    }
  });

  function calcTotalCorrect() {
    return quiz.questions.reduce((acc, q) => (q?.grading?.correct ? acc + 1 : acc), 0);
  }

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderDimColor
      width={"30%"}
      height={"100%"}
      alignItems="center">
      <Box flexWrap="wrap" justifyContent="center">
        {questions.map((q, index) => (
          <Box
            borderStyle={"round"}
            borderColor={q.grading?.correct ? "green" : "red"}
            backgroundColor={selectedQIndex === index ? "cyan" : "transparent"}
            padding={0}
            width={6}
            height={3}
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
