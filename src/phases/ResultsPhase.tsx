import React from "react";
import { Box, Text } from "ink";
import fs from "fs/promises";
import path from "path";

type Grading = {
  correctAnswer?: string;
  correct?: boolean;
  feedback?: string;
  score?: number;
};

type Question = {
  type: "mc" | "short" | "tf";
  content: string;
  options?: string[];
  answer: string;
  grading: Grading;
};

type Quiz = {
  title: string;
  questions: Question[];
};

export default function ResultsPhase({ quizPath }: { quizPath: string }) {
  const [quiz, setQuiz] = React.useState<Quiz | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const resolved = path.resolve(quizPath);
        const content = await fs.readFile(resolved, "utf8");
        const data = JSON.parse(content) as Quiz;
        setQuiz(data);
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      }
    })();
  }, [quizPath]);

  if (err) return <Text color="red">Error loading quiz: {err}</Text>;
  if (!quiz) return <Text dimColor>Loading quiz...</Text>;

  return (
    <Box flexDirection="column">
      <Text>📘 {quiz.title}</Text>

      {quiz.questions.map((q, i) => {
        const { grading } = q;
        const emoji =
          grading?.correct === true
            ? "✅"
            : grading?.correct === false
            ? "❌"
            : "•";

        return (
          <Box key={i} flexDirection="column" marginTop={1}>
            <Text>
              {i + 1}. ({q.type}) {q.content}
            </Text>
            <Text>
              Your answer: <Text color="cyan">{q.answer || "<empty>"}</Text>{" "}
              {emoji}
            </Text>

            {grading && (
              <Box flexDirection="column" marginLeft={2}>
                {grading.correctAnswer && (
                  <Text dimColor>Correct: {grading.correctAnswer}</Text>
                )}
                {grading.feedback && (
                  <Text dimColor>💬 {grading.feedback}</Text>
                )}
                {typeof grading.score === "number" && (
                  <Text dimColor>🏅 Score: {grading.score}</Text>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
