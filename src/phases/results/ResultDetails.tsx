import React from "react";
import { Box, Text } from "ink";
import Question from "../../types/question.js";

const ResultDetails = ({ question, num }: { question: Question; num: number }) => {
  return (
    <Box
      flexDirection={"column"}
      width={"70%"}
      borderStyle="round"
      borderDimColor
      paddingX={1}>
      <Box backgroundColor={"rgb(53, 53, 53)"}>
        <Text>
          Q{num + 1}: {question.content}
        </Text>
        <Text>{question.answer}</Text>
        <Text>{question.answer}</Text>
      </Box>
    </Box>
  );
};

export default ResultDetails;
