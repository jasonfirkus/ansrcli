import type Question from "../../types/question.js";
import { Box, Text } from "ink";
import React from "react";
import InputLine from "../inputline.js";
import SelectInput from 'ink-select-input';
import Phase from "../../types/phase.js";

const TrueFalseQuestion = ({
  currentQNum,
  setCurrentQNum,
  writeAnswer,
  setPhase,
  numQuestions,
}: {
  currentQNum: number;
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  numQuestions: number;
}) => {

  const handleSelect = (item: { label: string; value: string }) => {
    writeAnswer(item.value);
    if (currentQNum + 1 >= numQuestions) {
      setPhase("results");
      return;
    }
    setCurrentQNum((prev) => prev + 1);
  };

  const items = [
    {
      label: 'True',
      value: 'true'
    },
    {
      label: 'False',
      value: 'false'
    }
  ];

  return (
    <SelectInput items={items} onSelect={handleSelect} />
  );
};

export default TrueFalseQuestion;
