import { Spacer, Box, Text } from "ink";
import React from "react";
import fs from "fs";
import ResultsSummary from "./ResultsSummary.js";
import Quiz from "../../types/quiz.js";
import { resolveFromRoot } from "../../utils/resolve-root.js";
import ResultDetails from "./ResultDetails.js";
import ResultsFooter from "./ResultsFooter.js";
import useWindowSize from "../../hooks/useWindowSize.js";
import useQuestionGridNavigator from "../../hooks/useQuestionGridNavigator.js";
import Navigator from "../../components/Navigator.js";
import { SIDE_PANEL } from "../../constants/grid.js";

const ResultsPhase = ({
  quizPath,
  numQuestions,
}: {
  quizPath: string;
  numQuestions: number;
}) => {
  const { indexSelected, getQuestionNum } = useQuestionGridNavigator(numQuestions);
  const qNum = getQuestionNum();

  const [, rows] = useWindowSize();
  // const quiz = JSON.parse(fs.readFileSync(quizPath, "utf8"));
  const quiz: Quiz = JSON.parse(
    fs.readFileSync(resolveFromRoot("samples", "sample-quiz-1.json"), "utf8")
  );
  const { questions } = quiz;
  const totalCorrect = calcTotalCorrect();

  function calcTotalCorrect() {
    return questions.reduce((acc, q) => (q?.grading?.correct ? acc + 1 : acc), 0);
  }

  return (
    <Box flexDirection="column" height={rows - 1}>
      <Box height={"100%"}>
        <Box flexDirection="column" width={`${SIDE_PANEL.WIDTH * 100}%`}>
          <Box
            flexDirection="column"
            alignItems="center"
            gap={1}
            borderDimColor
            borderStyle={"round"}
            height={"70%"}>
            <Navigator questions={questions} indexSelected={indexSelected} />

            <Text>
              <Text color={"green"}> {totalCorrect}</Text>/{numQuestions},{" "}
              {Math.round((totalCorrect / numQuestions) * 100)}%
            </Text>
          </Box>
          <ResultsSummary time={quiz.secondsElapsed} />
        </Box>
        <ResultDetails question={questions[qNum]!} num={qNum} />
      </Box>

      <Spacer />

      <ResultsFooter />
    </Box>
  );
};

export default ResultsPhase;
