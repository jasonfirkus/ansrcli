import React from "react";
import { Text } from "ink";
import { useInputBuffer, SubmitFn } from "../hooks/useInputBuffer.js";

export default function InputLine({
	prompt = ">",
	color = "green",
	onSubmit,
	onExit,
}: {
	prompt?: string;
	color?: string;
	onSubmit?: SubmitFn;
	onExit?: () => void;
}) {
	const { buffer, cursorVisible } = useInputBuffer(onSubmit, onExit, {
		historyLimit: 100,
		cursorBlinkMs: 500,
	});

	return (
		<Text color={color}>
			{prompt} {buffer}
			{cursorVisible ? <Text inverse> </Text> : " "}
		</Text>
	);
}
