import React from "react";
import { Box, Text } from "ink";

const TrueFalseResults = ({
  chosen,
  correct,
  expected,
}: {
  chosen: boolean;
  correct: boolean;
  expected: boolean;
}) => {
  function getColor(x: boolean) {
    if (x === correct) return "green";

    if (x === chosen) return "red";

    return "white";
  }
  //▸
  return (
    <Box flexDirection="column">
      <Text color={getColor(true)} dimColor={!expected}>
        {chosen && "➤ "}True
      </Text>
      <Text color={getColor(false)} dimColor={expected}>
        {!chosen && "➤ "}False
      </Text>
    </Box>
  );
};

export default TrueFalseResults;
