import React, { useState } from "react";
import type Phase from "../types/phase.js";
import fs from "fs";
import ShortAnswerQuestion from "../components/Questions/ShortAnswerQuestion.js";
import type QuestionType from "../types/question.js";
import MultipleChoiceQuestion from "../components/Questions/MultipleChoiceQuestion.js";
import TrueFalseQuestion from "../components/Questions/TrueFalseQuestion.js";
import { Text } from "ink";

const QuizPhase = ({
  quizPath,
  setPhase,
}: {
  quizPath: string;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
}) => {
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const questions = JSON.parse(fs.readFileSync(quizPath, "utf8"));
  const currentQuestion = questions[currentQuestionNum];

  if (currentQuestion.type == "short") {
    return <ShortAnswerQuestion data={currentQuestion as QuestionType} />;
  }

  if (currentQuestion.type == "mc") {
    return <MultipleChoiceQuestion data={currentQuestion as QuestionType} />;
  }

  if (currentQuestion.type == "tf") {
    return <TrueFalseQuestion data={currentQuestion as QuestionType} />;
  }

  return <Text>{"Invalid question "}</Text>;
};

export default QuizPhase;
