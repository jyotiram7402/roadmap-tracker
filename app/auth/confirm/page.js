"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import TechBackground from "@/components/TechBackground";

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
        // implicit (#access_token=…) links are picked up automatically by supabase-js

        const { data: { user } } = await supabase.auth.getUser();
        setStatus(user ? "signedin" : "verified");
      } catch (e) {
        setStatus("error");
        setMsg(e?.message || "This confirmation link is invalid or has expired.");
      }
    })();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <TechBackground dense={false} />
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-black">C</div>
          <span className="font-extrabold text-lg">Crack <span className="gradient-text">Any Job</span></span>
        </Link>
        <div className="bg-slate-800/70 backdrop-blur rounded-2xl shadow-2xl p-8 border border-slate-700 text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-600 border-t-blue-500 animate-spin" />
              <p className="mt-6 text-slate-300">Verifying your email…</p>
            </>
          )}

          {(status === "verified" || status === "signedin") && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-4xl animate-fadeup">✅</div>
              <h1 className="mt-6 text-2xl font-black text-white">Email verified!</h1>
              <p className="mt-2 text-slate-300">
                {status === "signedin"
                  ? "You're all set and signed in. Let's crack that job."
                  : "Your account is confirmed. Sign in to start preparing."}
              </p>
              <Link
                href={status === "signedin" ? "/dashboard" : "/login"}
                className="inline-block mt-7 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-semibold transition"
              >
                {status === "signedin" ? "Go to Dashboard →" : "Continue to Sign in →"}
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-4xl">⚠️</div>
              <h1 className="mt-6 text-2xl font-black text-white">Couldn't verify</h1>
              <p className="mt-2 text-slate-400 text-sm">{msg}</p>
              <p className="mt-2 text-slate-400 text-sm">The link may have expired. Try signing in, or sign up again to get a fresh link.</p>
              <div className="mt-7 flex gap-2">
                <Link href="/login" className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold transition">Sign in</Link>
                <Link href="/signup" className="flex-1 px-4 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 font-semibold transition">Sign up</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
