import { KpiCard } from "@/components/KpiCard";
import { loadExecutiveSnapshot } from "@/lib/server/loadSnapshot";

export const dynamic = "force-dynamic";

export default async function DashboardSummaryPage() {
  const snapshot = await loadExecutiveSnapshot();

  return (
    <section className="mt-6 space-y-6 rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-3xl">
      <header className="flex flex-col gap-3 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Analytics</p>
        <h1 className="text-4xl font-bold">Dashboard Summary</h1>
        <p className="text-white/60 text-lg">
          Three needle-moving KPIs tracked against a 95% confidence guardrail with InstantDB
          serving the cached context.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {snapshot.kpis.map((kpi) => (
          <KpiCard key={kpi.key} kpi={kpi} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold text-white">Key Metrics Overview</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/40 p-6">
            <h3 className="text-cyan-400 font-medium mb-3">Performance Indicators</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-start">
                <span className="mr-2 text-cyan-400">▸</span>
                <span>Real-time tracking of sales, inventory, and operational efficiency</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-cyan-400">▸</span>
                <span>95%+ AI confidence threshold for decision-making</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-cyan-400">▸</span>
                <span>Sub-millisecond response times with InstantDB caching</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 p-6">
            <h3 className="text-emerald-400 font-medium mb-3">Data Sources</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-start">
                <span className="mr-2 text-emerald-400">▸</span>
                <span>Sales data aggregated from all regions and product families</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-emerald-400">▸</span>
                <span>Inventory levels monitored across all manufacturing plants</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-emerald-400">▸</span>
                <span>Historical trends analyzed for predictive insights</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-8">
        <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Insights</h3>
        <p className="text-white/70 leading-relaxed">
          {snapshot.aiRecommendation}
        </p>
      </div>
    </section>
  );
}

