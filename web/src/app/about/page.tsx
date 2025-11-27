export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <div className="relative mt-6">
      <main className="relative space-y-12">
        <section className="space-y-6 rounded-3xl border border-white/10 bg-black/40 p-10 text-white backdrop-blur-xl">
          <header>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-200">About</p>
            <h1 className="mt-2 text-4xl font-bold">
              Minimalist, Dynamic, Secured BI Fabric for Automotive Leaders
            </h1>
          </header>
          
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Vision</h2>
              <p className="text-white/80 leading-relaxed">
                A lightweight, AI-powered Business Intelligence system designed for automotive parts manufacturing executives. 
                This platform enables confident, informed decision-making through dynamic visualizations, natural language queries, 
                and real-time KPI monitoring—all delivered in a stunning, next-generation dark-themed interface.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">Technology Stack</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-cyan-400">▸</span>
                    <span>Next.js App Router on Vercel for the dark, executive-grade UI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-cyan-400">▸</span>
                    <span>InstantDB client + memory cache to keep KPI reads sub-millisecond</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-cyan-400">▸</span>
                    <span>FastAPI + Pydantic + Uvicorn powering two curated tables (&lt;1&nbsp;MB)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-cyan-400">▸</span>
                    <span>OpenAI ChatGPT integration for 95% confidence AI decision-making</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">Operating Model</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    <span>Synthetic Sales & Inventory data ensures privacy with realism</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    <span>Single .bat file execution for streamlined deployment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    <span>CSP + secured proxy routes for safe stakeholder access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-emerald-400">▸</span>
                    <span>Cost-effective architecture using free-tier services</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-6">
                <div className="text-3xl font-bold text-cyan-400">&lt;1 MB</div>
                <p className="mt-2 text-sm text-white/70">Lightweight Data</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">
                <div className="text-3xl font-bold text-emerald-400">95%+</div>
                <p className="mt-2 text-sm text-white/70">AI Confidence</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-6">
                <div className="text-3xl font-bold text-violet-400">100%</div>
                <p className="mt-2 text-sm text-white/70">Secured</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-cyan-400 font-medium mb-2">Natural Language Queries</h4>
                  <p className="text-sm text-white/70">Ask questions in plain English and get instant insights</p>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-medium mb-2">Dynamic Visualizations</h4>
                  <p className="text-sm text-white/70">Interactive charts and graphs that update in real-time</p>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-medium mb-2">Dimensional Filters</h4>
                  <p className="text-sm text-white/70">Slice and dice data across multiple dimensions</p>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-medium mb-2">Executive-Grade UI/UX</h4>
                  <p className="text-sm text-white/70">Deep dark theme optimized for legibility and aesthetics</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

