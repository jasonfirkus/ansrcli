import type Question from "../../types/question.js";
import { Box } from "ink";
import React from "react";
import InputLine from "../inputline.js";
import SelectInput from "ink-select-input";

const MultipleChoiceQuestion = ({
  setCurrentQNum,
  writeAnswer,
  setPhase,
  currentQNum,
  numQuestions,
}: {
  data: Question;
  currentQnum: number;
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
  setPhase: React.Dispatch<React.SetStateAction<string>>;
  numQuestions: number;
}) => {
  const options = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
  ];

  return (
    <SelectInput
      items={options}
      onSelect={(option) => {
        writeAnswer(option.value);

        if (currentQnum + 1 > numQuestions) {
          setPhase("results");
        }

        setCurrentQNum((qNum) => {
          const nextQIndex = qNum + 1;

          if (nextQIndex > numQuestions) return qNum;

          return nextQIndex;
        });
      }}
    />
  );
};

export default MultipleChoiceQuestion;
