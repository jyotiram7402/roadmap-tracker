"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "@/components/icons";

// Toggles the `light` class on <html> and persists the choice.
// Default is dark (no class). The no-flash init runs from app/layout.js.
export default function ThemeToggle({ className = "" }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    const root = document.documentElement;
    root.classList.toggle("light", next);
    try { localStorage.setItem("crackdev-theme", next ? "light" : "dark"); } catch {}
    try { document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#ffffff" : "#09090b"); } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Switch to dark mode" : "Switch to light mode"}
      className={`inline-grid place-items-center w-9 h-9 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.18] transition ${className}`}
    >
      {light ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
