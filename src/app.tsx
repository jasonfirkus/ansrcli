import React from "react";
import { Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

export default function App({ filePath = "downloads" }: { filePath?: string }) {
	return (
		<Gradient name="mind">
			<BigText text="ansr" font="block" letterSpacing={3} />
		</Gradient>
	);
}
