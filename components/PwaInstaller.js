"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

export default function PwaInstaller() {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (standalone) return;
    try { if (sessionStorage.getItem("pwa-install-dismissed")) return; } catch {}

    const ua = window.navigator.userAgent || "";

    const isMobile =
      window.matchMedia("(max-width: 820px)").matches ||
      /android|iphone|ipad|ipod|mobile|silk|kindle/i.test(ua) ||
      (navigator.maxTouchPoints > 1 && /macintosh/i.test(ua));
    if (!isMobile) return;

    const isIOS = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && "ontouchend" in document);
    const isSafari = /safari/i.test(ua) && !/crios|fxios|edgios|android/i.test(ua);
    if (isIOS && isSafari) { setMode("ios"); return; }

    const showInstall = () => setMode("install");
    if (window.__bipEvent) showInstall();
    window.addEventListener("bip-available", showInstall);

    const onInstalled = () => setMode(null);
    window.addEventListener("bip-installed", onInstalled);

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
      <Logo size={40} showText={false} className="flex-shrink-0" />
      <div className="min-w-0 flex-1" style={{ color: "#fafafa" }}>
        <div className="text-sm font-semibold">Install CrackDev</div>
        {mode === "ios" ? (
          <div className="text-[11px]" style={{ color: "#a1a1aa" }}>Tap <span style={{ color: "#e4e4e7" }}>Share</span> ↑ then <span style={{ color: "#e4e4e7" }}>&ldquo;Add to Home Screen&rdquo;</span></div>
        ) : mode === "manual" ? (
          <div className="text-[11px]" style={{ color: "#a1a1aa" }}>Open the browser menu (⋮) → <span style={{ color: "#e4e4e7" }}>Install app</span></div>
        ) : (
          <div className="text-[11px]" style={{ color: "#a1a1aa" }}>Add the app to your home screen</div>
        )}
      </div>
      {mode === "install" && (
        <button onClick={install} className="text-xs font-semibold px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0">Install</button>
      )}
      <button onClick={dismiss} aria-label="Dismiss" className="hover:opacity-100 opacity-70 px-1 flex-shrink-0 text-lg leading-none" style={{ color: "#d4d4d8" }}>✕</button>
    </div>
  );
}
