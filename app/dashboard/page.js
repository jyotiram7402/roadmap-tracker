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
import StageTOC from "@/components/StageTOC";
import FilterChips from "@/components/FilterChips";
import ExportMenu from "@/components/ExportMenu";
import TrackSwitcher from "@/components/TrackSwitcher";
import LiveClock from "@/components/LiveClock";
import ProgressView from "@/components/ProgressView";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import TrackChooser from "@/components/TrackChooser";
import {
  LayoutDashboard, BarChart3, Code2, Database, Coffee, Leaf, Bookmark, Layers,
  Zap, Briefcase, MessageSquare, Wrench, ChevronRight, ChevronDown, Flame, Menu,
  LogOut, ArrowRight, CheckCircle2, Target, Sparkles, Map as MapIcon, Building2,
  PanelLeft, PanelLeftClose,
} from "@/components/icons";
import * as Activity from "@/lib/activity";
import { todayLocalDate } from "@/lib/study-helpers";
import { loadQuizStats, totalCorrect, totalAttempted, accuracy } from "@/lib/quiz-stats";
import { DSA_PROBLEMS } from "@/data/dsa-problems";

const TRACK_LS_KEY = "roadmap.activeTrack";
const COLLAPSE_LS_KEY = "crackdev.sidebarCollapsed";

export default function Dashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState(null);

  // active track + its lazily-loaded data.
  // null = the user hasn't chosen a track yet (new users start here).
  const [activeTrack, setActiveTrack] = useState(null);
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
  const [collapsed, setCollapsed] = useState(false); // desktop sidebar collapsed to icons
  const [quizStats, setQuizStats] = useState({});
  const [localStreak, setLocalStreak] = useState(0);
  const stageRefs = useRef({});

  // load Quick Practice stats (per-device) for the hub
  useEffect(() => { setQuizStats(loadQuizStats()); }, [view]);

  // local activity streak (works without Supabase) — keeps the header badge live
  useEffect(() => {
    const upd = () => setLocalStreak(Activity.computeStreak());
    upd();
    window.addEventListener("activity-change", upd);
    const t = setInterval(upd, 60000);
    return () => { window.removeEventListener("activity-change", upd); clearInterval(t); };
  }, []);

  // restore track choice + sidebar state on mount.
  // No saved track => activeTrack stays null and the track chooser is shown.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(TRACK_LS_KEY);
      if (saved && TRACKS.some((t) => t.id === saved)) setActiveTrack(saved);
      setCollapsed(localStorage.getItem(COLLAPSE_LS_KEY) === "1");
    } catch {}
  }, []);

  function toggleCollapsed() {
    setCollapsed((c) => {
      const next = !c;
      try { localStorage.setItem(COLLAPSE_LS_KEY, next ? "1" : "0"); } catch {}
      return next;
    });
  }

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
    if (!activeTrack) { setRoadmap(null); setStudy(null); setDataLoading(false); return; }
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
          <span className="w-4 h-4 rounded-full border-2 border-zinc-600 border-t-blue-500 animate-spin" />
          Loading your workspace…
        </div>
      </div>
    );
  }

  // New user (or nobody has picked a track): show the track chooser first.
  if (!activeTrack) {
    return <TrackChooser user={user} onSelect={selectTrack} onSignOut={signOut} />;
  }

  return (
    <div className="min-h-screen text-zinc-100" style={{ background: "var(--bg)" }}>
      <div className="lg:flex">
        {/* mobile backdrop */}
        {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-30 lg:hidden no-print" />}

        {/* SIDEBAR */}
        <aside className={`fixed z-40 inset-y-0 left-0 w-64 ${collapsed ? "lg:w-[76px]" : "lg:w-64"} backdrop-blur-xl border-r flex flex-col transition-[transform,width] duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 no-print ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ background: "var(--sidebar)", borderColor: "var(--border)" }}>
          <div className="px-3 h-14 flex items-center gap-1 border-b" style={{ borderColor: "var(--border)" }}>
            <Link href="/" className={`flex items-center ${collapsed ? "lg:hidden" : ""}`}>
              <Logo size={30} showText={!collapsed} textClass="text-[15px] text-white" />
            </Link>
            <button onClick={toggleCollapsed} title={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-label="Toggle sidebar"
              className={`hidden lg:inline-grid place-items-center w-9 h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition ${collapsed ? "mx-auto" : "ml-auto"}`}>
              {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className={`text-[10.5px] font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-2 ${collapsed ? "lg:hidden" : ""}`}>Menu</div>
            <nav className="space-y-0.5">
              <SideLink collapsed={collapsed} Icon={LayoutDashboard} label="Dashboard" active={view === "hub"} onClick={() => { setView("hub"); setSidebarOpen(false); }} />
              <SideLink collapsed={collapsed} Icon={BarChart3} label="Progress" active={view === "progress"} onClick={() => { setView("progress"); setSidebarOpen(false); }} />
              <SideLink collapsed={collapsed} Icon={MapIcon} label="Roadmap" active={view === "roadmap"} onClick={() => { setView("roadmap"); setSidebarOpen(false); }} />
              <SideLink collapsed={collapsed} href="/switch" Icon={Sparkles} label="Career Switch Plan" badge="AI" onNav={() => setSidebarOpen(false)} />
              <SideLink collapsed={collapsed} href="/dsa" Icon={Code2} label="Prepare DSA" onNav={() => setSidebarOpen(false)} />
              <SideLink collapsed={collapsed} href="/sql" Icon={Database} label="Prepare SQL" onNav={() => setSidebarOpen(false)} />
              <SideLink collapsed={collapsed} href="/java-qa" Icon={Coffee} label="Java Interview Q&A" onNav={() => setSidebarOpen(false)} />
              <SideGroup collapsed={collapsed} Icon={Leaf} label="Spring Boot & Spring">
                <SideLink collapsed={collapsed} href="/springboot-qa" Icon={MessageSquare} label="Interview Q&A" nested onNav={() => setSidebarOpen(false)} />
                <SideLink collapsed={collapsed} href="/maven" Icon={Wrench} label="Maven" nested onNav={() => setSidebarOpen(false)} />
              </SideGroup>
              <SideLink collapsed={collapsed} href="/company-qa" Icon={Building2} label="Company-wise Q&A" onNav={() => setSidebarOpen(false)} />
              <SideLink collapsed={collapsed} href="/roles" Icon={Briefcase} label="Prepare by Role" onNav={() => setSidebarOpen(false)} />
              <SideLink collapsed={collapsed} href="/quick" Icon={Zap} label="Quick Practice" onNav={() => setSidebarOpen(false)} />
              <SideLink collapsed={collapsed} href="/flashcards" Icon={Layers} label="Flashcards" onNav={() => setSidebarOpen(false)} />
              <SideLink collapsed={collapsed} href="/bookmarks" Icon={Bookmark} label="Bookmarks" badge={bookmarkCount} onNav={() => setSidebarOpen(false)} />
            </nav>

            <div className={`text-[10.5px] font-semibold uppercase tracking-wider text-zinc-500 mt-6 mb-2 px-2 ${collapsed ? "lg:hidden" : ""}`}>Career track</div>
            <TrackSwitcher compact={collapsed} activeTrack={activeTrack} onSelect={(id) => { selectTrack(id); setSidebarOpen(false); }} />
          </div>

          <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
            <div className={`flex items-center gap-2.5 px-2 py-1.5 ${collapsed ? "lg:flex-col lg:gap-2 lg:px-0" : ""}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center text-xs font-bold text-white flex-shrink-0" title={user?.email}>
                {(user?.email || "?").charAt(0).toUpperCase()}
              </div>
              <div className={`min-w-0 flex-1 ${collapsed ? "lg:hidden" : ""}`}>
                <p className="text-[12.5px] font-medium text-zinc-200 truncate">{(user?.email || "").split("@")[0]}</p>
                <p className="text-[11px] text-zinc-500 truncate">{user?.email}</p>
              </div>
              <button onClick={signOut} title="Sign out" aria-label="Sign out" className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition flex-shrink-0">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN COLUMN */}
        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-20 backdrop-blur-xl border-b no-print" style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-1 rounded-lg text-zinc-300 hover:bg-white/5 transition" aria-label="Open menu"><Menu size={18} /></button>
              <div className="min-w-0 flex-1 flex items-center gap-2">
                <span className="hidden sm:inline text-[13px] text-zinc-500">CrackDev</span>
                <ChevronRight size={13} className="hidden sm:inline text-zinc-600 flex-shrink-0" />
                <h1 className="text-[14px] sm:text-[15px] font-semibold text-white truncate">
                  {view === "hub" ? "Dashboard" : view === "progress" ? "Progress" : trackMeta.name}
                </h1>
              </div>
              <LiveClock className="hidden md:flex" />
              <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <Flame size={14} className="text-orange-400" />
                <span className="text-zinc-100">{localStreak}</span>
                <span className="text-zinc-500 font-normal">day{localStreak === 1 ? "" : "s"}</span>
              </div>
              <ThemeToggle />
            </div>

            {view === "roadmap" && (
              <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2 grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-300">Checklist</span>
                      <span className="text-blue-400 font-semibold">{stats.done}/{stats.total} · {stats.pct}%</span>
                    </div>
                    <div className="h-2 bg-[#1c1c20] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all" style={{ width: `${stats.pct}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-300">Q&A Mastered</span>
                      <span className="text-emerald-400 font-semibold">{qaStats.done}/{qaStats.total} · {qaStats.pct}%</span>
                    </div>
                    <div className="h-2 bg-[#1c1c20] rounded-full overflow-hidden">
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
                    className="w-full px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/60"
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
          streak={localStreak}
          bookmarkCount={bookmarkCount}
          quizStats={quizStats}
          user={user}
          onOpenRoadmap={() => setView("roadmap")}
          onOpenProgress={() => setView("progress")}
        />
      )}

      {view === "progress" && <ProgressView />}

      {view === "roadmap" && (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3">
        {dataLoading || !roadmap ? (
          <div className="text-center text-zinc-400 py-16 animate-pulse">Loading {trackMeta.name}…</div>
        ) : (
          <>
            {filteredRoadmap.length === 0 && (
              <p className="text-center text-zinc-400 py-8">No topics match "{search}"</p>
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
                  className="bg-[#18181b] border border-white/[0.06] rounded-xl overflow-hidden scroll-mt-48"
                >
                  <button onClick={() => setOpenStage(isOpen ? null : stage.id)} className="w-full text-left p-4 hover:bg-[#1c1c20] transition flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-bold text-white">{stage.title}</h2>
                        {stage.duration && <span className="text-xs text-zinc-400">· {stage.duration}</span>}
                      </div>
                      <p className="text-sm text-zinc-400 mt-0.5">{stage.description}</p>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <div className="h-1.5 flex-1 bg-white/[0.08] rounded-full overflow-hidden max-w-xs">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${st.pct}%` }} />
                        </div>
                        <span className="text-xs text-zinc-400 whitespace-nowrap">
                          {st.done}/{st.total}
                          {qst.total > 0 && <span className="text-pink-400 ml-2">· {qst.done}/{qst.total} Q&A</span>}
                        </span>
                      </div>
                    </div>
                    <span className="text-zinc-400 text-xl">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/[0.06]">
                      {qst.total > 0 && (
                        <div className="flex items-center border-b border-white/[0.06] bg-[#141417]">
                          <button onClick={() => setStageTab((s) => ({ ...s, [stage.id]: "checklist" }))} className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${tab === "checklist" ? "text-blue-400 border-b-2 border-blue-400 bg-[#18181b]" : "text-zinc-400 hover:text-zinc-200"}`}>📋 Checklist</button>
                          <button onClick={() => setStageTab((s) => ({ ...s, [stage.id]: "study" }))} className={`flex-1 px-4 py-2.5 text-sm font-medium transition ${tab === "study" ? "text-pink-400 border-b-2 border-pink-400 bg-[#18181b]" : "text-zinc-400 hover:text-zinc-200"}`}>📚 Q&A ({qst.total})</button>
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
                            <div className="bg-[#141417] rounded-lg p-3 border border-white/[0.06]">
                              <details>
                                <summary className="cursor-pointer text-sm font-medium text-amber-400">📝 Stage notes</summary>
                                <textarea
                                  value={stageNotes[stage.id] || ""}
                                  onChange={(e) => saveNote(stage.id, e.target.value, "stage")}
                                  placeholder="Your notes for this stage..."
                                  rows={4}
                                  className="w-full mt-2 px-2 py-1.5 bg-[#1c1c20] border border-white/[0.06] rounded text-sm text-white focus:outline-none focus:border-blue-500"
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

      <div className="h-8" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function SideGroup({ Icon, label, children, defaultOpen = true, collapsed }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className={`nav-link w-full ${collapsed ? "lg:justify-center lg:px-2" : ""}`} aria-expanded={open} title={collapsed ? label : undefined}>
        {Icon && <Icon size={17} className="flex-shrink-0" />}
        <span className={`flex-1 text-left truncate ${collapsed ? "lg:hidden" : ""}`}>{label}</span>
        <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-200 ${open ? "" : "-rotate-90"} ${collapsed ? "lg:hidden" : ""}`} />
      </button>
      {/* Open normally on mobile; when collapsed on desktop, children stay visible (icon-only). */}
      <div className={`${open ? "" : "hidden"} ${collapsed ? "lg:block" : ""}`}>
        <div className={`mt-0.5 ml-4 pl-2 space-y-0.5 border-l anim-fade-in ${collapsed ? "lg:ml-0 lg:pl-0 lg:border-l-0" : ""}`} style={{ borderColor: "var(--border)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SideLink({ href, Icon, label, active, onNav, onClick, badge, nested, collapsed }) {
  const inner = (
    <>
      {Icon && <Icon size={nested ? 15 : 17} className="flex-shrink-0" />}
      <span className={`flex-1 truncate ${collapsed ? "lg:hidden" : ""}`}>{label}</span>
      {badge != null && (
        <span className={`text-[10.5px] font-semibold px-1.5 py-0.5 rounded-md text-zinc-400 ${collapsed ? "lg:hidden" : ""}`} style={{ background: "rgba(255,255,255,.05)" }}>{badge}</span>
      )}
    </>
  );
  const cls = `nav-link ${nested ? "!text-[13px]" : ""} ${collapsed ? "lg:justify-center lg:px-2" : ""}`;
  const title = collapsed ? label : undefined;
  if (href) {
    return <Link href={href} onClick={onNav} className={cls} data-active={active ? "true" : undefined} title={title}>{inner}</Link>;
  }
  return <button onClick={onClick} className={`${cls} w-full`} data-active={active ? "true" : undefined} title={title}>{inner}</button>;
}

function Hub({ trackMeta, stats, qaStats, streak, bookmarkCount, quizStats, user, onOpenRoadmap, onOpenProgress }) {
  const quizCorrect = totalCorrect(quizStats);
  const quizAttempted = totalAttempted(quizStats);
  const quizAcc = accuracy(quizStats);

  const [greeting, setGreeting] = useState("Welcome back");
  useEffect(() => { const h = new Date().getHours(); setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"); }, []);
  const name = (user?.email || "there").split("@")[0];

  const COLOR = {
    blue: "text-blue-400 bg-blue-500/10", indigo: "text-indigo-400 bg-indigo-500/10",
    emerald: "text-emerald-400 bg-emerald-500/10", violet: "text-violet-400 bg-violet-500/10",
    amber: "text-amber-400 bg-amber-500/10", pink: "text-pink-400 bg-pink-500/10",
    orange: "text-orange-400 bg-orange-500/10", rose: "text-rose-400 bg-rose-500/10",
    green: "text-green-400 bg-green-500/10", zinc: "text-zinc-300 bg-white/5",
  };
  const cards = [
    { key: "roadmap", Icon: MapIcon, title: "Roadmap", desc: `${trackMeta.name} — checklist & Q&A, stage by stage.`, stat: `${stats.pct}% complete`, color: "blue", onClick: onOpenRoadmap },
    { key: "progress", Icon: BarChart3, title: "Progress", desc: "Streak, time spent & solved-by-category report.", stat: `${streak}-day streak`, color: "orange", onClick: onOpenProgress },
    { key: "dsa", Icon: Code2, title: "Prepare DSA", desc: "Brute → better → optimal in Java · sheets · Crackify.", stat: `${DSA_PROBLEMS.length}+ problems`, color: "indigo", href: "/dsa" },
    { key: "sql", Icon: Database, title: "Prepare SQL", desc: "Queries by experience level + a must-know set.", stat: "137 questions", color: "emerald", href: "/sql" },
    { key: "java", Icon: Coffee, title: "Java Interview Q&A", desc: "OOP, core Java, and Java 8 & Streams.", stat: "100 Q&A", color: "rose", href: "/java-qa" },
    { key: "spring", Icon: Leaf, title: "Spring Boot & Spring", desc: "Interview Q&A plus Maven notes.", stat: "101 Q&A", color: "green", href: "/springboot-qa" },
    { key: "roles", Icon: Briefcase, title: "Prepare by Role", desc: "Role-specific banks, filtered by level.", stat: "6 job roles", color: "violet", href: "/roles" },
    { key: "quick", Icon: Zap, title: "Quick Practice", desc: "Rapid-fire MCQs with instant feedback.", stat: `${quizCorrect} solved`, color: "amber", href: "/quick" },
    { key: "flash", Icon: Layers, title: "Flashcards", desc: "Flip-card revision across every track.", stat: `${qaStats.pct}% mastered`, color: "pink", href: "/flashcards" },
    { key: "bm", Icon: Bookmark, title: "Bookmarks", desc: "Questions you saved to revisit later.", stat: `${bookmarkCount} saved`, color: "zinc", href: "/bookmarks" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 anim-fade-up">
      {/* welcome */}
      <section className="relative overflow-hidden ui-card p-5 sm:p-7">
        <div className="pointer-events-none absolute -top-24 -right-10 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="relative flex items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 grid place-items-center text-xl font-bold text-white shadow-lg shadow-blue-500/20 flex-shrink-0">{name.charAt(0).toUpperCase()}</div>
            <div className="min-w-0">
              <p className="text-[13px] text-zinc-500">{greeting},</p>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white capitalize truncate">{name}</h2>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-lg text-zinc-300" style={{ background: "var(--card-2)", border: "1px solid var(--border)" }}><Sparkles size={13} className="text-violet-400" />{trackMeta.name}</span>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-lg text-zinc-300" style={{ background: "var(--card-2)", border: "1px solid var(--border)" }}><Flame size={13} className="text-orange-400" />{streak} day streak</span>
              </div>
            </div>
          </div>
          <Ring pct={stats.pct} />
        </div>
        <p className="relative mt-5 text-[13px] text-zinc-400">Small daily reps beat cramming — keep the streak alive and let momentum do the work.</p>
      </section>

      {/* stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <HubStat Icon={MapIcon} label="Roadmap" value={`${stats.pct}%`} sub={`${stats.done}/${stats.total} done`} color="blue" />
        <HubStat Icon={CheckCircle2} label="Q&A mastered" value={`${qaStats.pct}%`} sub={`${qaStats.done}/${qaStats.total}`} color="emerald" />
        <HubStat Icon={Target} label="Quiz solved" value={quizCorrect} sub={`${quizAcc}% accuracy`} color="amber" />
        <HubStat Icon={Bookmark} label="Bookmarks" value={bookmarkCount} sub="saved" color="pink" />
      </div>

      {/* section cards */}
      <div>
        <h3 className="text-[13px] font-semibold text-zinc-400 mb-3">Jump back in</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {cards.map((c) => {
            const inner = (
              <>
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-xl grid place-items-center ${COLOR[c.color]}`}><c.Icon size={20} /></span>
                  <div className="min-w-0 flex-1"><div className="text-[14.5px] font-semibold text-zinc-100 truncate">{c.title}</div></div>
                  <ArrowRight size={16} className="text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-0.5 transition flex-shrink-0" />
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-400 flex-1">{c.desc}</p>
                <div className="mt-3"><span className="inline-flex text-[11px] font-medium px-2 py-1 rounded-md text-zinc-300" style={{ background: "rgba(255,255,255,.04)", border: "1px solid var(--border)" }}>{c.stat}</span></div>
              </>
            );
            const cls = "ui-card ui-card-hover ui-glow group p-4 sm:p-5 flex flex-col text-left h-full";
            return c.href
              ? <Link key={c.key} href={c.href} className={cls}>{inner}</Link>
              : <button key={c.key} onClick={c.onClick} className={`${cls} w-full`}>{inner}</button>;
          })}
        </div>
      </div>

      {/* quick practice breakdown */}
      {quizAttempted > 0 && (
        <div className="ui-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-white flex items-center gap-2"><Zap size={16} className="text-amber-400" /> Quick Practice</h3>
            <Link href="/quick" className="text-[12px] font-medium text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">Practice more <ArrowRight size={13} /></Link>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(quizStats).map(([sid, s]) => (
              <div key={sid} className="rounded-xl p-3" style={{ background: "var(--card-2)", border: "1px solid var(--border)" }}>
                <div className="text-lg font-bold text-white">{s.correct}<span className="text-zinc-500 text-sm font-medium">/{s.attempted}</span></div>
                <div className="text-[11px] text-zinc-400 mt-0.5 capitalize">{sid === "java" ? "Java" : sid === "mern" ? "MERN" : sid === "sql" ? "SQL" : sid} correct</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function Ring({ pct = 0, size = 76, stroke = 7 }) {
  const p = Math.max(0, Math.min(100, pct));
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c - (p / 100) * c;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,.08)" strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="url(#ringg)" strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: "stroke-dashoffset .7s cubic-bezier(.4,0,.2,1)" }} />
        <defs><linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b82f6" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><div className="text-[15px] font-bold text-white leading-none">{p}%</div><div className="text-[9px] text-zinc-500 mt-0.5">done</div></div>
      </div>
    </div>
  );
}

function HubStat({ Icon, label, value, sub, color }) {
  const C = { blue: "text-blue-400", emerald: "text-emerald-400", amber: "text-amber-400", pink: "text-pink-400" };
  return (
    <div className="ui-card ui-card-hover p-3.5 sm:p-4">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon size={15} className={C[color] || "text-zinc-400"} />}
        <span className="text-[11.5px] font-medium text-zinc-500">{label}</span>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{value}</div>
      <div className="text-[11px] text-zinc-500 mt-0.5">{sub}</div>
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
    <div className="bg-[#141417] rounded-lg border border-white/[0.06] overflow-hidden">
      <button onClick={onToggleSection} className="w-full text-left p-3 hover:bg-[#1c1c20] transition flex items-center justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-cyan-400 text-sm">{section.title}</h3>
          <span className="text-xs text-zinc-500">{totalDone} / {total} complete</span>
        </div>
        <span className="text-zinc-400">{isOpen ? "−" : "+"}</span>
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
                  <span className={`flex-1 ${done ? "line-through text-zinc-500" : "text-zinc-200"}`}>{item}</span>
                  <button onClick={() => setOpenNote(isNoteOpen ? null : key)} title="Add/edit note" className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded transition ${hasNote ? "text-amber-400 bg-amber-400/10" : "text-zinc-500 hover:text-amber-400 opacity-0 group-hover:opacity-100"}`}>📝</button>
                </div>
                {isNoteOpen && (
                  <textarea value={notes[key] || ""} onChange={(e) => onSaveNote(key, e.target.value, "item")} placeholder="Your note for this topic..." rows={2} autoFocus className="w-full mt-1 ml-6 px-2 py-1 bg-[#1c1c20] border border-white/[0.06] rounded text-xs text-white focus:outline-none focus:border-blue-500" style={{ width: "calc(100% - 24px)" }} />
                )}
              </div>
            );
          })}

          {customItems.length > 0 && (
            <div className="pt-2 mt-2 border-t border-white/[0.06]">
              <p className="text-xs text-purple-400 mb-1">My custom items:</p>
              {customItems.map((c) => (
                <div key={c.id} className="flex items-start gap-2 text-sm group">
                  <input type="checkbox" checked={c.done} onChange={() => onToggleCustom(stage.id, section.id, c.id, c.done)} className="mt-1 w-4 h-4 cursor-pointer accent-purple-500 flex-shrink-0" />
                  <span className={`flex-1 ${c.done ? "line-through text-zinc-500" : "text-zinc-200"}`}>{c.text}</span>
                  <button onClick={() => onDeleteCustom(stage.id, section.id, c.id)} className="text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition" title="Delete">✕</button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); onAddCustom(stage.id, section.id, customText); setCustomText(""); }} className="pt-2 mt-2 border-t border-white/[0.06] flex gap-2">
            <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="+ Add your own item..." className="flex-1 px-2 py-1 bg-[#1c1c20] border border-white/[0.06] rounded text-xs text-white focus:outline-none focus:border-purple-500" />
            <button type="submit" className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded transition">Add</button>
          </form>
        </div>
      )}
    </div>
  );
}
