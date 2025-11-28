import React from "react";
import Loading from "../components/Loading.js";
import fs from "fs";
import type Phase from "../types/phase.js";
import gradeQuiz from "../services/answers.service.js";
import { Box } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

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
      <Gradient name="mind">
        <BigText text="ansr" font="block" letterSpacing={3} />
      </Gradient>

      <Loading message="Generating answers..." />
    </Box>
  );
};

export default GenAnswers;
