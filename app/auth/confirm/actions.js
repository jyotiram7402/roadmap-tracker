"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

const LINK_TYPES = ["signup", "invite", "magiclink", "recovery", "email_change", "email"];

// Only paths on this site ("/dashboard"), never another origin ("//evil.com").
function safePath(value, fallback) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }
  return value;
}

// Verifies an email link (token_hash) on the server. Works in any browser or device,
// and because it only runs when the person taps Continue, email scanners that
// pre-open links can't use the one-time token up.
export async function confirmEmailLink(formData) {
  const tokenHash = formData.get("token_hash");
  const type = formData.get("type");

  if (typeof tokenHash !== "string" || !tokenHash || typeof type !== "string" || !LINK_TYPES.includes(type)) {
    redirect("/login?error=invalid_link");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

  if (error) {
    redirect(type === "recovery" ? "/forgot-password?error=link_expired" : "/login?error=link_expired");
  }

  // Password reset links always continue to the "choose a new password" page.
  redirect(type === "recovery" ? "/auth/reset" : safePath(formData.get("next"), "/dashboard"));
}
