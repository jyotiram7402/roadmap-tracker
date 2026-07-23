"use client";
import Link from "next/link";
import LiveClock from "@/components/LiveClock";

export default function MavenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 flex flex-col">
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline whitespace-nowrap">← Dashboard</Link>
          <h1 className="text-base sm:text-lg font-bold flex-1 min-w-0 truncate">🧰 Maven</h1>
          <LiveClock className="hidden sm:flex" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-16 flex-1 text-center">
        <div className="text-5xl mb-4">🧰</div>
        <h2 className="text-xl font-bold text-white">Maven — coming soon</h2>
        <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
          This section (under <span className="text-slate-200">Spring Boot &amp; Spring Framework</span>) is ready and waiting for content.
          Share your Maven document and I&apos;ll add it here — notes, lifecycle, commands, POM breakdowns, or Q&amp;A — in the same clean format.
        </p>
        <Link href="/springboot-qa" className="inline-block mt-6 text-sm px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">
          Go to Spring Interview Q&amp;A →
        </Link>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="font-extrabold text-slate-300 mb-1">Crack <span className="gradient-text">Any Job</span></div>
        Spring Boot &amp; Spring Framework · Maven
      </footer>
    </div>
  );
}
