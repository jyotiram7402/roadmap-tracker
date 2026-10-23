"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/reset` : undefined;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
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
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 border border-emerald-700/40 flex items-center justify-center text-3xl">✉️</div>
              <h1 className="mt-5 text-2xl font-black text-white">Check your email</h1>
              <p className="mt-2 text-zinc-400 text-sm">
                If an account exists for <span className="text-zinc-200">{email}</span>, we&apos;ve sent a link to reset your password. Open it on this device and you&apos;ll be able to set a new password.
              </p>
              <Link href="/login" className="inline-block mt-6 text-sm text-blue-400 hover:underline">← Back to sign in</Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Forgot password?</h1>
              <p className="text-zinc-400 mb-8">Enter your email and we&apos;ll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-[#141417] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" placeholder="you@example.com" />
                </div>
                {error && <div className="bg-rose-500/10 border border-rose-700/40 text-rose-300 px-4 py-2 rounded-lg text-sm">{error}</div>}
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50 shadow-lg shadow-blue-500/25">
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </form>
              <p className="text-zinc-400 text-sm mt-6 text-center">
                Remembered it? <Link href="/login" className="text-blue-400 hover:underline font-semibold">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
