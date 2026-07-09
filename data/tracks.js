// data/tracks.js — registry of all career tracks + lazy data loader.
//
// Performance: only the ACTIVE track's heavy data (roadmap stages + Q&A JSON)
// is fetched, as its own webpack chunk via dynamic import(). The metadata below
// is tiny and statically imported everywhere.
//
// IMPORTANT: every track uses GLOBALLY-UNIQUE stage IDs (java = "stage-N",
// others are prefixed). Supabase progress/notes/qa_progress/bookmarks all key on
// these strings, so unique IDs mean zero migration and existing Java progress is
// preserved.

export const TRACKS = [
  {
    id: "java-fullstack",
    name: "Java Full-Stack",
    short: "Java",
    icon: "☕",
    accent: "amber",
    tagline: "Zero to Senior Java + React + AI Engineer",
    stagePrefix: "stage-",
  },
  {
    id: "mern",
    name: "MERN Stack",
    short: "MERN",
    icon: "🟢",
    accent: "green",
    tagline: "MongoDB · Express · React · Node.js",
    stagePrefix: "mern-",
  },
  {
    id: "genai",
    name: "Generative AI Engineer",
    short: "GenAI",
    icon: "🤖",
    accent: "purple",
    tagline: "LLMs · RAG · Agents · LangChain · Fine-tuning",
    stagePrefix: "genai-",
  },
  {
    id: "fde",
    name: "Forward Deployed Engineer",
    short: "FDE",
    icon: "🚀",
    accent: "cyan",
    tagline: "Customer-facing solution engineering",
    stagePrefix: "fde-",
  },
  {
    id: "data-engineer",
    name: "Data Engineer",
    short: "Data Eng",
    icon: "🛢️",
    accent: "blue",
    tagline: "Spark · Kafka · Warehouses · Pipelines",
    stagePrefix: "de-",
  },
  {
    id: "python-backend",
    name: "Python Backend Developer",
    short: "Python",
    icon: "🐍",
    accent: "teal",
    tagline: "FastAPI · Django · Async · REST APIs",
    stagePrefix: "pyb-",
  },
  {
    id: "interview-prep",
    name: "Interview Preparation",
    short: "Interview",
    icon: "🧠",
    accent: "purple",
    tagline: "DSA · Algorithms · DBMS · HLD/LLD · CS subjects · Web · DevOps · Languages",
    stagePrefix: "ip-",
  },
];

export const DEFAULT_TRACK = "java-fullstack";

export function getTrackMeta(id) {
  return TRACKS.find((t) => t.id === id) || TRACKS[0];
}

// Map a stage id back to its owning track id (used by the bookmarks page,
// which can hold bookmarks from multiple tracks).
export function trackIdForStage(stageId) {
  if (!stageId) return DEFAULT_TRACK;
  if (stageId.startsWith("mern-")) return "mern";
  if (stageId.startsWith("genai-")) return "genai";
  if (stageId.startsWith("fde-")) return "fde";
  if (stageId.startsWith("de-")) return "data-engineer";
  if (stageId.startsWith("pyb-")) return "python-backend";
  if (stageId.startsWith("ip-")) return "interview-prep";
  return "java-fullstack"; // "stage-N"
}

// Lazy-load a track's heavy data. Returns { roadmap, study }.
// Each case is a distinct dynamic import → distinct chunk.
export async function loadTrackData(id) {
  switch (id) {
    case "mern":
      return {
        roadmap: (await import("@/data/tracks/mern.roadmap.js")).ROADMAP,
        study: (await import("@/data/tracks/mern.study.json")).default,
      };
    case "genai":
      return {
        roadmap: (await import("@/data/tracks/genai.roadmap.js")).ROADMAP,
        study: (await import("@/data/tracks/genai.study.json")).default,
      };
    case "fde":
      return {
        roadmap: (await import("@/data/tracks/fde.roadmap.js")).ROADMAP,
        study: (await import("@/data/tracks/fde.study.json")).default,
      };
    case "data-engineer":
      return {
        roadmap: (await import("@/data/tracks/data-engineer.roadmap.js")).ROADMAP,
        study: (await import("@/data/tracks/data-engineer.study.json")).default,
      };
    case "python-backend":
      return {
        roadmap: (await import("@/data/tracks/python-backend.roadmap.js")).ROADMAP,
        study: (await import("@/data/tracks/python-backend.study.json")).default,
      };
    case "interview-prep":
      return {
        roadmap: (await import("@/data/tracks/interview-prep.roadmap.js")).ROADMAP,
        study: (await import("@/data/tracks/interview-prep.study.json")).default,
      };
    case "java-fullstack":
    default:
      return {
        roadmap: (await import("@/data/roadmap.js")).ROADMAP,
        study: (await import("@/data/study-material.json")).default,
      };
  }
}

// ---- pure helpers shared across pages (operate on passed-in data) ----

export function itemKey(stageId, sectionId, idx) {
  return `${stageId}::${sectionId}::${idx}`;
}

export function qaKey(stageId, sectionIdx, qNum) {
  return `${stageId}::${sectionIdx}::${qNum}`;
}

export function roadmapTotalItems(roadmap) {
  let n = 0;
  for (const stage of roadmap) for (const s of stage.sections) n += s.items.length;
  return n;
}

export function studyTotalQa(study) {
  let n = 0;
  for (const stageId of Object.keys(study || {})) {
    for (const sec of study[stageId]) n += sec.questions.length;
  }
  return n;
}
