"use client";

const sections = [
  { label: "About", target: "#about" },
  { label: "Analytics", target: "#analytics" },
  { label: "Contacts", target: "#contact" },
];

const analyticsSubsections = [
  { label: "Dashboard Summary", target: "#dashboard-summary" },
  { label: "Sales Analytics", target: "#sales-analytics" },
  { label: "Inventory Analysis", target: "#inventory-analysis" },
  { label: "Report", target: "#report" },
];

export default function ExecutiveNav() {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-4 z-30 flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-2xl">
      <div className="flex flex-wrap gap-3 text-sm">
        {sections.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => scrollTo(item.target)}
            className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-cyan-300 hover:text-cyan-200"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-white/50">
        {analyticsSubsections.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => scrollTo(item.target)}
            className="rounded-full border border-white/10 px-3 py-1 text-white/70 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}


