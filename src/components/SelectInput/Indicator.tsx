import React from "react";
import { Box, Text } from "ink";
import { ANSR_BLUE } from "../../constants/colors.js";

export type Props = {
  readonly isSelected?: boolean;
};

function Indicator({ isSelected = false }: Props) {
  return (
    <Box marginRight={1}>{isSelected ? <Text color={ANSR_BLUE}>➤</Text> : <Text> </Text>}</Box>
  );
}

export default Indicator;
