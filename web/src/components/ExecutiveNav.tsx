"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const mainSections = [
  { label: "About", href: "/about" },
  { label: "Analytics", href: "/analytics/dashboard-summary" },
  { label: "Contacts", href: "/contacts" },
];

const analyticsSubsections = [
  { label: "Dashboard Summary", href: "/analytics/dashboard-summary" },
  { label: "Sales Analytics", href: "/analytics/sales" },
  { label: "Inventory Analysis", href: "/analytics/inventory" },
  { label: "Report", href: "/analytics/report" },
];

export default function ExecutiveNav() {
  const pathname = usePathname();
  const [showAnalyticsMenu, setShowAnalyticsMenu] = useState(false);
  
  const isAnalyticsSection = pathname?.startsWith("/analytics");

  return (
    <nav className="sticky top-4 z-30 flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-2xl">
      {/* Main Navigation */}
      <div className="flex flex-wrap gap-3 text-sm">
        {mainSections.map((item) => {
          const isActive = 
            item.href === pathname || 
            (item.href === "/analytics/dashboard-summary" && isAnalyticsSection);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full border px-4 py-2 transition ${
                isActive
                  ? "border-cyan-400 bg-cyan-400/20 text-cyan-300"
                  : "border-white/20 text-white hover:border-cyan-300 hover:text-cyan-200"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Analytics Sub-Navigation - Show when on Analytics pages */}
      {isAnalyticsSection && (
        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-3 text-xs uppercase tracking-wide">
          {analyticsSubsections.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full border px-3 py-1 transition ${
                  isActive
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 text-white/70 hover:border-cyan-300 hover:text-cyan-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}


