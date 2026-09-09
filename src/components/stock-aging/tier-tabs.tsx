"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  stockAgingData,
  greenStockData,
  yellowStockData,
  redStockData,
} from "@/lib/product-data/stock-aging-data";

export default function StockAgingTierTabs() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "All Tiers",
      href: "/inventory/fg-reports/stock-aging",
      count: stockAgingData.length,
      isActive: pathname === "/inventory/fg-reports/stock-aging",
    },
    {
      label: "Green Zone (0-30 Days)",
      href: "/inventory/fg-reports/stock-aging/green",
      count: greenStockData.length,
      badgeColor: "bg-emerald-100 text-emerald-800",
      indicatorColor: "bg-emerald-500",
      isActive: pathname.startsWith("/inventory/fg-reports/stock-aging/green"),
    },
    {
      label: "Yellow Zone (31-90 Days)",
      href: "/inventory/fg-reports/stock-aging/yellow",
      count: yellowStockData.length,
      badgeColor: "bg-amber-100 text-amber-800",
      indicatorColor: "bg-amber-500",
      isActive: pathname.startsWith("/inventory/fg-reports/stock-aging/yellow"),
    },
    {
      label: "Red Zone (90+ Days)",
      href: "/inventory/fg-reports/stock-aging/red",
      count: redStockData.length,
      badgeColor: "bg-rose-100 text-rose-800",
      indicatorColor: "bg-rose-500",
      isActive: pathname.startsWith("/inventory/fg-reports/stock-aging/red"),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => {
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              tab.isActive
                ? "bg-[#476ab8] text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {tab.indicatorColor && (
              <span
                className={`h-2 w-2 rounded-full ${
                  tab.isActive ? "bg-white" : tab.indicatorColor
                }`}
              />
            )}
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                tab.isActive
                  ? "bg-white/20 text-white"
                  : tab.badgeColor ?? "bg-slate-100 text-slate-700"
              }`}
            >
              {tab.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

