"use client";
import Link from "next/link";
import LiveClock from "@/components/LiveClock";
import ThemeToggle from "@/components/ThemeToggle";
import { Map as MapIcon } from "@/components/icons";
import RoadmapMap from "@/components/RoadmapMap";

export default function PrepRoadmapPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-20 bg-[#0e0e11]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline whitespace-nowrap">← Dashboard</Link>
          <h1 className="text-[15px] font-semibold flex-1 min-w-0 truncate flex items-center gap-2">
            <MapIcon size={17} className="text-blue-400" /> Prep Roadmap
          </h1>
          <LiveClock className="hidden sm:flex" />
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        <h2 className="text-xl sm:text-2xl font-black text-white">Crack PBCs 2026 — the full roadmap</h2>
        <p className="text-sm text-zinc-400 mt-1 mb-5">
          A visual mind-map of everything to prepare — Agentic AI, DSA and System Design (HLD &amp; LLD).
          Click a node to expand, use the zoom controls, and drag/scroll to pan.
        </p>
        <RoadmapMap />
      </main>

      <footer className="border-t border-white/[0.08] py-6 text-center text-xs text-zinc-500">
        <div className="font-extrabold text-zinc-300 mb-1">Crack<span className="gradient-text">Dev</span></div>
        Prep roadmap · a graphical map of your prep plan
      </footer>
    </div>
  );
}
