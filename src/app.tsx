import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";
import InputLine from "./inputline.js";

export default function App({ filePath = "downloads" }: { filePath?: string }) {
	const [command, setCommand] = useState("");

	useInput((input, key) => {
		if (key.return) {
			console.error(`Executing: ${command}`);
			setCommand("");
		} else if (key.backspace || key.delete) {
			setCommand((prev) => prev.slice(0, -1));
		} else if (key.escape || input === "q") {
			process.exit(0);
		} else {
			setCommand((prev) => prev + input);
		}
	});

	return (
		<>
			<Gradient name="mind">
				<BigText text="ansr" font="block" letterSpacing={3} />
			</Gradient>
			<Text>Type something and press Enter (q to quit)</Text>
			{/* <Text color="green"> {command}</Text> */}
			<InputLine
				onSubmit={(value) => console.error(`You typed: ${value}`)}
				onExit={() => console.error("Exiting...")}
			/>
		</>
	);
}
