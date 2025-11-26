import { computeKpis } from "./kpis";
import type {
  ExecutiveSnapshot,
  InventoryRecord,
  SalesRecord,
} from "./types";

const PART_FAMILIES = ["Powertrain", "Smart Cabin", "Thermal Management"] as const;
const REGIONS = ["North America", "Europe"] as const;
const PLANTS = ["Detroit Hub", "Munich EV Campus", "Nagoya Precision"] as const;

const BASE_UNITS: Record<(typeof PART_FAMILIES)[number], number> = {
  Powertrain: 640,
  "Smart Cabin": 420,
  "Thermal Management": 360,
};

const BASE_PRICE: Record<(typeof PART_FAMILIES)[number], number> = {
  Powertrain: 8400,
  "Smart Cabin": 6500,
  "Thermal Management": 5200,
};

export function generateFallbackSnapshot(): ExecutiveSnapshot {
  const sales = synthesizeSales();
  const inventory = synthesizeInventory();
  const kpis = computeKpis(sales, inventory);

  return {
    generatedAt: new Date().toISOString(),
    source: "fallback",
    aiRecommendation:
      "AI recommends pushing OTA-ready cabin kits to EMEA while loaning Detroit safety stock to Munich ahead of Q1 ramps.",
    kpis,
    sales,
    inventory,
    filters: {
      partFamilies: [...PART_FAMILIES],
      regions: [...REGIONS],
      plants: [...PLANTS],
    },
  };
}

function synthesizeSales(): SalesRecord[] {
  const start = new Date();
  start.setDate(start.getDate() - 7 * 7);
  const rows: SalesRecord[] = [];

  for (let week = 0; week < 8; week += 1) {
    const point = new Date(start);
    point.setDate(start.getDate() + week * 7);
    for (const family of PART_FAMILIES) {
      for (const region of REGIONS) {
        const units = Math.round(BASE_UNITS[family] * (0.65 + jitter(week, family)));
        const netSales = units * BASE_PRICE[family] * (0.91 + jitter(week, region));
        rows.push({
          id: `${family.slice(0, 2)}-${region.slice(0, 2)}-${week}`,
          date: point.toISOString(),
          partFamily: family,
          region,
          unitsSold: units,
          netSalesUsd: Number(netSales.toFixed(2)),
          marginPct: Number((0.22 + jitter(week, "margin")).toFixed(3)),
        });
      }
    }
  }

  return rows;
}

function synthesizeInventory(): InventoryRecord[] {
  return PART_FAMILIES.flatMap((family, familyIdx) =>
    PLANTS.map((plant, plantIdx) => {
      const onHand = Math.round(BASE_UNITS[family] * (1.8 + 0.1 * familyIdx + 0.04 * plantIdx));
      const safety = Math.round(BASE_UNITS[family] * (1.2 + 0.05 * plantIdx));
      const leadTimeDays = 14 + familyIdx * 6 + plantIdx * 3;
      return {
        id: `${family.slice(0, 2)}-${plant.slice(0, 2)}`,
        partFamily: family,
        plant,
        onHandUnits: onHand,
        safetyStock: safety,
        leadTimeDays,
      };
    }),
  );
}

function jitter(seed: number, salt: string | number): number {
  const hash = Math.sin(seed * 17 + hashCode(String(salt)) * 0.1) * 10000;
  return (hash - Math.floor(hash)) * 0.55;
}

function hashCode(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}


