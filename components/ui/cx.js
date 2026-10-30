// Tiny class joiner (no deps). cx("a", cond && "b", undefined) → "a b"
export default function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
