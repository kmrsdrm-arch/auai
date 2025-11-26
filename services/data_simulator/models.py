"""Structured domain models for the synthetic BI data service."""

from __future__ import annotations

from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, Field


class SalesRow(BaseModel):
    """Represents one record in the Sales fact table."""

    id: str
    date: date
    part_family: str
    region: str
    units_sold: int = Field(ge=0)
    net_sales_usd: float = Field(ge=0)
    margin_pct: float = Field(ge=-1, le=1)


class InventoryRow(BaseModel):
    """Represents one record in the Inventory dimensional table."""

    id: str
    part_family: str
    plant: str
    on_hand_units: int = Field(ge=0)
    safety_stock: int = Field(ge=0)
    lead_time_days: int = Field(ge=0)


class KpiValue(BaseModel):
    """Three strategic KPIs derived from the two base tables."""

    key: Literal["revenueMomentum", "inventoryTurnover", "fulfillmentConfidence"]
    label: str
    value: float
    delta: float
    unit: Literal["ratio", "percent"]
    narrative: str
    confidence: float = Field(ge=0, le=1)


class SnapshotPayload(BaseModel):
    """Full payload returned to the dashboard consumers."""

    generated_at: datetime
    sales: list[SalesRow]
    inventory: list[InventoryRow]
    kpis: list[KpiValue]
    ai_recommendation: str


