import type Question from "../../types/question.js";
import React from "react";
import SelectInput from "../SelectInput/index.js";

const TF_ITEMS = [
  { label: "True", value: "true" },
  { label: "False", value: "false" },
];

const TrueFalseQuestion = ({
  writeAnswer,
  question,
}: {
  writeAnswer: (answer: string) => void;
  question: Question;
}) => {
  return (
    <SelectInput
      items={TF_ITEMS}
      onSelect={item => writeAnswer(item.value)}
      initialIndex={Math.max(
        TF_ITEMS.findIndex(item => item.value == question?.answer),
        0
      )}
    />
  );
};

export default TrueFalseQuestion;
