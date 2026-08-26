"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

/** Warm Projects page data, then stats, without aborting on Home unmount. */
export default function PrefetchProjects() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function warmProjects() {
      await router.prefetch("/Projects");
      if (cancelled) {
        return;
      }
      // Do not abort this — navigating to Projects unmounts Home.
      void fetch("/api/project-stats");
    }

    void warmProjects();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
