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
  greenStockData,
  getStockAgingSummary,
} from "@/lib/product-data/stock-aging-data";

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
};

export default function StockAgingGreenPage() {
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
                    label: "Green (0-30 Days)",
                    href: "/inventory/fg-reports/stock-aging/green",
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
              title="Green Zone Stock"
              value={summary.green.stock.toLocaleString()}
              unit="Items"
              breakdown={`${summary.green.percentage}% of Total Inventory`}
              trend="up"
              trendColorClass="text-emerald-500"
            />
            <StatCard
              title="Active Batches"
              value={summary.green.count}
              unit="Batches"
              breakdown="Fresh & moving normally"
              trend="up"
              trendColorClass="text-emerald-500"
            />
            <StatCard
              title="Average Stock Age"
              value={summary.green.avgDays}
              breakdown="Within 30-day freshness SLA"
              trend="up"
              trendColorClass="text-emerald-500"
            />
            <StatCard
              title="Turnover Status"
              value="Optimal"
              breakdown="0 items past warning threshold"
              trend="up"
              trendColorClass="text-emerald-500"
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

          {/* ── Green Tier Table ── */}
          <div className="mt-4">
            <StockAgingTable data={greenStockData} pageSize={10} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

