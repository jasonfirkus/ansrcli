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
  console.log("🚀 ~ QuizPhase.tsx ~ QuizPhase ~ currentQuestionNum: ", currentQuestionNum);

  const response = JSON.parse(fs.readFileSync(quizPath, "utf8"));
  console.log("🚀 ~ QuizPhase.tsx ~ QuizPhase ~ response: ", response);

  const currentQuestion = response.questions[currentQuestionNum];
  console.log("🚀 ~ QuizPhase.tsx ~ QuizPhase ~ currentQuestion: ", currentQuestion);

  function writeAnswer(answer: string) {
    response[currentQuestionNum].answer = answer;
    fs.writeFileSync(quizPath, JSON.stringify(response));
  }

  return (
    <Box flexDirection="column">
      <Text>{`Q${currentQuestionNum + 1} ${currentQuestion.content}`}</Text>
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
