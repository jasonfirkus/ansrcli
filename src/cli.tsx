#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./app.js";

const cli = meow(
	`
  Usage
    $ ansr <file.pdf>

  Examples
    $ ansr ./data/sorting_quiz.json
    $ ansr ./slides/sorting.pdf
`,
	{ importMeta: import.meta }
);

const [filePath] = cli.input;
render(<App filePath={filePath} />);
