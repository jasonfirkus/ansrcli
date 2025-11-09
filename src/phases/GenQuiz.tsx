import { Text } from "ink";
import React from "react";
import QuizFormat from "../types/quiz-format.js";
import Loading from "../components/Loading.js";
import getMostRecentDownload from "../utils/get-most-recent-download.js";

const GenQuiz = ({
  filePath,
  numQuestions,
  quizFormat,
}: {
  filePath?: string;
  numQuestions: number;
  quizFormat: QuizFormat;
}) => {
  let path;
  if (!filePath) {
    path = getMostRecentDownload();
  } else {
    path = filePath;
  }

  return <Loading message={"Generating quiz..."} />;
};

export default GenQuiz;
