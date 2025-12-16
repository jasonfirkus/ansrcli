import type Question from "../../types/question.js";
import React from "react";
import TextInput from "../TextInput.js";

const ShortAnswerQuestion = ({
  writeAnswer,
  question,
}: {
  writeAnswer: (answer: string) => void;
  question: Question;
}) => {
  return <TextInput onSubmit={raw => writeAnswer(raw)} defaultAnswer={question?.answer} />;
};

export default ShortAnswerQuestion;
