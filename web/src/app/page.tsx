import Link from "next/link";
import { Hero } from "@/components/Hero";
import { loadExecutiveSnapshot } from "@/lib/server/loadSnapshot";

export const dynamic = "force-dynamic";

export default async function Home() {
  const snapshot = await loadExecutiveSnapshot();

  return (
    <div className="relative mt-6">
      <main className="relative space-y-12">
        <Hero snapshot={snapshot} />

        {/* Quick Navigation Cards */}
        <section className="grid gap-6 md:grid-cols-3">
          <Link
            href="/about"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-8 backdrop-blur-xl transition hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <div className="mb-4 inline-block rounded-full bg-cyan-500/20 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">About</h3>
            <p className="text-white/70">
              Learn about the architecture, technology stack, and vision behind this BI platform
            </p>
            <div className="mt-4 flex items-center text-cyan-400 group-hover:text-cyan-300">
              <span className="text-sm font-medium">Explore</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4 transition group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/analytics/dashboard-summary"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-8 backdrop-blur-xl transition hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <div className="mb-4 inline-block rounded-full bg-emerald-500/20 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Analytics</h3>
            <p className="text-white/70">
              Dive into KPIs, sales analytics, inventory analysis, and AI-powered insights
            </p>
            <div className="mt-4 flex items-center text-emerald-400 group-hover:text-emerald-300">
              <span className="text-sm font-medium">View Dashboard</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4 transition group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/contacts"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-8 backdrop-blur-xl transition hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-500/20"
          >
            <div className="mb-4 inline-block rounded-full bg-violet-500/20 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-violet-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Contacts</h3>
            <p className="text-white/70">
              Get in touch for collaboration, demos, or discuss Chief Data Architect opportunities
            </p>
            <div className="mt-4 flex items-center text-violet-400 group-hover:text-violet-300">
              <span className="text-sm font-medium">Contact Me</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4 transition group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </section>

        {/* Platform Highlights */}
        <section className="rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-white mb-6">Platform Highlights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent p-6 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400 mb-2">&lt;1 MB</div>
              <p className="text-sm text-white/70">Lightweight synthetic data for optimal performance</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent p-6 border border-emerald-500/20">
              <div className="text-3xl font-bold text-emerald-400 mb-2">95%+</div>
              <p className="text-sm text-white/70">AI confidence threshold for decision-making</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-violet-500/10 to-transparent p-6 border border-violet-500/20">
              <div className="text-3xl font-bold text-violet-400 mb-2">&lt;1ms</div>
              <p className="text-sm text-white/70">Sub-millisecond query response with InstantDB</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent p-6 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
              <p className="text-sm text-white/70">Secure with CSP and encrypted connections</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

