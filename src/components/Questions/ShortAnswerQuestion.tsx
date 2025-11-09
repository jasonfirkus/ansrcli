import type Question from "../../types/question.js";
import { Box, Text } from "ink";
import React from "react";

const ShortAnswerQuestion = ({
  data,
  setCurrentQNum,
}: {
  data: Question;
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Box flexDirection="column">
      <Text>{`Q${data.content}`}</Text>
      <InputLine
        onSubmit={raw => }
      />
    </Box>
  );
};

export default ShortAnswerQuestion;
