"use client";

// Fixed, decorative animated background: gradient blobs + panning grid +
// floating tech-stack chips. Pure CSS animations (see globals.css), no images,
// so it's fast and self-contained. Respects prefers-reduced-motion.

const CHIPS = [
  { t: "☕ Java", c: "#f89820", x: "6%", y: "16%", d: "0s" },
  { t: "⚛️ React", c: "#61dafb", x: "82%", y: "12%", d: "1.2s" },
  { t: "🟢 Node", c: "#83cd29", x: "14%", y: "70%", d: "0.6s" },
  { t: "🐍 Python", c: "#ffd43b", x: "78%", y: "68%", d: "1.8s" },
  { t: "🍃 Spring", c: "#6db33f", x: "44%", y: "8%", d: "0.9s" },
  { t: "TS", c: "#3178c6", x: "90%", y: "42%", d: "2.1s" },
  { t: "JS", c: "#f7df1e", x: "3%", y: "44%", d: "1.5s" },
  { t: "🐳 Docker", c: "#2496ed", x: "66%", y: "84%", d: "0.3s" },
  { t: "☸ K8s", c: "#326ce5", x: "28%", y: "30%", d: "2.4s" },
  { t: "🍃 Mongo", c: "#00ed64", x: "58%", y: "36%", d: "1.1s" },
  { t: "🤖 GenAI", c: "#a78bfa", x: "38%", y: "62%", d: "1.7s" },
  { t: "🗄 SQL", c: "#e38c00", x: "72%", y: "22%", d: "0.5s" },
  { t: "Kafka", c: "#ffffff", x: "20%", y: "52%", d: "2.0s" },
  { t: "Redis", c: "#ff4438", x: "50%", y: "88%", d: "0.8s" },
];

export default function TechBackground({ dense = true }) {
  const chips = dense ? CHIPS : CHIPS.filter((_, i) => i % 2 === 0);
  return (
    <div className="techbg" aria-hidden="true">
      <div className="techbg-grid" />
      <div className="blob" style={{ width: 380, height: 380, left: "-6%", top: "-8%", background: "#3b82f6" }} />
      <div className="blob" style={{ width: 420, height: 420, right: "-8%", top: "10%", background: "#a855f7", animationDelay: "3s" }} />
      <div className="blob" style={{ width: 360, height: 360, left: "30%", bottom: "-12%", background: "#ec4899", animationDelay: "6s" }} />
      {chips.map((c, i) => (
        <span
          key={i}
          className="tech-chip"
          style={{
            left: c.x, top: c.y,
            color: c.c,
            borderColor: `${c.c}33`,
            boxShadow: `0 0 20px ${c.c}18`,
            animation: `floatY ${5 + (i % 4)}s ease-in-out ${c.d} infinite, drift ${12 + (i % 5)}s ease-in-out ${c.d} infinite`,
          }}
        >
          {c.t}
        </span>
      ))}
    </div>
  );
}
