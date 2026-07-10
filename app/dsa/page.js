"use client";
import Link from "next/link";
import DsaStudio from "@/components/DsaStudio";
import { DSA_PROBLEMS } from "@/data/dsa-problems";

export default function DsaPage() {
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
        <p className="text-sm text-slate-400 mb-4">
          Pattern-first practice: pick a problem to see Brute → Better → Optimal in Java with dry-run tables, complexity, and the companies that ask it. Filter by topic, difficulty, company, or ★ most-asked.
        </p>
        <DsaStudio />
      </main>
    </div>
  );
}
