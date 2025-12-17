import React from "react";
import SelectInput from "ink-select-input";
import Question from "../../types/question.js";

const MultipleChoiceQuestion = ({
  writeAnswer,
  question: question,
}: {
  writeAnswer: (answer: string) => void;
  question: Question;
}) => {
  const { options } = question;
  const mcOptions = options
    ? [
        { label: "A) " + options[0], value: "A" },
        { label: "B) " + options[1], value: "B" },
        { label: "C) " + options[2], value: "C" },
        { label: "D) " + options[3], value: "D" },
      ]
    : [];

  return (
    <SelectInput
      initialIndex={Math.max(
        mcOptions.findIndex(option => option.value == question.answer),
        0
      )}
      items={mcOptions}
      onSelect={option => writeAnswer(option.value)}
    />
  );
};

export default MultipleChoiceQuestion;
