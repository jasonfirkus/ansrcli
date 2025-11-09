import fs from "fs";
import path from "path";
import os from "os";

export default function getMostRecentDownload() {
  const downloadsDir = path.join(os.homedir(), "Downloads");
  const files = fs.readdirSync(downloadsDir);

  if (files.length === 0) return null;

  let newestFile = null;
  let newestTime = 0;

  for (const file of files) {
    const filePath = path.join(downloadsDir, file);
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) continue;

    const created = stats.birthtimeMs || stats.ctimeMs;
    if (created > newestTime) {
      newestTime = created;
      newestFile = filePath;
    }
  }

  return newestFile;
}
