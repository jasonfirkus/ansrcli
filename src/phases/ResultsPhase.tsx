import { Text } from "ink";
import React from "react";
import Phase from "../types/phase.js";

const ResultsPhase = ({
  sourcePdfPath,
  numQuestions,
  setPhase,
}: {
  sourcePdfPath?: string;
  numQuestions: number;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
}) => {
  throw new Error("Test error in ResultsPhase");
  return <Text></Text>;
};

export default ResultsPhase;
