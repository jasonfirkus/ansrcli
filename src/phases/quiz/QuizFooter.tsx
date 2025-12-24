import React from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";

const QuizFooter = () => {
  return (
    <Box justifyContent="space-between">
      <Gradient name="vice">
        <Text>ansrcli</Text>
      </Gradient>

      <Box gap={3}>
        <Text>
          ↑←↓→ <Text dimColor>navigate</Text>
        </Text>

        <Text>
          tab <Text dimColor>change answer</Text>
        </Text>

        <Text>
          ⏎ <Text dimColor>submit answer</Text>
        </Text>

        {/* <Text>
          r <Text dimColor>retry quiz</Text>
        </Text>

        <Text>
          n <Text dimColor>new quiz (same source)</Text>
        </Text> */}

        <Text>
          q <Text dimColor>exit</Text>
        </Text>
      </Box>
    </Box>
  );
};

export default QuizFooter;
