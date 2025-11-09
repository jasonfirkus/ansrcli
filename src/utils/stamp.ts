export default function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}
