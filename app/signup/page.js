"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import TechBackground from "@/components/TechBackground";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    const supabase = createClient();
    const emailRedirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/confirm` : undefined;
    const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo } });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setInfo("✅ Account created! Check your email for a confirmation link, then come back and sign in.");
      setLoading(false);
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
          <h1 className="text-3xl font-black text-white mb-1">Create your account</h1>
          <p className="text-slate-400 mb-8">Start cracking interviews — it's free</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Password (min 6 chars)</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="••••••••" />
            </div>
            {error && <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-2 rounded-lg text-sm">{error}</div>}
            {info && <div className="bg-green-900/30 border border-green-800 text-green-200 px-4 py-2 rounded-lg text-sm">{info}</div>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50">
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
          <p className="text-slate-400 text-sm mt-6 text-center">
            Already have an account? <Link href="/login" className="text-blue-400 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
