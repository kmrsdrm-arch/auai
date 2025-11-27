"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useExecutiveSnapshot } from "@/lib/instantMemory";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export default function ReportPage() {
  const snapshot = useExecutiveSnapshot();
  const [prompt, setPrompt] = useState("Where do we risk a stockout this month?");
  const [nlAnswer, setNlAnswer] = useState(buildInitialNarrative(snapshot));
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAsk = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setNlAnswer(buildNarrative(snapshot, prompt));
      setIsProcessing(false);
    }, 800);
  };

  return (
    <section className="mt-6 space-y-8 rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-3xl">
      <header className="flex flex-col gap-3 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Report</p>
        <h1 className="text-4xl font-bold">AI Report & Natural Language Query</h1>
        <p className="text-white/60 text-lg">
          AI-powered insights with 95%+ confidence for informed executive decision-making.
        </p>
      </header>

      {/* Executive Summary */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Executive Summary</h2>
        <p className="text-white/80 leading-relaxed text-lg">
          {snapshot.aiRecommendation}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-black/40 p-4 border border-white/10">
            <div className="text-2xl font-bold text-cyan-400">
              {Math.round((snapshot.kpis[0]?.confidence ?? 0.95) * 100)}%
            </div>
            <div className="text-xs text-white/60 mt-1">AI Confidence</div>
          </div>
          <div className="rounded-xl bg-black/40 p-4 border border-white/10">
            <div className="text-2xl font-bold text-emerald-400">
              {snapshot.sales.length}
            </div>
            <div className="text-xs text-white/60 mt-1">Sales Records</div>
          </div>
          <div className="rounded-xl bg-black/40 p-4 border border-white/10">
            <div className="text-2xl font-bold text-violet-400">
              {snapshot.inventory.length}
            </div>
            <div className="text-xs text-white/60 mt-1">Inventory Items</div>
          </div>
          <div className="rounded-xl bg-black/40 p-4 border border-white/10">
            <div className="text-2xl font-bold text-orange-400">&lt;1ms</div>
            <div className="text-xs text-white/60 mt-1">Query Time</div>
          </div>
        </div>
      </div>

      {/* Natural Language Query Interface */}
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Ask Analytics Copilot</h3>
          <p className="text-white/70">
            Query your data using natural language. The AI will analyze the current dataset
            and provide insights with high confidence thresholds.
          </p>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-2 block">
                Your Question
              </span>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="e.g., What are our top performing regions? Which products need restocking?"
                className="min-h-32 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-white/40 focus:border-cyan-300 focus:outline-none"
              />
            </label>

            <motion.button
              type="button"
              onClick={handleAsk}
              disabled={isProcessing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 font-semibold text-black shadow-lg shadow-cyan-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.span>
                  Processing...
                </span>
              ) : (
                "Ask Analytics Copilot"
              )}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400 mb-2">
                AI Response
              </p>
              <p className="text-white/80 leading-relaxed">{nlAnswer}</p>
            </motion.div>
          </div>

          {/* Sample Queries */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-3">
              Sample Queries
            </h4>
            <div className="grid gap-2">
              {[
                "Where do we risk a stockout this month?",
                "What regions are driving the most revenue?",
                "Which product families have the best margins?",
                "Show me inventory levels below safety stock",
              ].map((query) => (
                <button
                  key={query}
                  onClick={() => setPrompt(query)}
                  className="text-left text-sm text-white/70 hover:text-cyan-400 transition rounded-lg border border-white/10 bg-black/20 p-3 hover:border-cyan-400/50"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Executive Checklist */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200 mb-4">
            Executive Checklist
          </p>
          <ul className="space-y-4 text-sm text-white/80">
            <li className="flex items-start">
              <span className="mr-3 text-emerald-400 text-lg">✓</span>
              <span>Share Vercel preview link with CxOs (CSP hardened)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-emerald-400 text-lg">✓</span>
              <span>Re-run FastAPI simulator via launch_dashboard.bat (single click)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-cyan-400 text-lg">▸</span>
              <span>Attach NL query transcript to the board meeting minutes</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-cyan-400 text-lg">▸</span>
              <span>Monitor InstantDB card—confidence must stay ≥95% before sign-off</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-cyan-400 text-lg">▸</span>
              <span>Review dimensional filters for accuracy and completeness</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-cyan-400 text-lg">▸</span>
              <span>Export insights for offline stakeholder review</span>
            </li>
          </ul>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-transparent border border-violet-500/30">
            <p className="text-xs uppercase tracking-wide text-violet-400 mb-2">System Status</p>
            <div className="space-y-2 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Data Freshness</span>
                <span className="text-emerald-400">Real-time</span>
              </div>
              <div className="flex justify-between">
                <span>Cache Status</span>
                <span className="text-emerald-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Security</span>
                <span className="text-emerald-400">CSP Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildInitialNarrative(snapshot: any) {
  const topRegion = getTopRegion(snapshot.sales);
  const topFamily = getTopFamily(snapshot.sales);
  const avgMargin = snapshot.sales.reduce((sum: number, s: any) => sum + s.marginPct, 0) / snapshot.sales.length;

  return `Initial analysis complete. ${topFamily} leads contribution in ${topRegion} region with ${formatPercent(avgMargin)} average margin across ${snapshot.sales.length} transactions. System confidence at ${Math.round((snapshot.kpis[0]?.confidence ?? 0.95) * 100)}%. Ready for natural language queries.`;
}

function buildNarrative(snapshot: any, question: string) {
  const topic = question.toLowerCase();
  const topRegion = getTopRegion(snapshot.sales);
  const topFamily = getTopFamily(snapshot.sales);
  const avgMargin = snapshot.sales.reduce((sum: number, s: any) => sum + s.marginPct, 0) / snapshot.sales.length;
  const totalRevenue = snapshot.sales.reduce((sum: number, s: any) => sum + s.netSalesUsd, 0);
  
  const lowStock = snapshot.inventory.filter((inv: any) => 
    inv.onHandUnits < inv.safetyStock * 0.8
  );

  if (topic.includes("stockout") || topic.includes("stock") || topic.includes("inventory")) {
    if (lowStock.length > 0) {
      const plants = lowStock.map((inv: any) => inv.plant).slice(0, 3).join(", ");
      return `⚠️ Risk Analysis: ${lowStock.length} location(s) are at risk of stockout. Critical plants: ${plants}. ${topFamily} in ${topRegion} shows highest exposure. Recommend immediate replenishment orders with expedited lead times. Current confidence: ${Math.round((snapshot.kpis[0]?.confidence ?? 0.95) * 100)}%.`;
    } else {
      return `✓ Stockout Risk: Low. All monitored plants maintain healthy inventory buffers above 80% safety stock levels. ${topFamily} family shows strongest coverage. System confidence: ${Math.round((snapshot.kpis[0]?.confidence ?? 0.95) * 100)}%.`;
    }
  } else if (topic.includes("revenue") || topic.includes("sales") || topic.includes("region")) {
    return `Revenue Analysis: ${topRegion} region drives the highest sales volume with ${topFamily} as the leading product family. Total revenue tracked: ${formatCurrency(totalRevenue)} with ${formatPercent(avgMargin)} average margin. Latest trends show ${snapshot.sales.length} transactions across all regions. Confidence: ${Math.round((snapshot.kpis[0]?.confidence ?? 0.95) * 100)}%.`;
  } else if (topic.includes("margin") || topic.includes("profit") || topic.includes("family")) {
    return `Margin Analysis: ${topFamily} product family shows strongest performance across regions. Average margin: ${formatPercent(avgMargin)}. ${topRegion} region demonstrates highest profitability. Consider expanding ${topFamily} production capacity in ${topRegion}. AI confidence: ${Math.round((snapshot.kpis[0]?.confidence ?? 0.95) * 100)}%.`;
  }

  return `AI digest · ${topFamily} leads contribution (${topRegion} focus). Total revenue: ${formatCurrency(totalRevenue)} with ${formatPercent(avgMargin)} average margin across ${snapshot.sales.length} transactions. ${lowStock.length > 0 ? `⚠️ ${lowStock.length} locations below safety stock.` : "✓ All inventory levels healthy."} Model confidence: ${Math.round((snapshot.kpis[0]?.confidence ?? 0.95) * 100)}%. Ask more specific questions about sales, inventory, regions, or margins for detailed insights.`;
}

function getTopRegion(sales: any[]) {
  const byRegion = new Map<string, number>();
  sales.forEach((s) => {
    byRegion.set(s.region, (byRegion.get(s.region) ?? 0) + s.netSalesUsd);
  });
  return Array.from(byRegion.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
}

function getTopFamily(sales: any[]) {
  const byFamily = new Map<string, number>();
  sales.forEach((s) => {
    byFamily.set(s.partFamily, (byFamily.get(s.partFamily) ?? 0) + s.netSalesUsd);
  });
  return Array.from(byFamily.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
}

