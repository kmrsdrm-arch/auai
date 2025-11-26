import AnalyticsBoard from "@/components/AnalyticsBoard";
import ExecutiveNav from "@/components/ExecutiveNav";
import { Hero } from "@/components/Hero";
import { ContactSection } from "@/components/ContactSection";
import { loadExecutiveSnapshot } from "@/lib/server/loadSnapshot";

export const dynamic = "force-dynamic";

export default async function Home() {
  const snapshot = await loadExecutiveSnapshot();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.15), transparent 50%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.15), transparent 40%)",
        }}
        aria-hidden
      />
      <main className="relative space-y-12">
        <ExecutiveNav />
        <Hero snapshot={snapshot} />
        <section
          id="about"
          className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-10 text-white"
        >
          <header>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">About</p>
            <h2 className="mt-2 text-3xl font-semibold">
              Minimalist, dynamic, secured BI fabric for automotive leaders.
            </h2>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Stack</p>
              <ul className="mt-3 space-y-2">
                <li>• Next.js App Router on Vercel for the dark, executive-grade UI.</li>
                <li>• InstantDB client + memory cache to keep KPI reads sub-ms.</li>
                <li>• FastAPI + Pydantic + Uvicorn powering two curated tables (&lt;1&nbsp;MB).</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Operating Model</p>
              <ul className="mt-3 space-y-2">
                <li>• Synthetic Sales & Inventory parquet ensures privacy with realism.</li>
                <li>• launch_dashboard.bat spins up both FastAPI + Next dev servers for demos.</li>
                <li>• CSP + signed proxy route secure everything before sharing the link.</li>
              </ul>
            </div>
          </div>
        </section>
        <AnalyticsBoard snapshot={snapshot} />
        <ContactSection />
      </main>
    </div>
  );
}

