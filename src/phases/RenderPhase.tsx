import QuizPhase from "./quiz/QuizPhase.js";
import ResultsPhase from "./results/ResultsPhase.js";
import ErrorPhase from "../phases/ErrorPhase.js";
import GenQuiz from "../phases/GenQuiz.js";
import GenAnswers from "../phases/GenAnswers.js";
import React, { useState } from "react";
import QuizFormat from "../types/quiz-format.js";
import { ErrorBoundary } from "react-error-boundary";
import type Phase from "../types/phase.js";
import { TitledBox } from "@mishieck/ink-titled-box";
import { Box, Text } from "ink";

const RenderPhase = ({
  sourcePdfPath,
  numQuestions,
  quizFormat,
}: {
  sourcePdfPath?: string;
  numQuestions: number;
  quizFormat: QuizFormat;
}) => {
  const [phase, setPhase] = useState<Phase>("quiz");
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
        <QuizPhase
          quizPath={quizPath as string}
          setPhase={setPhase}
          numQuestions={numQuestions}
        />
      )}

      {phase == "gen-answers" && (
        <GenAnswers quizPath={quizPath as string} setPhase={setPhase} />
      )}

      {phase == "results" && (
        <ResultsPhase quizPath={quizPath as string} numQuestions={numQuestions} />
      )}

      {phase == "test" && (
        <Box width={"30%"}>
          <TitledBox
            titles={["test"]}
            borderStyle="round"
            flexDirection="column"
            alignItems="center"
            gap={1}>
            <Box flexWrap={"wrap"} justifyContent="flex-start">
              {Array.from({ length: 7 }).map((_, i) => (
                <Box key={i} borderStyle={"round"} paddingX={1}>
                  <Text>i</Text>
                </Box>
              ))}
            </Box>
          </TitledBox>
        </Box>
      )}

      {phase == "test2" && (
        <Box borderStyle={"round"} borderDimColor>
          <Text color={"blue"} bold>
            this shouldn't be dimmed
          </Text>
        </Box>
      )}
    </ErrorBoundary>
  );
};

export default RenderPhase;
