import React, { useState } from "react";
import type Phase from "../types/phase.js";
import fs from "fs";
import ShortAnswerQuestion from "../components/Questions/ShortAnswerQuestion.js";
import MultipleChoiceQuestion from "../components/Questions/MultipleChoiceQuestion.js";
import TrueFalseQuestion from "../components/Questions/TrueFalseQuestion.js";
import { Text, Box } from "ink";
import { useInput } from "ink";

const QuizPhase = ({
  quizPath,
  setPhase,
  numQuestions,
}: {
  quizPath: string;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  numQuestions: number;
}) => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const response = JSON.parse(fs.readFileSync(quizPath, "utf8"));
  const prevAnswer = response.questions[currentQuestionNum]?.answer ?? "";
  const currentQuestion = response.questions[currentQuestionNum];

  function writeAnswer(answer: string) {
    response.questions[currentQuestionNum].answer = answer;
    fs.writeFileSync(quizPath, JSON.stringify(response));
  }

  useInput((input, key) => {
    if (key.rightArrow) {
      setCurrentQuestionNum((qNum) => {
        const nextQIndex = qNum + 1;

        if (nextQIndex > numQuestions - 1) return qNum;

        return nextQIndex;
      });

      return;
    }

    if (key.leftArrow) {
      setCurrentQuestionNum((qNum) => {
        const prevQIndex = qNum - 1;

        if (prevQIndex < 0) return qNum;

        return prevQIndex;
      });

      return;
    }
  });

  return (
    <Box flexDirection="column">
      <Text>{`Q${currentQuestionNum + 1} ${currentQuestion.content}`}</Text>
      {currentQuestion.type == "short" && (
        <ShortAnswerQuestion
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
          writeAnswer={writeAnswer}
          userAnswer={prevAnswer}
          setPhase={setPhase}
          currentQNum={currentQuestionNum}
        />
      )}
      {currentQuestion.type == "mc" && (
        <MultipleChoiceQuestion
          options={currentQuestion.options}
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
          writeAnswer={writeAnswer}
          setPhase={setPhase}
          currentQNum={currentQuestionNum}
        />
      )}
      {currentQuestion.type == "tf" && (
        <TrueFalseQuestion
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
          writeAnswer={writeAnswer}
          setPhase={setPhase}
          currentQNum={currentQuestionNum}
        />
      )}
    </Box>
  );
};

export default QuizPhase;
