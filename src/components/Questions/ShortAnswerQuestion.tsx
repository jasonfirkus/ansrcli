import type Question from "../../types/question.js";
import { Box, Text } from "ink";
import React from "react";
import TextInput from "../TextInput.js";
import Phase from "../../types/phase.js";

const ShortAnswerQuestion = ({
  setCurrentQNum,
  writeAnswer,
  numQuestions,
  currentQuestion,
  setPhase,
}: {
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
  numQuestions: number;
  currentQuestion: Question;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
}) => {
  return (
    <TextInput
      setCurrentQuestionNum={setCurrentQNum}
      onSubmit={raw => writeAnswer(raw)}
      numQuestions={numQuestions}
      defaultValue={currentQuestion?.answer}
      setPhase={setPhase}
    />
  );
};

export default ShortAnswerQuestion;
