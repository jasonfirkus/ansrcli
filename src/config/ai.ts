import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env["ANSRCLI_GEMINI_API_KEY"];

if (!API_KEY) {
  throw new Error("Missing ANSRCLI_GEMINI_API_KEY environment variable");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export { ai };
