// Footer.tsx
import React from "react";
import { Box, Text } from "ink";

export function Footer() {
  return (
    <Box borderStyle="round" paddingX={1} gap={3}>
      <Text>
        ← <Text dimColor>previous</Text>
      </Text>

      <Text>
        → <Text dimColor>next</Text>
      </Text>
      <Text>
        Enter <Text dimColor>submit</Text>
      </Text>
      <Text>
        Ctrl+Q / Ctrl+C <Text dimColor>exit</Text>
      </Text>
    </Box>
  );
}
