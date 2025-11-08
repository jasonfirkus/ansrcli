import React, { useEffect, useState } from "react";
import { Text, useInput } from "ink";

export default function InputLine({
	prompt = "›",
	color = "green",
	onSubmit,
	onExit,
}: {
	prompt?: string;
	color?: string;
	onSubmit?: (value: string) => void;
	onExit?: () => void;
}) {
	const [buffer, setBuffer] = useState("");
	const [cursorVisible, setCursorVisible] = useState(true);

	useEffect(() => {
		const t = setInterval(() => setCursorVisible((v) => !v), 500);
		return () => clearInterval(t);
	}, []);

	useInput((input, key) => {
		if (key.return) {
			onSubmit?.(buffer);
			setBuffer("");
			return;
		}
		if (key.backspace) {
			setBuffer((prev) => prev.slice(0, -1));
			return;
		}
		if (input === "q" || key.escape) {
			onExit?.();
			process.exit(0);
			return;
		}
		if (input) setBuffer((prev) => prev + input);
	});

	return (
		<Text color={color}>
			{prompt} {buffer}
			{cursorVisible ? <Text inverse> </Text> : " "}
		</Text>
	);
}
