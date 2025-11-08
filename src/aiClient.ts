import fs from "fs";
import path from "path";

export interface AIResponse {
	content: string;
} // raw string body

export async function callModelForQuiz(
	pdfPath: string,
	systemPrompt: string
): Promise<AIResponse> {
	// Wire this to your provider of choice.
	// Sketch:
	//  - create multipart/form-data with file stream
	//  - include system prompt and any hyperparams
	//  - POST to API endpoint
	//  - return text body as { content }
	const abs = path.resolve(pdfPath);
	if (!fs.existsSync(abs)) throw new Error(`PDF not found: ${abs}`);
	// TODO: implement real call
	throw new Error("callModelForQuiz not implemented");
}

export async function callModelForGrading(
	quizJson: string,
	userAnswersJson: string,
	systemPrompt: string
): Promise<AIResponse> {
	// Similar provider call, but text only
	throw new Error("callModelForGrading not implemented");
}
