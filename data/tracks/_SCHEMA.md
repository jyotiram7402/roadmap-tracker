# Track data schema (read this before generating any track content)

Each track has TWO files in `data/tracks/`:

## 1. `<track>.roadmap.js` — the learning checklist

```js
export const ROADMAP = [
  {
    id: "<prefix>-1",                 // GLOBALLY UNIQUE. e.g. "mern-1", "genai-1", "fde-1", "de-1", "pyb-1"
    title: "Stage 1: <Title>",
    duration: "1-2 months",
    description: "One-line description of the stage",
    sections: [
      {
        id: "1.1",                    // unique within the stage
        title: "Section title",
        items: [
          "Checklist topic 1",
          "Checklist topic 2"
        ]
      }
    ]
  }
];
```

## 2. `<track>.study.json` — the interview Q&A (the important part)

Object keyed by the SAME stage ids as the roadmap. Each stage → array of sections.

```json
{
  "<prefix>-1": [
    {
      "sectionTitle": "Stage 1 - Interview Q&A",
      "questions": [
        {
          "qNum": 1,
          "qText": "The interview question?",
          "header": "Stage 1 - Interview Q&A",
          "blocks": [
            { "kind": "text", "text": "A clear, interview-ready answer paragraph." },
            { "kind": "text", "text": "Second paragraph if needed." },
            { "kind": "subheader", "text": "Optional inline heading" },
            { "kind": "code", "lines": ["line 1", "line 2", "// comment"] },
            { "kind": "mermaid", "lines": ["flowchart TD", "  A[X] --> B[Y]"] }
          ]
        }
      ]
    }
  ]
}
```

### Block kinds (ONLY these)
- `{"kind":"text","text":"..."}`  — a paragraph (most answers).
- `{"kind":"subheader","text":"..."}` — small inline heading.
- `{"kind":"code","lines":[...]}`  — code; one array element per line. Auto syntax-highlighted (Java/JS/TS/Python/SQL/YAML/bash/Docker/JSON auto-detected).
- `{"kind":"mermaid","lines":[...]}` — a Mermaid diagram (flowchart TD / sequenceDiagram). Use for architecture/flow answers. Keep node labels short. Use `[ ]` for nodes, `[( )]` for stores, `[/ /]` for queues.

### Rules
- `qNum` starts at 1 within each section and increases.
- Answers must be genuinely useful and interview-accurate — not filler. 3-6 sentences typical; add code where it teaches.
- Use `code` blocks generously for anything with syntax (queries, snippets, configs).
- Valid JSON only. No trailing commas. No comments in JSON.
- Keep each stage focused; 8-20 questions per section is good.
