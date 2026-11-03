"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase";
import { confirmEmailLink } from "./actions";

const COPY = {
  recovery: { title: "Reset your password", body: "Tap continue to choose a new password for your CrackDev account.", cta: "Continue" },
  signup: { title: "Confirm your email", body: "Tap continue to finish creating your CrackDev account.", cta: "Confirm my email" },
  email: { title: "Confirm your email", body: "Tap continue to finish creating your CrackDev account.", cta: "Confirm my email" },
  invite: { title: "You're invited", body: "Tap continue to accept the invite and set up your account.", cta: "Accept invite" },
  magiclink: { title: "Sign in to CrackDev", body: "Tap continue to finish signing in on this device.", cta: "Continue" },
  email_change: { title: "Confirm your new email", body: "Tap continue to switch your account to the new address.", cta: "Confirm new email" },
};

const BTN = "inline-block w-full px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-500/25 disabled:opacity-60";
const BTN_GHOST = "flex-1 px-4 py-3 rounded-xl border border-white/[0.1] hover:bg-white/[0.04] text-zinc-200 font-semibold transition";

function Shell({ children }) {
  return (
    <div className="relative min-h-dvh flex items-center justify-center p-4 overflow-hidden bg-[#09090b] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-600/15 blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center mb-6"><Logo size={34} /></Link>
        <div className="rounded-2xl border border-white/[0.08] bg-[#18181b] shadow-2xl p-6 sm:p-8 text-center">{children}</div>
      </div>
    </div>
  );
}

function ContinueButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${BTN} mt-7`} aria-busy={pending || undefined}>
      {pending ? "Checking your link…" : label}
    </button>
  );
}

export default function ConfirmClient({ tokenHash, type, next, hasCode, errorDescription }) {
  const tokenFlow = Boolean(tokenHash && type);
  // Legacy links (Supabase default template → ?code= or #access_token=) still work.
  const [legacy, setLegacy] = useState(tokenFlow ? null : "loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (tokenFlow) return;
    if (errorDescription) { setLegacy("error"); setMsg(errorDescription.replace(/\+/g, " ")); return; }
    const supabase = createClient();
    if (!supabase) return;
    (async () => {
      try {
        const hashHasToken = typeof window !== "undefined" && /access_token=/.test(window.location.hash);
        if (hasCode) {
          const code = new URL(window.location.href).searchParams.get("code");
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (!hashHasToken) {
          setLegacy("invalid");
          return;
        }
        const { data: { user } } = await supabase.auth.getUser();
        setLegacy(user ? "signedin" : "verified");
      } catch (e) {
        setLegacy("error");
        setMsg(e?.message || "This link is invalid or has expired.");
      }
    })();
  }, [tokenFlow, hasCode, errorDescription]);

  if (tokenFlow) {
    const copy = COPY[type] || { title: "Continue to CrackDev", body: "Tap continue to verify this link.", cta: "Continue" };
    return (
      <Shell>
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/15 border border-blue-700/40 flex items-center justify-center text-3xl">✉️</div>
        <h1 className="mt-6 text-2xl font-black text-white">{copy.title}</h1>
        <p className="mt-2 text-zinc-400 text-sm">{copy.body}</p>
        <form action={confirmEmailLink}>
          <input type="hidden" name="token_hash" value={tokenHash} />
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="next" value={next || ""} />
          <ContinueButton label={copy.cta} />
        </form>
        <p className="mt-4 text-[12px] text-zinc-500">Links work once and expire after about an hour.</p>
      </Shell>
    );
  }

  if (legacy === "loading") {
    return (
      <Shell>
        <div className="w-16 h-16 mx-auto rounded-full border-4 border-white/10 border-t-blue-500 animate-spin" />
        <p className="mt-6 text-zinc-400">Verifying your link…</p>
      </Shell>
    );
  }

  if (legacy === "verified" || legacy === "signedin") {
    const signedin = legacy === "signedin";
    return (
      <Shell>
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border border-emerald-700/40 flex items-center justify-center text-4xl">✅</div>
        <h1 className="mt-6 text-2xl font-black text-white">Email verified!</h1>
        <p className="mt-2 text-zinc-400">{signedin ? "You're all set and signed in. Let's crack that job." : "Your account is confirmed. Sign in to start preparing."}</p>
        <Link href={signedin ? "/dashboard" : "/login"} className={`${BTN} mt-7`}>{signedin ? "Go to Dashboard →" : "Continue to Sign in →"}</Link>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/15 border border-rose-700/40 flex items-center justify-center text-4xl">⚠️</div>
      <h1 className="mt-6 text-2xl font-black text-white">{legacy === "invalid" ? "This link doesn't work" : "Couldn't verify"}</h1>
      {msg && <p className="mt-2 text-zinc-400 text-sm">{msg}</p>}
      <p className="mt-2 text-zinc-500 text-sm">Ask for a new email. Links work once and expire after about an hour.</p>
      <div className="mt-7 flex gap-2">
        <Link href="/forgot-password" className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition">Reset password</Link>
        <Link href="/login" className={BTN_GHOST}>Sign in</Link>
      </div>
    </Shell>
  );
}
