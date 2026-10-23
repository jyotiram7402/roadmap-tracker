"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [stage, setStage] = useState("verifying"); // verifying | ready | error | done
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    let sub;
    (async () => {
      try {
        const url = new URL(window.location.href);
        const errDesc = url.searchParams.get("error_description");
        if (errDesc) { setStage("error"); setMsg(errDesc.replace(/\+/g, " ")); return; }

        const code = url.searchParams.get("code");
        const token_hash = url.searchParams.get("token_hash");
        const type = url.searchParams.get("type");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({ type, token_hash });
          if (error) throw error;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session) { setStage("ready"); return; }

        // Fallback: the recovery session may arrive via the auth-state event.
        const { data } = supabase.auth.onAuthStateChange((_e, s) => { if (s) setStage("ready"); });
        sub = data?.subscription;
        setTimeout(async () => {
          const { data: { session: s2 } } = await supabase.auth.getSession();
          if (s2) setStage((p) => (p === "verifying" ? "ready" : p));
          else setStage((p) => { if (p === "verifying") { setMsg("This reset link is invalid or has expired. Request a new one."); return "error"; } return p; });
        }, 1800);
      } catch (e) {
        setStage("error");
        setMsg(e?.message || "This reset link is invalid or has expired.");
      }
    })();
    return () => { try { sub?.unsubscribe?.(); } catch {} };
  }, []);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setErr("Passwords don't match."); return; }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setErr(error.message); setLoading(false); return; }
    setStage("done");
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
          {stage === "verifying" && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-white/10 border-t-blue-500 animate-spin" />
              <p className="mt-6 text-zinc-400">Verifying your reset link…</p>
            </div>
          )}

          {stage === "ready" && (
            <>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Set a new password</h1>
              <p className="text-zinc-400 mb-8">Choose a new password for your account.</p>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">New password</label>
                  <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-[#141417] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" placeholder="At least 6 characters" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Confirm password</label>
                  <input type="password" required minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full px-4 py-2.5 bg-[#141417] border border-white/[0.1] rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20" placeholder="Re-enter password" />
                </div>
                {err && <div className="bg-rose-500/10 border border-rose-700/40 text-rose-300 px-4 py-2 rounded-lg text-sm">{err}</div>}
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50 shadow-lg shadow-blue-500/25">
                  {loading ? "Updating…" : "Update password"}
                </button>
              </form>
            </>
          )}

          {stage === "done" && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border border-emerald-700/40 flex items-center justify-center text-4xl">✅</div>
              <h1 className="mt-6 text-2xl font-black text-white">Password updated</h1>
              <p className="mt-2 text-zinc-400">You&apos;re signed in with your new password.</p>
              <Link href="/dashboard" className="inline-block mt-7 w-full px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-500/25">Go to Dashboard →</Link>
            </div>
          )}

          {stage === "error" && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/15 border border-rose-700/40 flex items-center justify-center text-4xl">⚠️</div>
              <h1 className="mt-6 text-2xl font-black text-white">Link expired</h1>
              <p className="mt-2 text-zinc-400 text-sm">{msg}</p>
              <div className="mt-7 flex gap-2">
                <Link href="/forgot-password" className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Request new link</Link>
                <Link href="/login" className="flex-1 px-4 py-3 rounded-xl border border-white/[0.1] hover:bg-white/[0.04] text-zinc-200 font-semibold transition">Sign in</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
