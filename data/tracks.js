

// is fetched, as its own webpack chunk via dynamic import(). The metadata below

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

export function trackIdForStage(stageId) {
  if (!stageId) return DEFAULT_TRACK;
  if (stageId.startsWith("mern-")) return "mern";
  if (stageId.startsWith("genai-")) return "genai";
  if (stageId.startsWith("fde-")) return "fde";
  if (stageId.startsWith("de-")) return "data-engineer";
  if (stageId.startsWith("pyb-")) return "python-backend";
  if (stageId.startsWith("ip-")) return "interview-prep";
  return "java-fullstack";
}

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
