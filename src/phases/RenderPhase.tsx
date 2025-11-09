import Loading from "../components/Loading.js";
import QuizPhase from "../phases/QuizPhase.js";
import ResultsPhase from "../phases/ResultsPhase.js";
import ErrorPhase from "../phases/ErrorPhase.js";
import GenQuiz from "../phases/GenQuiz.js";
import GenAnswers from "../phases/GenAnswers.js";
import React, { useState } from "react";
import QuizFormat from "../types/quiz-format.js";
import { ErrorBoundary } from "react-error-boundary";
import type Phase from "../types/phase.js";

const RenderPhase = ({
  sourcePdfPath,
  numQuestions,
  quizFormat,
}: {
  sourcePdfPath?: string;
  numQuestions: number;
  quizFormat: QuizFormat;
}) => {
  const [phase, setPhase] = useState<Phase>("gen-quiz");
  const [quizPath, setQuizPath] = useState<string | null>(null);

  return (
    <ErrorBoundary FallbackComponent={ErrorPhase}>
      {phase == "gen-quiz" && (
        <GenQuiz
          sourcePdfPath={sourcePdfPath}
          numQuestions={numQuestions}
          quizFormat={quizFormat}
          setQuizPath={setQuizPath}
          setPhase={setPhase}
        />
      )}

      {phase == "quiz" && (
        <QuizPhase quizPath={quizPath as string} setPhase={setPhase} numQuestions={numQuestions} />
      )}

      {phase == "gen-answers" && <GenAnswers quizPath={quizPath as string} setPhase={setPhase} />}

      {phase == "quiz" && (
        <ResultsPhase
          sourcePdfPath={sourcePdfPath}
          numQuestions={numQuestions}
          setPhase={setPhase}
        />
      )}
    </ErrorBoundary>
  );
};

export default RenderPhase;
