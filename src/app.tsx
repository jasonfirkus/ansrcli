import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import fs from "fs";
import path from "path";
import type { QuizFile, UserAnswer, GradeResult } from "./types/quizTypes.js";
import { generateQuizFromPdf, gradeQuiz, writeArtifact } from "./aiClient.js";
import RenderPhase from "./RenderPhase.js";
import QuizFormat from "./types/quiz-format.js";
import type Phase from "./types/phase.js";

export default function App({
  sourcePdfPath,
  numQuestions = 10,
  format = "mc,short,tf",
}: {
  sourcePdfPath?: string;
  numQuestions?: number;
  format?: QuizFormat;
}) {
  const [phase, setPhase] = useState<Phase>("gen-quiz");
  const [quiz, setQuiz] = useState<QuizFile | null>(null);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!sourcePdfPath) return;

    const abs = path.resolve(process.cwd(), sourcePdfPath);
    const lower = abs.toLowerCase();

    (async () => {
      try {
        if (!fs.existsSync(abs)) {
          setPhase("error");
          setErr(`File not found: ${abs}`);
          return;
        }

        if (lower.endsWith(".json")) {
          setPhase("loading");
          const raw = fs.readFileSync(abs, "utf8");
          const parsed = JSON.parse(raw) as QuizFile;
          if (!parsed?.questions?.length) throw new Error("Quiz JSON has no questions.");
          setQuiz(parsed);
          setPhase("quiz");
          return;
        }

        if (lower.endsWith(".pdf")) {
          setPhase("gen");
          const q = await generateQuizFromPdf(abs);
          writeArtifact(`quiz_${stamp()}.json`, q);
          setQuiz(q);
          setPhase("quiz");
          return;
        }

        setPhase("error");
        setErr("Unsupported file type. Use a .pdf or a quiz .json");
      } catch (e: any) {
        setPhase("error");
        setErr(e?.message ?? String(e));
      }
    })();
  }, [sourcePdfPath]);

  const onQuizComplete = async (answers: UserAnswer[]) => {
    try {
      setPhase("grading");
      const r = await gradeQuiz(quiz!, answers);
      writeArtifact(`grade_${stamp()}.json`, r);
      setResult(r);
      setPhase("done");
    } catch (e: any) {
      setErr(e?.message ?? String(e));
      setPhase("error");
    }
  };

  return (
    <Box flexDirection="column">
      <Gradient name="mind">
        <BigText text="ansr" font="block" letterSpacing={3} />
      </Gradient>

      <RenderPhase sourcePdfPath={sourcePdfPath} numQuestions={numQuestions} quizFormat={format} />
    </Box>
  );
}
