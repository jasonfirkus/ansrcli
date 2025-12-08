import React from "react";
import { Box, Text } from "ink";
import Question from "../../types/question.js";
import { ANSR_BLUE, ANSR_BLUE_BG } from "../../constants/colors.js";

const ResultsSummary = ({ questions }: { questions: Question[] }) => {
  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderDimColor
      alignItems="center"
      height={"30%"}>
      {/* TODO add topics to focus on (get from ai) */}
      <Text color={ANSR_BLUE} bold>
        Topics To Focus On
      </Text>
    </Box>
  );
};

export default ResultsSummary;
