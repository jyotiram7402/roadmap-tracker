// data/java-qa.js — "Java Interview Q&A" registry.
// Each category's questions live in its own file under data/java-qa/ and are
// lazy-loaded so the page stays light. Every question:
//   { q, slug, answer: [ {kind:"text"|"example"|"note", text} | {kind:"code", lines:[]} ], learn }
// `learn` is a Google search query for the "Learn more" link.

export const JAVA_QA_CATEGORIES = [
  { id: "oops", name: "OOP Concepts", short: "OOP", icon: "🧱", accent: "from-orange-500 to-amber-500", desc: "Encapsulation, inheritance, polymorphism, abstraction & the tricky follow-ups." },
  { id: "core", name: "Core Java", short: "Java", icon: "☕", accent: "from-rose-500 to-red-500", desc: "Strings, collections, exceptions, multithreading, memory & immutability." },
  { id: "java8", name: "Java 8 & Streams", short: "Java 8", icon: "⚡", accent: "from-violet-500 to-fuchsia-500", desc: "Streams, lambdas, functional interfaces, Optional & the new Date-Time API." },
];

const LOADERS = {
  oops: () => import("./java-qa/oops.js"),
  core: () => import("./java-qa/core.js"),
  java8: () => import("./java-qa/java8.js"),
};

export async function loadJavaQa(cat) {
  const loader = LOADERS[cat];
  if (!loader) return [];
  try { return (await loader()).QUESTIONS || []; } catch { return []; }
}

export function googleLink(q) {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}
