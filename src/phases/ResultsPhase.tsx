import { Text } from "ink";
import React, { useState, useEffect } from "react";
import Phase from "../types/phase.js";
import fs from "fs";
import { useInput, Box } from "ink";
import Answer from "../components/Answer.js";
import ResultsSummary from "../components/ResultsSummary.js";
import Quiz from "../types/quiz.js";
import { resolveFromRoot } from "../utils/resolve-root.js";

const ResultsPhase = ({
  quizPath,
  numQuestions,
}: {
  quizPath: string;
  numQuestions: number;
}) => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const quiz: Quiz = JSON.parse(fs.readFileSync(quizPath, "utf8"));

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(t);
  }, []);

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
      process.exit(0);
    }
  });

  return (
    // split view with question card on right with red/green highlight & details on right
    <Box flexDirection="column" gap={1}>
      <Box flexDirection="row">
        <ResultsSummary quiz={quiz} />
      </Box>

      <Text color={"green"}>{cursorVisible ? <Text inverse> </Text> : " "}</Text>

      <Box paddingX={1} gap={3}>
        <Text>
          ← <Text dimColor>previous</Text>
        </Text>

        <Text>
          → <Text dimColor>next</Text>
        </Text>
        <Text>
          ⏎ or ^+c <Text dimColor>exit program</Text>
        </Text>
      </Box>
    </Box>
  );
};

export default ResultsPhase;
