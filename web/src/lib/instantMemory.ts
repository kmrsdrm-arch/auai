import type { ExecutiveSnapshot } from "./types";

let cache: ExecutiveSnapshot | null = null;

export function stageInstantSnapshot(snapshot: ExecutiveSnapshot) {
  cache = snapshot;
  return cache;
}

export function readInstantSnapshot() {
  return cache;
}


