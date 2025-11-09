import React, { useMemo, useRef, useState, useEffect } from "react";
import { Box, Text } from "ink";
import InputLine from "./components/inputline2.js";
import type { QuizFile, Question, UserAnswer } from "./types/quizTypes.js";

/** Utility helpers */
function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function formatHelper(q: Question): string {
  if (q.type === "multiple_choice") return "Type A, B, C or D then Enter";
  if (q.type === "true_false") return "Type T or F then Enter";
  return "Type your answer then Enter";
}

function sanitizeAnswerForType(q: Question, user: string): string {
  if (q.type === "true_false") {
    const u = normalize(user);
    if (u === "t" || u === "true") return "true";
    if (u === "f" || u === "false") return "false";
    return user;
  }

  if (q.type === "multiple_choice") {
    const letter = user.trim().replace(/\W+/g, "");
    if (letter.length === 1 && /[a-z]/i.test(letter)) {
      return letter.toUpperCase();
    }
  }

  return user;
}

/** Properly typed shuffle function */
function shuffleArray<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // use a temporary variable and casts to avoid TypeScript treating
    // arr[i] / arr[j] as possibly undefined in tuple destructuring
    const temp = arr[i] as T;
    arr[i] = arr[j] as T;
    arr[j] = temp;
  }
  return arr;
}

/** Component */
export default function QuizRunner({
  quiz,
  onComplete,
  shuffle = false,
  showProgress = true,
}: {
  quiz: QuizFile;
  onComplete: (answers: UserAnswer[]) => void;
  shuffle?: boolean;
  showProgress?: boolean;
}) {
  // Properly typed memoized question list
  const questionOrder: Question[] = useMemo(
    () => (shuffle ? shuffleArray(quiz.questions) : quiz.questions),
    [quiz.questions, shuffle]
  );

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [startedAt, setStartedAt] = useState<string>(() => new Date().toISOString());
  const startedAtRef = useRef<string>(startedAt);

  useEffect(() => {
    startedAtRef.current = startedAt;
  }, [startedAt]);

  const total = questionOrder.length;
  const done = idx >= total;
  const current: Question | null = done ? null : questionOrder[idx] ?? null;

  useEffect(() => {
    if (!done) {
      setStartedAt(new Date().toISOString());
    }
  }, [idx, done]);

  if (done) {
    return (
      <Box flexDirection="column">
        <Text>Quiz complete.</Text>
        <Text>Submitting your answers for grading...</Text>
        <SubmitOnce answers={answers} onComplete={onComplete} />
      </Box>
    );
  }

  if (!current) return null;

  return (
    <Box flexDirection="column">
      {showProgress && (
        <Text>
          {quiz.title} — Question {idx + 1} of {total}
        </Text>
      )}

      <Box marginTop={1} flexDirection="column">
        <Text>{current.question}</Text>

        {current.type === "multiple_choice" && (
          <Box flexDirection="column" marginTop={1}>
            {current.options.map((opt: string, i: number) => (
              <Text key={i}>{opt}</Text>
            ))}
            <Text dimColor>{formatHelper(current)}</Text>
          </Box>
        )}

        {current.type !== "multiple_choice" && (
          <Box marginTop={1}>
            <Text dimColor>{formatHelper(current)}</Text>
          </Box>
        )}
      </Box>

      <Box marginTop={1}>
        <InputLine
          onSubmit={raw => {
            const value = sanitizeAnswerForType(current, raw);
            const entry: UserAnswer = {
              id: current.id,
              value,
              startedAt: startedAtRef.current,
              answeredAt: new Date().toISOString(),
            };
            setAnswers(prev => [...prev, entry]);
            setIdx(n => n + 1);
          }}
        />
      </Box>
    </Box>
  );
}

/** Internal helper — calls onComplete once */
function SubmitOnce({
  answers,
  onComplete,
}: {
  answers: UserAnswer[];
  onComplete: (answers: UserAnswer[]) => void;
}) {
  const called = useRef(false);
  useEffect(() => {
    if (!called.current) {
      called.current = true;
      onComplete(answers);
    }
  }, [answers, onComplete]);
  return null;
}
