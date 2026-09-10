"use client";

import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import FilterCard from "@/components/ui/filter-card";
import BatchTable from "@/components/tables/batch-table";

export default function BatchListPage() {
  return (
    <>
      {/* ── Breadcrumb Bar with NavChild Actions ── */}
      <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
        <div>
          <Breadcrumb
            title="Warehouse FG"
            items={[
              { label: "Warehouse FG", href: "/inventory/batch-list" },
              { label: "Batch List", href: "/inventory/batch-list" },
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

      {/* ── Batch Table with Pagination ── */}
      <div className="mt-4">
        <BatchTable pageSize={14} />
      </div>
    </>
  );
}