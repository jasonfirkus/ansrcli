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
    console.log("🚀 ~ GenAnswers.tsx ~ GenAnswers ~ quizPath: ", quizPath);
    
    const gradingResults = await gradeQuiz(quizPath);

    const quizContent = fs.readFileSync(quizPath, "utf-8");
    const quiz = JSON.parse(quizContent);

    const gradedQuiz = {
      ...quiz,
      questions: quiz.questions.map((question: any, index: number) => ({
        ...question,
        grading: gradingResults[index],
      })),
    };
    
    fs.writeFileSync(quizPath, JSON.stringify(gradedQuiz));
        console.log("🚀 ~ GenAnswers.tsx ~ GenAnswers ~ gradingResults: ", JSON.stringify(gradedQuiz));
    
    // setPhase("results");
  })();

  return <Loading message="Generating answers..." />;
};

export default GenAnswers;
