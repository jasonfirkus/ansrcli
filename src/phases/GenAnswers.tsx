import React from "react";
import Loading from "../components/Loading.js";
import fs from "fs";
import type Phase from "../types/phase.js";
import gradeQuiz from "../services/answers.service.js";
import { Box } from "ink";
import Banner from "../components/Banner.js";

const GenAnswers = ({
  quizPath,
  setPhase,
}: {
  quizPath: string;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
}) => {
  (async () => {
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
    setPhase("results");
  })();

  return (
    <Box flexDirection="column">
      <Banner />

      <Loading message="Generating answers..." />
    </Box>
  );
};

export default GenAnswers;
