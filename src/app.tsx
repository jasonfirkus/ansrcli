import React from "react";
import { Text } from "ink";

type Props = {
	name: string | undefined;
};

export default function App({ name = "Ansr" }: Props) {
	return (
		<Text>
			Hello, <Text color="redBright">{name}</Text>
		</Text>
	);
}
