import React from "react";
import { Box, Text } from "ink";

const ShortAnswerResults = ({
  chosen,
  expected,
  correct,
}: {
  chosen: string;
  expected: string;
  correct: boolean;
}) => {
  return (
    <Box flexDirection="column">
      <Text color={correct ? "green" : "red"} dimColor={!correct}>
        ➤ {chosen}
      </Text>
      {!correct && <Text color={"green"}>{expected}</Text>}
    </Box>
  );
};

export default ShortAnswerResults;
