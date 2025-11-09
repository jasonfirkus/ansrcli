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

// Per-phase parameter types
type PhaseParams = {
  "gen-quiz": { filePath?: string; numQuestions: number; quizFormat: QuizFormat };
  "gen-answers": {}; // no params now, expand later if needed
  quiz: {};
  results: {};
  error: {};
};

// Registry: every entry is a function returning JSX
const RENDER_PHASE: { [K in Phase]: (p: PhaseParams[K]) => JSX.Element } = {
  "gen-quiz": ({ filePath, numQuestions, quizFormat }) => (
    <GenQuiz filePath={filePath} numQuestions={numQuestions} quizFormat={quizFormat} />
  ),
  quiz: () => <QuizPhase />,
  "gen-answers": () => <GenAnswers />,
  results: () => <ResultsPhase />,
  error: () => <ErrorPhase />,
};

// Props are a discriminated union keyed by phase
type RenderProps =
  | ({ phase: "gen-quiz" } & PhaseParams["gen-quiz"])
  | ({ phase: "gen-answers" } & PhaseParams["gen-answers"])
  | ({ phase: "quiz" } & PhaseParams["quiz"])
  | ({ phase: "results" } & PhaseParams["results"])
  | ({ phase: "error" } & PhaseParams["error"]);

const RenderPhase = (props: RenderProps) => {
  const [phase, setPhase] = useState<Phase>("gen-quiz");

  return <ErrorBoundary>RENDER_PHASE[phase](props as any)</ErrorBoundary>;
};

export default RenderPhase;
