import type Question from "../../types/question.js";
import { Box, Text } from "ink";
import React from "react";
import InputLine from "../inputline.js";

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
    <InputLine
      setCurrentQuestionNum={setCurrentQNum}
      onSubmit={raw => writeAnswer(raw)}
      numQuestions={numQuestions}
    />
  );
};

export default ShortAnswerQuestion;
