// data/springboot-qa.js — "Spring Boot Interview Q&A" registry.
// Each category's questions live in its own file under data/springboot-qa/
// and are lazy-loaded. Question shape matches the Java Q&A set:
//   { q, slug, answer: [ {kind:"text"|"example"|"note", text} | {kind:"code", lines:[]} ], learn }

export const SPRINGBOOT_QA_CATEGORIES = [
  { id: "core", name: "Core & Essentials", short: "Core", icon: "🍃", accent: "from-green-500 to-emerald-500", desc: "IoC, DI, auto-configuration, starters, profiles, configuration & the core web annotations." },
  { id: "web", name: "Web, Data & Security", short: "Web", icon: "🌐", accent: "from-sky-500 to-blue-500", desc: "Stereotypes, beans, JPA, validation, exception handling, transactions, Spring Security & CORS." },
  { id: "ops", name: "Actuator, Ops & Advanced", short: "Ops", icon: "🚀", accent: "from-violet-500 to-fuchsia-500", desc: "Actuator, microservices, async & scheduling, pooling, caching, reactive, WebSocket & more." },
];

const LOADERS = {
  core: () => import("./springboot-qa/core.js"),
  web: () => import("./springboot-qa/web.js"),
  ops: () => import("./springboot-qa/ops.js"),
};

export async function loadSpringbootQa(cat) {
  const loader = LOADERS[cat];
  if (!loader) return [];
  try { return (await loader()).QUESTIONS || []; } catch { return []; }
}
