"use client";

import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import FilterCard from "@/components/ui/filter-card";
import BatchProductTable from "@/components/tables/batch-product-table";

export default function BatchProductListPage() {
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
                href: "/inventory/fg-reports/batch-product-list",
              },
              {
                label: "FG Report",
                href: "/inventory/fg-reports/batch-product-list",
              },
              {
                label: "Batch Product List",
                href: "/inventory/fg-reports/batch-product-list",
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

      {/* ── Batch Product Table with Pagination ── */}
      <div className="mt-4">
        <BatchProductTable pageSize={10} />
      </div>
    </>
  );
}
