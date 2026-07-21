"use client";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  TRACKS, DEFAULT_TRACK, loadTrackData, getTrackMeta,
  itemKey, qaKey, roadmapTotalItems, studyTotalQa,
} from "@/data/tracks";
import StudyMaterial from "@/components/StudyMaterial";
import StreakBadge from "@/components/StreakBadge";
import StageTOC from "@/components/StageTOC";
import FilterChips from "@/components/FilterChips";
import ExportMenu from "@/components/ExportMenu";
import TrackSwitcher from "@/components/TrackSwitcher";
import LiveClock from "@/components/LiveClock";
import { computeStreak, todayLocalDate } from "@/lib/study-helpers";
import { loadQuizStats, totalCorrect, totalAttempted, accuracy } from "@/lib/quiz-stats";
import { DSA_PROBLEMS } from "@/data/dsa-problems";

const TRACK_LS_KEY = "roadmap.activeTrack";

export default function Dashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState(null);

  // active track + its lazily-loaded data
  const [activeTrack, setActiveTrack] = useState(DEFAULT_TRACK);
  const [roadmap, setRoadmap] = useState(null);
  const [study, setStudy] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  // per-user state (spans all tracks; keyed by globally-unique stage ids)
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState({});
  const [stageNotes, setStageNotes] = useState({});
  const [customItems, setCustomItems] = useState({});
  const [qaProgress, setQaProgress] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [activityDates, setActivityDates] = useState([]);

  // ui state
  const [view, setView] = useState("hub"); // "hub" | "roadmap"
  const [openStage, setOpenStage] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [openNote, setOpenNote] = useState(null);
  const [stageTab, setStageTab] = useState({});
  const [filters, setFilters] = useState({ unchecked: false, bookmarked: false, withCode: false });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizStats, setQuizStats] = useState({});
  const stageRefs = useRef({});

  // load Quick Practice stats (per-device) for the hub
  useEffect(() => { setQuizStats(loadQuizStats()); }, [view]);

  // restore track choice on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(TRACK_LS_KEY);
      if (saved && TRACKS.some((t) => t.id === saved)) setActiveTrack(saved);
    } catch {}
  }, []);

  // auth + load all user rows once
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!user) { router.push("/login"); return; }
      setUser(user);

      const [prog, noteRows, custom, qa, bm, act] = await Promise.all([
        supabase.from("progress").select("*").eq("user_id", user.id),
        supabase.from("notes").select("*").eq("user_id", user.id),
        supabase.from("custom_items").select("*").eq("user_id", user.id),
        supabase.from("qa_progress").select("qa_key,known").eq("user_id", user.id),
        supabase.from("bookmarks").select("qa_key").eq("user_id", user.id),
        supabase.from("daily_activity").select("activity_date").eq("user_id", user.id).order("activity_date", { ascending: false }).limit(120),
      ]);
      if (!mounted) return;

      const p = {}; (prog.data || []).forEach((r) => { p[r.item_key] = r.done; }); setProgress(p);
      const n = {}, sn = {};
      (noteRows.data || []).forEach((r) => {
        if (r.scope === "item") n[r.item_key] = r.content;
        else if (r.scope === "stage") sn[r.item_key] = r.content;
      });
      setNotes(n); setStageNotes(sn);
      const c = {};
      (custom.data || []).forEach((r) => {
        const key = `${r.stage_id}::${r.section_id}`;
        if (!c[key]) c[key] = [];
        c[key].push({ id: r.id, text: r.text, done: r.done });
      });
      setCustomItems(c);
      const qm = {}; (qa.data || []).forEach((r) => { qm[r.qa_key] = r.known; }); setQaProgress(qm);
      const bmMap = {}; (bm.data || []).forEach((r) => { bmMap[r.qa_key] = true; });
      setBookmarks(bmMap); setBookmarkCount((bm.data || []).length);
      setActivityDates((act.data || []).map((r) => r.activity_date));
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [supabase, router]);

  // load active track data whenever it changes
  useEffect(() => {
    let mounted = true;
    setDataLoading(true);
    setOpenStage(null); setOpenSection(null);
    (async () => {
      const { roadmap, study } = await loadTrackData(activeTrack);
      if (!mounted) return;
      setRoadmap(roadmap);
      setStudy(study);
      setDataLoading(false);
    })();
    return () => { mounted = false; };
  }, [activeTrack]);

  function selectTrack(id) {
    setActiveTrack(id);
    setSearch("");
    setFilters({ unchecked: false, bookmarked: false, withCode: false });
    setView("roadmap"); // choosing a track shows that track's topics
    try { localStorage.setItem(TRACK_LS_KEY, id); } catch {}
  }

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

  async function toggleItem(stageId, sectionId, idx) {
    const key = itemKey(stageId, sectionId, idx);
    const newDone = !progress[key];
    setProgress((p) => ({ ...p, [key]: newDone }));
    await supabase.from("progress").upsert(
      { user_id: user.id, item_key: key, done: newDone, updated_at: new Date().toISOString() },
      { onConflict: "user_id,item_key" }
    );
    logActivity();
  }

  async function saveNote(key, content, scope = "item") {
    setNotes((n) => scope === "item" ? { ...n, [key]: content } : n);
    setStageNotes((sn) => scope === "stage" ? { ...sn, [key]: content } : sn);
    await supabase.from("notes").upsert(
      { user_id: user.id, item_key: key, scope, content, updated_at: new Date().toISOString() },
      { onConflict: "user_id,item_key,scope" }
    );
    logActivity();
  }

  async function addCustomItem(stageId, sectionId, text) {
    if (!text.trim()) return;
    const { data } = await supabase
      .from("custom_items")
      .insert({ user_id: user.id, stage_id: stageId, section_id: sectionId, text, done: false })
      .select().single();
    if (data) {
      const key = `${stageId}::${sectionId}`;
      setCustomItems((c) => ({ ...c, [key]: [...(c[key] || []), { id: data.id, text: data.text, done: false }] }));
    }
  }

  async function toggleCustom(stageId, sectionId, id, currentDone) {
    const key = `${stageId}::${sectionId}`;
    setCustomItems((c) => ({ ...c, [key]: c[key].map((i) => i.id === id ? { ...i, done: !currentDone } : i) }));
    await supabase.from("custom_items").update({ done: !currentDone }).eq("id", id);
    logActivity();
  }

  async function deleteCustom(stageId, sectionId, id) {
    const key = `${stageId}::${sectionId}`;
    setCustomItems((c) => ({ ...c, [key]: c[key].filter((i) => i.id !== id) }));
    await supabase.from("custom_items").delete().eq("id", id);
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
      setBookmarks(next); setBookmarkCount((c) => c - 1);
      await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("qa_key", key);
    } else {
      setBookmarks((m) => ({ ...m, [key]: true })); setBookmarkCount((c) => c + 1);
      await supabase.from("bookmarks").insert({
        user_id: user.id, qa_key: key, stage_id: stageId,
        section_idx: sectionIdx, q_num: qNum, q_text: qText,
      });
    }
    logActivity();
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const stats = useMemo(() => {
    if (!roadmap) return { done: 0, total: 0, pct: 0 };
    const total = roadmapTotalItems(roadmap);
    let done = 0;
    for (const stage of roadmap)
      for (const section of stage.sections)
        for (let i = 0; i < section.items.length; i++)
          if (progress[itemKey(stage.id, section.id, i)]) done++;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [progress, roadmap]);

  const qaStats = useMemo(() => {
    if (!study) return { done: 0, total: 0, pct: 0 };
    const total = studyTotalQa(study);
    let done = 0;
    for (const stageId of Object.keys(study))
      study[stageId].forEach((sec, sIdx) =>
        sec.questions.forEach((q) => { if (qaProgress[qaKey(stageId, sIdx, q.qNum)]) done++; }));
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [qaProgress, study]);

  const streak = useMemo(() => computeStreak(activityDates), [activityDates]);

  function stageStats(stage) {
    let done = 0, total = 0;
    for (const section of stage.sections)
      for (let i = 0; i < section.items.length; i++) {
        total++;
        if (progress[itemKey(stage.id, section.id, i)]) done++;
      }
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function stageQaStats(stageId) {
    const sections = (study && study[stageId]) || [];
    let total = 0, done = 0;
    sections.forEach((sec, sIdx) => sec.questions.forEach((q) => {
      total++;
      if (qaProgress[qaKey(stageId, sIdx, q.qNum)]) done++;
    }));
    return { total, done };
  }

  function jumpToStage(stageId) {
    setOpenStage(stageId);
    requestAnimationFrame(() => {
      const el = stageRefs.current[stageId];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const anyFilterActive = filters.unchecked || filters.bookmarked || filters.withCode;

  const filteredRoadmap = useMemo(() => {
    if (!roadmap) return [];
    if (!search.trim()) return roadmap;
    const q = search.toLowerCase();
    return roadmap.map((stage) => {
      const hasStudyMatch = ((study && study[stage.id]) || []).some((s) =>
        s.questions.some((qst) => {
          if (qst.qText.toLowerCase().includes(q)) return true;
          for (const b of qst.blocks) {
            if (b.kind === "text" && b.text.toLowerCase().includes(q)) return true;
            if ((b.kind === "code" || b.kind === "diagram" || b.kind === "mermaid") && b.lines.join("\n").toLowerCase().includes(q)) return true;
          }
          return false;
        }));
      return {
        ...stage,
        hasStudyMatch,
        sections: stage.sections
          .map((section) => ({ ...section, items: section.items.filter((item) => item.toLowerCase().includes(q)) }))
          .filter((section) => section.items.length > 0 || section.title.toLowerCase().includes(q)),
      };
    }).filter((stage) => stage.sections.length > 0 || stage.title.toLowerCase().includes(q) || stage.hasStudyMatch);
  }, [search, roadmap, study]);

  const trackMeta = getTrackMeta(activeTrack);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-slate-400">Loading your roadmap...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <div className="lg:flex">
        {/* mobile backdrop */}
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-30 lg:hidden no-print" />}

        {/* SIDEBAR */}
        <aside className={`fixed z-40 inset-y-0 left-0 w-64 bg-slate-950/95 backdrop-blur border-r border-slate-800 p-4 flex flex-col transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 no-print ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-black text-sm">C</div>
            <span className="font-extrabold">Crack <span className="gradient-text">Any Job</span></span>
          </Link>

          <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1.5 px-1">Menu</div>
          <nav className="space-y-1">
            <SideLink icon="🏠" label="Dashboard" active={view === "hub"} onClick={() => { setView("hub"); setSidebarOpen(false); }} />
            <SideLink href="/dsa" icon="🧩" label="Prepare DSA" onNav={() => setSidebarOpen(false)} />
            <SideLink href="/sql" icon="🗄️" label="Prepare SQL" onNav={() => setSidebarOpen(false)} />
            <SideLink href="/java-qa" icon="📘" label="Java Interview Q&A" onNav={() => setSidebarOpen(false)} />
            <SideLink href="/springboot-qa" icon="🍃" label="Spring Boot Q&A" onNav={() => setSidebarOpen(false)} />
            <SideLink href="/roles" icon="💼" label="Prepare by Role" onNav={() => setSidebarOpen(false)} />
            <SideLink href="/quick" icon="⚡" label="Quick Practice" onNav={() => setSidebarOpen(false)} />
            <SideLink href="/flashcards" icon="🎯" label="Flashcard Quiz" onNav={() => setSidebarOpen(false)} />
            <SideLink href="/bookmarks" icon="★" label={`Bookmarks · ${bookmarkCount}`} onNav={() => setSidebarOpen(false)} />
          </nav>

          <div className="mt-5 text-[11px] uppercase tracking-wide text-slate-500 mb-1.5 px-1">Career track</div>
          <TrackSwitcher activeTrack={activeTrack} onSelect={(id) => { selectTrack(id); setSidebarOpen(false); }} />

          <div className="mt-auto pt-4 border-t border-slate-800 space-y-2">
            <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
            <button onClick={signOut} className="w-full text-sm px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition">↩ Sign out</button>
          </div>
        </aside>

        {/* MAIN COLUMN */}
        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800 no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-xl leading-none px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700" aria-label="Open menu">☰</button>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-bold truncate">{view === "hub" ? "🏠 Dashboard" : `${trackMeta.icon} ${trackMeta.name}`}</h1>
                <p className="text-xs text-slate-400 truncate hidden sm:block">{view === "hub" ? "Your interview-prep command center" : trackMeta.tagline}</p>
              </div>
              <LiveClock className="hidden md:flex" />
              <span className="hidden lg:block"><StreakBadge streak={streak} /></span>
            </div>

            {view === "roadmap" && (
              <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2 grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Checklist</span>
                      <span className="text-blue-400 font-semibold">{stats.done}/{stats.total} · {stats.pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all" style={{ width: `${stats.pct}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Q&A Mastered</span>
                      <span className="text-emerald-400 font-semibold">{qaStats.done}/{qaStats.total} · {qaStats.pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all" style={{ width: `${qaStats.pct}%` }} />
                    </div>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 space-y-2">
                  <input
                    type="text"
                    placeholder={`Search ${trackMeta.short} topics, Q&A, code...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                  <FilterChips filters={filters} onChange={setFilters} />
                </div>
              </>
            )}
          </header>

      {view === "hub" && (
        <Hub
          trackMeta={trackMeta}
          stats={stats}
          qaStats={qaStats}
          streak={streak}
          bookmarkCount={bookmarkCount}
          quizStats={quizStats}
          user={user}
          onOpenRoadmap={() => setView("roadmap")}
        />
      )}

      {view === "roadmap" && (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3">
        {dataLoading || !roadmap ? (
          <div className="text-center text-slate-400 py-16 animate-pulse">Loading {trackMeta.name}…</div>
        ) : (
          <>
            {filteredRoadmap.length === 0 && (
              <p className="text-center text-slate-400 py-8">No topics match "{search}"</p>
            )}
            {filteredRoadmap.map((stage) => {
              const st = stageStats(stage);
              const qst = stageQaStats(stage.id);
              const isOpen = openStage === stage.id || search.trim().length > 0 || anyFilterActive;
              const tab = stageTab[stage.id] || (qst.total > 0 && (anyFilterActive || (search.trim() && stage.hasStudyMatch && stage.sections.length === 0)) ? "study" : "checklist");
              return (
                <div
                  key={stage.id}
                  ref={(el) => { if (el) stageRefs.current[stage.id] = el; }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden scroll-mt-48"
                >
                  <button onClick={() => setOpenStage(isOpen ? null : stage.id)} className="w-full text-left p-4 hover:bg-slate-800 transition flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-bold text-white">{stage.title}</h2>
                        {stage.duration && <span className="text-xs text-slate-400">· {stage.duration}</span>}
                      </div>
                      <p className="text-sm text-slate-400 mt-0.5">{stage.description}</p>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <div className="h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden max-w-xs">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${st.pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                          {st.done}/{st.total}
                          {qst.total > 0 && <span className="text-pink-400 ml-2">· {qst.done}/{qst.total} Q&A</span>}
                        </span>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xl">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-700">
                      {qst.total > 0 && (
                        <div className="flex items-center border-b border-slate-700 bg-slate-900/40">
                          <button onClick={() => setStageTab((s) => ({ ...s, [stage.id]: "checklist" }))} className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${tab === "checklist" ? "text-blue-400 border-b-2 border-blue-400 bg-slate-800/50" : "text-slate-400 hover:text-slate-200"}`}>📋 Checklist</button>
                          <button onClick={() => setStageTab((s) => ({ ...s, [stage.id]: "study" }))} className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${tab === "study" ? "text-pink-400 border-b-2 border-pink-400 bg-slate-800/50" : "text-slate-400 hover:text-slate-200"}`}>📚 Q&A ({qst.total})</button>
                          <div className="px-3 flex-shrink-0">
                            <ExportMenu stage={stage} studySections={study[stage.id]} stageTitle={stage.title} />
                          </div>
                        </div>
                      )}

                      <div className="p-4 space-y-3">
                        {tab === "study" && qst.total > 0 ? (
                          <StudyMaterial
                            stageId={stage.id}
                            sections={study[stage.id]}
                            search={search}
                            qaProgress={qaProgress}
                            bookmarks={bookmarks}
                            onToggleQa={toggleQa}
                            onToggleBookmark={toggleBookmark}
                            filters={filters}
                          />
                        ) : (
                          <>
                            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                              <details>
                                <summary className="cursor-pointer text-sm font-medium text-amber-400">📝 Stage notes</summary>
                                <textarea
                                  value={stageNotes[stage.id] || ""}
                                  onChange={(e) => saveNote(stage.id, e.target.value, "stage")}
                                  placeholder="Your notes for this stage..."
                                  rows={4}
                                  className="w-full mt-2 px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                              </details>
                            </div>
                            {stage.sections.map((section) => (
                              <Section
                                key={section.id}
                                stage={stage}
                                section={section}
                                progress={progress}
                                notes={notes}
                                customItems={customItems[`${stage.id}::${section.id}`] || []}
                                isOpen={openSection === `${stage.id}::${section.id}` || search.trim().length > 0}
                                onToggleSection={() => setOpenSection(openSection === `${stage.id}::${section.id}` ? null : `${stage.id}::${section.id}`)}
                                onToggleItem={toggleItem}
                                onSaveNote={saveNote}
                                onAddCustom={addCustomItem}
                                onToggleCustom={toggleCustom}
                                onDeleteCustom={deleteCustom}
                                openNote={openNote}
                                setOpenNote={setOpenNote}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </main>
      )}

      {view === "roadmap" && roadmap && <StageTOC stages={roadmap} stageStats={stageStats} onJump={jumpToStage} />}

      <footer className="border-t border-slate-800 mt-6 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            📌 Curated from real candidates' interview experiences and the most-repeated questions asked across the internet.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-xs">
            <a href="https://github.com/jyotiram7402" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition">
              <span>🐙</span> GitHub
            </a>
            <a href="mailto:jyotiramkamble7402@gmail.com" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition">
              <span>✉️</span> Connect with me
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">Your progress saves automatically · {TRACKS.length} career tracks · Crack Any Job</p>
        </div>
      </footer>
        </div>
      </div>
    </div>
  );
}

function SideLink({ href, icon, label, active, onNav, onClick }) {
  const cls = `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
    active
      ? "bg-blue-600/20 text-blue-300 border border-blue-500/40"
      : "text-slate-300 hover:bg-slate-800 border border-transparent"
  }`;
  if (href) {
    return (
      <Link href={href} onClick={onNav} className={cls}>
        <span className="w-5 text-center">{icon}</span>
        {label}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={`${cls} w-full text-left`}>
      <span className="w-5 text-center">{icon}</span>
      {label}
    </button>
  );
}

function Hub({ trackMeta, stats, qaStats, streak, bookmarkCount, quizStats, user, onOpenRoadmap }) {
  const quizCorrect = totalCorrect(quizStats);
  const quizAttempted = totalAttempted(quizStats);
  const quizAcc = accuracy(quizStats);

  const cards = [
    { key: "roadmap", icon: "📋", title: "Roadmap", desc: `${trackMeta.name} — step-by-step checklist & Q&A`, stat: `${stats.pct}% complete`, grad: "from-blue-500 to-cyan-500", onClick: onOpenRoadmap },
    { key: "dsa", icon: "🧩", title: "Prepare DSA", desc: "Brute → better → optimal in Java · sheets · Crackify", stat: `${DSA_PROBLEMS.length}+ problems`, grad: "from-indigo-500 to-blue-500", href: "/dsa" },
    { key: "sql", icon: "🗄️", title: "Prepare SQL", desc: "Queries by experience level + must-know set", stat: "137 questions", grad: "from-emerald-500 to-teal-500", href: "/sql" },
    { key: "roles", icon: "💼", title: "Prepare by Role", desc: "Role-specific banks, filtered by experience level", stat: "6 job roles", grad: "from-purple-500 to-fuchsia-500", href: "/roles" },
    { key: "quick", icon: "⚡", title: "Quick Practice", desc: "Rapid-fire MCQs with instant feedback", stat: `${quizCorrect} solved`, grad: "from-amber-500 to-orange-500", href: "/quick" },
    { key: "flash", icon: "🎯", title: "Flashcards", desc: "Flip-card revision across every track", stat: `${qaStats.pct}% mastered`, grad: "from-pink-500 to-rose-500", href: "/flashcards" },
    { key: "bm", icon: "★", title: "Bookmarks", desc: "Questions you saved to revisit later", stat: `${bookmarkCount} saved`, grad: "from-slate-500 to-slate-600", href: "/bookmarks" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
      {/* welcome */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-pink-600/10 border border-slate-700 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Welcome back 👋</h2>
            <p className="text-sm text-slate-300 mt-1 truncate max-w-[70vw]">{user?.email}</p>
          </div>
          <div className="lg:hidden"><StreakBadge streak={streak} /></div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <HubStat label="Roadmap" value={`${stats.pct}%`} sub={`${stats.done}/${stats.total}`} accent="text-blue-400" />
          <HubStat label="Q&A mastered" value={`${qaStats.pct}%`} sub={`${qaStats.done}/${qaStats.total}`} accent="text-emerald-400" />
          <HubStat label="Quiz solved" value={quizCorrect} sub={`${quizAcc}% acc`} accent="text-amber-400" />
          <HubStat label="Bookmarks" value={bookmarkCount} sub="saved" accent="text-pink-400" />
        </div>
      </div>

      {/* section cards — PrepInsta-style grid */}
      <h3 className="mt-6 mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">Jump back in</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => {
          const inner = (
            <>
              <div className="flex items-center gap-3">
                <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-2xl shadow-lg`}>{c.icon}</span>
                <div className="min-w-0">
                  <div className="text-white font-bold">{c.title}</div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900/70 border border-slate-700 text-slate-300">{c.stat}</span>
                </div>
                <span className="ml-auto text-slate-500 group-hover:translate-x-0.5 group-hover:text-white transition">›</span>
              </div>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{c.desc}</p>
            </>
          );
          const cls = "group text-left rounded-2xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500 hover:-translate-y-0.5 transition p-4 block";
          return c.href
            ? <Link key={c.key} href={c.href} className={cls}>{inner}</Link>
            : <button key={c.key} onClick={c.onClick} className={`${cls} w-full`}>{inner}</button>;
        })}
      </div>

      {/* quick practice breakdown */}
      {quizAttempted > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800/50 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">⚡ Quick Practice progress</h3>
            <Link href="/quick" className="text-xs text-blue-400 hover:underline">Practice more →</Link>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(quizStats).map(([sid, s]) => (
              <div key={sid} className="rounded-xl bg-slate-900/60 border border-slate-700 p-3">
                <div className="text-lg font-black text-white">{s.correct}<span className="text-slate-500 text-sm font-medium">/{s.attempted}</span></div>
                <div className="text-[11px] text-slate-400 mt-0.5 capitalize">{sid === "java" ? "Java" : sid === "mern" ? "MERN" : sid === "sql" ? "SQL" : sid} correct</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function HubStat({ label, value, sub, accent }) {
  return (
    <div className="rounded-xl bg-slate-900/50 border border-slate-700 p-3">
      <div className={`text-xl sm:text-2xl font-black ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-400 mt-0.5">{label} · {sub}</div>
    </div>
  );
}

function Section({
  stage, section, progress, notes, customItems,
  isOpen, onToggleSection, onToggleItem, onSaveNote,
  onAddCustom, onToggleCustom, onDeleteCustom, openNote, setOpenNote
}) {
  const [customText, setCustomText] = useState("");
  const done = section.items.reduce((acc, _, i) => acc + (progress[itemKey(stage.id, section.id, i)] ? 1 : 0), 0);
  const customDone = customItems.filter((c) => c.done).length;
  const total = section.items.length + customItems.length;
  const totalDone = done + customDone;

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
      <button onClick={onToggleSection} className="w-full text-left p-3 hover:bg-slate-800 transition flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-cyan-400 text-sm">{section.title}</h3>
          <span className="text-xs text-slate-500">{totalDone} / {total} complete</span>
        </div>
        <span className="text-slate-400">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="px-3 pb-3 space-y-1.5">
          {section.items.map((item, idx) => {
            const key = itemKey(stage.id, section.id, idx);
            const done = !!progress[key];
            const hasNote = notes[key]?.trim().length > 0;
            const isNoteOpen = openNote === key;
            return (
              <div key={key} className="text-sm">
                <div className="flex items-start gap-2 group">
                  <input type="checkbox" checked={done} onChange={() => onToggleItem(stage.id, section.id, idx)} className="mt-1 w-4 h-4 cursor-pointer accent-blue-500 flex-shrink-0" />
                  <span className={`flex-1 ${done ? "line-through text-slate-500" : "text-slate-200"}`}>{item}</span>
                  <button onClick={() => setOpenNote(isNoteOpen ? null : key)} title="Add/edit note" className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded transition ${hasNote ? "text-amber-400 bg-amber-400/10" : "text-slate-500 hover:text-amber-400 opacity-0 group-hover:opacity-100"}`}>📝</button>
                </div>
                {isNoteOpen && (
                  <textarea value={notes[key] || ""} onChange={(e) => onSaveNote(key, e.target.value, "item")} placeholder="Your note for this topic..." rows={2} autoFocus className="w-full mt-1 ml-6 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-blue-500" style={{ width: "calc(100% - 24px)" }} />
                )}
              </div>
            );
          })}

          {customItems.length > 0 && (
            <div className="pt-2 mt-2 border-t border-slate-700">
              <p className="text-xs text-purple-400 mb-1">My custom items:</p>
              {customItems.map((c) => (
                <div key={c.id} className="flex items-start gap-2 text-sm group">
                  <input type="checkbox" checked={c.done} onChange={() => onToggleCustom(stage.id, section.id, c.id, c.done)} className="mt-1 w-4 h-4 cursor-pointer accent-purple-500 flex-shrink-0" />
                  <span className={`flex-1 ${c.done ? "line-through text-slate-500" : "text-slate-200"}`}>{c.text}</span>
                  <button onClick={() => onDeleteCustom(stage.id, section.id, c.id)} className="text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition" title="Delete">✕</button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); onAddCustom(stage.id, section.id, customText); setCustomText(""); }} className="pt-2 mt-2 border-t border-slate-700 flex gap-2">
            <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="+ Add your own item..." className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-purple-500" />
            <button type="submit" className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded transition">Add</button>
          </form>
        </div>
      )}
    </div>
  );
}
