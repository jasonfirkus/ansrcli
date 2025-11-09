import { Text } from "ink";
import React, { useState, useEffect } from "react";
import Phase from "../types/phase.js";
import fs from "fs";
import { useInput } from "ink";
import Answer from "../components/Answer.js";

const ResultsPhase = ({
  quizPath,
  setPhase,
  numQuestions,
}: {
  quizPath: string;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
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

    if (key.return) {
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
    </>

  )
};

export default ResultsPhase;
