"use client";
import { useEffect, useState } from "react";

// Registers the minimal service worker and surfaces an "Install" affordance.
// - Android/Chrome: uses the beforeinstallprompt event (captured pre-hydration
//   by the head script into window.__bipEvent), so it isn't missed on load.
// - iOS Safari: shows the manual "Add to Home Screen" hint (no prompt API).
// - Anything else / event missed: shows a manual "use the browser menu" hint.
export default function PwaInstaller() {
  const [mode, setMode] = useState(null); // null | "install" | "ios" | "manual"

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (standalone) return; // already installed
    try { if (sessionStorage.getItem("pwa-install-dismissed")) return; } catch {}

    const ua = window.navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && "ontouchend" in document);
    const isSafari = /safari/i.test(ua) && !/crios|fxios|edgios|android/i.test(ua);
    if (isIOS && isSafari) { setMode("ios"); return; }

    const showInstall = () => setMode("install");
    if (window.__bipEvent) showInstall();
    window.addEventListener("bip-available", showInstall);

    const onInstalled = () => setMode(null);
    window.addEventListener("bip-installed", onInstalled);

    // Fallback: if no installable prompt appeared shortly (event missed, or the
    // browser only offers manual install), still show a discoverable hint.
    const t = setTimeout(() => setMode((m) => (m ? m : "manual")), 3500);

    return () => {
      window.removeEventListener("bip-available", showInstall);
      window.removeEventListener("bip-installed", onInstalled);
      clearTimeout(t);
    };
  }, []);

  async function install() {
    const d = typeof window !== "undefined" ? window.__bipEvent : null;
    if (!d) { setMode("manual"); return; }
    d.prompt();
    try { await d.userChoice; } catch {}
    window.__bipEvent = null;
    setMode(null);
  }

  function dismiss() {
    setMode(null);
    try { sessionStorage.setItem("pwa-install-dismissed", "1"); } catch {}
  }

  if (!mode) return null;

  return (
    <div className="fixed bottom-3 inset-x-3 z-[120] mx-auto max-w-md rounded-2xl border shadow-2xl p-3 flex items-center gap-3 anim-fade-up"
      style={{ background: "rgba(24,24,27,.94)", borderColor: "rgba(255,255,255,.1)", backdropFilter: "blur(12px)" }}>
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 grid place-items-center text-lg font-black text-white flex-shrink-0">C</div>
      <div className="min-w-0 flex-1 text-zinc-100">
        <div className="text-sm font-semibold">Install Crack Any Job</div>
        {mode === "ios" ? (
          <div className="text-[11px] text-zinc-400">Tap <span className="text-zinc-200">Share</span> ↑ then <span className="text-zinc-200">&ldquo;Add to Home Screen&rdquo;</span></div>
        ) : mode === "manual" ? (
          <div className="text-[11px] text-zinc-400">Open the browser menu (⋮) → <span className="text-zinc-200">Install app</span></div>
        ) : (
          <div className="text-[11px] text-zinc-400">Add the app to your home screen</div>
        )}
      </div>
      {mode === "install" && (
        <button onClick={install} className="text-xs font-semibold px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0">Install</button>
      )}
      <button onClick={dismiss} aria-label="Dismiss" className="text-zinc-400 hover:text-white px-1 flex-shrink-0 text-lg leading-none">✕</button>
    </div>
  );
}
