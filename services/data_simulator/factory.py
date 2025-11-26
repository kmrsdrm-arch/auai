"""Synthetic data factory shared across the FastAPI endpoints."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from random import Random

from models import InventoryRow, KpiValue, SalesRow, SnapshotPayload

PART_FAMILIES = ("Powertrain", "Smart Cabin", "Thermal Management")
REGIONS = ("North America", "Europe")
PLANTS = ("Detroit Hub", "Munich EV Campus", "Nagoya Precision")
BASE_UNITS = {
    "Powertrain": 640,
    "Smart Cabin": 420,
    "Thermal Management": 360,
}
BASE_PRICE = {
    "Powertrain": 8400,
    "Smart Cabin": 6400,
    "Thermal Management": 5200,
}


def generate_sales(seed: int = 42) -> list[SalesRow]:
    rng = Random(seed)
    latest_monday = date.today() - timedelta(days=date.today().weekday())
    anchor = latest_monday - timedelta(weeks=7)

    rows: list[SalesRow] = []
    for week_idx in range(8):
        week_date = anchor + timedelta(weeks=week_idx)
        for family in PART_FAMILIES:
            for region in REGIONS:
                units = int(BASE_UNITS[family] * (0.65 + rng.random() * 0.55))
                net_sales = units * BASE_PRICE[family] * (0.9 + rng.random() * 0.18)
                margin = 0.18 + rng.random() * 0.12
                rows.append(
                    SalesRow(
                        id=f"{family[:2]}-{region[:2]}-{week_idx}",
                        date=week_date,
                        part_family=family,
                        region=region,
                        units_sold=units,
                        net_sales_usd=round(net_sales, 2),
                        margin_pct=round(margin, 3),
                    )
                )
    return rows


def generate_inventory(seed: int = 84) -> list[InventoryRow]:
    rng = Random(seed)
    rows: list[InventoryRow] = []
    for family in PART_FAMILIES:
        for plant in PLANTS:
            on_hand = int(BASE_UNITS[family] * (1.8 + rng.random() * 0.5))
            safety = int(BASE_UNITS[family] * (1.2 + rng.random() * 0.3))
            lead_time = rng.randint(12, 32)
            rows.append(
                InventoryRow(
                    id=f"{family[:2]}-{plant[:2]}",
                    part_family=family,
                    plant=plant,
                    on_hand_units=on_hand,
                    safety_stock=safety,
                    lead_time_days=lead_time,
                )
            )
    return rows


def _revenue_momentum(sales: list[SalesRow]) -> KpiValue:
    sorted_rows = sorted(sales, key=lambda r: r.date)
    recent = sorted_rows[-16:]
    current = sum(r.net_sales_usd for r in recent[-8:])
    prior = sum(r.net_sales_usd for r in recent[:8]) or 1
    ratio = current / prior
    delta = ratio - 1
    narrative = (
        "Sales AI flags premium trims and OTA-ready platforms as the lift drivers. "
        "Demand remains price-inelastic when OTA bundles stay attached."
    )
    return KpiValue(
        key="revenueMomentum",
        label="Revenue Momentum",
        value=round(ratio, 3),
        delta=round(delta, 3),
        unit="percent",
        narrative=narrative,
        confidence=0.95,
    )


def _inventory_turnover(sales: list[SalesRow], inventory: list[InventoryRow]) -> KpiValue:
    weekly_units = sum(r.units_sold for r in sales[-16:])
    avg_inventory = sum(item.on_hand_units for item in inventory) / max(len(inventory), 1)
    turnover = (weekly_units / 16) / max(avg_inventory, 1) * 52
    delta = turnover - 9.5
    narrative = (
        "Inventory stays within the EV OEM contract tolerance. "
        "Critical castings still clear faster than the hybrid housings."
    )
    return KpiValue(
        key="inventoryTurnover",
        label="Inventory Turnover",
        value=round(turnover, 2),
        delta=round(delta, 2),
        unit="ratio",
        narrative=narrative,
        confidence=0.92,
    )


def _fulfillment_confidence(sales: list[SalesRow], inventory: list[InventoryRow]) -> KpiValue:
    latest_week = max(sales, key=lambda row: row.date).date
    demand_by_family = {}
    for row in sales:
        if (latest_week - row.date).days <= 21:
            demand_by_family.setdefault(row.part_family, 0)
            demand_by_family[row.part_family] += row.units_sold
    coverage_points: list[float] = []
    for item in inventory:
        weekly_demand = demand_by_family.get(item.part_family, 1) / 3
        buffer_weeks = item.on_hand_units / max(weekly_demand, 1)
        required_weeks = item.lead_time_days / 7 + 1
        coverage_points.append(min(buffer_weeks / max(required_weeks, 1), 1))
    confidence = sum(coverage_points) / max(len(coverage_points), 1)
    delta = confidence - 0.85
    narrative = (
        "Coverage dips in Nagoya if ADAS lidar harness orders stay elevated. "
        "Detroit can loan 4 days of safety stock without breaching SLA."
    )
    return KpiValue(
        key="fulfillmentConfidence",
        label="Fulfillment Confidence",
        value=round(confidence, 3),
        delta=round(delta, 3),
        unit="percent",
        narrative=narrative,
        confidence=0.97,
    )


def build_snapshot() -> SnapshotPayload:
    sales = generate_sales()
    inventory = generate_inventory()
    kpis = [
        _revenue_momentum(sales),
        _inventory_turnover(sales, inventory),
        _fulfillment_confidence(sales, inventory),
    ]
    recommendation = (
        "Deploy AI-led replenishment for Powertrain castings and re-route surplus cabin "
        "modules from Detroit to the Munich EV campus before the next OTA push window."
    )
    return SnapshotPayload(
        generated_at=datetime.utcnow(),
        sales=sales,
        inventory=inventory,
        kpis=kpis,
        ai_recommendation=recommendation,
    )


