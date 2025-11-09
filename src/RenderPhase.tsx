import Loading from "./components/Loading.js";
import QuizPhase from "./phases/QuizPhase.js";
import ResultsPhase from "./phases/ResultsPhase.js";
import ErrorPhase from "./phases/ErrorPhase.js";
import GenQuiz from "./phases/GenQuiz.js";
import GenAnswers from "./phases/GenAnswers.js";
import React, { useState } from "react";
import QuizFormat from "./types/quiz-format.js";
import { ErrorBoundary } from "react-error-boundary";
import type Phase from "./types/phase.js";

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
  const [error, setError] = useState<unknown>();

  if (phase == "gen-quiz") {
    return (
      <ErrorBoundary
        onError={setError}
        fallback={<ErrorPhase error={error as Error} />}
      >
        <GenQuiz
          sourcePdfPath={sourcePdfPath}
          numQuestions={numQuestions}
          quizFormat={quizFormat}
          setQuizPath={setQuizPath}
          setPhase={setPhase}
        />
      </ErrorBoundary>
    );
  }

  if (phase == "quiz") {
    return (
      <ErrorBoundary
        onError={setError}
        fallback={<ErrorPhase error={error as Error} />}
      >
        <QuizPhase
          quizPath={quizPath as string}
          setPhase={setPhase}
          numQuestions={numQuestions}
        />
      </ErrorBoundary>
    );
  }

  if (phase == "gen-answers") {
    return (
      <ErrorBoundary
        onError={setError}
        fallback={<ErrorPhase error={error as Error} />}
      >
        <GenAnswers quizPath={quizPath as string} setPhase={setPhase} />
      </ErrorBoundary>
    );
  }

  if (phase == "results") {
    return (
      <ErrorBoundary
        onError={setError}
        fallback={<ErrorPhase error={error as Error} />}
      >
        <ResultsPhase
          sourcePdfPath={sourcePdfPath}
          numQuestions={numQuestions}
          setPhase={setPhase}
          quizPath={quizPath as string}
        />
      </ErrorBoundary>
    );
  }

  return <ErrorPhase error={error as Error} />;
};

export default RenderPhase;
