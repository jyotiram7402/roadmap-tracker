"use client";
import { useEffect, useState } from "react";

// Registers the minimal service worker (so Android can offer install) and
// shows a small, dismissible "Install" banner. On iOS Safari — which has no
// install prompt API — it shows the manual "Add to Home Screen" hint instead.
export default function PwaInstaller() {
  const [deferred, setDeferred] = useState(null);
  const [show, setShow] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // already installed / running standalone? don't nag
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (standalone) return;
    try { if (sessionStorage.getItem("pwa-install-dismissed")) return; } catch {}

    const onBIP = (e) => { e.preventDefault(); setDeferred(e); setShow(true); };
    const onInstalled = () => { setShow(false); setDeferred(null); };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);

    // iOS Safari: no beforeinstallprompt — offer manual instructions
    const ua = window.navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isSafari = /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua);
    if (isIOS && isSafari) { setIosHint(true); setShow(true); }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!deferred) return;
    deferred.prompt();
    try { await deferred.userChoice; } catch {}
    setDeferred(null);
    setShow(false);
  }

  function dismiss() {
    setShow(false);
    try { sessionStorage.setItem("pwa-install-dismissed", "1"); } catch {}
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-3 inset-x-3 z-[120] mx-auto max-w-md rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur shadow-2xl p-3 flex items-center gap-3 text-slate-100">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-black text-white flex-shrink-0">C</div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">Install Crack Any Job</div>
        {iosHint ? (
          <div className="text-[11px] text-slate-400">Tap <span className="text-slate-200">Share ⬆️</span> → <span className="text-slate-200">“Add to Home Screen”</span></div>
        ) : (
          <div className="text-[11px] text-slate-400">Add the app to your home screen</div>
        )}
      </div>
      {!iosHint && (
        <button onClick={install} className="text-xs font-semibold px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0">Install</button>
      )}
      <button onClick={dismiss} aria-label="Dismiss" className="text-slate-400 hover:text-white px-1 flex-shrink-0 text-lg leading-none">✕</button>
    </div>
  );
}
