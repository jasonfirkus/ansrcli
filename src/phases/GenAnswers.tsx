import { Text } from "ink";
import React from "react";
import Spinner from "ink-spinner";
import Loading from "../components/Loading.js";
import { ensureDataDir, gradeQuiz } from "../services/ai-client.service.js";
import fs from "fs";
import type Phase from "../types/phase.js";

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
    const quiz = fs.readFileSync(quizPath, "utf8");
  })();

  return <Loading message="Generating answers..." />;
};

export default GenAnswers;
