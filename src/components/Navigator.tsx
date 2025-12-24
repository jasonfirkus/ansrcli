import React from "react";
import { Box, Text } from "ink";
import { ANSR_BLUE_BG } from "../constants/colors.js";
import Question from "../types/question.js";
import { BOX } from "../constants/grid.js";

const Navigator = ({
  questions,
  indexSelected,
}: {
  questions: Question[];
  indexSelected: (index: number) => boolean;
}) => {
  return (
    // FIXME center while still justify left, maybe with fixed width?
    <Box flexWrap={"wrap"} justifyContent="flex-start" width={"100%"}>
      {questions.map((q, index) => (
        <Box
          key={index}
          borderStyle={"round"}
          borderColor={q.grading?.correct ? "green" : "red"}
          backgroundColor={indexSelected(index) ? ANSR_BLUE_BG : "transparent"}
          width={BOX.WIDTH}
          height={BOX.HEIGHT}
          justifyContent="center">
          <Text>{index + 1}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default Navigator;
