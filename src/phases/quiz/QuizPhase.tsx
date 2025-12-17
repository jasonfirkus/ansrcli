import React, { useState } from "react";
import type Phase from "../../types/phase.js";
import fs from "fs";
import ShortAnswerQuestion from "../../components/Questions/ShortAnswerQuestion.js";
import MultipleChoiceQuestion from "../../components/Questions/MultipleChoiceQuestion.js";
import TrueFalseQuestion from "../../components/Questions/TrueFalseQuestion.js";
import { Text, Box } from "ink";
import { useInput } from "ink";
import QuizFooter from "./QuizFooter.js";
import { resolveFromRoot } from "../../utils/resolve-root.js";
import Quiz from "../../types/quiz.js";
import useWindowSize from "../../hooks/useWindowSize.js";
import QuestionHeader from "../../components/QuestionHeader.js";
import Navigator from "../../components/Navigator.js";
import { SIDE_PANEL } from "../../constants/grid.js";
import useQuestionGridNavigator from "../../hooks/useQuestionGridNavigator.js";
import type Question from "../../types/question.js";
import Timer from "../../components/Timer.js";

const QuizPhase = ({
  quizPath,
  setPhase,
  numQuestions,
}: {
  quizPath: string;
  setPhase: React.Dispatch<React.SetStateAction<Phase>>;
  numQuestions: number;
}) => {
  const [, rows] = useWindowSize();
  const { indexSelected, getQuestionNum } = useQuestionGridNavigator(numQuestions);
  const qNum = getQuestionNum();
  // const quiz = JSON.parse(fs.readFileSync(quizPath, "utf8"));
  const quiz: Quiz = JSON.parse(
    fs.readFileSync(
      resolveFromRoot("samples", "sample-quiz-1.json"), // quizPath
      "utf8"
    )
  );
  const { questions } = quiz;
  const currentQuestion = questions[qNum];

  useInput((input, key) => {
    if (key.return && qNum + 1 == numQuestions) {
      setPhase("gen-answers");
    }
  });

  if (!currentQuestion) {
    return (
      <Box flexDirection="column" height={rows - 1}>
        <Text>No question found for Q{qNum + 1}.</Text>
      </Box>
    );
  }

  function writeAnswer(answer: string) {
    questions[qNum] = { ...currentQuestion, answer } as Question;

    fs.writeFileSync(quizPath, JSON.stringify(quiz));
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
            height={"100%"}>
            <Navigator indexSelected={indexSelected} questions={questions} />
            <Timer quiz={quiz} quizPath={resolveFromRoot("samples", "sample-quiz-1.json")} />
          </Box>
        </Box>

        <Box
          flexDirection={"column"}
          width={"70%"}
          borderStyle="round"
          borderDimColor
          paddingX={1}
          gap={1}>
          <QuestionHeader num={qNum} content={currentQuestion.content} />

          {currentQuestion?.type == "short" && (
            <ShortAnswerQuestion writeAnswer={writeAnswer} question={currentQuestion} />
          )}
          {currentQuestion?.type == "mc" && (
            <MultipleChoiceQuestion writeAnswer={writeAnswer} question={currentQuestion} />
          )}
          {currentQuestion?.type == "tf" && (
            <TrueFalseQuestion writeAnswer={writeAnswer} question={currentQuestion} />
          )}
        </Box>
      </Box>

      <QuizFooter />
    </Box>
  );
};

export default QuizPhase;
