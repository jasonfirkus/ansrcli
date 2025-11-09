import type Question from "../../types/question.js";
import { Box, Text } from "ink";
import React from "react";
import useTextInput from "../../hooks/useTextInput.js";

const ShortAnswerQuestion = ({
  setCurrentQNum,
  writeAnswer,
  numQuestions,
}: {
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
  numQuestions: number;
}) => {
  return (
    <useTextInput
      setCurrentQuestionNum={setCurrentQNum}
      onSubmit={raw => writeAnswer(raw)}
      numQuestions={numQuestions}
    />
  );
};

export default ShortAnswerQuestion;
