import { Text } from "ink";
import React from "react";

const ErrorPhase = ({ error }: { error: Error }) => {
  console.log("ErrorPhase error:", error?.message);
  console.log("ErrorPhase stack trace:", error?.stack);

  return <Text>Uh Oh Error </Text>;
};

export default ErrorPhase;
