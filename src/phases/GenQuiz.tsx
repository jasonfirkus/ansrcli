import { Text } from "ink";
import React from "react";
import QuizFormat from "../types/quiz-format.js";
import Loading from "../components/Loading.js";
import getMostRecentDownload from "../utils/get-most-recent-download.js";
import type Phase from "../types/phase.js";
import genQuiz from "../services/quiz.service.js";
import stamp from "../utils/stamp.js";
import writeQuizJSON from "../utils/write-quiz-json.js";

const GenQuiz = ({
  sourcePdfPath,
  numQuestions,
  quizFormat,
  setQuizPath,
  setPhase,
}: {
  sourcePdfPath?: string;
  numQuestions: number;
  quizFormat: QuizFormat;
  setQuizPath: React.Dispatch<React.SetStateAction<string | null>>;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
}) => {
  let path;
  if (!sourcePdfPath) {
    path = getMostRecentDownload();
  } else {
    path = sourcePdfPath;
  }

  (async () => {
    const quizJSON = await genQuiz(path as string, numQuestions, quizFormat);
    const quizPath = writeQuizJSON(`quiz_${stamp()}.json`, quizJSON);

    setQuizPath(quizPath);
    setPhase("quiz");
  })();

  return <Loading message={"Generating quiz..."} />;
};

export default GenQuiz;
