import React from "react";
import TextInput from "../../hooks/useTextInput.js";

const ShortAnswerQuestion = ({
  setCurrentQNum,
  writeAnswer,
  numQuestions,
  userAnswer,
}: {
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
  numQuestions: number;
  userAnswer?: string;
}) => {
  return (
    <TextInput
      setCurrentQuestionNum={setCurrentQNum}
      onSubmit={(raw) => writeAnswer(raw)}
      numQuestions={numQuestions}
      userAnswer={userAnswer}
    />
  );
};

export default ShortAnswerQuestion;
