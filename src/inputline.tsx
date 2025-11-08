import React, { useState, useEffect } from "react";
import { Text, useInput, Box } from "ink";

interface InputLineProps {
	onSubmit?: (value: string) => void;
	onExit?: () => void;
	prompt?: string;
	color?: string;
}

/**
 * InputLine — a reusable Ink component that simulates
 * a blinking cursor and captures keyboard input.
 */
export default function InputLine({
	onSubmit,
	onExit,
	prompt = "›",
	color = "green",
}: InputLineProps) {
	const [command, setCommand] = useState("");
	const [cursorVisible, setCursorVisible] = useState(true);

	// Toggle cursor visibility
	useEffect(() => {
		const interval = setInterval(() => {
			setCursorVisible((prev) => !prev);
		}, 500);
		return () => clearInterval(interval);
	}, []);

	// Handle keyboard input
	useInput((input, key) => {
		if (key.return) {
			if (onSubmit) onSubmit(command);
			setCommand("");
		} else if (key.backspace) {
			setCommand((prev) => prev.slice(0, -1));
		} else if (input === "q" || key.escape) {
			if (onExit) onExit();
			else process.exit(0);
		} else {
			setCommand((prev) => prev + input);
		}
	});

	return (
		<Box>
			<Text color={color}>
				{prompt} {command}
				{cursorVisible ? <Text inverse> </Text> : " "}
			</Text>
		</Box>
	);
}
