"use client";

import { ShieldCheck, Signal } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  confidence: number;
  source: string;
};

export default function InstantStatusCard({ confidence, source }: Props) {
  const [status, setStatus] = useState<"connecting" | "online" | "offline">("connecting");

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      try {
        const mod = await import("@instantdb/react");
        mod.init({ appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID ?? "demo-automotive" });
        if (!cancelled) setStatus("online");
      } catch (error) {
        console.warn("[instantdb] falling back to local cache", error);
        if (!cancelled) setStatus("offline");
      }
    }
    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const statusCopy =
    status === "connecting"
      ? "Syncing"
      : status === "online"
        ? "InstantDB Live"
        : "Local Cache";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/70">
        <span className="flex items-center gap-2">
          <Signal className="size-4 text-cyan-300" /> {statusCopy}
        </span>
        <span className="text-white/60">{source === "fastapi" ? "API feed" : "offline mode"}</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-white">
            {(confidence * 100).toFixed(1)}% confidence
          </p>
          <p className="text-white/60">
            Guardrails enforce the exec-level 95% decision threshold.
          </p>
        </div>
        <ShieldCheck className="size-10 text-emerald-300" />
      </div>
    </div>
  );
}


