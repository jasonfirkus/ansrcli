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
          data={currentQuestion as QuestionType}
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
          onSubmit={writeAnswer}
        />
      )}
      {currentQuestion.type == "mc" && (
        <MultipleChoiceQuestion
          data={currentQuestion as QuestionType}
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
        />
      )}
      {currentQuestion.type == "tf" && (
        <TrueFalseQuestion
          data={currentQuestion as QuestionType}
          setCurrentQNum={setCurrentQuestionNum}
          numQuestions={numQuestions}
        />
      )}
    </Box>
  );
};

export default QuizPhase;
