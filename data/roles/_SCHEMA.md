# Role question-bank schema (read before generating any role file)

A role file is `data/roles/<role>.json` — an ARRAY of category sections (same
shape as study material, plus an optional per-question `level`):

```json
[
  {
    "sectionTitle": "Core Java",
    "questions": [
      {
        "qNum": 1,
        "qText": "The interview question?",
        "level": "beginner",            // "beginner" | "intermediate" | "advanced"  (maps to 🟢/🟡/🔴, 1-3y / 2-4y / senior)
        "header": "Core Java",
        "blocks": [
          { "kind": "text", "text": "Interview-ready answer." },
          { "kind": "subheader", "text": "Optional inline heading" },
          { "kind": "code", "lines": ["line 1", "line 2"] },
          { "kind": "mermaid", "lines": ["flowchart TD", "  A[X] --> B[Y]"] }
        ]
      }
    ]
  }
]
```

## Rules
- `qNum` starts at 1 and increments **within each section**.
- Every question SHOULD have a `level`. Default to "intermediate" if unsure.
- Block kinds ONLY: `text`, `subheader`, `code` (lines[]), `mermaid` (lines[]).
- Recommended category sections per role (rename/trim to fit the role):
  **Core language · Frameworks/Runtime · Concurrency/Advanced · DBMS & SQL · System Design (HLD) · DSA & Coding · Scenario / Debugging · AI (if relevant) · HR & Behavioral · Manager Round**
- Answers must be accurate and interview-ready. Use `code` blocks liberally.
- Valid JSON only — no comments, no trailing commas.
- Aim for the "most-asked" questions at each level; cover 🟢 fundamentals → 🔴 senior depth.
