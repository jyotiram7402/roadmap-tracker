"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase";
import CodeBlock from "@/components/CodeBlock";
import { logVisit, toggleDone, getItem } from "@/lib/activity";

const MAX = 8;
const BUCKET = "solutions";
const SIGNED_TTL = 60 * 60 * 8;

const CATS = [
  { id: "brute", label: "Brute Force", cls: "text-rose-300 border-rose-700/50 bg-rose-500/10" },
  { id: "better", label: "Better", cls: "text-amber-300 border-amber-700/50 bg-amber-500/10" },
  { id: "optimal", label: "Optimal", cls: "text-emerald-300 border-emerald-700/50 bg-emerald-500/10" },
  { id: "other", label: "Other / Notes", cls: "text-sky-300 border-sky-700/50 bg-sky-500/10" },
];
const CAT_LABEL = Object.fromEntries(CATS.map((c) => [c.id, c.label]));
const CAT_CLS = Object.fromEntries(CATS.map((c) => [c.id, c.cls]));
const catOf = (name) => {
  const p = (name || "").split("__")[0];
  return CAT_LABEL[p] ? p : "other";
};

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = reader.result; };
    reader.onerror = reject; reader.readAsDataURL(file);
  });
}
async function compress(file, maxDim = 1400, quality = 0.82) {
  const img = await loadImage(file);
  let { width, height } = img;
  if (width > maxDim || height > maxDim) { const s = Math.min(maxDim / width, maxDim / height); width = Math.round(width * s); height = Math.round(height * s); }
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);
  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
  return { dataUrl, blob };
}

export default function MySolution({ slug, category, title, className = "" }) {
  const supabase = useMemo(() => createClient(), []);
  const lsKey = `dsa-solution:${slug}`;
  const codeKey = `dsa-solution-code:${slug}`;

  const [mode, setMode] = useState(null);
  const [uid, setUid] = useState(null);
  const [images, setImages] = useState([]); // { url, cat, path?, local? }
  const [zoom, setZoom] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [uploadCat, setUploadCat] = useState("optimal");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);

  // code snippets + activity
  const [snippets, setSnippets] = useState([]);
  const [snipOpen, setSnipOpen] = useState(false);
  const [snipCat, setSnipCat] = useState("optimal");
  const [snipCode, setSnipCode] = useState("");
  const [item, setItem] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  // activity: log a visit + load done/visit state
  useEffect(() => {
    if (category && slug) logVisit(category, slug, title);
    setItem(category && slug ? getItem(category, slug) : null);
  }, [category, slug, title]);

  // code snippets from localStorage
  useEffect(() => {
    try { setSnippets(JSON.parse(localStorage.getItem(codeKey)) || []); } catch { setSnippets([]); }
  }, [codeKey]);
  function persistSnippets(next) {
    setSnippets(next);
    try { localStorage.setItem(codeKey, JSON.stringify(next)); } catch { setErr("Storage full — remove a snippet."); }
  }

  // decide cloud vs local for images
  useEffect(() => {
    let ok = true;
    (async () => {
      let user = null;
      try { if (supabase) { const { data } = await supabase.auth.getUser(); user = data?.user || null; } } catch {}
      if (!ok) return;
      if (user) { setUid(user.id); setMode("cloud"); } else setMode("local");
    })();
    return () => { ok = false; };
  }, [supabase]);

  const loadLocal = useCallback(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(lsKey)) || [];
      setImages(raw.map((x) => (typeof x === "string" ? { url: x, cat: "other", local: true } : { url: x.url, cat: x.cat || "other", local: true })));
    } catch { setImages([]); }
  }, [lsKey]);

  const refresh = useCallback(async () => {
    setLoading(true); setErr("");
    if (mode === "cloud" && uid && supabase) {
      const dir = `${uid}/${slug}`;
      try {
        const { data, error } = await supabase.storage.from(BUCKET).list(dir, { limit: 40, sortBy: { column: "created_at", order: "asc" } });
        if (error) throw error;
        const files = (data || []).filter((f) => f.name && !f.name.startsWith("."));
        const withUrls = await Promise.all(files.map(async (f) => {
          const path = `${dir}/${f.name}`;
          const { data: s } = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_TTL);
          return { url: s?.signedUrl, cat: catOf(f.name), path };
        }));
        setImages(withUrls.filter((x) => x.url));
      } catch { setErr("Cloud sync unavailable — showing this device's images."); loadLocal(); }
    } else loadLocal();
    setLoading(false);
  }, [mode, uid, slug, supabase, loadLocal]);

  useEffect(() => { if (mode !== null) { setZoom(null); refresh(); } }, [mode, uid, slug, refresh]);

  function persistLocal(arr) {
    try { localStorage.setItem(lsKey, JSON.stringify(arr)); return true; } catch { setErr("Storage full — remove an image."); return false; }
  }

  async function onFiles(e) {
    const files = [...(e.target.files || [])];
    if (inputRef.current) inputRef.current.value = "";
    if (!files.length) return;
    const room = MAX - images.length;
    if (room <= 0) { setErr(`You can add up to ${MAX} images.`); return; }
    const picked = files.filter((f) => f.type.startsWith("image/")).slice(0, room);
    if (!picked.length) { setErr("Please choose image files."); return; }
    setBusy(true); setErr("");
    try {
      if (mode === "cloud" && uid && supabase) {
        for (const f of picked) {
          const { blob } = await compress(f);
          const path = `${uid}/${slug}/${uploadCat}__${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`;
          const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: "image/jpeg", upsert: false });
          if (error) throw error;
        }
        await refresh();
      } else {
        const arr = images.map((i) => ({ url: i.url, cat: i.cat }));
        for (const f of picked) { const { dataUrl } = await compress(f); arr.push({ url: dataUrl, cat: uploadCat }); }
        if (persistLocal(arr)) setImages(arr.map((x) => ({ ...x, local: true })));
      }
    } catch (e2) { setErr("Upload failed. " + (e2?.message || "Try again.")); }
    setBusy(false);
  }

  async function removeImg(img) {
    if (img.local) {
      const next = images.filter((x) => x.url !== img.url).map((x) => ({ url: x.url, cat: x.cat }));
      if (persistLocal(next)) setImages(next.map((x) => ({ ...x, local: true })));
      return;
    }
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.storage.from(BUCKET).remove([img.path]);
    setBusy(false);
    if (error) { setErr("Couldn't remove that image."); return; }
    await refresh();
  }

  function saveSnippet() {
    if (!snipCode.trim()) return;
    persistSnippets([...snippets, { id: Date.now(), cat: snipCat, code: snipCode.replace(/\s+$/, "") }]);
    setSnipCode(""); setSnipOpen(false);
  }
  function removeSnippet(id) { persistSnippets(snippets.filter((s) => s.id !== id)); }

  function onDone() {
    if (!category || !slug) return;
    toggleDone(category, slug, title);
    setItem(getItem(category, slug));
  }

  // lightbox keyboard + scroll lock
  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoom(null);
      else if (e.key === "ArrowRight") { setZoom((z) => (z + 1) % images.length); setZoomLevel(1); }
      else if (e.key === "ArrowLeft") { setZoom((z) => (z - 1 + images.length) % images.length); setZoomLevel(1); }
      else if (e.key === "+" || e.key === "=") setZoomLevel((z) => Math.min(z + 0.5, 5));
      else if (e.key === "-") setZoomLevel((z) => Math.max(z - 0.5, 1));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [zoom, images.length]);

  const grouped = CATS.map((c) => ({ ...c, imgs: images.filter((i) => i.cat === c.id) })).filter((g) => g.imgs.length);
  const canAdd = images.length < MAX && !loading;
  const visits = item?.visits || 0;
  const done = !!item?.done;

  return (
    <div className={`mt-4 bg-[#18181b] border border-white/[0.06] rounded-xl p-4 ${className}`}>
      {/* activity row */}
      {category && (
        <div className="flex items-center justify-between gap-2 flex-wrap pb-3 mb-3 border-b border-white/[0.06]">
          <span className="text-xs text-zinc-400">👁 Viewed <span className="text-zinc-200 font-semibold">{visits}</span> time{visits === 1 ? "" : "s"}{item?.lastVisit ? ` · last ${item.lastVisit}` : ""}</span>
          <button onClick={onDone}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${done ? "bg-emerald-600 border-emerald-500 text-white" : "bg-[#141417] border-white/[0.1] text-zinc-300 hover:border-emerald-600"}`}>
            {done ? "✓ Done" : "Mark as done"}
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h3 className="text-sm font-bold text-white">🖊️ My Solution</h3>
          <p className="text-[11px] text-zinc-400">Screenshots ({images.length}/{MAX}) &amp; your own code snippets</p>
        </div>
        {canAdd && (
          <div className="flex items-center gap-1.5">
            <select value={uploadCat} onChange={(e) => setUploadCat(e.target.value)}
              className="text-xs px-2 py-1.5 bg-[#141417] border border-white/[0.06] rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500">
              {CATS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <button onClick={() => inputRef.current?.click()} disabled={busy}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white transition">
              {busy ? "…" : "＋ Add image"}
            </button>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={onFiles} className="hidden" />
      {err && <p className="mt-2 text-xs text-rose-400">{err}</p>}

      {/* images grouped by approach */}
      {loading ? (
        <p className="mt-3 text-xs text-zinc-500 animate-pulse">Loading…</p>
      ) : images.length === 0 ? (
        <button onClick={() => inputRef.current?.click()} disabled={busy}
          className="mt-3 w-full py-5 rounded-lg border border-dashed border-white/[0.1] text-zinc-400 hover:border-blue-500 hover:text-blue-300 transition text-sm">
          {busy ? "…" : "＋ Upload a screenshot of your solution — tag it Brute / Better / Optimal"}
        </button>
      ) : (
        <div className="mt-3 space-y-3">
          {grouped.map((g) => (
            <div key={g.id}>
              <div className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-1.5 ${g.cls}`}>{g.label} · {g.imgs.length}</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {g.imgs.map((img, i) => {
                  const flatIdx = images.indexOf(img);
                  return (
                    <div key={img.path || img.url} className="relative group">
                      <button onClick={() => { setZoom(flatIdx); setZoomLevel(1); }} title="Click to view / zoom"
                        className="block w-full aspect-video rounded-lg overflow-hidden border border-white/[0.06] hover:border-blue-500 transition">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={`${g.label} ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                      <button onClick={() => removeImg(img)} disabled={busy} title="Remove"
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition hover:bg-rose-600 disabled:opacity-40">✕</button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* code snippets */}
      <div className="mt-4 pt-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-white">💻 My Code Snippets <span className="text-zinc-500 font-normal">({snippets.length})</span></h4>
          {!snipOpen && <button onClick={() => setSnipOpen(true)} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#141417] border border-white/[0.1] text-zinc-200 hover:border-blue-500 transition">＋ Add code</button>}
        </div>

        {snipOpen && (
          <div className="mt-2 rounded-lg border border-white/[0.06] bg-[#141417]/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <select value={snipCat} onChange={(e) => setSnipCat(e.target.value)}
                className="text-xs px-2 py-1.5 bg-[#141417] border border-white/[0.08] rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500/60">
                {CATS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
              <span className="text-[11px] text-zinc-500">Paste your code below</span>
            </div>
            <textarea value={snipCode} onChange={(e) => setSnipCode(e.target.value)} rows={8} placeholder="// paste your solution code…" spellCheck={false}
              className="w-full px-3 py-2 bg-[#0c0d12] border border-white/[0.06] rounded-lg text-xs font-mono text-zinc-100 focus:outline-none focus:border-blue-500" />
            <div className="mt-2 flex gap-2">
              <button onClick={saveSnippet} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">Save snippet</button>
              <button onClick={() => { setSnipOpen(false); setSnipCode(""); }} className="text-xs px-3 py-1.5 rounded-lg bg-[#1c1c20] border border-white/[0.06] text-zinc-300 hover:border-white/[0.14] transition">Cancel</button>
            </div>
          </div>
        )}

        {snippets.length > 0 && (
          <div className="mt-3 space-y-3">
            {snippets.map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CAT_CLS[s.cat] || CAT_CLS.other}`}>{CAT_LABEL[s.cat] || "Other"}</span>
                  <button onClick={() => removeSnippet(s.id)} className="text-[11px] text-zinc-500 hover:text-rose-400">✕ remove</button>
                </div>
                <CodeBlock lines={s.code.split("\n")} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* lightbox with zoom */}
      {mounted && zoom !== null && images[zoom] && createPortal(
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-md" onClick={() => setZoom(null)}>
          <div className="flex items-center justify-between gap-2 p-3 text-white" onClick={(e) => e.stopPropagation()}>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${CAT_CLS[images[zoom].cat] || CAT_CLS.other}`}>{CAT_LABEL[images[zoom].cat] || "Other"}</span>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1))} title="Zoom out (-)" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-lg">−</button>
              <span className="text-xs tabular-nums w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
              <button onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 5))} title="Zoom in (+)" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-lg">＋</button>
              <button onClick={() => setZoomLevel(1)} title="Reset" className="text-xs px-3 h-9 rounded-full bg-white/10 hover:bg-white/20">Reset</button>
              <button onClick={() => setZoom(null)} title="Close (Esc)" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-lg">✕</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}
            onWheel={(e) => setZoomLevel((z) => Math.min(5, Math.max(1, z + (e.deltaY < 0 ? 0.25 : -0.25))))}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[zoom].url} alt="solution" style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
              className="max-h-[80vh] max-w-[92vw] rounded-lg shadow-2xl object-contain transition-transform" />
          </div>
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-6 p-3 text-white" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => { setZoom((z) => (z - 1 + images.length) % images.length); setZoomLevel(1); }} className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">‹ Prev</button>
              <span className="text-xs text-white/70">{zoom + 1} / {images.length}</span>
              <button onClick={() => { setZoom((z) => (z + 1) % images.length); setZoomLevel(1); }} className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">Next ›</button>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
