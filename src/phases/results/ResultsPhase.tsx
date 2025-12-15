import { Spacer, Box } from "ink";
import React, { useRef } from "react";
import fs from "fs";
import ResultsSummary from "./ResultsSummary.js";
import Quiz from "../../types/quiz.js";
import { resolveFromRoot } from "../../utils/resolve-root.js";
import ResultDetails from "./ResultDetails.js";
import ResultsFooter from "./ResultsFooter.js";
import useWindowSize from "../../hooks/useWindowSize.js";
import useQuestionGridNavigator from "../../hooks/useQuestionGridNavigator.js";
import QuizNavigator from "../../components/QuizNavigator.js";
import { SIDE_PANEL } from "../../constants/grid.js";

const ResultsPhase = ({
  quizPath,
  numQuestions,
}: {
  quizPath: string;
  numQuestions: number;
}) => {
  const ref = useRef(null);
  const { indexSelected, getQuestionNum } = useQuestionGridNavigator(numQuestions, ref);
  const qNum = getQuestionNum();

  const [, rows] = useWindowSize();
  const quiz: Quiz = JSON.parse(
    fs.readFileSync(
      resolveFromRoot("samples", "sample-quiz-1.json"), // quizPath
      "utf8"
    )
  );
  const { questions } = quiz;

  return (
    <Box flexDirection="column" height={rows - 1}>
      <Box height={"100%"}>
        <Box flexDirection="column" width={`${SIDE_PANEL.WIDTH * 100}%`} ref={ref}>
          <QuizNavigator questions={questions} indexSelected={indexSelected} />
          <ResultsSummary questions={questions} />
        </Box>
        <ResultDetails question={questions[qNum]!} num={qNum} />
      </Box>

      <Spacer />

      <ResultsFooter />
    </Box>
  );
};

export default ResultsPhase;
