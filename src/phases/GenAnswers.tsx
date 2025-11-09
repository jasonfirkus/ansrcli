import { Text } from "ink";
import React from "react";
import Loading from "../components/Loading.js";
import fs from "fs";
import type Phase from "../types/phase.js";
import gradeQuiz from "../services/answers.service.js";

const GenAnswers = ({
  quizPath,
  setPhase,
}: {
  quizPath: string;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
}) => {
  (async () => {
    // call gradequiz
    // setPhase to results
    const gradedQuiz = await gradeQuiz(quizPath);
    console.log("🚀 ~ GenAnswers.tsx ~ GenAnswers ~ gradedQuiz: ", gradedQuiz);
  })();

  return <Loading message="Generating answers..." />;
};

export default GenAnswers;
