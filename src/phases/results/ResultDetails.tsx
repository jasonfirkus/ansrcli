import React from "react";
import { Box, Text } from "ink";
import Question from "../../types/question.js";
import MultipleChoiceResults from "./MultipleChoiceResults.js";
import { ANSR_BLUE } from "../../constants/colors.js";
import TrueFalseResults from "./TrueFalseResults.js";
import ShortAnswerResults from "../../components/ShortAnswerResults.js";
import QuestionHeader from "../../components/QuestionHeader.js";

const ResultDetails = ({ question, num }: { question: Question; num: number }) => {
  return (
    <Box
      flexDirection={"column"}
      width={"70%"}
      borderStyle="round"
      borderDimColor
      paddingX={1}
      gap={1}>
      <QuestionHeader num={num} content={question.content} />

      {question.type === "mc" && (
        <MultipleChoiceResults
          chosen={question.answer!}
          expected={question.grading!.expected}
          options={question.options!}
          correct={question.grading!.correct}
        />
      )}

      {question.type === "tf" && (
        <TrueFalseResults
          chosen={JSON.parse(question.answer!)}
          correct={question.grading!.correct}
          expected={JSON.parse(question.grading!.expected!)}
        />
      )}

      {question.type === "short" && (
        <ShortAnswerResults
          chosen={question.answer!}
          expected={question.grading!.expected!}
          correct={question.grading!.correct}
        />
      )}

      {!question.grading?.correct && (
        <Text color={ANSR_BLUE} bold>
          Feedback
        </Text>
      )}
    </Box>
  );
};

export default ResultDetails;
