"use client";
import { useEffect } from "react";
import { markAppOpen, addActiveTime } from "@/lib/activity";

// Mounted once (in the root layout). Marks today active on load and accrues
// active (foreground) time into today's bucket for the Progress dashboard.
export default function ActivityTracker() {
  useEffect(() => {
    markAppOpen();
    let last = Date.now();

    const flush = () => {
      const now = Date.now();
      if (!document.hidden) addActiveTime(Math.min(now - last, 60000)); // cap 60s/tick
      last = now;
    };

    const tick = setInterval(flush, 15000);
    const onVis = () => { flush(); last = Date.now(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", flush);

    return () => {
      flush();
      clearInterval(tick);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("beforeunload", flush);
    };
  }, []);

  return null;
}
