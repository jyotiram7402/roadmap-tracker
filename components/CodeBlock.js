"use client";
import { useEffect, useState } from "react";

let prismPromise = null;
async function getPrism() {
  if (!prismPromise) {
    prismPromise = (async () => {
      const Prism = (await import("prismjs")).default;

      await import("prismjs/components/prism-clike");
      await import("prismjs/components/prism-java");
      await import("prismjs/components/prism-javascript");
      await import("prismjs/components/prism-typescript");
      await import("prismjs/components/prism-sql");
      await import("prismjs/components/prism-yaml");
      await import("prismjs/components/prism-bash");
      await import("prismjs/components/prism-json");
      await import("prismjs/components/prism-docker");
      return Prism;
    })();
  }
  return prismPromise;
}

function detectLang(code) {
  if (/^\s*(public|private|protected)?\s*(class|interface|enum|record)\s+\w/m.test(code)) return "java";
  if (/(@RestController|@Service|@Repository|@Component|@Autowired|@SpringBootApplication|@Entity|@RequestMapping)/m.test(code)) return "java";
  if (/^\s*(import\s+java\.|System\.out\.|throws\s+\w+Exception|Map<|List<)/m.test(code)) return "java";
  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE\s+(TABLE|INDEX|VIEW)|WITH\s+\w+\s+AS|EXPLAIN)/im.test(code)) return "sql";
  if (/^\s*(apiVersion:|kind:|metadata:|spec:|replicas:)/m.test(code)) return "yaml";
  if (/^\s*(FROM\s+\w+|RUN\s+|CMD\s+|ENTRYPOINT\s+|COPY\s+|WORKDIR\s+)/m.test(code)) return "docker";
  if (/^\s*(\$|>|kubectl |docker |git |mvn |npm |yarn |curl |wget |export )/m.test(code)) return "bash";
  if (/^\s*(const|let|var|function|async\s+function|export\s+(default|const)|=>|require\()/m.test(code)) return "javascript";
  if (/(:\s*(string|number|boolean|any)\s*[;,)])|(interface\s+\w+\s*\{)/m.test(code)) return "typescript";
  if (/^\s*\{[\s\S]*\}\s*$/.test(code) && /"\w+"\s*:/.test(code)) return "json";
  return "java";
}

export default function CodeBlock({ lines }) {
  const [copied, setCopied] = useState(false);
  const text = lines.join("\n");
  const lang = detectLang(text);
  const [highlighted, setHighlighted] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const Prism = await getPrism();
        if (!Prism.languages[lang]) return;
        const html = Prism.highlight(text, Prism.languages[lang], lang);
        if (!cancelled) setHighlighted(html);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [text, lang]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="relative group">
      <div className="code-tools absolute top-2 right-2 flex items-center gap-2 z-10">
        <span className="code-lang text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded font-mono">
          {lang}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="code-copy inline-flex items-center justify-center min-w-[44px] h-8 px-2.5 text-xs font-medium rounded-chip transition"
        >
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className={`bg-[#0c0d12] border border-white/[0.06] rounded-control p-3 pt-11 overflow-x-auto text-xs leading-relaxed language-${lang}`}>
        {highlighted ? (
          <code className={`language-${lang} font-mono`} dangerouslySetInnerHTML={{ __html: highlighted }} />
        ) : (
          <code className="text-emerald-300 font-mono whitespace-pre">{text}</code>
        )}
      </pre>
    </div>
  );
}
