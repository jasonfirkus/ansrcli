import { Text, Box } from "ink";
import Gradient from "ink-gradient";
import React from "react";

const ResultsFooter = () => {
  return (
    <Box justifyContent="space-between">
      <Gradient name="vice">
        <Text>ansrcli</Text>
      </Gradient>

      <Box gap={3}>
        <Box flexDirection="row" gap={1}>
          <Text>↑←↓→</Text>
          <Text dimColor>navigate questions</Text>
        </Box>

        <Text>
          r <Text dimColor>retry quiz</Text>
        </Text>

        <Text>
          n <Text dimColor>new quiz (same source)</Text>
        </Text>

        <Text>
          ⏎ <Text dimColor>or</Text> ctrl+c <Text dimColor>exit program</Text>
        </Text>
      </Box>
    </Box>
  );
};

export default ResultsFooter;
