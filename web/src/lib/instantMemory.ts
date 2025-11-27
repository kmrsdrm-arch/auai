"use client";

import { useEffect, useState } from "react";
import type { ExecutiveSnapshot } from "./types";

let cache: ExecutiveSnapshot | null = null;

export function stageInstantSnapshot(snapshot: ExecutiveSnapshot) {
  cache = snapshot;
  return cache;
}

export function readInstantSnapshot() {
  return cache;
}

export function useExecutiveSnapshot(): ExecutiveSnapshot {
  const [snapshot, setSnapshot] = useState<ExecutiveSnapshot | null>(cache);

  useEffect(() => {
    if (!snapshot) {
      fetch("/api/metrics")
        .then((res) => res.json())
        .then((data) => {
          cache = data;
          setSnapshot(data);
        })
        .catch((err) => {
          console.error("Failed to load snapshot:", err);
        });
    }
  }, [snapshot]);

  // Return cached data or empty fallback
  return snapshot ?? {
    kpis: [],
    sales: [],
    inventory: [],
    filters: { regions: [], partFamilies: [], plants: [] },
    aiRecommendation: "Loading...",
  };
}


