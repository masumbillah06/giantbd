"use client";

import React from "react";
import PaginatedTable from "./paginated-table";
import type { ColumnDef } from "./ReusableTable.types";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { Eye, FileText, Truck, Package, Check } from "lucide-react";
import {
  stockOutData as defaultStockOutData,
  type StockOutItem,
} from "@/lib/product-data/stockout-list";

export interface StockOutTableProps {
  data?: StockOutItem[];
  pageSize?: number;
  onView?: (item: StockOutItem) => void;
  onDocument?: (item: StockOutItem) => void;
  onDispatch?: (item: StockOutItem) => void;
  onPackage?: (item: StockOutItem) => void;
}

// ── Column definitions ────────────────────────────────────────────────────────
const columns: ColumnDef<StockOutItem>[] = [
  {
    key: "label",
    label: "Label",
    render: (row) => {
      if (row.label === "issued") {
        return (
          <span
            title="Issued"
            className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-emerald-50 text-emerald-600 border border-emerald-300"
          >
            <Check className="h-3 w-3 stroke-[2.5]" />
          </span>
        );
      }
      if (row.label === "pending") {
        return (
          <span
            title="Pending"
            className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-amber-50 text-amber-500 border border-amber-300 text-xs font-bold leading-none"
          >
            !
          </span>
        );
      }
      return (
        <span
          title="Received"
          className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-[#3b66c4] text-white"
        >
          <Check className="h-3 w-3 stroke-[2.5]" />
        </span>
      );
    },
  },
  {
    key: "lcNo",
    label: "LC No",
    cellClassName: "whitespace-nowrap px-5 py-2 text-sm text-slate-950 group-hover:text-white font-medium",
  },
  {
    key: "poNo",
    label: "PO No",
    cellClassName: "whitespace-nowrap px-5 py-2 text-sm text-slate-950 group-hover:text-white font-medium",
  },
  {
    key: "buyer",
    label: "Buyer",
  },
  {
    key: "destination",
    label: "Destination",
  },
  {
    key: "reqCreatedBy",
    label: "Req. Created By",
  },
  {
    key: "reqDate",
    label: "Req. Date",
  },
  {
    key: "products",
    label: "Products",
  },
  {
    key: "status",
    label: "Status",
    render: (row) => {
      if (row.status === "Issued") {
        return (
          <span className="inline-block min-w-[72px] text-center rounded-md bg-[#059669] px-3 py-1 text-xs font-medium text-white shadow-xs">
            Issued
          </span>
        );
      }
      if (row.status === "Pending") {
        return (
          <span className="inline-block min-w-[72px] text-center rounded-md bg-[#eab308] px-3 py-1 text-xs font-medium text-white shadow-xs">
            Pending
          </span>
        );
      }
      return (
        <span className="inline-block min-w-[72px] text-center rounded-md bg-[#3b66c4] px-3 py-1 text-xs font-medium text-white shadow-xs">
          Received
        </span>
      );
    },
  },
];

export function StockOutTable({
  data = defaultStockOutData,
  pageSize = 17,
  onView,
  onDocument,
  onDispatch,
  onPackage,
}: StockOutTableProps) {
  return (
    <PaginatedTable<StockOutItem>
      data={data}
      columns={columns}
      pageSize={pageSize}
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
              onView?.(row);
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
                onDocument?.(row);
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
                onDispatch?.(row);
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
                onPackage?.(row);
                notify(`Viewing package breakdown for #${row.id}`);
              }}
            />
          )}
        </ActionButtonGroup>
      )}
    />
  );
}

export default StockOutTable;

