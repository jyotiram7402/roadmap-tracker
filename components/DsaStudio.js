"use client";
import { useEffect, useMemo, useState } from "react";
import { DSA_PROBLEMS, difficultyForSlug } from "@/data/dsa-problems";
import QuestionTable from "@/components/QuestionTable";
import { SheetProblemView } from "@/components/SheetBrowser";

const SOURCE_LABEL = {
  core: "Core DSA",
  crackify: "Crackify",
  "chocolate-candy": "Chocolate Candy",
  "apna-375": "Apna 375",
  "arsh-280": "Arsh 280",
  "babbar-450": "Babbar 450",
  "siddharth-450": "Siddharth 450",
};
const SOURCE_ORDER = ["crackify", "chocolate-candy", "apna-375", "arsh-280", "babbar-450", "siddharth-450", "core"];

function effDiff(slug, lcSlug, fallback) {
  return difficultyForSlug(slug) || (lcSlug ? difficultyForSlug(lcSlug) : null) || fallback || null;
}

export default function DsaStudio() {
  const [all, setAll] = useState(null);
  const [diff, setDiff] = useState("all");
  const [source, setSource] = useState("All");
  const [hotOnly, setHotOnly] = useState(false);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [shown, setShown] = useState(200);

  useEffect(() => {
    let ok = true;
    (async () => {
      const map = new Map();
      const add = (slug, data, src) => {
        if (!slug) return;
        let it = map.get(slug);
        if (!it) { it = { slug, id: slug, sources: [], companies: [] }; map.set(slug, it); }
        if (!it.sources.includes(src)) it.sources.push(src);
        it.title = it.title || data.title;
        it.difficulty = it.difficulty || data.difficulty || null;
        it.topic = it.topic || data.topic || null;
        it.lcSlug = it.lcSlug || data.lcSlug || null;
        it.link = it.link || data.link || null;
        it.hot = it.hot || !!data.hot;
        if (data.companies) for (const c of data.companies) if (c && !it.companies.includes(c)) it.companies.push(c);
      };

      for (const p of DSA_PROBLEMS) add(p.id, { title: p.title, difficulty: p.difficulty, topic: p.phase, companies: p.companies, hot: p.hot }, "core");

      const [cr, sh] = await Promise.all([import("@/data/crackify"), import("@/data/dsa-sheets")]);
      for (const p of cr.CRACKIFY) add(p.slug, { title: p.name, difficulty: p.difficulty, topic: p.type, lcSlug: p.lcSlug, link: p.link }, "crackify");
      for (const s of sh.SHEETS) for (const t of s.topics) for (const p of t.problems) {
        const companies = Array.isArray(p.companies) ? p.companies : (p.companies ? [p.companies] : []);
        add(p.slug, { title: p.name, difficulty: p.difficulty, topic: p.topic, companies, lcSlug: p.lcSlug, link: p.link }, s.id);
      }

      const list = [...map.values()].map((it) => {
        const d = effDiff(it.slug, it.lcSlug, it.difficulty);
        it.sources.sort((a, b) => SOURCE_ORDER.indexOf(a) - SOURCE_ORDER.indexOf(b));
        return { ...it, name: it.title, difficulty: d, _diff: d, key: it.slug };
      });
      list.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0) || (a.title || "").localeCompare(b.title || ""));
      if (ok) setAll(list);
    })();
    return () => { ok = false; };
  }, []);

  const sources = useMemo(() => {
    const present = new Set((all || []).flatMap((x) => x.sources));
    return SOURCE_ORDER.filter((s) => present.has(s));
  }, [all]);

  const filtered = useMemo(() => {
    if (!all) return [];
    const query = q.trim().toLowerCase();
    return all.filter((p) => {
      if (diff !== "all" && p._diff !== diff) return false;
      if (source !== "All" && !p.sources.includes(source)) return false;
      if (hotOnly && !p.hot) return false;
      if (query && !(p.title || "").toLowerCase().includes(query)) return false;
      return true;
    });
  }, [all, diff, source, hotOnly, q]);

  useEffect(() => { setShown(200); }, [diff, source, hotOnly, q]);

  if (selected) return <SheetProblemView problem={selected} sheetName="All DSA problems" onBack={() => setSelected(null)} />;
  if (all === null) return <div className="text-center py-16 text-zinc-500 animate-pulse">Loading every problem — catalog, sheets &amp; Crackify…</div>;

  const visible = filtered.slice(0, shown);
  const meta = (p) => {
    const srcs = p.sources.filter((s) => s !== "core");
    const labels = (srcs.length ? srcs : ["core"]).map((s) => SOURCE_LABEL[s] || s);
    const tail = labels.slice(0, 3).join(", ") + (labels.length > 3 ? ` +${labels.length - 3}` : "");
    return `${p.topic ? p.topic + " · " : ""}${tail}`;
  };

  return (
    <div>
      <div className="space-y-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all problems… (Two Sum, subarray, tree)"
          className="w-full px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/60" />
        <div className="flex flex-wrap gap-2">
          {[["all", "All"], ["easy", "Easy"], ["medium", "Medium"], ["hard", "Hard"]].map(([v, l]) => (
            <button key={v} onClick={() => setDiff(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${diff === v ? "bg-blue-600 border-blue-500 text-white" : "bg-[#18181b] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>{l}</button>
          ))}
          <button onClick={() => setHotOnly((v) => !v)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${hotOnly ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-[#18181b] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>★ Most asked</button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select value={source} onChange={(e) => setSource(e.target.value)}
            className="text-xs px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500/60">
            <option value="All">All sources</option>
            {sources.map((s) => <option key={s} value={s}>{SOURCE_LABEL[s]}</option>)}
          </select>
          <span className="text-xs text-zinc-400 ml-auto">{filtered.length} of {all.length} problems</span>
        </div>
      </div>

      <p className="mt-3 mb-3 text-[11px] text-zinc-500">
        One home for every DSA problem — the core catalog plus every Sheet and Crackify, each tagged with its source. Open any to solve it, with a full solution where we&apos;ve worked it out.
      </p>

      <QuestionTable items={visible} category="dsa" onOpen={setSelected} getMeta={meta} />

      {filtered.length > shown && (
        <div className="text-center mt-4">
          <button onClick={() => setShown((s) => s + 300)}
            className="text-sm font-medium px-5 py-2 rounded-lg bg-[#18181b] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/[0.18] transition">
            Show more ({filtered.length - shown} left)
          </button>
        </div>
      )}
    </div>
  );
}
