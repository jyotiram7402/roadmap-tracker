"use client";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "@/components/icons";

const KEY = "crackdev-theme";
const ORDER = ["dark", "light", "system"]; // tap cycles through these
const LABEL = { dark: "Dark", light: "Light", system: "System" };

function applyMode(mode) {
  const root = document.documentElement;
  const light = mode === "light" || (mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
  root.classList.toggle("light", light);
  try {
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", light ? "#ffffff" : "#09090b"));
  } catch {}
}

// System / Light / Dark. Unset = dark (brand default). The no-flash init lives in app/layout.js.
export default function ThemeToggle({ className = "" }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    let saved = "dark";
    try { saved = localStorage.getItem(KEY) || "dark"; } catch {}
    if (!ORDER.includes(saved)) saved = "dark";
    setMode(saved);
    // Follow OS changes while in system mode.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => { try { if (localStorage.getItem(KEY) === "system") applyMode("system"); } catch {} };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    setMode(next);
    try { localStorage.setItem(KEY, next); } catch {}
    applyMode(next);
  }

  const Icon = mode === "light" ? Sun : mode === "system" ? Monitor : Moon;
  const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABEL[mode]}. Switch to ${LABEL[next]}`}
      title={`Theme: ${LABEL[mode]} (tap for ${LABEL[next]})`}
      className={`inline-grid place-items-center w-11 h-11 -m-1 rounded-control text-muted hover:text-fg hover:bg-surface-2 transition ${className}`}
    >
      <Icon size={17} />
    </button>
  );
}
