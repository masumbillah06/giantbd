"use client";

import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import FilterCard from "@/components/ui/filter-card";
import PaginatedTable from "@/components/tables/paginated-table";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { Eye, FileText, Truck, Package } from "lucide-react";
import {
  stockOutData,
  stockOutColumns,
  type StockOutItem,
} from "@/lib/product-data/stockout-list";

export default function StockOutListPage() {
  return (
    <>
      {/* ── Breadcrumb Bar with NavChild Actions ── */}
      <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
        <div>
          <Breadcrumb
            title="Warehouse FG"
            items={[
              { label: "Warehouse FG", href: "/inventory/stock-out-list" },
              { label: "Stock Out List", href: "/inventory/stock-out-list" },
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

      {/* ── Stock Out Table with Pagination ── */}
      <div className="mt-4">
        <PaginatedTable<StockOutItem>
          data={stockOutData}
          columns={stockOutColumns}
          pageSize={17}
          minWidth="1200px"
          actionsLabel="Action"
          renderActions={(row, notify) => (
            <ActionButtonGroup aria-label={`Actions for record ${row.id}`}>
              {/* Always show View */}
              <ActionButton
                label="View Stock Out"
                icon={Eye}
                className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
                onClick={() => {
                  notify(`Viewing stock out record #${row.id} (${row.lcNo})`);
                }}
              />

              {/* Show Document for Issued and Received */}
              {(row.status === "Issued" || row.status === "Received") && (
                <ActionButton
                  label={row.status === "Issued" ? "Delivery Note / Gate Pass" : "Receipt Document"}
                  icon={FileText}
                  className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
                  onClick={() => {
                    notify(`Opening document for #${row.id}`);
                  }}
                />
              )}

              {/* Show Truck / Dispatch for Issued and Received */}
              {(row.status === "Issued" || row.status === "Received") && (
                <ActionButton
                  label="Dispatch / Shipment Details"
                  icon={Truck}
                  className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
                  onClick={() => {
                    notify(`Viewing shipment details for #${row.id}`);
                  }}
                />
              )}

              {/* Show Package for Issued */}
              {row.status === "Issued" && (
                <ActionButton
                  label="Package Details"
                  icon={Package}
                  className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
                  onClick={() => {
                    notify(`Viewing package breakdown for #${row.id}`);
                  }}
                />
              )}
            </ActionButtonGroup>
          )}
        />
      </div>
    </>
  );
}