import { Text } from "ink";
import React from "react";
import type Phase from "../types/phase.js";

const ResultsPhase = ({
  sourcePdfPath,
  numQuestions,
  setPhase,
  quizPath,
}: {
  sourcePdfPath?: string;
  numQuestions: number;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  quizPath: string;
}) => {
  // read quizPath file and display results to user

  return <Text>GOT TO RESULTS, YIPPE</Text>;
};

export default ResultsPhase;
