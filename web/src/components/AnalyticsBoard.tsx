"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { filterInventory, filterSales } from "@/lib/analytics";
import { buildLinePath } from "@/lib/charting";
import { formatCurrency, formatPercent, humanizeNumber } from "@/lib/formatters";
import type { ChartSeriesPoint, ExecutiveSnapshot, SalesRecord } from "@/lib/types";
import { KpiCard } from "./KpiCard";

type Props = {
  snapshot: ExecutiveSnapshot;
};

export default function AnalyticsBoard({ snapshot }: Props) {
  const [region, setRegion] = useState("All");
  const [family, setFamily] = useState("All");
  const [plant, setPlant] = useState("All");
  const [prompt, setPrompt] = useState("Where do we risk a stockout this month?");
  const [nlAnswer, setNlAnswer] = useState(buildNarrative(snapshot.sales, snapshot));

  const salesFiltered = useMemo(
    () => filterSales(snapshot.sales, region, family),
    [snapshot.sales, region, family],
  );
  const inventoryFiltered = useMemo(
    () => filterInventory(snapshot.inventory, plant, family),
    [snapshot.inventory, plant, family],
  );

  const salesSeries = useMemo(() => aggregateSeries(salesFiltered), [salesFiltered]);
  const chartPath = buildLinePath(salesSeries, 180, 520);

  const inventoryCoverage = useMemo(
    () =>
      inventoryFiltered.map((row) => ({
        label: row.plant,
        value: row.onHandUnits / Math.max(row.safetyStock, 1),
      })),
    [inventoryFiltered],
  );

  const handleAsk = () => {
    setNlAnswer(buildNarrative(salesFiltered, snapshot, prompt));
  };

  return (
    <section
      id="analytics"
      className="space-y-12 rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-3xl"
    >
      <div id="dashboard-summary" className="space-y-6">
        <header className="flex flex-col gap-3 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Analytics</p>
          <h2 className="text-3xl font-semibold">Dashboard Summary</h2>
          <p className="text-white/60">
            Three needle-moving KPIs tracked against a 95% confidence guardrail with InstantDB
            serving the cached context.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {snapshot.kpis.map((kpi) => (
            <KpiCard key={kpi.key} kpi={kpi} />
          ))}
        </div>
      </div>

      <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6" id="filters">
        <div className="text-sm font-semibold uppercase tracking-wide text-white/60">
          Dimensional Filters
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <FilterSelect
            label="Region"
            value={region}
            onChange={setRegion}
            options={["All", ...snapshot.filters.regions]}
          />
          <FilterSelect
            label="Part Family"
            value={family}
            onChange={setFamily}
            options={["All", ...snapshot.filters.partFamilies]}
          />
          <FilterSelect
            label="Plant"
            value={plant}
            onChange={setPlant}
            options={["All", ...snapshot.filters.plants]}
          />
        </div>
      </div>

      <article
        id="sales-analytics"
        className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-2"
      >
        <div className="space-y-4">
          <header>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Sales Analytics</p>
            <h3 className="text-2xl font-semibold text-white">Revenue runway</h3>
            <p className="text-white/60">
              8-week velocity view powered by the Sales table (≤1 MB) with InstantDB caching the
              curve for millisecond interactions.
            </p>
          </header>
          <svg viewBox="0 0 520 200" className="w-full text-cyan-300">
            <defs>
              <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={chartPath} fill="none" stroke="url(#rev)" strokeWidth={4} strokeLinecap="round" />
          </svg>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <span>Latest net sales: {formatCurrency(salesSeries.at(-1)?.value ?? 0)}</span>
            <span>Filtered rows: {salesFiltered.length}</span>
            <span>Avg margin: {formatPercent(averageMargin(salesFiltered))}</span>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Sales Table</p>
          <table className="w-full text-sm text-white/80">
            <thead className="text-white/50">
              <tr>
                <th className="py-2 text-left">Week</th>
                <th className="py-2 text-right">Net Sales</th>
                <th className="py-2 text-right">Units</th>
                <th className="py-2 text-right">Margin</th>
              </tr>
            </thead>
            <tbody>
              {salesFiltered.slice(-6).reverse().map((row) => (
                <tr key={row.id} className="border-b border-white/5">
                  <td className="py-2">{formatWeek(row.date)}</td>
                  <td className="py-2 text-right">{formatCurrency(row.netSalesUsd)}</td>
                  <td className="py-2 text-right">{humanizeNumber(row.unitsSold)}</td>
                  <td className="py-2 text-right">{formatPercent(row.marginPct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article
        id="inventory-analysis"
        className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-2"
      >
        <div className="space-y-4">
          <header>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Inventory Analysis</p>
            <h3 className="text-2xl font-semibold text-white">Coverage confidence</h3>
            <p className="text-white/60">
              The Inventory table feeds buffer-ratio progress bars to highlight where fulfillment
              dips below contract guardrails.
            </p>
          </header>
          <div className="space-y-3">
            {inventoryCoverage.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs uppercase tracking-wide text-white/60">
                  <span>{item.label}</span>
                  <span>{(item.value * 100).toFixed(0)}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(item.value, 1) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Inventory Table
          </p>
          <table className="w-full text-sm text-white/80">
            <thead className="text-white/50">
              <tr>
                <th className="py-2 text-left">Plant</th>
                <th className="py-2 text-right">On Hand</th>
                <th className="py-2 text-right">Safety</th>
                <th className="py-2 text-right">Lead Time</th>
              </tr>
            </thead>
            <tbody>
              {inventoryFiltered.slice(0, 6).map((row) => (
                <tr key={row.id} className="border-b border-white/5">
                  <td className="py-2">{row.plant}</td>
                  <td className="py-2 text-right">{humanizeNumber(row.onHandUnits)}</td>
                  <td className="py-2 text-right">{humanizeNumber(row.safetyStock)}</td>
                  <td className="py-2 text-right">{row.leadTimeDays} d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article
        id="report"
        className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Report</p>
          <h3 className="text-2xl font-semibold text-white">AI Report & NL Query</h3>
          <p className="text-white/70">{snapshot.aiRecommendation}</p>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="min-h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-cyan-300 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAsk}
              className="mt-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-cyan-500/30"
            >
              Ask Analytics Copilot
            </button>
            <p className="mt-4 text-sm text-white/70">{nlAnswer}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-white/70" id="report-card">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">Executive Checklist</p>
          <ul className="mt-4 space-y-3">
            <li>• Share Vercel preview link with CxOs (CSP hardened).</li>
            <li>• Re-run FastAPI simulator via launch_dashboard.bat (single click).</li>
            <li>• Attach NL query transcript to the board meeting minutes.</li>
            <li>• Monitor InstantDB card—confidence must stay ≥95% before sign-off.</li>
          </ul>
        </div>
      </article>
    </section>
  );
}

type FilterProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

function FilterSelect({ label, value, onChange, options }: FilterProps) {
  return (
    <label className="space-y-2 text-sm text-white/70">
      <span className="block uppercase tracking-wide text-white/50">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-300 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function aggregateSeries(rows: SalesRecord[]): ChartSeriesPoint[] {
  const byWeek = new Map<string, number>();
  rows.forEach((row) => {
    const label = formatWeek(row.date);
    byWeek.set(label, (byWeek.get(label) ?? 0) + row.netSalesUsd);
  });
  return Array.from(byWeek.entries()).map(([label, value]) => ({ label, value }));
}

function averageMargin(rows: SalesRecord[]) {
  if (!rows.length) return 0;
  return rows.reduce((acc, row) => acc + row.marginPct, 0) / rows.length;
}

function formatWeek(input: string) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

function buildNarrative(
  sales: SalesRecord[],
  snapshot: ExecutiveSnapshot,
  question?: string,
) {
  if (!sales.length) {
    return "No rows in scope. Adjust filters to bring a dataset into focus.";
  }
  const latest = sales.at(-1)!;
  const series = aggregateSeries(sales);
  const trendDelta =
    series.length > 1 ? (series.at(-1)!.value - series.at(-2)!.value) / series.at(-2)!.value : 0;
  const topic = question?.toLowerCase() ?? "";
  const regionHotspot = hotspot(sales, (row) => row.region);
  const familyHotspot = hotspot(sales, (row) => row.partFamily);

  let riskHook = "No risk keyword detected.";
  if (topic.includes("risk") || topic.includes("stock")) {
    riskHook = `Coverage dips at ${familyHotspot} / ${regionHotspot} if OTA demand persists.`;
  } else if (topic.includes("sales") || topic.includes("revenue")) {
    riskHook = `Revenue momentum is tracking ${
      trendDelta >= 0 ? "above" : "below"
    } the prior sprint with latest drop from ${formatCurrency(series.at(-2)?.value ?? 0)} to ${formatCurrency(series.at(-1)?.value ?? 0)}.`;
  }

  return `AI digest · ${familyHotspot} leads contribution (${regionHotspot} focus). Latest shipment on ${formatWeek(latest.date)} closed at ${formatCurrency(latest.netSalesUsd)} with margin ${formatPercent(latest.marginPct)}. ${riskHook} Model confidence ${(snapshot.kpis[0]?.confidence ?? 0.95) * 100}%`;
}

function hotspot(rows: SalesRecord[], selector: (row: SalesRecord) => string) {
  const tally = new Map<string, number>();
  rows.forEach((row) => {
    const key = selector(row);
    tally.set(key, (tally.get(key) ?? 0) + row.netSalesUsd);
  });
  return Array.from(tally.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
}


