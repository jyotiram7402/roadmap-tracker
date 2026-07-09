"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  ROLES, DEFAULT_ROLE, ROLE_LEVELS, getRoleMeta,
  loadRoleData, roleStageId,
} from "@/data/roles";
import { qaKey } from "@/lib/study-helpers";
import { todayLocalDate } from "@/lib/study-helpers";
import StudyMaterial from "@/components/StudyMaterial";
import FilterChips from "@/components/FilterChips";

const ROLE_LS_KEY = "roadmap.activeRole";

const ACCENT = {
  amber: "from-amber-500 to-orange-500",
  green: "from-green-500 to-emerald-500",
  cyan: "from-cyan-500 to-sky-500",
  orange: "from-orange-500 to-red-500",
  purple: "from-purple-500 to-fuchsia-500",
  blue: "from-blue-500 to-indigo-500",
};

export default function RolesPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState(null);
  const [activeRole, setActiveRole] = useState(DEFAULT_ROLE);
  const [picking, setPicking] = useState(true);      // showing the role picker grid
  const [sections, setSections] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const [qaProgress, setQaProgress] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [activityDates, setActivityDates] = useState([]);

  const [level, setLevel] = useState("all");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ unchecked: false, bookmarked: false, withCode: false });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!user) { router.push("/login"); return; }
      setUser(user);
      const [qa, bm, act] = await Promise.all([
        supabase.from("qa_progress").select("qa_key,known").eq("user_id", user.id),
        supabase.from("bookmarks").select("qa_key").eq("user_id", user.id),
        supabase.from("daily_activity").select("activity_date").eq("user_id", user.id).order("activity_date", { ascending: false }).limit(120),
      ]);
      if (!mounted) return;
      const qm = {}; (qa.data || []).forEach((r) => { qm[r.qa_key] = r.known; }); setQaProgress(qm);
      const bmMap = {}; (bm.data || []).forEach((r) => { bmMap[r.qa_key] = true; }); setBookmarks(bmMap);
      setActivityDates((act.data || []).map((r) => r.activity_date));
      setReady(true);
    })();
    return () => { mounted = false; };
  }, [router, supabase]);

  const logActivity = useCallback(async () => {
    if (!user) return;
    const today = todayLocalDate();
    if (activityDates.includes(today)) return;
    setActivityDates((d) => [today, ...d]);
    await supabase.from("daily_activity").upsert(
      { user_id: user.id, activity_date: today, events_count: 1 },
      { onConflict: "user_id,activity_date" }
    );
  }, [user, activityDates, supabase]);

  async function openRole(id) {
    setActiveRole(id);
    setPicking(false);
    setSearch(""); setLevel("all");
    setFilters({ unchecked: false, bookmarked: false, withCode: false });
    setDataLoading(true);
    try { localStorage.setItem(ROLE_LS_KEY, id); } catch {}
    const data = await loadRoleData(id);
    setSections(data);
    setDataLoading(false);
  }

  async function toggleQa(key) {
    const known = !qaProgress[key];
    setQaProgress((m) => ({ ...m, [key]: known }));
    await supabase.from("qa_progress").upsert(
      { user_id: user.id, qa_key: key, known, updated_at: new Date().toISOString() },
      { onConflict: "user_id,qa_key" }
    );
    logActivity();
  }

  async function toggleBookmark({ stageId, sectionIdx, qNum, qText }) {
    const key = qaKey(stageId, sectionIdx, qNum);
    if (bookmarks[key]) {
      const next = { ...bookmarks }; delete next[key];
      setBookmarks(next);
      await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("qa_key", key);
    } else {
      setBookmarks((m) => ({ ...m, [key]: true }));
      await supabase.from("bookmarks").insert({
        user_id: user.id, qa_key: key, stage_id: stageId,
        section_idx: sectionIdx, q_num: qNum, q_text: qText,
      });
    }
    logActivity();
  }

  // Apply the experience-level filter before handing sections to StudyMaterial.
  const levelSections = useMemo(() => {
    if (!sections) return null;
    if (level === "all") return sections;
    return sections
      .map((s) => ({ ...s, questions: s.questions.filter((q) => (q.level || "intermediate") === level) }))
      .filter((s) => s.questions.length > 0);
  }, [sections, level]);

  const roleStats = useMemo(() => {
    if (!sections) return { total: 0, done: 0 };
    const sid = roleStageId(activeRole);
    let total = 0, done = 0;
    sections.forEach((sec, sIdx) => sec.questions.forEach((q) => {
      total++;
      if (qaProgress[qaKey(sid, sIdx, q.qNum)]) done++;
    }));
    return { total, done };
  }, [sections, qaProgress, activeRole]);

  if (!ready) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-400">Loading…</div>;

  const meta = getRoleMeta(activeRole);

  // ---- Role picker grid ----
  if (picking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
        <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
            <Link href="/dashboard" className="text-sm text-blue-400 hover:underline">← Roadmap</Link>
            <h1 className="text-base sm:text-lg font-bold">💼 Prepare for a Job Role</h1>
            <Link href="/bookmarks" className="text-xs sm:text-sm px-2 py-1.5 bg-amber-700/30 border border-amber-800 rounded-lg">★</Link>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">
          <p className="text-sm text-slate-400 mb-4">Pick a target role. Each bank groups the most-asked questions by category (Core, System Design, DSA, DBMS, Scenario, AI, HR, Manager) and level.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <button key={r.id} onClick={() => openRole(r.id)} className="text-left p-4 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-800/40 transition flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${ACCENT[r.accent] || ACCENT.blue} flex items-center justify-center text-2xl flex-shrink-0`}>{r.icon}</div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-white">{r.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{r.tagline}</p>
                  {r.covers?.length > 1 && (
                    <p className="text-[11px] text-slate-500 mt-1">Covers: {r.covers.join(" · ")}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ---- Role detail (question bank) ----
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 no-print">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <button onClick={() => setPicking(true)} className="text-sm text-blue-400 hover:underline">← All roles</button>
          <h1 className="text-sm sm:text-lg font-bold truncate">{meta.icon} {meta.name}</h1>
          <span className="text-xs text-emerald-400 font-semibold whitespace-nowrap">{roleStats.done}/{roleStats.total}</span>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-2">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {ROLE_LEVELS.map((l) => (
              <button key={l.id} onClick={() => setLevel(l.id)} className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap transition ${level === l.id ? "bg-blue-500/20 border-blue-500 text-blue-300" : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"}`}>
                {l.tag ? `${l.tag} ` : ""}{l.label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3 space-y-2">
          <input type="text" placeholder={`Search ${meta.name} questions...`} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500" />
          <FilterChips filters={filters} onChange={setFilters} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4">
        {dataLoading || !levelSections ? (
          <div className="text-center text-slate-400 py-16 animate-pulse">Loading {meta.name} questions…</div>
        ) : levelSections.length === 0 ? (
          <div className="text-center text-slate-500 py-12">No questions at this level yet — try “All levels”.</div>
        ) : (
          <StudyMaterial
            stageId={roleStageId(activeRole)}
            sections={levelSections}
            search={search}
            qaProgress={qaProgress}
            bookmarks={bookmarks}
            onToggleQa={toggleQa}
            onToggleBookmark={toggleBookmark}
            filters={filters}
          />
        )}
      </main>
    </div>
  );
}
