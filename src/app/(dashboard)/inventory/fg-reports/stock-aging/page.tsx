"use client";

import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import FilterCard from "@/components/ui/filter-card";
import StockAgingTable from "@/components/tables/stock-aging-table";
import { stockAgingData } from "@/lib/product-data/stock-aging-data";

export default function StockAgingOverviewPage() {
  return (
    <>
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
    </>
  );
}
