#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./app.js";

const cli = meow(
	`
  Usage
    $ ansr quiz <quizFile.json>

  Options
    --file, -f   Path to quiz JSON (alternative to positional)

  Examples
    $ ansr quiz ./data/sorting_quiz.json
`,
	{
		importMeta: import.meta,
		flags: {
			file: { type: "string", alias: "f" },
		},
	}
);

// Expect "quiz" as the first positional command
const [cmd, maybePath] = cli.input;
const filePath = cli.flags.file || maybePath || "";

render(<App filePath={cmd === "quiz" ? filePath : ""} />);
