"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import FilterCard from "@/components/ui/filter-card";
import StockAgingTable from "@/components/tables/stock-aging-table";
import StockAgingTierTabs from "@/components/stock-aging/tier-tabs";
import { stockAgingData } from "@/lib/product-data/stock-aging-data";

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
};

export default function StockAgingOverviewPage() {
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
