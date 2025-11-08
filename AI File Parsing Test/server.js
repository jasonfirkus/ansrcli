import multer from "multer";
import fs from "fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import path from "path";
import 'dotenv/config';

const app = express();
const upload = multer({ dest: "uploads/" });

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("Missing GOOGLE_API_KEY environment variable");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const fileManager = new GoogleAIFileManager(API_KEY);

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  try {
    const uploadResult = await fileManager.uploadFile(req.file.path, {
      mimeType: req.file.mimetype,
      displayName: req.file.originalname,
    });

    // Poll until processing is complete
    let fileMeta = await fileManager.getFile(uploadResult.file.name);
    while (fileMeta.state === "PROCESSING") {
      await new Promise((r) => setTimeout(r, 2000));
      fileMeta = await fileManager.getFile(uploadResult.file.name);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResult.file.mimeType,
          fileUri: uploadResult.file.uri,
        },
      },
      { text: `You are given a PDF of slides. Generate 20 mixed questions
(short answer, multiple choice, true/false) that fairly cover the material.

Return ONLY valid JSON matching this TypeScript type:

{
  "title": string,
  "questions": Array<
    | {"id": number, "type":"true_false", "question": string, "answer": boolean}
    | {"id": number, "type":"multiple_choice", "question": string, "options": string[], "answer": string}
    | {"id": number, "type":"short_answer", "question": string, "answer": string}
  >
}

Rules:
Multiple choice options must be 3-5 items, labeled text like "A) ...", "B) ...".
Answers must be concise and unambiguous.
Do not include explanations, markdown, or any text outside the JSON.` },
    ]);

    const summary = typeof result.response?.text === "function"
      ? result.response.text()
      : result.response?.text ?? null;

    // Clean up remote file and local temp file
    await fileManager.deleteFile(uploadResult.file.name);
    await fs.unlink(filePath).catch(() => {});

    return res.json({ summary });
  } catch (err) {
    await fs.unlink(filePath).catch(() => {});
    return res.status(500).json({ error: err?.message ?? String(err) });
  }
});