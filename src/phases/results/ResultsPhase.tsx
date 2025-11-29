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
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const { exit } = useApp();

  const quiz: Quiz = JSON.parse(
    fs.readFileSync(
      resolveFromRoot("samples", "sample-quiz-1.json"), // quizPath
      "utf8"
    )
  );

  useInput((input, key) => {
    if (key.rightArrow) {
      setCurrentQuestionNum(qNum => {
        const nextQIndex = qNum + 1;

        if (nextQIndex > numQuestions - 1) return qNum;

        return nextQIndex;
      });

      return;
    }

    if (key.leftArrow) {
      setCurrentQuestionNum(qNum => {
        const prevQIndex = qNum - 1;

        if (prevQIndex < 0) return qNum;

        return prevQIndex;
      });

      return;
    }

    if (key.return) {
      exit();
    }
  });

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
