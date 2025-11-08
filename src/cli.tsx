#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./app.js";

const cli = meow(
	`
	Usage
	  $ ansrcli <filePath>

	Options
		filePath  Path to pptx/pdf

	Examples
	  $ ansrcli ./Downloads/lecture15.pptx
`,
	{
		importMeta: import.meta,
		flags: {
			filePath: {
				type: "string",
			},
		},
	}
);

render(<App filePath={cli.flags.filePath} />);
