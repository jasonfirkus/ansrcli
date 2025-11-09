import React from "react";
import Loading from "../components/Loading.js";
import { gradeQuiz } from "../services/ai-client.service.js";
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
    // read quiz file and extract user answers into an array

    const myquiz = await JSON.parse(fs.readFileSync(quizPath, "utf8"));
    // get array of user answers (raw) and map to option text when possible
    const userAnswers: string[] = myquiz.questions.map(
      (q: any) => q.answer ?? ""
    );

    console.log("User Answers (raw):", userAnswers);

    // Get quiz grading result from AI service
    const gradeResultParsedJSON = await gradeQuiz(myquiz, userAnswers);

    // combine gradeResultParsedJSON with myquiz and write to quizPath
    // pair it such that the final JSON has both questions and results in the same questions array
    const combinedQuestions = myquiz.questions.map(
      (question: any, index: number) => ({
        ...question,
        correctAnswer: gradeResultParsedJSON.items[index]?.expected,
        isCorrect: gradeResultParsedJSON.items[index]?.correct,
        feedback: gradeResultParsedJSON.items[index]?.feedback,
      })
    );

    const combinedResult = {
      ...myquiz,
      questions: combinedQuestions,
    };
    console.log("Combined Result:", combinedResult);
    await fs.promises.writeFile(
      quizPath,
      JSON.stringify(combinedResult, null, 2)
    );

    // Finally, set phase to results
    setPhase("results");
  })();

  return <Loading message="Generating answers..." />;
};

export default GenAnswers;
