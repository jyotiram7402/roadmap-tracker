// data/roles.js — "Prepare for a Specific Job Role" registry + lazy loader.
//
// A role is a categorized interview question bank (no roadmap/checklist).
// Each role's data is lazy-loaded as its own chunk. Each question may carry a
// `level` ("beginner" | "intermediate" | "advanced") for the experience filter.
//
// Progress/bookmarks reuse the existing Supabase tables. A role's pseudo stage
// id is `role-<id>` so qaKey/bookmark keys never collide with learning tracks.

export const ROLE_LEVELS = [
  { id: "all", label: "All levels" },
  { id: "beginner", label: "1–3 yrs / Entry", tag: "🟢" },
  { id: "intermediate", label: "2–4 yrs / Mid", tag: "🟡" },
  { id: "advanced", label: "Senior / SDE-2", tag: "🔴" },
];

export const ROLES = [
  {
    id: "java-backend",
    name: "Java Backend Engineer",
    icon: "☕",
    accent: "amber",
    tagline: "Also: Backend Engineer (Java), Microservices Developer, Backend Platform Engineer",
    covers: ["Java Backend Engineer", "Backend Engineer – Java", "Microservices Developer", "Backend Platform Engineer"],
  },
  {
    id: "node-backend",
    name: "Node.js Backend Engineer",
    icon: "🟩",
    accent: "green",
    tagline: "Node, Express, APIs, DB, system design",
    covers: ["Backend Engineer – Node.js"],
  },
  {
    id: "mern-dev",
    name: "MERN Developer",
    icon: "⚛️",
    accent: "cyan",
    tagline: "MongoDB · Express · React · Node full-stack",
    covers: ["MERN Developer"],
  },
  {
    id: "java-fullstack-role",
    name: "Java Full-Stack Developer",
    icon: "🧩",
    accent: "orange",
    tagline: "Spring Boot backend + React/Angular frontend",
    covers: ["Java Full Stack Developer"],
  },
  {
    id: "genai-role",
    name: "GenAI / AI Engineer",
    icon: "🤖",
    accent: "purple",
    tagline: "GenAI (Entry) + AI Backend Engineer",
    covers: ["GenAI Engineer (Entry)", "AI Backend Engineer"],
  },
  {
    id: "sde",
    name: "SDE Generalist",
    icon: "💻",
    accent: "blue",
    tagline: "SDE-1 / SDE-2 / Software Engineer — DSA, CS core, system design",
    covers: ["Software Engineer", "Software Developer", "SDE-1", "SDE-2"],
  },
];

export const DEFAULT_ROLE = "java-backend";

export function getRoleMeta(id) {
  return ROLES.find((r) => r.id === id) || ROLES[0];
}

export const roleStageId = (id) => `role-${id}`;
export const isRoleStage = (stageId) => !!stageId && stageId.startsWith("role-");
export const roleIdFromStage = (stageId) => (stageId || "").replace(/^role-/, "");

export async function loadRoleData(id) {
  switch (id) {
    case "node-backend":
      return (await import("@/data/roles/node-backend.json")).default;
    case "mern-dev":
      return (await import("@/data/roles/mern-dev.json")).default;
    case "java-fullstack-role":
      return (await import("@/data/roles/java-fullstack-role.json")).default;
    case "genai-role":
      return (await import("@/data/roles/genai-role.json")).default;
    case "sde":
      return (await import("@/data/roles/sde.json")).default;
    case "java-backend":
    default:
      return (await import("@/data/roles/java-backend.json")).default;
  }
}
