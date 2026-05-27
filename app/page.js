"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { ROADMAP, totalItems, itemKey } from "@/data/roadmap";

const TOTAL = totalItems();

export default function Dashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({}); // { "stage::section::idx": true }
  const [notes, setNotes] = useState({}); // { "stage::section::idx": "text" } and item-level
  const [stageNotes, setStageNotes] = useState({}); // { stageId: "text" }
  const [customItems, setCustomItems] = useState({}); // { "stage::section": [{id, text, done}] }
  const [openStage, setOpenStage] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [openNote, setOpenNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Bootstrap: user + data
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!user) { router.push("/login"); return; }
      setUser(user);

      const [prog, noteRows, custom] = await Promise.all([
        supabase.from("progress").select("*").eq("user_id", user.id),
        supabase.from("notes").select("*").eq("user_id", user.id),
        supabase.from("custom_items").select("*").eq("user_id", user.id),
      ]);

      if (!mounted) return;

      const p = {};
      (prog.data || []).forEach((r) => { p[r.item_key] = r.done; });
      setProgress(p);

      const n = {}, sn = {};
      (noteRows.data || []).forEach((r) => {
        if (r.scope === "item") n[r.item_key] = r.content;
        else if (r.scope === "stage") sn[r.item_key] = r.content;
      });
      setNotes(n);
      setStageNotes(sn);

      const c = {};
      (custom.data || []).forEach((r) => {
        const key = `${r.stage_id}::${r.section_id}`;
        if (!c[key]) c[key] = [];
        c[key].push({ id: r.id, text: r.text, done: r.done });
      });
      setCustomItems(c);

      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [supabase, router]);

  async function toggleItem(stageId, sectionId, idx) {
    const key = itemKey(stageId, sectionId, idx);
    const newDone = !progress[key];
    setProgress((p) => ({ ...p, [key]: newDone }));
    await supabase.from("progress").upsert(
      { user_id: user.id, item_key: key, done: newDone, updated_at: new Date().toISOString() },
      { onConflict: "user_id,item_key" }
    );
  }

  async function saveNote(key, content, scope = "item") {
    setNotes((n) => scope === "item" ? { ...n, [key]: content } : n);
    setStageNotes((sn) => scope === "stage" ? { ...sn, [key]: content } : sn);
    await supabase.from("notes").upsert(
      { user_id: user.id, item_key: key, scope, content, updated_at: new Date().toISOString() },
      { onConflict: "user_id,item_key,scope" }
    );
  }

  async function addCustomItem(stageId, sectionId, text) {
    if (!text.trim()) return;
    const { data } = await supabase
      .from("custom_items")
      .insert({ user_id: user.id, stage_id: stageId, section_id: sectionId, text, done: false })
      .select()
      .single();
    if (data) {
      const key = `${stageId}::${sectionId}`;
      setCustomItems((c) => ({ ...c, [key]: [...(c[key] || []), { id: data.id, text: data.text, done: false }] }));
    }
  }

  async function toggleCustom(stageId, sectionId, id, currentDone) {
    const key = `${stageId}::${sectionId}`;
    setCustomItems((c) => ({
      ...c,
      [key]: c[key].map((i) => i.id === id ? { ...i, done: !currentDone } : i),
    }));
    await supabase.from("custom_items").update({ done: !currentDone }).eq("id", id);
  }

  async function deleteCustom(stageId, sectionId, id) {
    const key = `${stageId}::${sectionId}`;
    setCustomItems((c) => ({ ...c, [key]: c[key].filter((i) => i.id !== id) }));
    await supabase.from("custom_items").delete().eq("id", id);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Aggregate stats
  const stats = useMemo(() => {
    let done = 0;
    for (const stage of ROADMAP) {
      for (const section of stage.sections) {
        for (let i = 0; i < section.items.length; i++) {
          if (progress[itemKey(stage.id, section.id, i)]) done++;
        }
      }
    }
    return { done, total: TOTAL, pct: TOTAL ? Math.round((done / TOTAL) * 100) : 0 };
  }, [progress]);

  function stageStats(stage) {
    let done = 0, total = 0;
    for (const section of stage.sections) {
      for (let i = 0; i < section.items.length; i++) {
        total++;
        if (progress[itemKey(stage.id, section.id, i)]) done++;
      }
    }
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  // Search filter
  const filteredRoadmap = useMemo(() => {
    if (!search.trim()) return ROADMAP;
    const q = search.toLowerCase();
    return ROADMAP
      .map((stage) => ({
        ...stage,
        sections: stage.sections
          .map((section) => ({
            ...section,
            items: section.items.filter((item) => item.toLowerCase().includes(q)),
          }))
          .filter((section) => section.items.length > 0 ||
            section.title.toLowerCase().includes(q)),
      }))
      .filter((stage) =>
        stage.sections.length > 0 ||
        stage.title.toLowerCase().includes(q)
      );
  }, [search]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-slate-400">Loading your roadmap...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold truncate">My Java Full-Stack Roadmap</h1>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="text-xs sm:text-sm px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            Sign out
          </button>
        </div>
        {/* Overall progress */}
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-300">Overall progress</span>
            <span className="text-blue-400 font-semibold">
              {stats.done} / {stats.total} · {stats.pct}%
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
              style={{ width: `${stats.pct}%` }}
            />
          </div>
        </div>
        {/* Search */}
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <input
            type="text"
            placeholder="Search topics... (e.g. kafka, react hooks)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </header>

      {/* Stages */}
      <main className="max-w-5xl mx-auto px-4 py-4 space-y-3">
        {filteredRoadmap.length === 0 && (
          <p className="text-center text-slate-400 py-8">No topics match "{search}"</p>
        )}
        {filteredRoadmap.map((stage) => {
          const st = stageStats(stage);
          const isOpen = openStage === stage.id || search.trim().length > 0;
          return (
            <div key={stage.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenStage(isOpen ? null : stage.id)}
                className="w-full text-left p-4 hover:bg-slate-800 transition flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-white">{stage.title}</h2>
                    <span className="text-xs text-slate-400">· {stage.duration}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">{stage.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden max-w-xs">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ width: `${st.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {st.done}/{st.total}
                    </span>
                  </div>
                </div>
                <span className="text-slate-400 text-xl">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="border-t border-slate-700 p-4 space-y-3">
                  {/* Stage-level note */}
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                    <details>
                      <summary className="cursor-pointer text-sm font-medium text-amber-400">
                        📝 Stage notes
                      </summary>
                      <textarea
                        value={stageNotes[stage.id] || ""}
                        onChange={(e) => saveNote(stage.id, e.target.value, "stage")}
                        placeholder="Your notes for this stage (questions, links, observations)..."
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
                      onToggleSection={() =>
                        setOpenSection(
                          openSection === `${stage.id}::${section.id}` ? null : `${stage.id}::${section.id}`
                        )
                      }
                      onToggleItem={toggleItem}
                      onSaveNote={saveNote}
                      onAddCustom={addCustomItem}
                      onToggleCustom={toggleCustom}
                      onDeleteCustom={deleteCustom}
                      openNote={openNote}
                      setOpenNote={setOpenNote}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </main>

      <footer className="text-center text-xs text-slate-500 py-6">
        Your data is saved automatically. Built with Next.js + Supabase.
      </footer>
    </div>
  );
}

function Section({
  stage, section, progress, notes, customItems,
  isOpen, onToggleSection, onToggleItem, onSaveNote,
  onAddCustom, onToggleCustom, onDeleteCustom, openNote, setOpenNote
}) {
  const [customText, setCustomText] = useState("");

  const done = section.items.reduce((acc, _, i) =>
    acc + (progress[itemKey(stage.id, section.id, i)] ? 1 : 0), 0
  );
  const customDone = customItems.filter((c) => c.done).length;
  const total = section.items.length + customItems.length;
  const totalDone = done + customDone;

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
      <button
        onClick={onToggleSection}
        className="w-full text-left p-3 hover:bg-slate-800 transition flex items-center justify-between gap-2"
      >
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
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => onToggleItem(stage.id, section.id, idx)}
                    className="mt-1 w-4 h-4 cursor-pointer accent-blue-500 flex-shrink-0"
                  />
                  <span className={`flex-1 ${done ? "line-through text-slate-500" : "text-slate-200"}`}>
                    {item}
                  </span>
                  <button
                    onClick={() => setOpenNote(isNoteOpen ? null : key)}
                    title="Add/edit note"
                    className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded transition ${
                      hasNote
                        ? "text-amber-400 bg-amber-400/10"
                        : "text-slate-500 hover:text-amber-400 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    📝
                  </button>
                </div>
                {isNoteOpen && (
                  <textarea
                    value={notes[key] || ""}
                    onChange={(e) => onSaveNote(key, e.target.value, "item")}
                    placeholder="Your note for this topic..."
                    rows={2}
                    autoFocus
                    className="w-full mt-1 ml-6 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-blue-500"
                    style={{ width: "calc(100% - 24px)" }}
                  />
                )}
              </div>
            );
          })}

          {/* Custom items */}
          {customItems.length > 0 && (
            <div className="pt-2 mt-2 border-t border-slate-700">
              <p className="text-xs text-purple-400 mb-1">My custom items:</p>
              {customItems.map((c) => (
                <div key={c.id} className="flex items-start gap-2 text-sm group">
                  <input
                    type="checkbox"
                    checked={c.done}
                    onChange={() => onToggleCustom(stage.id, section.id, c.id, c.done)}
                    className="mt-1 w-4 h-4 cursor-pointer accent-purple-500 flex-shrink-0"
                  />
                  <span className={`flex-1 ${c.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                    {c.text}
                  </span>
                  <button
                    onClick={() => onDeleteCustom(stage.id, section.id, c.id)}
                    className="text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add custom item */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onAddCustom(stage.id, section.id, customText);
              setCustomText("");
            }}
            className="pt-2 mt-2 border-t border-slate-700 flex gap-2"
          >
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="+ Add your own item..."
              className="flex-1 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded transition"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
