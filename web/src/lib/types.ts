export type SalesRecord = {
  id: string;
  date: string;
  partFamily: string;
  region: string;
  unitsSold: number;
  netSalesUsd: number;
  marginPct: number;
};

export type InventoryRecord = {
  id: string;
  partFamily: string;
  plant: string;
  onHandUnits: number;
  safetyStock: number;
  leadTimeDays: number;
};

export type KpiKey =
  | "revenueMomentum"
  | "inventoryTurnover"
  | "fulfillmentConfidence";

export type KpiInsight = {
  key: KpiKey;
  label: string;
  value: number;
  delta: number;
  unit: "ratio" | "percent";
  narrative: string;
  confidence: number;
};

export type ExecutiveSnapshot = {
  generatedAt: string;
  source: "fastapi" | "fallback";
  aiRecommendation: string;
  kpis: KpiInsight[];
  sales: SalesRecord[];
  inventory: InventoryRecord[];
  filters: {
    partFamilies: string[];
    regions: string[];
    plants: string[];
  };
};

export type ChartSeriesPoint = {
  label: string;
  value: number;
};


