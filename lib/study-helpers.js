// Pure helpers for study material — used by dashboard, bookmarks, flashcards, export.
import studyMaterial from "@/data/study-material.json";
import { ROADMAP } from "@/data/roadmap";

export function qaKey(stageId, sectionIdx, qNum) {
  return `${stageId}::${sectionIdx}::${qNum}`;
}

export function getStageMeta(stageId) {
  return ROADMAP.find((s) => s.id === stageId);
}

export function getStageSections(stageId) {
  return studyMaterial[stageId] || [];
}

export function getAllQuestions(stageId) {
  const out = [];
  const sections = getStageSections(stageId);
  sections.forEach((sec, sectionIdx) => {
    sec.questions.forEach((q) => {
      out.push({ stageId, sectionTitle: sec.sectionTitle, sectionIdx, ...q });
    });
  });
  return out;
}

export function totalQaCount() {
  let n = 0;
  for (const stageId of Object.keys(studyMaterial)) {
    for (const sec of studyMaterial[stageId]) n += sec.questions.length;
  }
  return n;
}

// Markdown export of a single stage's Q&A.
export function stageToMarkdown(stageId) {
  const meta = getStageMeta(stageId);
  const sections = getStageSections(stageId);
  let md = `# ${meta?.title || stageId}\n\n`;
  if (meta?.description) md += `> ${meta.description}\n\n`;

  // Checklist
  if (meta?.sections?.length) {
    md += `## Checklist\n\n`;
    for (const s of meta.sections) {
      md += `### ${s.title}\n\n`;
      for (const item of s.items) md += `- [ ] ${item}\n`;
      md += "\n";
    }
  }

  // Q&A
  for (const section of sections) {
    md += `## ${section.sectionTitle}\n\n`;
    for (const q of section.questions) {
      md += `### Q${q.qNum}. ${q.qText}\n\n`;
      for (const b of q.blocks) {
        if (b.kind === "subheader") md += `**${b.text}**\n\n`;
        else if (b.kind === "text") md += `${b.text}\n\n`;
        else if (b.kind === "code") md += "```java\n" + b.lines.join("\n") + "\n```\n\n";
        else if (b.kind === "mermaid") md += "```mermaid\n" + b.lines.join("\n") + "\n```\n\n";
        else if (b.kind === "diagram") md += "```\n" + b.lines.join("\n") + "\n```\n\n";
      }
    }
  }
  return md;
}

// localStorage helpers for streak — falls back if offline
export const todayLocalDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function computeStreak(activityDates) {
  if (!activityDates || activityDates.length === 0) return 0;
  const set = new Set(activityDates);
  const today = todayLocalDate();
  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();

  let streak = 0;
  let cursor = set.has(today) ? today : (set.has(yesterday) ? yesterday : null);
  if (!cursor) return 0;

  // walk backwards
  const startDate = new Date(cursor);
  for (let i = 0; ; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (set.has(key)) streak++;
    else break;
  }
  return streak;
}
