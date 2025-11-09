import fs from "fs";
import path from "path";

/**
 * Writes an artifact (quiz, grade result, etc.) to the .ansr directory.
 */
export default function writeQuizJSON(name: string, data: any) {
  const dir = path.resolve(".ansr");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const quizPath = path.join(dir, name);

  fs.writeFileSync(
    quizPath,
    typeof data === "string" ? data : JSON.stringify(data, null, 2),
    "utf8"
  );

  return quizPath;
}
