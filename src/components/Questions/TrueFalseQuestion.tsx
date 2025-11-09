import type Question from "../../types/question.js";
import { Box, Text } from "ink";
import React from "react";
import TextInput from "../TextInput.js";
import SelectInput from "ink-select-input";
import Phase from "../../types/phase.js";

const TrueFalseQuestion = ({
  currentQNum,
  setCurrentQNum,
  writeAnswer,
  setPhase,
  numQuestions,
  currentQuestion,
}: {
  currentQNum: number;
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  numQuestions: number;
  currentQuestion: Question;
}) => {
  const handleSelect = (item: { label: string; value: string }) => {
    writeAnswer(item.value);
    if (currentQNum + 1 >= numQuestions) {
      setPhase("results");
      return;
    }
    setCurrentQNum(prev => prev + 1);
  };

  const items = [
    {
      label: "True",
      value: "true",
    },
    {
      label: "False",
      value: "false",
    },
  ];

  return (
    <SelectInput
      items={items}
      onSelect={handleSelect}
      initialIndex={Math.max(
        items.findIndex(item => item.value == currentQuestion?.answer),
        0
      )}
    />
  );
};

export default TrueFalseQuestion;
