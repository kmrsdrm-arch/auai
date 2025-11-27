"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { filterSales } from "@/lib/analytics";
import { buildLinePath } from "@/lib/charting";
import { formatCurrency, formatPercent, humanizeNumber } from "@/lib/formatters";
import type { ChartSeriesPoint, SalesRecord } from "@/lib/types";
import { useExecutiveSnapshot } from "@/lib/instantMemory";

export default function SalesAnalyticsPage() {
  const snapshot = useExecutiveSnapshot();
  const [region, setRegion] = useState("All");
  const [family, setFamily] = useState("All");

  const salesFiltered = useMemo(
    () => filterSales(snapshot.sales, region, family),
    [snapshot.sales, region, family],
  );

  const salesSeries = useMemo(() => aggregateSeries(salesFiltered), [salesFiltered]);
  const chartPath = buildLinePath(salesSeries, 180, 520);

  return (
    <section className="mt-6 space-y-8 rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-3xl">
      <header className="flex flex-col gap-3 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Sales Analytics</p>
        <h1 className="text-4xl font-bold">Revenue Runway</h1>
        <p className="text-white/60 text-lg">
          8-week velocity view powered by the Sales table (≤1 MB) with InstantDB caching the
          curve for millisecond interactions.
        </p>
      </header>

      {/* Dimensional Filters */}
      <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold uppercase tracking-wide text-white/60">
          Dimensional Filters
        </div>
        <div className="grid gap-4 md:grid-cols-2">
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
        </div>
      </div>

      {/* Chart and Table */}
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-2">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg viewBox="0 0 520 200" className="w-full text-cyan-300">
              <defs>
                <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={chartPath} fill="none" stroke="url(#rev)" strokeWidth={4} strokeLinecap="round" />
            </svg>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl bg-black/40 p-4 border border-white/10">
              <div className="text-xl font-bold text-cyan-400">
                {formatCurrency(salesSeries.at(-1)?.value ?? 0)}
              </div>
              <div className="text-xs text-white/60 mt-1">Latest Net Sales</div>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/10">
              <div className="text-xl font-bold text-emerald-400">{salesFiltered.length}</div>
              <div className="text-xs text-white/60 mt-1">Filtered Rows</div>
            </div>
            <div className="rounded-xl bg-black/40 p-4 border border-white/10">
              <div className="text-xl font-bold text-violet-400">
                {formatPercent(averageMargin(salesFiltered))}
              </div>
              <div className="text-xs text-white/60 mt-1">Avg Margin</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Sales Table</p>
          <div className="overflow-auto max-h-96">
            <table className="w-full text-sm text-white/80">
              <thead className="text-white/50 sticky top-0 bg-black/40">
                <tr>
                  <th className="py-2 text-left">Week</th>
                  <th className="py-2 text-right">Net Sales</th>
                  <th className="py-2 text-right">Units</th>
                  <th className="py-2 text-right">Margin</th>
                </tr>
              </thead>
              <tbody>
                {salesFiltered.slice(-8).reverse().map((row) => (
                  <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-2">{formatWeek(row.date)}</td>
                    <td className="py-2 text-right">{formatCurrency(row.netSalesUsd)}</td>
                    <td className="py-2 text-right">{humanizeNumber(row.unitsSold)}</td>
                    <td className="py-2 text-right">{formatPercent(row.marginPct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-8">
        <h3 className="text-xl font-semibold text-white mb-4">Sales Insights</h3>
        <p className="text-white/70 leading-relaxed">
          {buildSalesNarrative(salesFiltered, salesSeries)}
        </p>
      </div>
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

function buildSalesNarrative(sales: SalesRecord[], series: ChartSeriesPoint[]) {
  if (!sales.length) {
    return "No sales data in scope. Adjust filters to bring a dataset into focus.";
  }
  const latest = sales.at(-1)!;
  const trendDelta =
    series.length > 1 ? (series.at(-1)!.value - series.at(-2)!.value) / series.at(-2)!.value : 0;
  const regionHotspot = hotspot(sales, (row) => row.region);
  const familyHotspot = hotspot(sales, (row) => row.partFamily);

  return `Revenue momentum is tracking ${trendDelta >= 0 ? "above" : "below"} the prior sprint. ${familyHotspot} leads contribution in the ${regionHotspot} region. Latest shipment on ${formatWeek(latest.date)} closed at ${formatCurrency(latest.netSalesUsd)} with margin ${formatPercent(latest.marginPct)}. Total filtered transactions: ${sales.length} with average margin ${formatPercent(averageMargin(sales))}.`;
}

function hotspot(rows: SalesRecord[], selector: (row: SalesRecord) => string) {
  const tally = new Map<string, number>();
  rows.forEach((row) => {
    const key = selector(row);
    tally.set(key, (tally.get(key) ?? 0) + row.netSalesUsd);
  });
  return Array.from(tally.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
}

