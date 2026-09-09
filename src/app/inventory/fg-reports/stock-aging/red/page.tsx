"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import FilterCard from "@/components/ui/filter-card";
import StatCard from "@/components/ui/dashboard/stat-card";
import StockAgingTable from "@/components/tables-1/stock-aging-table";
import StockAgingTierTabs from "@/components/stock-aging/tier-tabs";
import {
  redStockData,
  getStockAgingSummary,
} from "@/lib/product-data/stock-aging-data";

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
};

export default function StockAgingRedPage() {
  const summary = getStockAgingSummary();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Sidebar user={user} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto p-5">
          {/* ── Breadcrumb Bar with NavChild Actions ── */}
          <div className="flex min-h-20 w-full items-center justify-between rounded-xl bg-white shadow-xs">
            <div>
              <Breadcrumb
                title="Warehouse FG"
                items={[
                  {
                    label: "Warehouse FG",
                    href: "/inventory/fg-reports/stock-aging",
                  },
                  {
                    label: "FG Report",
                    href: "/inventory/fg-reports/stock-aging",
                  },
                  {
                    label: "Stock Aging",
                    href: "/inventory/fg-reports/stock-aging",
                  },
                  {
                    label: "Red (90+ Days)",
                    href: "/inventory/fg-reports/stock-aging/red",
                  },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>

          {/* ── KPI Stat Cards ── */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Red Zone Stock"
              value={summary.red.stock.toLocaleString()}
              unit="Items"
              breakdown={`${summary.red.percentage}% of Total Inventory`}
              trend="down"
              trendColorClass="text-rose-500"
            />
            <StatCard
              title="Critical Batches"
              value={summary.red.count}
              unit="Batches"
              breakdown="90+ Days in Warehouse"
              trend="down"
              trendColorClass="text-rose-500"
            />
            <StatCard
              title="Blocked Inactive Stock"
              value={summary.totalBlocked.toLocaleString()}
              unit="Items"
              breakdown="High obsolescence risk"
              trend="down"
              trendColorClass="text-rose-500"
            />
            <StatCard
              title="Resolution Needed"
              value="Immediate"
              breakdown="Liquidation, transfer or discount"
              trend="down"
              trendColorClass="text-rose-500"
            />
          </div>

          {/* ── Tier Navigation Tabs ── */}
          <div className="mt-4">
            <StockAgingTierTabs />
          </div>

          {/* ── Filter Card ── */}
          <div className="mt-4">
            <FilterCard />
          </div>

          {/* ── Red Tier Table ── */}
          <div className="mt-4">
            <StockAgingTable data={redStockData} pageSize={10} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

