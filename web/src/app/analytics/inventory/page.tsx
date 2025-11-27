"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { filterInventory } from "@/lib/analytics";
import { humanizeNumber } from "@/lib/formatters";
import { useExecutiveSnapshot } from "@/lib/instantMemory";

export default function InventoryAnalysisPage() {
  const snapshot = useExecutiveSnapshot();
  const [plant, setPlant] = useState("All");
  const [family, setFamily] = useState("All");

  const inventoryFiltered = useMemo(
    () => filterInventory(snapshot.inventory, plant, family),
    [snapshot.inventory, plant, family],
  );

  const inventoryCoverage = useMemo(
    () =>
      inventoryFiltered.map((row) => ({
        label: row.plant,
        partFamily: row.partFamily,
        value: row.onHandUnits / Math.max(row.safetyStock, 1),
        onHand: row.onHandUnits,
        safety: row.safetyStock,
        leadTime: row.leadTimeDays,
      })),
    [inventoryFiltered],
  );

  const atRiskCount = inventoryCoverage.filter((item) => item.value < 0.8).length;
  const healthyCount = inventoryCoverage.filter((item) => item.value >= 1.2).length;

  return (
    <section className="mt-6 space-y-8 rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-3xl">
      <header className="flex flex-col gap-3 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Inventory Analysis</p>
        <h1 className="text-4xl font-bold">Coverage Confidence</h1>
        <p className="text-white/60 text-lg">
          The Inventory table feeds buffer-ratio progress bars to highlight where fulfillment
          dips below contract guardrails.
        </p>
      </header>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-red-500/20 to-transparent p-6 border border-red-500/30">
          <div className="text-3xl font-bold text-red-400">{atRiskCount}</div>
          <div className="text-sm text-white/60 mt-2">Plants Below 80% Coverage</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent p-6 border border-emerald-500/30">
          <div className="text-3xl font-bold text-emerald-400">{healthyCount}</div>
          <div className="text-sm text-white/60 mt-2">Plants Above 120% Coverage</div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent p-6 border border-cyan-500/30">
          <div className="text-3xl font-bold text-cyan-400">{inventoryCoverage.length}</div>
          <div className="text-sm text-white/60 mt-2">Total Plants Monitored</div>
        </div>
      </div>

      {/* Dimensional Filters */}
      <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold uppercase tracking-wide text-white/60">
          Dimensional Filters
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FilterSelect
            label="Plant"
            value={plant}
            onChange={setPlant}
            options={["All", ...snapshot.filters.plants]}
          />
          <FilterSelect
            label="Part Family"
            value={family}
            onChange={setFamily}
            options={["All", ...snapshot.filters.partFamilies]}
          />
        </div>
      </div>

      {/* Coverage Bars and Table */}
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Coverage by Plant</h3>
          <div className="space-y-4">
            {inventoryCoverage.map((item) => (
              <div key={`${item.label}-${item.partFamily}`}>
                <div className="flex justify-between text-xs uppercase tracking-wide text-white/60 mb-1">
                  <span>{item.label} - {item.partFamily}</span>
                  <span className={item.value < 0.8 ? "text-red-400" : item.value > 1.2 ? "text-emerald-400" : "text-white/60"}>
                    {(item.value * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(item.value, 1) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      item.value < 0.8
                        ? "bg-gradient-to-r from-red-400 to-orange-400"
                        : item.value > 1.2
                        ? "bg-gradient-to-r from-emerald-300 to-cyan-300"
                        : "bg-gradient-to-r from-yellow-400 to-orange-400"
                    }`}
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
          <div className="overflow-auto max-h-96">
            <table className="w-full text-sm text-white/80">
              <thead className="text-white/50 sticky top-0 bg-black/40">
                <tr>
                  <th className="py-2 text-left">Plant</th>
                  <th className="py-2 text-right">On Hand</th>
                  <th className="py-2 text-right">Safety</th>
                  <th className="py-2 text-right">Lead Time</th>
                </tr>
              </thead>
              <tbody>
                {inventoryFiltered.map((row) => (
                  <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="py-2">{row.plant}</td>
                    <td className="py-2 text-right">{humanizeNumber(row.onHandUnits)}</td>
                    <td className="py-2 text-right">{humanizeNumber(row.safetyStock)}</td>
                    <td className="py-2 text-right">{row.leadTimeDays} d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-8">
        <h3 className="text-xl font-semibold text-white mb-4">Inventory Insights</h3>
        <p className="text-white/70 leading-relaxed">
          {buildInventoryNarrative(inventoryCoverage, atRiskCount, healthyCount)}
        </p>
      </div>

      {/* Action Items */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h3 className="text-xl font-semibold text-white mb-4">Recommended Actions</h3>
        <ul className="space-y-3 text-white/80">
          {atRiskCount > 0 && (
            <li className="flex items-start">
              <span className="mr-2 text-red-400">⚠</span>
              <span>Prioritize replenishment for {atRiskCount} plant(s) below 80% coverage threshold</span>
            </li>
          )}
          {healthyCount > 5 && (
            <li className="flex items-start">
              <span className="mr-2 text-emerald-400">✓</span>
              <span>Consider redistribution from {healthyCount} overstocked locations</span>
            </li>
          )}
          <li className="flex items-start">
            <span className="mr-2 text-cyan-400">▸</span>
            <span>Review lead times for plants with extended delivery windows (&gt;14 days)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-cyan-400">▸</span>
            <span>Update safety stock calculations based on current demand patterns</span>
          </li>
        </ul>
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

function buildInventoryNarrative(
  coverage: Array<{ label: string; value: number; onHand: number; safety: number }>,
  atRisk: number,
  healthy: number,
) {
  if (!coverage.length) {
    return "No inventory data in scope. Adjust filters to bring a dataset into focus.";
  }

  const avgCoverage = coverage.reduce((sum, item) => sum + item.value, 0) / coverage.length;
  const lowestCoverage = coverage.reduce((min, item) => (item.value < min.value ? item : min));
  const highestCoverage = coverage.reduce((max, item) => (item.value > max.value ? item : max));

  return `Current inventory health shows ${(avgCoverage * 100).toFixed(0)}% average coverage across all monitored plants. ${lowestCoverage.label} has the lowest coverage at ${(lowestCoverage.value * 100).toFixed(0)}% (${humanizeNumber(lowestCoverage.onHand)} units on hand vs. ${humanizeNumber(lowestCoverage.safety)} safety stock). ${highestCoverage.label} maintains the highest buffer at ${(highestCoverage.value * 100).toFixed(0)}%. ${atRisk > 0 ? `Immediate attention required for ${atRisk} location(s) below critical threshold.` : "All locations are above critical threshold."} ${healthy > 3 ? `${healthy} locations show healthy excess that could be redistributed.` : ""}`;
}

