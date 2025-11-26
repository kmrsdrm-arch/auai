import type { InventoryRecord, KpiInsight, SalesRecord } from "./types";

const KPI_CONFIDENCE = {
  revenueMomentum: 0.95,
  inventoryTurnover: 0.92,
  fulfillmentConfidence: 0.97,
} as const;

export function computeKpis(
  sales: SalesRecord[],
  inventory: InventoryRecord[],
): KpiInsight[] {
  return [
    computeRevenueMomentum(sales),
    computeInventoryTurnover(sales, inventory),
    computeFulfillmentConfidence(sales, inventory),
  ];
}

function computeRevenueMomentum(sales: SalesRecord[]): KpiInsight {
  const sorted = [...sales].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const recent = sorted.slice(-16);
  const current = sum(recent.slice(-8).map((row) => row.netSalesUsd));
  const previous = sum(recent.slice(0, 8).map((row) => row.netSalesUsd)) || 1;
  const ratio = current / previous;

  return {
    key: "revenueMomentum",
    label: "Revenue Momentum",
    value: Number(ratio.toFixed(3)),
    delta: Number((ratio - 1).toFixed(3)),
    unit: "percent",
    narrative:
      "Executive AI ties the lift to OTA-ready cabin kits and premium drive units.",
    confidence: KPI_CONFIDENCE.revenueMomentum,
  };
}

function computeInventoryTurnover(
  sales: SalesRecord[],
  inventory: InventoryRecord[],
): KpiInsight {
  const window = sales.slice(-16);
  const weeklyUnits = sum(window.map((row) => row.unitsSold)) / 16;
  const avgInventory =
    sum(inventory.map((item) => item.onHandUnits)) / Math.max(inventory.length, 1);
  const turnover = (weeklyUnits / Math.max(avgInventory, 1)) * 52;

  return {
    key: "inventoryTurnover",
    label: "Inventory Turnover",
    value: Number(turnover.toFixed(2)),
    delta: Number((turnover - 9.5).toFixed(2)),
    unit: "ratio",
    narrative:
      "Castings clear within SLA; smart cabin harnesses require one more cross-dock.",
    confidence: KPI_CONFIDENCE.inventoryTurnover,
  };
}

function computeFulfillmentConfidence(
  sales: SalesRecord[],
  inventory: InventoryRecord[],
): KpiInsight {
  const latestDate = sales.reduce(
    (acc, row) => Math.max(acc, new Date(row.date).getTime()),
    0,
  );
  const horizon = 21 * 24 * 60 * 60 * 1000;
  const demandMap = new Map<string, number>();

  sales.forEach((row) => {
    const age = latestDate - new Date(row.date).getTime();
    if (age <= horizon) {
      demandMap.set(
        row.partFamily,
        (demandMap.get(row.partFamily) ?? 0) + row.unitsSold,
      );
    }
  });

  const coverage = inventory.map((item) => {
    const demand = (demandMap.get(item.partFamily) ?? 1) / 3;
    const bufferWeeks = item.onHandUnits / Math.max(demand, 1);
    const requiredWeeks = item.leadTimeDays / 7 + 1;
    return Math.min(bufferWeeks / Math.max(requiredWeeks, 1), 1);
  });

  const confidence =
    coverage.reduce((acc, value) => acc + value, 0) / Math.max(coverage.length, 1);

  return {
    key: "fulfillmentConfidence",
    label: "Fulfillment Confidence",
    value: Number(confidence.toFixed(3)),
    delta: Number((confidence - 0.85).toFixed(3)),
    unit: "percent",
    narrative:
      "Detroit can loan four days of safety stock to Munich without breaching SLAs.",
    confidence: KPI_CONFIDENCE.fulfillmentConfidence,
  };
}

const sum = (values: number[]) => values.reduce((acc, value) => acc + value, 0);


