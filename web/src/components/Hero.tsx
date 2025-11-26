import InstantStatusCard from "./InstantStatusCard";
import type { ExecutiveSnapshot } from "@/lib/types";

type Props = {
  snapshot: ExecutiveSnapshot;
};

export function Hero({ snapshot }: Props) {
  return (
    <header className="space-y-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-10 backdrop-blur-2xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">
            Automotive Parts Intelligence
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            AI-powered executive cockpit for confident, real-time manufacturing decisions.
          </h1>
          <p className="text-lg text-white/70">
            Lightweight InstantDB caching, FastAPI curation, and a dark, cinematic UI deliver
            a secure BI experience tuned for Vercel and stakeholder-ready storytelling.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
          <p className="text-sm uppercase tracking-wide text-white/50">Snapshot emitted</p>
          <p className="text-2xl font-semibold text-white">
            {new Date(snapshot.generatedAt).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-white/60">Source · {snapshot.source === "fastapi" ? "FastAPI" : "Fallback"}</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold text-white">Vision</p>
          <p className="text-white/70">
            Minimal, scalable BI stack spanning Next.js, InstantDB, and FastAPI to keep the
            payload under 1&nbsp;MB while unlocking AI-first storytelling for EV stakeholders.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-semibold text-white">Security & Delivery</p>
          <p className="text-white/70">
            Strict CSP, signed proxy calls, and Vercel-ready deployment scripts keep the dashboard
            link secure when sharing with executives.
          </p>
        </div>
        <InstantStatusCard confidence={snapshot.kpis[0]?.confidence ?? 0.95} source={snapshot.source} />
      </div>
    </header>
  );
}


