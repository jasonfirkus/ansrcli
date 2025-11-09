import { Text } from "ink";
import React, { useState, useEffect } from "react";
import Phase from "../types/phase.js";
import fs from "fs";
import { useInput, Box } from "ink";
import Answer from "../components/Answer.js";

const ResultsPhase = ({
  quizPath,
  numQuestions,
}: {
  quizPath: string;
  numQuestions: number;
}) => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const quiz = JSON.parse(fs.readFileSync(quizPath, "utf8"));

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

    if (key.return || (key.ctrl && input == 'q')) {
      process.exit(0);
      return;
    }
  });

  return (

    <>
      <Answer
        currentQuestion={quiz.questions[currentQuestionNum]}
      />
      
      <Text color={"green"}>
        {cursorVisible ? <Text inverse> </Text> : " "}
      </Text>

      <Box borderStyle="round" paddingX={1} gap={3}>
        <Text>
          ← <Text dimColor>previous</Text>
        </Text>

        <Text>
          → <Text dimColor>next</Text>
        </Text>
        <Text>
          Enter / Ctrl+Q / Ctrl+C <Text dimColor>exit program</Text>
        </Text>
      </Box>
    </>

  )
};

export default ResultsPhase;
