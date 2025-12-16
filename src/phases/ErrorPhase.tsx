import { Text } from "ink";
import React from "react";

const ErrorPhase = ({ error }: { error: Error }) => {
  console.log("ErrorPhase error:", error);

  return <Text color={"red"}>Oops, we didn't expect that</Text>;
};

export default ErrorPhase;
