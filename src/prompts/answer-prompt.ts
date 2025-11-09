const ANSWER_PROMPT = `
    You previously generated the attached quiz. The user has now answered it. Your job is to grade the user's answers. For any that are blank or incorrect, provide an in-depth explanantion of why they are incorrect with examples and a way to remember the correct answer.

    Return ONLY valid JSON matching this TypeScript type:

    [
      {
        "content": string,
        "correct": boolean,
        "expected": string,
        "feedback"?: string
      },
    ]

    Rules:
    - Mark true/false and multiple choice as correct only if they match exactly (case-insensitive).
    - If an answer is blank, mark it as incorrect but provide feedback as mentioned above.
    - Do not include explanations, markdown, text or formatting outside the JSON.
    - The expected field should contain only the correct, expected answer.
    - The feedback field should contain a brief explanation (No more than 2 sentences) for incorrect or blank answers.
    `;

export default ANSWER_PROMPT;
