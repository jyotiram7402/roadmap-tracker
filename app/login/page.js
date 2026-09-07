"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#09090b] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-600/15 blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center mb-6"><Logo size={34} /></Link>
        <div className="rounded-2xl border border-white/[0.08] bg-[#18181b] shadow-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Welcome back</h1>
          <p className="text-zinc-400 mb-8">Sign in to continue your prep</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-[#141417] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-[#141417] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" placeholder="••••••••" />
            </div>
            {error && <div className="bg-rose-500/10 border border-rose-700/40 text-rose-300 px-4 py-2 rounded-lg text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50 shadow-lg shadow-blue-500/25">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="text-zinc-400 text-sm mt-6 text-center">
            No account? <Link href="/signup" className="text-blue-400 hover:underline font-semibold">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
