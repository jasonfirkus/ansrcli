import { Text } from "ink";
import React from "react";

const ErrorPhase = ({ error }: { error?: unknown }) => {
  console.log("ErrorPhase error:", error);

  return <Text>Uh Oh Error </Text>;
};

export default ErrorPhase;
