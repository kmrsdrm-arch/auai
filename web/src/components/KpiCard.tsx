import type { KpiInsight } from "@/lib/types";
import { formatPercent } from "@/lib/formatters";

type Props = {
  kpi: KpiInsight;
};

export function KpiCard({ kpi }: Props) {
  const primary =
    kpi.unit === "percent" ? formatPercent(kpi.value - 1) : `${kpi.value.toFixed(2)}x`;
  const delta =
    kpi.unit === "percent" ? formatPercent(kpi.delta) : `${kpi.delta.toFixed(2)}x`;
  const deltaColor = kpi.delta >= 0 ? "text-emerald-300" : "text-rose-300";

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 text-white">
      <div className="text-sm uppercase tracking-wide text-white/60">{kpi.label}</div>
      <div className="text-3xl font-semibold">{primary}</div>
      <p className="text-sm text-white/70">{kpi.narrative}</p>
      <p className={`text-xs font-semibold ${deltaColor}`}>
        Δ {delta} · {(kpi.confidence * 100).toFixed(1)}% confidence
      </p>
    </article>
  );
}


