import { useEffect, useRef, useState } from "react";
import { useInput } from "ink";

export type SubmitFn = (value: string) => void;

export function useInputBuffer(
	onSubmit?: SubmitFn,
	onExit?: () => void,
	opts?: { historyLimit?: number; cursorBlinkMs?: number }
) {
	const historyLimit = opts?.historyLimit ?? 50;
	const blinkMs = opts?.cursorBlinkMs ?? 500;

	const [buffer, setBuffer] = useState("");
	const [cursorVisible, setCursorVisible] = useState(true);
	const [history, setHistory] = useState<string[]>([]);
	const [index, setIndex] = useState<number | null>(null); // null means live typing
	const histRef = useRef<string[]>(history);

	useEffect(() => {
		histRef.current = history;
	}, [history]);

	// blink
	useEffect(() => {
		const t = setInterval(() => setCursorVisible((v) => !v), blinkMs);
		return () => clearInterval(t);
	}, [blinkMs]);

	useInput((input, key) => {
		if (key.escape || input === "q") {
			onExit?.();
			process.exit(0);
			return;
		}
		if (key.return) {
			const trimmed = buffer.trimEnd();
			if (trimmed.length > 0) {
				const next = [trimmed, ...histRef.current].slice(0, historyLimit);
				setHistory(next);
			}
			onSubmit?.(trimmed);
			setBuffer("");
			setIndex(null);
			return;
		}
		if (key.backspace) {
			setBuffer((prev) => prev.slice(0, -1));
			return;
		}
		if (key.upArrow) {
			const nextIndex =
				index === null ? 0 : Math.min(index + 1, history.length - 1);
			if (history[nextIndex] !== undefined) {
				setIndex(nextIndex);
				setBuffer(history[nextIndex]);
			}
			return;
		}
		if (key.downArrow) {
			if (index === null) return;
			const nextIndex = index - 1;
			if (nextIndex < 0) {
				setIndex(null);
				setBuffer("");
			} else {
				setIndex(nextIndex);
				setBuffer(history[nextIndex] ?? "");
			}
			return;
		}
		// regular characters
		if (input) setBuffer((prev) => prev + input);
	});

	return { buffer, setBuffer, cursorVisible };
}
