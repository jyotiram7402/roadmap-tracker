"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function ConfirmPage() {
  const [status, setStatus] = useState("loading"); // loading | signedin | verified | error
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
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-white via-indigo-50/50 to-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -left-16 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-blue-500/30">C</div>
          <span className="font-extrabold text-lg text-slate-900">Crack <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Any Job</span></span>
        </Link>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
              <p className="mt-6 text-slate-600">Verifying your email…</p>
            </>
          )}

          {(status === "verified" || status === "signedin") && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-4xl animate-fadeup">✅</div>
              <h1 className="mt-6 text-2xl font-black text-slate-900">Email verified!</h1>
              <p className="mt-2 text-slate-600">
                {status === "signedin"
                  ? "You're all set and signed in. Let's crack that job."
                  : "Your account is confirmed. Sign in to start preparing."}
              </p>
              <Link
                href={status === "signedin" ? "/dashboard" : "/login"}
                className="inline-block mt-7 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition shadow-md shadow-blue-500/20"
              >
                {status === "signedin" ? "Go to Dashboard →" : "Continue to Sign in →"}
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-4xl">⚠️</div>
              <h1 className="mt-6 text-2xl font-black text-slate-900">Couldn't verify</h1>
              <p className="mt-2 text-slate-500 text-sm">{msg}</p>
              <p className="mt-2 text-slate-500 text-sm">The link may have expired. Try signing in, or sign up again to get a fresh link.</p>
              <div className="mt-7 flex gap-2">
                <Link href="/login" className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">Sign in</Link>
                <Link href="/signup" className="flex-1 px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition">Sign up</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
