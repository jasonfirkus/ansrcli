import { Spacer, Text, useApp, useInput, Box } from "ink";
import React, { useState, useEffect } from "react";
import Phase from "../../types/phase.js";
import fs from "fs";
import Answer from "../../components/Answer.js";
import ResultsSummary from "./ResultsSummary.js";
import Quiz from "../../types/quiz.js";
import { resolveFromRoot } from "../../utils/resolve-root.js";
import ResultDetails from "./ResultDetails.js";
import ResultsFooter from "./ResultsFooter.js";

const ResultsPhase = ({
  quizPath,
  numQuestions,
}: {
  quizPath: string;
  numQuestions: number;
}) => {
  const quiz: Quiz = JSON.parse(
    fs.readFileSync(
      resolveFromRoot("samples", "sample-quiz-1.json"), // quizPath
      "utf8"
    )
  );
  //TODO change questions to 2D array?

  return (
    <Box flexDirection="column" height={23}>
      <Box height={"100%"}>
        <ResultsSummary quiz={quiz} />
        <ResultDetails />
      </Box>

      <Spacer />

      <ResultsFooter />
    </Box>
  );
};

export default ResultsPhase;
