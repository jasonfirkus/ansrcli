import React from "react";
import { Box, Text } from "ink";

const MultipleChoiceResults = ({
  chosen,
  expected,
  options,
  correct,
}: {
  chosen: string;
  expected: string;
  options: string[];
  correct: boolean;
}) => {
  const optionCodes = ["A", "B", "C", "D"];

  function getColor(code: string) {
    if (code == chosen) {
      if (correct) {
        return "green";
      } else {
        return "red";
      }
    } else if (code == expected) {
      return "green";
    }

    return "white";
  }

  return (
    <Box flexDirection="column">
      {options.map((option, index) => (
        <Text
          key={index}
          color={getColor(optionCodes[index]!)}
          dimColor={optionCodes[index] != expected}
          // bold={optionCodes[index] == expected} FIXME bold doesn't seem to do anything here?
        >
          {chosen == optionCodes[index] && "➤ "}
          {optionCodes[index]}) {option}
        </Text>
      ))}
    </Box>
  );
};

export default MultipleChoiceResults;
