export default function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);

  if (!minutes) return `${seconds}s`;

  return `${minutes}min ${seconds % 60}s`;
}
