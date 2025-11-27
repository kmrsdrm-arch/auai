"use client";

import { useState, useEffect } from "react";

interface DiagramNode {
  id: string;
  label: string;
  description: string;
  color: string;
  glowColor: string;
}

interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

interface DiagramData {
  nodes: DiagramNode[];
  connections: DiagramConnection[];
}

interface Particle {
  top: number;
  left: number;
  delay: number;
}

const diagrams: Record<string, DiagramData> = {
  dataFlow: {
    nodes: [
      { id: "source", label: "Data Generation", description: "Python Factory Pattern", color: "from-cyan-500/20", glowColor: "shadow-cyan-500/50" },
      { id: "storage", label: "InstantDB", description: "Real-time Sync Layer", color: "from-emerald-500/20", glowColor: "shadow-emerald-500/50" },
      { id: "api", label: "FastAPI Gateway", description: "RESTful Endpoints", color: "from-violet-500/20", glowColor: "shadow-violet-500/50" },
      { id: "cache", label: "Memory Cache", description: "Sub-ms Reads", color: "from-amber-500/20", glowColor: "shadow-amber-500/50" },
      { id: "ai", label: "OpenAI GPT", description: "95% Confidence AI", color: "from-rose-500/20", glowColor: "shadow-rose-500/50" },
      { id: "ui", label: "Next.js Dashboard", description: "Executive Interface", color: "from-blue-500/20", glowColor: "shadow-blue-500/50" },
    ],
    connections: [
      { from: "source", to: "storage", label: "Pydantic Models" },
      { from: "storage", to: "api", label: "Query" },
      { from: "api", to: "cache", label: "KPI Calc" },
      { from: "cache", to: "ui", label: "Real-time" },
      { from: "api", to: "ai", label: "NL Query" },
      { from: "ai", to: "ui", label: "Insights" },
    ],
  },
  dataCatalog: {
    nodes: [
      { id: "sales", label: "Sales Transactions", description: "Order ID, Part, Revenue, Date", color: "from-cyan-500/20", glowColor: "shadow-cyan-500/50" },
      { id: "inventory", label: "Inventory Stock", description: "Part ID, Quantity, Location", color: "from-emerald-500/20", glowColor: "shadow-emerald-500/50" },
      { id: "kpi", label: "KPI Engine", description: "Computed Metrics", color: "from-violet-500/20", glowColor: "shadow-violet-500/50" },
      { id: "dimensions", label: "Dimensions", description: "Time, Region, Category", color: "from-amber-500/20", glowColor: "shadow-amber-500/50" },
    ],
    connections: [
      { from: "sales", to: "kpi", label: "Revenue" },
      { from: "inventory", to: "kpi", label: "Stock" },
      { from: "dimensions", to: "sales", label: "Filter" },
      { from: "dimensions", to: "inventory", label: "Filter" },
    ],
  },
  systemArch: {
    nodes: [
      { id: "client", label: "Client Layer", description: "Browser + React", color: "from-blue-500/20", glowColor: "shadow-blue-500/50" },
      { id: "edge", label: "Vercel Edge", description: "CDN + SSR", color: "from-cyan-500/20", glowColor: "shadow-cyan-500/50" },
      { id: "backend", label: "Backend Services", description: "FastAPI + Uvicorn", color: "from-violet-500/20", glowColor: "shadow-violet-500/50" },
      { id: "db", label: "Database", description: "InstantDB Cloud", color: "from-emerald-500/20", glowColor: "shadow-emerald-500/50" },
      { id: "security", label: "Security", description: "CSP + Auth", color: "from-rose-500/20", glowColor: "shadow-rose-500/50" },
    ],
    connections: [
      { from: "client", to: "edge", label: "HTTPS" },
      { from: "edge", to: "backend", label: "API" },
      { from: "backend", to: "db", label: "Query" },
      { from: "security", to: "edge", label: "Protect" },
      { from: "security", to: "backend", label: "Protect" },
    ],
  },
};

export default function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<keyof typeof diagrams>("dataFlow");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 5 }, (_, i) => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: i * 0.5,
    }));
    setParticles(newParticles);
  }, [activeTab]);

  const currentDiagram = diagrams[activeTab];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("dataFlow")}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
            activeTab === "dataFlow"
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
              : "bg-white/5 text-white/60 hover:text-white/90 border border-white/10"
          }`}
        >
          Data Flow Architecture
        </button>
        <button
          onClick={() => setActiveTab("dataCatalog")}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
            activeTab === "dataCatalog"
              ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30"
              : "bg-white/5 text-white/60 hover:text-white/90 border border-white/10"
          }`}
        >
          Data Catalog
        </button>
        <button
          onClick={() => setActiveTab("systemArch")}
          className={`px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
            activeTab === "systemArch"
              ? "bg-gradient-to-r from-violet-500/20 to-rose-500/20 text-violet-300 border border-violet-500/30"
              : "bg-white/5 text-white/60 hover:text-white/90 border border-white/10"
          }`}
        >
          System Architecture
        </button>
      </div>

      {/* Diagram Visualization */}
      <div className="relative rounded-2xl border border-white/10 bg-black/40 p-8 min-h-[500px] overflow-hidden">
        {/* Animated Background Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Nodes */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentDiagram.nodes.map((node, idx) => (
            <div
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`relative group cursor-pointer transform transition-all duration-300 ${
                hoveredNode === node.id ? "scale-105 z-10" : "scale-100"
              }`}
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div
                className={`rounded-xl border border-white/20 bg-gradient-to-br ${node.color} to-transparent p-6 backdrop-blur-sm
                           hover:border-white/40 transition-all duration-300 ${
                             hoveredNode === node.id ? `shadow-2xl ${node.glowColor}` : ""
                           }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-white/60 to-white/30 animate-pulse" />
                  <span className="text-xs text-white/40 font-mono">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{node.label}</h3>
                <p className="text-sm text-white/60">{node.description}</p>

                {/* Connection Indicator */}
                {hoveredNode === node.id && (
                  <div className="absolute -inset-1 border-2 border-white/30 rounded-xl animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Connection Legend */}
        <div className="relative rounded-xl border border-white/10 bg-white/5 p-6">
          <h4 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Data Flow Connections
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentDiagram.connections.map((conn, idx) => {
              const fromNode = currentDiagram.nodes.find((n) => n.id === conn.from);
              const toNode = currentDiagram.nodes.find((n) => n.id === conn.to);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-white/70 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
                  onMouseEnter={() => setHoveredNode(conn.from)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <span className="font-medium text-white/90">{fromNode?.label}</span>
                  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="font-medium text-white/90">{toNode?.label}</span>
                  {conn.label && <span className="text-white/50 italic ml-auto">({conn.label})</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

