"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase";

const MAX = 4;
const BUCKET = "solutions";
const SIGNED_TTL = 60 * 60 * 8; // 8h signed URLs

// Load a File into an <img> so we can draw it to a canvas.
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Downscale + compress to a small JPEG. Returns both a Blob (for Supabase
// upload) and a data URL (for the localStorage fallback).
async function compress(file, maxDim = 1400, quality = 0.82) {
  const img = await loadImage(file);
  let { width, height } = img;
  if (width > maxDim || height > maxDim) {
    const s = Math.min(maxDim / width, maxDim / height);
    width = Math.round(width * s);
    height = Math.round(height * s);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);
  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality));
  return { dataUrl, blob };
}

// Per-problem "My Solution" gallery.
// - Signed in  → images sync to your account via a private Supabase Storage
//   bucket ("solutions"), so they appear on every device you log in to.
// - Not signed in / offline → falls back to this-device localStorage.
export default function MySolution({ slug, className = "" }) {
  const supabase = useMemo(() => createClient(), []);
  const lsKey = `dsa-solution:${slug}`;

  const [mode, setMode] = useState(null); // "cloud" | "local" (null = deciding)
  const [uid, setUid] = useState(null);
  const [images, setImages] = useState([]); // { url, path?, local? }
  const [zoom, setZoom] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // decide cloud vs local once
  useEffect(() => {
    let ok = true;
    (async () => {
      let user = null;
      try { if (supabase) { const { data } = await supabase.auth.getUser(); user = data?.user || null; } } catch {}
      if (!ok) return;
      if (user) { setUid(user.id); setMode("cloud"); }
      else setMode("local");
    })();
    return () => { ok = false; };
  }, [supabase]);

  const loadLocal = useCallback(() => {
    try {
      const raw = localStorage.getItem(lsKey);
      const arr = raw ? JSON.parse(raw) : [];
      setImages(arr.map((u) => ({ url: u, local: true })));
    } catch { setImages([]); }
  }, [lsKey]);

  const refresh = useCallback(async () => {
    setLoading(true); setErr("");
    if (mode === "cloud" && uid && supabase) {
      const dir = `${uid}/${slug}`;
      try {
        const { data, error } = await supabase.storage.from(BUCKET).list(dir, { limit: 20, sortBy: { column: "created_at", order: "asc" } });
        if (error) throw error;
        const files = (data || []).filter((f) => f.name && !f.name.startsWith("."));
        const withUrls = await Promise.all(files.map(async (f) => {
          const path = `${dir}/${f.name}`;
          const { data: s } = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_TTL);
          return { url: s?.signedUrl, path };
        }));
        setImages(withUrls.filter((x) => x.url));
      } catch {
        // bucket missing / offline — degrade to local so the feature still works
        setErr("Cloud sync unavailable — showing this device's saved images.");
        loadLocal();
      }
    } else {
      loadLocal();
    }
    setLoading(false);
  }, [mode, uid, slug, supabase, loadLocal]);

  useEffect(() => {
    if (mode === null) return;
    setZoom(null);
    refresh();
  }, [mode, uid, slug, refresh]);

  function persistLocal(urls) {
    try { localStorage.setItem(lsKey, JSON.stringify(urls)); return true; }
    catch { setErr("Couldn't save — this device's storage is full."); return false; }
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
          const path = `${uid}/${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
          const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType: "image/jpeg", upsert: false });
          if (error) throw error;
        }
        await refresh();
      } else {
        const urls = images.map((i) => i.url);
        for (const f of picked) { const { dataUrl } = await compress(f); urls.push(dataUrl); }
        if (persistLocal(urls)) setImages(urls.map((u) => ({ url: u, local: true })));
      }
    } catch (e2) {
      setErr("Upload failed. " + (e2?.message ? e2.message : "Please try again."));
    }
    setBusy(false);
  }

  async function remove(item, i) {
    if (item.local) {
      const next = images.filter((_, j) => j !== i).map((x) => x.url);
      if (persistLocal(next)) setImages(images.filter((_, j) => j !== i));
      return;
    }
    if (!supabase) return;
    setBusy(true); setErr("");
    const { error } = await supabase.storage.from(BUCKET).remove([item.path]);
    setBusy(false);
    if (error) { setErr("Couldn't remove that image."); return; }
    await refresh();
  }

  // lightbox: keyboard + scroll lock
  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoom(null);
      else if (e.key === "ArrowRight") setZoom((z) => (z + 1) % images.length);
      else if (e.key === "ArrowLeft") setZoom((z) => (z - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [zoom, images.length]);

  const canAdd = images.length < MAX && !loading;

  return (
    <div className={`mt-4 bg-slate-800/40 border border-slate-700 rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white">🖊️ My Solution</h3>
            {mode === "cloud"
              ? <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-700/40 text-emerald-300">☁ Synced to your account</span>
              : mode === "local"
                ? <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700/40 border border-slate-600 text-slate-300">💾 This device only</span>
                : null}
          </div>
          <p className="text-[11px] text-slate-400">Add screenshots of your own solution ({images.length}/{MAX})</p>
        </div>
        {canAdd && (
          <button onClick={() => inputRef.current?.click()} disabled={busy}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white transition">
            {busy ? "Working…" : "＋ Add your solution"}
          </button>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" multiple onChange={onFiles} className="hidden" />

      {err && <p className="mt-2 text-xs text-rose-400">{err}</p>}

      {loading ? (
        <p className="mt-3 text-xs text-slate-500 animate-pulse">Loading your images…</p>
      ) : images.length > 0 ? (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={img.path || i} className="relative group">
              <button onClick={() => setZoom(i)} title="Click to view full size"
                className="block w-full aspect-video rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition">
                {/* user-provided screenshot (signed URL or data URL) — next/image can't handle these */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={`My solution ${i + 1}`} className="w-full h-full object-cover" />
              </button>
              <button onClick={() => remove(img, i)} disabled={busy} title="Remove"
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition hover:bg-rose-600 disabled:opacity-40">
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <button onClick={() => inputRef.current?.click()} disabled={busy}
          className="mt-3 w-full py-6 rounded-lg border border-dashed border-slate-600 text-slate-400 hover:border-blue-500 hover:text-blue-300 transition text-sm">
          {busy ? "Working…" : "＋ Upload a screenshot of your solution (up to 4)"}
        </button>
      )}

      {/* lightbox */}
      {mounted && zoom !== null && images[zoom] && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setZoom(null)}>
          <button onClick={() => setZoom(null)} title="Close (Esc)"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl leading-none">✕</button>
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setZoom((z) => (z - 1 + images.length) % images.length); }} title="Previous (←)"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl">‹</button>
              <button onClick={(e) => { e.stopPropagation(); setZoom((z) => (z + 1) % images.length); }} title="Next (→)"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl">›</button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[zoom].url} alt={`My solution ${zoom + 1}`} onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] rounded-lg shadow-2xl object-contain" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/80 bg-black/50 px-3 py-1 rounded-full">
            {zoom + 1} / {images.length} · tap outside or Esc to close
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
