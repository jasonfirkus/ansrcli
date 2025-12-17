import React from "react";
import { Box, Text } from "ink";
import { ANSR_BLUE, ANSR_BLUE_BG } from "../../constants/colors.js";
import formatSeconds from "../../utils/format-seconds.js";

const ResultsSummary = ({ time = 0 }: { time?: number }) => {
  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      height={"30%"}
      // borderDimColor bug with this, affects all left text
      borderColor={"rgb(127, 127, 127)"}
      gap={1}>
      {/* TODO add topics to focus on (get from ai) */}
      <Box flexDirection="column">
        <Text color={ANSR_BLUE} bold dimColor={false}>
          Time Elapsed:
        </Text>
        <Text>{formatSeconds(time)}</Text>
      </Box>

      <Text color={ANSR_BLUE} bold>
        Topics To Focus On:
      </Text>
    </Box>
  );
};

export default ResultsSummary;
