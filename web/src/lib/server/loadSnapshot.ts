"use server";

import "server-only";

import { generateFallbackSnapshot } from "../offlineData";
import { stageInstantSnapshot } from "../instantMemory";
import type { ExecutiveSnapshot, InventoryRecord, SalesRecord } from "../types";

const DATA_API_URL = process.env.DATA_API_URL ?? "http://127.0.0.1:8000";

type ServicePayload = {
  generated_at: string;
  ai_recommendation: string;
  sales: Array<Omit<SalesRecord, "date" | "partFamily" | "netSalesUsd" | "marginPct" | "unitsSold"> & {
    date: string;
    part_family: string;
    region: string;
    units_sold: number;
    net_sales_usd: number;
    margin_pct: number;
  }>;
  inventory: Array<Omit<InventoryRecord, "partFamily" | "onHandUnits" | "safetyStock" | "leadTimeDays"> & {
    part_family: string;
    on_hand_units: number;
    safety_stock: number;
    lead_time_days: number;
  }>;
  kpis: Array<{
    key: "revenueMomentum" | "inventoryTurnover" | "fulfillmentConfidence";
    label: string;
    value: number;
    delta: number;
    unit: "ratio" | "percent";
    narrative: string;
    confidence: number;
  }>;
};

export async function loadExecutiveSnapshot(): Promise<ExecutiveSnapshot> {
  try {
    const response = await fetch(`${DATA_API_URL}/snapshot`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Data service responded with ${response.status}`);
    }

    const payload = (await response.json()) as ServicePayload;
    const snapshot = normalizePayload(payload);
    stageInstantSnapshot(snapshot);
    return snapshot;
  } catch (error) {
    console.warn("[data] Falling back to local synthetic snapshot:", error);
    const fallback = generateFallbackSnapshot();
    stageInstantSnapshot(fallback);
    return fallback;
  }
}

function normalizePayload(payload: ServicePayload): ExecutiveSnapshot {
  const sales: SalesRecord[] = payload.sales.map((row) => ({
    id: row.id,
    date: row.date,
    partFamily: row.part_family,
    region: row.region,
    unitsSold: row.units_sold,
    netSalesUsd: row.net_sales_usd,
    marginPct: row.margin_pct,
  }));

  const inventory: InventoryRecord[] = payload.inventory.map((row) => ({
    id: row.id,
    partFamily: row.part_family,
    plant: row.plant,
    onHandUnits: row.on_hand_units,
    safetyStock: row.safety_stock,
    leadTimeDays: row.lead_time_days,
  }));

  return {
    generatedAt: payload.generated_at,
    source: "fastapi",
    aiRecommendation: payload.ai_recommendation,
    kpis: payload.kpis,
    sales,
    inventory,
    filters: {
      partFamilies: Array.from(new Set(sales.map((row) => row.partFamily))),
      regions: Array.from(new Set(sales.map((row) => row.region))),
      plants: Array.from(new Set(inventory.map((row) => row.plant))),
    },
  };
}


