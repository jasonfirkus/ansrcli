import React from "react";
import TextInput from "../../hooks/useTextInput.js";
import Phase from "../../types/phase.js";

const ShortAnswerQuestion = ({
  setCurrentQNum,
  writeAnswer,
  numQuestions,
  userAnswer,
  setPhase,
  currentQNum,
}: {
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
  numQuestions: number;
  userAnswer?: string;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  currentQNum: number;
}) => {
  return (
    <TextInput
      setCurrentQuestionNum={setCurrentQNum}
      onSubmit={(raw) => writeAnswer(raw)}
      numQuestions={numQuestions}
      userAnswer={userAnswer}
      setPhase={setPhase}
      currentQNum={currentQNum}
    />
  );
};

export default ShortAnswerQuestion;
