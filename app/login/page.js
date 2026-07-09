"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import TechBackground from "@/components/TechBackground";

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
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <TechBackground dense={false} />
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-black">C</div>
          <span className="font-extrabold text-lg">Crack <span className="gradient-text">Any Job</span></span>
        </Link>
        <div className="bg-slate-800/70 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h1 className="text-3xl font-black text-white mb-1">Welcome back</h1>
          <p className="text-slate-400 mb-8">Sign in to continue your prep</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="••••••••" />
            </div>
            {error && <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-2 rounded-lg text-sm">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="text-slate-400 text-sm mt-6 text-center">
            No account? <Link href="/signup" className="text-blue-400 hover:underline font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
