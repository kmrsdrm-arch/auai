# Next-Gen Automotive BI Cockpit

AI-powered, executive-ready BI experience for automotive parts manufacturing.  
The stack pairs a deep dark Next.js dashboard on Vercel with an InstantDB cache
and a FastAPI simulator that emits two curated tables (Sales + Inventory) under 1 MB.

## Architecture at a Glance

| Layer | Description |
| --- | --- |
| **Web UI** | `web/` – Next.js App Router, Tailwind v4, Framer Motion, Lucide icons. |
| **InstantDB layer** | `src/components/InstantStatusCard.tsx` demonstrates live InstantDB connectivity while `src/lib/instantMemory.ts` holds a lightweight server cache for sub-ms reads. |
| **Data simulator** | `services/data_simulator/` – FastAPI + Pydantic + Uvicorn emitting `/sales`, `/inventory`, and `/snapshot` endpoints. |
| **Orchestration** | `launch_dashboard.bat` spins up the FastAPI service (venv managed) and the Next.js dev server in separate terminals. |

### Data Model (≤1 MB)

1. **Sales Table**
   - Columns: `date`, `part_family`, `region`, `units_sold`, `net_sales_usd`, `margin_pct`.
   - Used for KPI: *Revenue Momentum*.
2. **Inventory Table**
   - Columns: `part_family`, `plant`, `on_hand_units`, `safety_stock`, `lead_time_days`.
   - Used for KPIs: *Inventory Turnover* and *Fulfillment Confidence*.

Synthetic values are deterministic and curated for storytelling while staying tiny for instant deployments.

## Getting Started

### 1. Requirements

- Node.js 20+
- Python 3.10+
- npm (bundled with Node)

### 2. One-click launch (Windows)

```bash
launch_dashboard.bat
```

What it does:
1. Creates/updates a Python virtual environment for FastAPI.
2. Installs simulator dependencies from `services/data_simulator/requirements.txt`.
3. Launches `uvicorn main:app --reload` on port `8000`.
4. Installs npm deps (if needed) and starts `npm run dev` for Next.js.

### 3. Manual commands (optional)

```bash
# FastAPI (from repo root)
cd services/data_simulator
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

# Next.js (from repo root)
cd web
npm install
npm run dev
```

### Environment Variables

| Name | Default | Purpose |
| --- | --- | --- |
| `DATA_API_URL` | `http://127.0.0.1:8000` | Location of the FastAPI simulator. |
| `NEXT_PUBLIC_INSTANT_APP_ID` | `demo-automotive` | InstantDB app identifier used by the client bridge. |

## Security Posture

- Strict CSP, Referrer, and Permissions-Policy headers in `next.config.ts`.
- Analytics proxies route through `/api/metrics` so the FastAPI origin never reaches the browser.
- Dashboard is dark-mode–only with executive-ready typography and gradients.

## Navigation Structure

The dashboard features a **hierarchical multi-page navigation** system:

### Main Pages
- **Home** (`/`) – Landing page with Hero section and quick navigation cards
- **About** (`/about`) – Architecture, tech stack, vision, and key features
- **Analytics** – Multi-page analytics section with sub-navigation
  - **Dashboard Summary** (`/analytics/dashboard-summary`) – KPI cards and executive overview
  - **Sales Analytics** (`/analytics/sales`) – Revenue runway, charts, and sales data table
  - **Inventory Analysis** (`/analytics/inventory`) – Coverage confidence, risk analysis
  - **Report** (`/analytics/report`) – AI-powered insights with natural language query interface
- **Contacts** (`/contacts`) – Email, WhatsApp, and project information

### Key Features
- **Smart Navigation**: Top-level nav automatically shows Analytics sub-menu when browsing analytics pages
- **Route Awareness**: Active page highlighting for intuitive navigation
- **Responsive Design**: Optimized for desktop and mobile with sticky navigation
- **Deep Dark Theme**: Executive-grade UI with beautiful gradients and animations

## Folder Highlights

- `web/src/app/` – Next.js App Router pages organized by route
  - `page.tsx` – Landing page with hero and quick links
  - `about/page.tsx` – Complete about section
  - `analytics/` – Analytics module with 4 dedicated pages
  - `contacts/page.tsx` – Contact information and forms
- `web/src/components/` – Reusable UI components
  - `ExecutiveNav.tsx` – Hierarchical navigation with route awareness
  - `Hero.tsx` – Dynamic hero section with KPI display
  - `KpiCard.tsx` – Executive KPI visualization cards
- `web/src/lib/server/loadSnapshot.ts` – Shared loader that syncs FastAPI data → Instant cache
- `web/src/lib/instantMemory.ts` – Client-side data hook for analytics pages
- `services/data_simulator/factory.py` – Deterministic synthetic data factory

## Deployment Notes

1. Deploy `web/` to Vercel (`npm run build && npm run start`).
2. Deploy `services/data_simulator` to any FastAPI-friendly host (Railway, Fly.io, etc).
3. Set `DATA_API_URL` and `NEXT_PUBLIC_INSTANT_APP_ID` in Vercel environment variables.

You now have a secure, lightweight, AI-guided BI experience that demonstrates mastery
across Next.js, InstantDB, FastAPI, Pydantic, and Uvicorn—ready for executive demos.
