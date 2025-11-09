import React from "react";
import SelectInput from "ink-select-input";
import Phase from "../../types/phase.js";
import Question from "../../types/question.js";

const MultipleChoiceQuestion = ({
  setCurrentQNum,
  writeAnswer,
  setPhase,
  options,
  currentQNum,
  numQuestions,
  currentQuestion,
}: {
  currentQNum: number;
  setCurrentQNum: React.Dispatch<React.SetStateAction<number>>;
  writeAnswer: (answer: string) => void;
  options: string[];
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  numQuestions: number;
  currentQuestion: Question;
}) => {
  const optionItems = [
    { label: "A) " + options[0], value: "A" },
    { label: "B) " + options[1], value: "B" },
    { label: "C) " + options[2], value: "C" },
    { label: "D) " + options[3], value: "D" },
  ];

  return (
    <SelectInput
      initialIndex={currentQuestion?.answer ? 0 }
      items={optionItems}
      onSelect={option => {
        writeAnswer(option.value);

        if (currentQNum + 1 > numQuestions) {
          setPhase("results");
        }

        setCurrentQNum(qNum => {
          const nextQIndex = qNum + 1;

          if (nextQIndex > numQuestions) return qNum;

          return nextQIndex;
        });
      }}
    />
  );
};

export default MultipleChoiceQuestion;
