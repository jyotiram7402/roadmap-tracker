"use client";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { initSync } from "@/lib/cloud-sync";

// Mounted once in the root layout. When a user is signed in, mirrors local
// activity/notes to Supabase (user_kv) so progress follows them across devices.
export default function SyncManager() {
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    let cleanup = () => {};

    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) { cleanup(); cleanup = initSync(supabase, data.user.id); }
    }).catch(() => {});

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      cleanup();
      cleanup = session?.user ? initSync(supabase, session.user.id) : () => {};
    });

    return () => { cleanup(); sub?.subscription?.unsubscribe?.(); };
  }, []);

  return null;
}
