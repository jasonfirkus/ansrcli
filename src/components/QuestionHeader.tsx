import React from "react";
import { Text } from "ink";
import { ANSR_BLUE } from "../constants/colors.js";

const QuestionHeader = ({ num, content }: { num: number; content: string }) => {
  return (
    <Text>
      <Text color={ANSR_BLUE} bold>
        Q{num + 1}:{" "}
      </Text>
      {content}
    </Text>
  );
};

export default QuestionHeader;
