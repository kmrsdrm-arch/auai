import type { InventoryRecord, SalesRecord } from "./types";

export function filterSales(
  sales: SalesRecord[],
  region: string | null,
  partFamily: string | null,
) {
  return sales.filter((row) => {
    const regionMatch = !region || region === "All" || row.region === region;
    const familyMatch = !partFamily || partFamily === "All" || row.partFamily === partFamily;
    return regionMatch && familyMatch;
  });
}

export function filterInventory(
  inventory: InventoryRecord[],
  plant: string | null,
  partFamily: string | null,
) {
  return inventory.filter((row) => {
    const plantMatch = !plant || plant === "All" || row.plant === plant;
    const familyMatch = !partFamily || partFamily === "All" || row.partFamily === partFamily;
    return plantMatch && familyMatch;
  });
}


