export default function cleanMarkdown(str: string) {
  return str
    .trim()
    .replace(/```json\s*/, "")
    .replace(/```$/, "")
    .trim();
}
