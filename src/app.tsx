import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import fs from "fs";
import path from "path";
import type { QuizFile, UserAnswer, GradeResult } from "./types/quizTypes.js";
import { generateQuizFromPdf, gradeQuiz, writeArtifact } from "./aiClient.js";
import QuizRunner from "./quizRunner.js";
import InputLine from "./components/inputline2.js";
import Spinner from "ink-spinner";

type Phase = "idle" | "loading" | "gen" | "quiz" | "grading" | "done" | "error";

const ResultsDisplay = memo(({ result, quiz, onExit }: { result: GradeResult; quiz: QuizFile; onExit: () => void }) => {
	return (
		<Box flexDirection="column" marginTop={1}>
			<Text bold>
				Score: {result.score} / {result.total} ({Math.round((result.score / result.total) * 100)}%)
			</Text>
			{result.summary && <Text color="cyan">{result.summary}</Text>}
			
			<Box flexDirection="column" marginTop={1}>
				{result.items.map((item, idx) => {
					const question = quiz.questions.find(q => q.id === item.id);
					return (
						<Box key={item.id} flexDirection="column" marginY={0}>
							<Text>
								{idx + 1}. {item.correct ? <Text color="green">✓</Text> : <Text color="red">✗</Text>} {question?.question}
							</Text>
							{!item.correct && item.expected && (
								<Text dimColor>   Expected: {item.expected}</Text>
							)}
							{item.feedback && (
								<Text dimColor>   {item.feedback}</Text>
							)}
						</Box>
					);
				})}
			</Box>

			<Box marginTop={1}>
				<Text dimColor>Artifacts saved to ./.ansr</Text>
			</Box>
			<Text>Press Enter to exit.</Text>
			<InputLine onSubmit={onExit} />
		</Box>
	);
});

export default function App({ filePath = "" }: { filePath?: string }) {
	const [phase, setPhase] = useState<Phase>("idle");
	const [quiz, setQuiz] = useState<QuizFile | null>(null);
	const [result, setResult] = useState<GradeResult | null>(null);
	const [err, setErr] = useState<string | null>(null);

	useEffect(() => {
		if (!filePath) return;

		const abs = path.resolve(process.cwd(), filePath);
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
					if (!parsed?.questions?.length)
						throw new Error("Quiz JSON has no questions.");
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
	}, [filePath]);

	const onQuizComplete = useCallback(async (answers: UserAnswer[]) => {
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
	}, [quiz]);

	const handleExit = useCallback(() => {
		process.exit(0);
	}, []);

	const handleExitWithError = useCallback(() => {
		process.exit(1);
	}, []);

	return (
		<Box flexDirection="column">
			<Gradient name="mind">
				<BigText text="ansr" font="block" letterSpacing={3} />
			</Gradient>

			{phase === "idle" && (
				<Box marginTop={1} flexDirection="column">
					<Text>
						Provide a PDF to generate a quiz, or a quiz JSON to run it.
					</Text>
					<Text dimColor>Examples:</Text>
					<Text dimColor> ansr ./slides/sorting.pdf</Text>
					<Text dimColor> ansr ./data/sorting_quiz.json</Text>
					<Text>Press Enter to exit.</Text>
					<InputLine onSubmit={handleExit} />
				</Box>
			)}

			{phase === "loading" && <Text>Loading quiz JSON…</Text>}
			{phase === "gen" && (
				<Text>
					{" "}
					<Spinner type="dots" /> Generating quiz from PDF…
				</Text>
			)}
			{phase === "quiz" && quiz && (
				<QuizRunner quiz={quiz} onComplete={onQuizComplete} />
			)}
			{phase === "grading" && <Text>Grading your answers…</Text>}

			{phase === "done" && result && quiz && (
				<ResultsDisplay result={result} quiz={quiz} onExit={handleExit} />
			)}

			{phase === "error" && (
				<Box flexDirection="column" marginTop={1}>
					<Text color="red">Error: {err}</Text>
					<Text>Press Enter to exit.</Text>
					<InputLine onSubmit={handleExitWithError} />
				</Box>
			)}
		</Box>
	);
}

function stamp() {
	return new Date().toISOString().replace(/[:.]/g, "-");
}
