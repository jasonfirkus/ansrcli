import React, { useState } from "react";
import type Phase from "../types/phase.js";
import fs from "fs";
import ShortAnswerQuestion from "../components/Questions/ShortAnswerQuestion.js";
import type QuestionType from "../types/question.js";
import MultipleChoiceQuestion from "../components/Questions/MultipleChoiceQuestion.js";
import TrueFalseQuestion from "../components/Questions/TrueFalseQuestion.js";
import { Text, Box } from "ink";

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
  const questions = JSON.parse(fs.readFileSync(quizPath, "utf8"));
  const currentQuestion = questions[currentQuestionNum];

  function writeAnswer(answer: string) {
    questions[currentQuestionNum].answer = answer;
    fs.writeFileSync(quizPath, JSON.stringify(questions));
  }

  return (
    <Box flexDirection="column">
      <Text>{`Q${currentQuestionNum} ${currentQuestion.content}`}</Text>
      {currentQuestion.type == "short" && (
        <ShortAnswerQuestion
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
          writeAnswer={writeAnswer}
        />
      )}
      {currentQuestion.type == "mc" && (
        <MultipleChoiceQuestion
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
          currentQNum={currentQuestionNum}
        />
      )}
      {currentQuestion.type == "tf" && (
        <TrueFalseQuestion
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
          currentQNum={currentQuestionNum}
        />
      )}
    </Box>
  );
};

export default QuizPhase;
