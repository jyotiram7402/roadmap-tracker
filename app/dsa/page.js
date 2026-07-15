"use client";
import { useState } from "react";
import Link from "next/link";
import DsaStudio from "@/components/DsaStudio";
import SheetBrowser from "@/components/SheetBrowser";
import { DSA_PROBLEMS } from "@/data/dsa-problems";

export default function DsaPage() {
  const [tab, setTab] = useState("problems"); // "problems" | "sheets"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline">← Dashboard</Link>
          <h1 className="text-base sm:text-lg font-bold">🧩 Prepare DSA <span className="text-slate-500 font-normal text-sm">· {DSA_PROBLEMS.length} problems</span></h1>
          <Link href="/roles" className="text-xs sm:text-sm px-2 py-1.5 bg-indigo-700/40 border border-indigo-800 rounded-lg">💼<span className="hidden sm:inline"> Roles</span></Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* tab switch */}
        <div className="inline-flex p-1 bg-slate-800/70 border border-slate-700 rounded-xl mb-4">
          {[["problems", "🧩 Problems"], ["sheets", "📚 Sheets"]].map(([v, label]) => (
            <button key={v} onClick={() => setTab(v)}
              className={`text-sm px-4 py-1.5 rounded-lg font-medium transition ${tab === v ? "bg-blue-600 text-white shadow" : "text-slate-300 hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === "problems" ? (
          <>
            <p className="text-sm text-slate-400 mb-4">
              Pattern-first practice: pick a problem to see Brute → Better → Optimal in Java with dry-run tables, complexity, and the companies that ask it. Filter by topic, difficulty, company, or ★ most-asked.
            </p>
            <DsaStudio />
          </>
        ) : (
          <SheetBrowser />
        )}
      </main>
    </div>
  );
}
