import React, { useState } from "react";

import { Box, Text } from "ink";
import Quiz from "../../types/quiz.js";

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
  const [selectedQIndex, setSelectedQIndex] = useState(0);

  const totalCorrect = calcTotalCorrect();
  const { questions } = quiz;
  const numQuestions = questions.length;

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
            borderStyle={selectedQIndex === index ? "double" : "round"}
            borderColor={q.grading?.correct ? "green" : "red"}
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

      <Box
        borderStyle={"round"}
        borderColor={"blue"}
        height={4}
        width={8}
        alignItems="center"
        flexDirection="column"
        padding={0}
        margin={0}>
        <Box
          width={6}
          height={4}
          borderStyle={"round"}
          borderColor={"green"}
          justifyContent="center"
          padding={0}
          margin={0}>
          <Text>t</Text>
        </Box>
      </Box>

      {/* TODO add like topics to focus on (get from ai) */}
    </Box>
  );
};

export default ResultsSummary;
