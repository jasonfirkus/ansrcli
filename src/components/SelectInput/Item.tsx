import * as React from "react";
import { Box, Text } from "ink";
import { ANSR_BLUE } from "../../constants/colors.js";

export type Props = {
  readonly isSelected?: boolean;
  readonly label: string;
};

function Item({ isSelected = false, label }: Props) {
  return (
    <Box overflowX="hidden">
      <Text color={isSelected ? ANSR_BLUE : undefined} dimColor={!isSelected}>
        {label}
      </Text>
    </Box>
  );
}

export default Item;
