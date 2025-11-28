import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), "..", "..");

export const resolveFromRoot = (...segments: string[]) => path.join(projectRoot, ...segments);
