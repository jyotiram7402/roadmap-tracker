// lib/supabase.js - BROWSER ONLY (Client Components)
import { createBrowserClient } from "@supabase/ssr";

// Returns null during server-side rendering / static prerender (no `window`),
// so `next build` can prerender these client, auth-gated pages without the
// Supabase env vars being present at build time. Every real call happens inside
// useEffect / event handlers (client only), where `window` and the
// NEXT_PUBLIC_* env vars are available — so this null is never dereferenced at
// runtime in the browser.
export function createClient() {
  if (typeof window === "undefined") return null;
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
