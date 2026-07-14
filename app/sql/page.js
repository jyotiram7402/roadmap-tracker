"use client";
import Link from "next/link";
import SqlStudio from "@/components/SqlStudio";
import { SQL_PROBLEMS } from "@/data/sql-problems";

export default function SqlPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline">← Dashboard</Link>
          <h1 className="text-base sm:text-lg font-bold">🗄️ Prepare SQL <span className="text-slate-500 font-normal text-sm">· {SQL_PROBLEMS.length} questions</span></h1>
          <Link href="/dsa" className="text-xs sm:text-sm px-2 py-1.5 bg-blue-700/40 border border-blue-800 rounded-lg">🧩<span className="hidden sm:inline"> DSA</span></Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <p className="text-sm text-slate-400 mb-4">
          Database &amp; SQL interview questions by experience level. Each opens a clear answer with SQL and a demo/result table. Filter by level, Theory vs Coding, difficulty, or ★ mostly-asked.
        </p>
        <SqlStudio />
      </main>
    </div>
  );
}
