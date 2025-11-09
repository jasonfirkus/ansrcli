import type Question from "../../types/question.js";
import { Box, Text } from "ink";
import React from "react";
import InputLine from "../inputline.js";

const ShortAnswerQuestion = ({
  data,
  setCurrentQNum,
  writeAnswer,
}: {
  data: Question;
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
}) => {
  return <InputLine onSubmit={raw => writeAnswer(raw)} />;
};

export default ShortAnswerQuestion;
