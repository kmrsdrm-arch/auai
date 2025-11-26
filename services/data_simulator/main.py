"""FastAPI entrypoint that emits curated Sales & Inventory tables."""

from __future__ import annotations

import os
from functools import lru_cache
from typing import Sequence

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from factory import build_snapshot, generate_inventory, generate_sales
from models import InventoryRow, SalesRow, SnapshotPayload

app = FastAPI(
    title="Executive BI Synthetic Data",
    description=(
        "Deterministic Sales & Inventory tables for the AI-driven dashboard. "
        "The payload stays under 1 MB to preserve agility when deploying to Vercel."
    ),
    version="1.0.0",
)

allowed_origin = os.getenv("NEXT_PUBLIC_SITE_URL") or os.getenv("ALLOWED_ORIGIN", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin] if allowed_origin != "*" else ["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@lru_cache(maxsize=1)
def baseline_sales() -> Sequence[SalesRow]:
    return tuple(generate_sales())


@lru_cache(maxsize=1)
def baseline_inventory() -> Sequence[InventoryRow]:
    return tuple(generate_inventory())


@app.get("/health")
def health() -> dict[str, str]:
    snapshot = build_snapshot()
    return {"status": "ok", "generated_at": snapshot.generated_at.isoformat()}


@app.get("/sales", response_model=list[SalesRow])
def sales_table() -> Sequence[SalesRow]:
    return baseline_sales()


@app.get("/inventory", response_model=list[InventoryRow])
def inventory_table() -> Sequence[InventoryRow]:
    return baseline_inventory()


@app.get("/snapshot", response_model=SnapshotPayload)
def snapshot() -> SnapshotPayload:
    """
    Returns the two normalized tables plus the three KPIs that the dashboard needs.
    The tables are regenerated for every call to keep the storyline dynamic while
    respecting the <1 MB payload constraint.
    """

    return build_snapshot()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", "8000")), reload=True)


