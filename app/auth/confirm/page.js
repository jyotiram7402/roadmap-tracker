"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";

export default function ConfirmPage() {
  const [status, setStatus] = useState("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    (async () => {
      try {
        const url = new URL(window.location.href);
        const errDesc = url.searchParams.get("error_description");
        if (errDesc) { setStatus("error"); setMsg(errDesc.replace(/\+/g, " ")); return; }

        const token_hash = url.searchParams.get("token_hash");
        const type = url.searchParams.get("type");
        const code = url.searchParams.get("code");

        if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({ type, token_hash });
          if (error) throw error;
        } else if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }
        const { data: { user } } = await supabase.auth.getUser();
        setStatus(user ? "signedin" : "verified");
      } catch (e) {
        setStatus("error");
        setMsg(e?.message || "This confirmation link is invalid or has expired.");
      }
    })();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#09090b] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-600/15 blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center mb-6"><Logo size={34} /></Link>
        <div className="rounded-2xl border border-white/[0.08] bg-[#18181b] shadow-2xl p-6 sm:p-8 text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-white/10 border-t-blue-500 animate-spin" />
              <p className="mt-6 text-zinc-400">Verifying your email…</p>
            </>
          )}

          {(status === "verified" || status === "signedin") && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border border-emerald-700/40 flex items-center justify-center text-4xl animate-fadeup">✅</div>
              <h1 className="mt-6 text-2xl font-black text-white">Email verified!</h1>
              <p className="mt-2 text-zinc-400">
                {status === "signedin"
                  ? "You're all set and signed in. Let's crack that job."
                  : "Your account is confirmed. Sign in to start preparing."}
              </p>
              <Link
                href={status === "signedin" ? "/dashboard" : "/login"}
                className="inline-block mt-7 w-full px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-500/25"
              >
                {status === "signedin" ? "Go to Dashboard →" : "Continue to Sign in →"}
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/15 border border-rose-700/40 flex items-center justify-center text-4xl">⚠️</div>
              <h1 className="mt-6 text-2xl font-black text-white">Couldn&apos;t verify</h1>
              <p className="mt-2 text-zinc-400 text-sm">{msg}</p>
              <p className="mt-2 text-zinc-500 text-sm">The link may have expired. Try signing in, or sign up again to get a fresh link.</p>
              <div className="mt-7 flex gap-2">
                <Link href="/login" className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Sign in</Link>
                <Link href="/signup" className="flex-1 px-4 py-3 rounded-xl border border-white/[0.1] hover:bg-white/[0.04] text-zinc-200 font-semibold transition">Sign up</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
