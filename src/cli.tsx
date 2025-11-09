#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./app.js";
import type QuizFormat from "./types/quiz-format.js";

const cli = meow(
  `
  Usage
    $ ansr <pathToPdf> [--questions=<number>] [--format=<types>]

  Arguments
    <pathToPdf>         Path to the source PDF file (required)

  Options
    --questions=<num>   Number of questions to generate (optional)
    --format=<types>    Comma-separated list of question types (optional)
                        Available types: mc (multiple choice), short (short answer), tf (true/false)
                        Example: --format="mc,tf" or --format="mc,short,tf"

  Examples
    # Generate a quiz from a PDF with default settings
    $ ansr ./notes/SortingAlgorithms.pdf

    # Generate 10 multiple-choice questions
    $ ansr ./notes/SortingAlgorithms.pdf --questions=10 --format="mc"

    # Generate a mix of multiple-choice and true/false questions
    $ ansr ./lectures/DatabaseDesign.pdf --questions=15 --format="mc,tf"

    # Generate 20 questions of all types
    $ ansr ./pdfs/OperatingSystems.pdf --questions=20 --format="mc,short,tf"

    # Minimal example (only the required path)
    $ ansr ~/Documents/Networks.pdf
`,
  { importMeta: import.meta }
);

const [filePath] = cli.input;
const { questions, format } = cli.flags;
render(
  <App sourcePdfPath={filePath} numQuestions={Number(questions)} format={format as QuizFormat} />
);
