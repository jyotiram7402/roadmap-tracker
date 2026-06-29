// Pure, track-agnostic helpers. All functions take their data as arguments so
// they work for any track without static imports of the (large) data files.

export function qaKey(stageId, sectionIdx, qNum) {
  return `${stageId}::${sectionIdx}::${qNum}`;
}

export function itemKey(stageId, sectionId, idx) {
  return `${stageId}::${sectionId}::${idx}`;
}

// All questions in a track's study object, flattened with location info.
export function getAllQuestions(study) {
  const out = [];
  for (const stageId of Object.keys(study || {})) {
    (study[stageId] || []).forEach((sec, sectionIdx) => {
      (sec.questions || []).forEach((q) => {
        out.push({ stageId, sectionTitle: sec.sectionTitle, sectionIdx, ...q });
      });
    });
  }
  return out;
}

// Markdown export of one stage. Pure: pass the roadmap stage object (may be
// undefined) and the study sections array for that stage (may be undefined).
export function stageToMarkdown(stageMeta, studySections) {
  let md = `# ${stageMeta?.title || "Stage"}\n\n`;
  if (stageMeta?.description) md += `> ${stageMeta.description}\n\n`;

  if (stageMeta?.sections?.length) {
    md += `## Checklist\n\n`;
    for (const s of stageMeta.sections) {
      md += `### ${s.title}\n\n`;
      for (const item of s.items) md += `- [ ] ${item}\n`;
      md += "\n";
    }
  }

  for (const section of studySections || []) {
    md += `## ${section.sectionTitle}\n\n`;
    for (const q of section.questions) {
      md += `### Q${q.qNum}. ${q.qText}\n\n`;
      for (const b of q.blocks) {
        if (b.kind === "subheader") md += `**${b.text}**\n\n`;
        else if (b.kind === "text") md += `${b.text}\n\n`;
        else if (b.kind === "code") md += "```\n" + b.lines.join("\n") + "\n```\n\n";
        else if (b.kind === "mermaid") md += "```mermaid\n" + b.lines.join("\n") + "\n```\n\n";
        else if (b.kind === "diagram") md += "```\n" + b.lines.join("\n") + "\n```\n\n";
      }
    }
  }
  return md;
}

const dateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const todayLocalDate = () => dateKey(new Date());

export function computeStreak(activityDates) {
  if (!activityDates || activityDates.length === 0) return 0;
  const set = new Set(activityDates);
  const today = dateKey(new Date());
  const y = new Date(); y.setDate(y.getDate() - 1);
  const yesterday = dateKey(y);

  let cursor = set.has(today) ? today : (set.has(yesterday) ? yesterday : null);
  if (!cursor) return 0;

  const start = new Date(cursor);
  let streak = 0;
  for (let i = 0; ; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() - i);
    if (set.has(dateKey(d))) streak++;
    else break;
  }
  return streak;
}
