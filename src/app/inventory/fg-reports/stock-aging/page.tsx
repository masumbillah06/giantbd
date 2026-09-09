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
  stockAgingData,
  getStockAgingSummary,
} from "@/lib/product-data/stock-aging-data";

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
};

export default function StockAgingOverviewPage() {
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
              title="Total FG Inventory"
              value={summary.totalStock.toLocaleString()}
              unit="Items"
              breakdown={`${summary.totalItems} Active Batches`}
              trend="up"
              trendColorClass="text-[#476ab8]"
            />
            <StatCard
              title="Green Zone (0-30 Days)"
              value={summary.green.stock.toLocaleString()}
              unit="Items"
              breakdown={`${summary.green.count} Batches | ${summary.green.percentage}% of stock`}
              trend="up"
              trendColorClass="text-emerald-500"
            />
            <StatCard
              title="Yellow Zone (31-90 Days)"
              value={summary.yellow.stock.toLocaleString()}
              unit="Items"
              breakdown={`${summary.yellow.count} Batches | ${summary.yellow.percentage}% of stock`}
              trend="neutral"
              trendColorClass="text-amber-500"
            />
            <StatCard
              title="Red Zone (90+ Days)"
              value={summary.red.stock.toLocaleString()}
              unit="Items"
              breakdown={`${summary.red.count} Batches | Blocked: ${summary.totalBlocked}`}
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

          {/* ── Stock Aging Table with Pagination ── */}
          <div className="mt-4">
            <StockAgingTable data={stockAgingData} pageSize={10} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

