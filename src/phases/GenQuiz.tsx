import { Text } from "ink";
import React from "react";
import QuizFormat from "../types/quiz-format.js";
import Loading from "../components/Loading.js";

const GenQuiz = ({
  filePath,
  numQuestions,
  quizFormat,
}: {
  filePath: string;
  numQuestions: number;
  quizFormat: QuizFormat;
}) => {
  return <Loading message={"Generating quiz..."} />;
};

export default GenQuiz;
