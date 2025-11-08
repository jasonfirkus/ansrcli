import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import fs from "fs";
import path from "path";
import QuizRunner from "./quizRunner.js";
import type { QuizFile } from "./types/quizTypes.js";
import InputLine from "./components/inputline2.js";

export default function App({ filePath = "" }: { filePath?: string }) {
	const [quiz, setQuiz] = useState<QuizFile | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// Load quiz only when filePath changes
	useEffect(() => {
		setQuiz(null);
		setError(null);

		if (!filePath || !filePath.toLowerCase().endsWith(".json")) {
			return; // nothing to load, show landing screen
		}

		setLoading(true);
		try {
			const abs = path.resolve(process.cwd(), filePath);
			if (!fs.existsSync(abs)) {
				setError(`Quiz file not found: ${abs}`);
			} else {
				const raw = fs.readFileSync(abs, "utf8");
				const parsed = JSON.parse(raw) as QuizFile;
				if (!parsed?.questions?.length) {
					setError("Quiz file has no questions.");
				} else {
					setQuiz(parsed);
				}
			}
		} catch (e: any) {
			setError(`Failed to load quiz: ${e?.message ?? String(e)}`);
		} finally {
			setLoading(false);
		}
	}, [filePath]);

	return (
		<Box flexDirection="column">
			<Gradient name="mind">
				<BigText text="ansr" font="block" letterSpacing={3} />
			</Gradient>

			{loading && (
				<Box marginTop={1}>
					<Text>Loading quiz...</Text>
				</Box>
			)}

			{!loading && error && (
				<Box marginTop={1} flexDirection="column">
					<Text color="red">Error: {error}</Text>
					<Text>Press Enter to exit.</Text>
					<InputLine onSubmit={() => process.exit(1)} />
				</Box>
			)}

			{!loading && !error && quiz && (
				<Box marginTop={1}>
					<QuizRunner quiz={quiz} />
				</Box>
			)}

			{!loading && !error && !quiz && (
				<Box marginTop={1} flexDirection="column">
					<Text>No quiz loaded.</Text>
					<Text dimColor>Run: ansr quiz ./data/sorting_quiz.json</Text>
					<Text>Press Enter to exit.</Text>
					<InputLine onSubmit={() => process.exit(0)} />
				</Box>
			)}
		</Box>
	);
}
