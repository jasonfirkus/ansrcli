# ansrcli

ansrCLI quickly generates quizzes from lecture notes by using Google's Gemini to analyze the source file and produce a balanced set of questions, including true/false, short answer, and multiple-choice, in seconds. Once you finish a quiz, your answers are graded and feedback is provided on what you could have done better.

We hope this tool is helpful for students learning material through their education joruney.

github repo: [https://github.com/jasonfirkus/ansrcli](https://github.com/jasonfirkus/ansrcli)

## Install

Please follow these few steps for an initial setup to use ansr.

1. ansr uses Google's gemini AI to process pdf and provided feedback on submissions. To **setup env var**
   (if you don't have an API key, you can sign up for free at their site:
   [https://aistudio.google.com/welcome](https://aistudio.google.com/welcome). </br> And get an API key from your [Google AI Studio dashboard](https://aistudio.google.com/api-keys)
   )

   If you do, then run:

```bash
setx ANSRCLI_GEMINI_API_KEY "<your key here>"
```

2. To install the `ansr` package, run:

```bash
npm i -g ansrcli
```

3. Open a new terminal (enables the newly set env var).

4. You're all set. Whenever you want to take a quiz based on some course material just run
   `ansr <file_path>`
   and your quiz should start generating and launch right away.

Enjoy

## Commands

To install:

```bash
$ npm install --global ansrcli
```

To run:

```bash
$ ansr <file_path>
```

To run setup

```bash
$ npm run setup
```

## CLI

```
$ ansr --help

  Usage
    $ ansr
    $ ansr <file_path>

```

## Acknowledgements

This project was created during the HTTPSHacks 2025 hackathon — thanks to the organizers and participants for the opportunity and inspiration.

## Special Thanks

Thanks to the BCIT Computer Club, the mentors, and all the volunteers for their hardwork and support in making this event happen.
