import React, { useMemo, useState } from "react";
import { Box, Text } from "ink";
import InputLine from "./components/inputline2.js";
import type { QuizFile, Question } from "./types/quizTypes.js";

function normalize(s: string) {
	return s.trim().toLowerCase();
}

function checkAnswer(q: Question, userRaw: string) {
	const user = normalize(userRaw);

	if (q.type === "true_false") {
		const tf =
			user === "t" || user === "true"
				? true
				: user === "f" || user === "false"
				? false
				: null;
		return tf !== null && tf === q.answer;
	}

	if (q.type === "multiple_choice") {
		// Accept "a" or "A" or "A)" or full text match start
		const letter = user.replace(/\W+/g, ""); // strip non-alnum
		if (letter.length === 1 && /[a-d]/.test(letter)) {
			return letter.toUpperCase() === q.answer.toUpperCase();
		}
		// fallback: allow matching "A) ..." by prefix letter
		const letters = ["A", "B", "C", "D", "E"];
		const idx = letters.indexOf(q.answer.toUpperCase());
		if (idx >= 0 && q.options[idx]) {
			// compare beginning of option text
			return q.options[idx].toLowerCase().startsWith(user);
		}
		return false;
	}

	// short_answer
	// simple forgiving compare
	return normalize(q.answer) === user;
}

function correctAnswerText(q: Question) {
	if (q.type === "true_false") {
		return q.answer ? "True" : "False";
	}
	if (q.type === "multiple_choice") {
		// show letter and text if available
		const letter = q.answer.toUpperCase();
		const idx = "ABCDE".indexOf(letter);
		const text = idx >= 0 ? q.options[idx] : undefined;
		return text ? `${letter} — ${text}`.replace("—", "-") : letter; // no em dash
	}
	return q.answer;
}

export default function QuizRunner({ quiz }: { quiz: QuizFile }) {
	const [i, setI] = useState(0);
	const [score, setScore] = useState(0);
	const [phase, setPhase] = useState<"ask" | "feedback" | "done">("ask");
	const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
	const [lastQ, setLastQ] = useState<Question | null>(null);

	console.log("QuizRunner initialized with quiz:", quiz);

	const done = i >= quiz.questions.length;

	const current = useMemo(
		() => (!done ? quiz.questions[i] : null),
		[quiz.questions, i, done]
	);

	if (done || phase === "done") {
		return (
			<Box flexDirection="column">
				<Text>
					Quiz complete. Score: {score} / {quiz.questions.length}
				</Text>
				<Text>Press q or Esc to exit.</Text>
			</Box>
		);
	}

	if (phase === "feedback" && lastQ) {
		return (
			<Box flexDirection="column">
				<Text>{lastCorrect ? "✅ Correct!" : "❌ Incorrect."}</Text>
				{!lastCorrect && (
					<Text>Correct answer: {correctAnswerText(lastQ)}</Text>
				)}
				<Text>Press Enter for next question, or q to quit.</Text>
				<InputLine
					prompt="Continue"
					onSubmit={() => {
						setPhase("ask");
					}}
				/>
			</Box>
		);
	}

	// phase ask
	if (!current) return null;

	return (
		<Box flexDirection="column">
			<Text>
				{quiz.title} — Question {i + 1} of {quiz.questions.length}
			</Text>

			<Box marginTop={1} flexDirection="column">
				<Text>{current.question}</Text>

				{current.type === "multiple_choice" && (
					<Box flexDirection="column" marginTop={1}>
						{current.options.map((opt, idx) => (
							<Text key={idx}>{opt}</Text>
						))}
						<Text dimColor>Type A, B, C or D then Enter</Text>
					</Box>
				)}

				{current.type === "true_false" && (
					<Text dimColor>Type T or F then Enter</Text>
				)}

				{current.type === "short_answer" && (
					<Text dimColor>Type your answer then Enter</Text>
				)}
			</Box>

			<Box marginTop={1}>
				<InputLine
					onSubmit={(value) => {
						const ok = checkAnswer(current, value);
						setLastCorrect(ok);
						setLastQ(current);
						if (ok) setScore((s) => s + 1);
						setI((j) => j + 1);
						setPhase("feedback");
					}}
				/>
			</Box>
		</Box>
	);
}
