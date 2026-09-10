"use client";

import React from "react";
import PaginatedTable from "./paginated-table";
import type { ColumnDef } from "./ReusableTable.types";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { Eye, SlidersHorizontal, MapPin, Download } from "lucide-react";
import {
  stockAgingData as defaultStockAgingData,
  type StockAgingItem,
} from "@/lib/product-data/stock-aging-data";

export interface StockAgingTableProps {
  data?: StockAgingItem[];
  pageSize?: number;
  onView?: (item: StockAgingItem) => void;
  onAdjust?: (item: StockAgingItem) => void;
  onLocation?: (item: StockAgingItem) => void;
  onDownload?: (item: StockAgingItem) => void;
}

const columns: ColumnDef<StockAgingItem>[] = [
  {
    key: "tier",
    label: "Aging Tier",
    render: (row) => {
      if (row.tier === "green") {
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 group-hover:border-white/30 group-hover:bg-white/20 group-hover:text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Green (0-30d)
          </span>
        );
      }
      if (row.tier === "yellow") {
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 group-hover:border-white/30 group-hover:bg-white/20 group-hover:text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Yellow (31-90d)
          </span>
        );
      }
      return (
        <span className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700 group-hover:border-white/30 group-hover:bg-white/20 group-hover:text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Red (90+d)
        </span>
      );
    },
  },
  {
    key: "productName",
    label: "Product Name",
    cellClassName:
      "whitespace-nowrap px-5 py-2 text-sm font-semibold text-slate-950 group-hover:text-white",
  },
  {
    key: "sku",
    label: "SKU",
    render: (row) => (
      <span className="font-mono text-xs tracking-tight text-slate-600 group-hover:text-slate-100">
        {row.sku}
      </span>
    ),
  },
  {
    key: "batchNo",
    label: "Batch No",
    render: (row) => (
      <span className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-medium text-indigo-700 group-hover:border-white/30 group-hover:bg-white/20 group-hover:text-white">
        {row.batchNo}
      </span>
    ),
  },
  {
    key: "category",
    label: "Category",
    render: (row) => (
      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-700 group-hover:bg-white/20 group-hover:text-white">
        {row.category}
      </span>
    ),
  },
  {
    key: "material",
    label: "Material",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "size",
    label: "Size",
  },
  {
    key: "currentStock",
    label: "Current Stock",
    headerClassName:
      "whitespace-nowrap border-b border-slate-100 px-5 py-2 text-right text-xs font-bold text-slate-900",
    cellClassName:
      "whitespace-nowrap px-5 py-2 text-right text-sm font-bold text-slate-950 group-hover:text-white tabular-nums",
    render: (row) => row.currentStock.toLocaleString(),
  },
  {
    key: "received",
    label: "Received",
    headerClassName:
      "whitespace-nowrap border-b border-slate-100 px-5 py-2 text-right text-xs font-bold text-slate-900",
    cellClassName:
      "whitespace-nowrap px-5 py-2 text-right text-sm text-slate-700 group-hover:text-white tabular-nums",
    render: (row) => row.received.toLocaleString(),
  },
  {
    key: "issued",
    label: "Issued",
    headerClassName:
      "whitespace-nowrap border-b border-slate-100 px-5 py-2 text-right text-xs font-bold text-slate-900",
    cellClassName:
      "whitespace-nowrap px-5 py-2 text-right text-sm text-slate-700 group-hover:text-white tabular-nums",
    render: (row) => row.issued.toLocaleString(),
  },
  {
    key: "blocked",
    label: "Blocked",
    headerClassName:
      "whitespace-nowrap border-b border-slate-100 px-5 py-2 text-right text-xs font-bold text-slate-900",
    cellClassName:
      "whitespace-nowrap px-5 py-2 text-right text-sm text-slate-950 group-hover:text-white tabular-nums",
    render: (row) =>
      row.blocked > 0 ? (
        <span className="inline-block rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 group-hover:bg-amber-400 group-hover:text-slate-950">
          {row.blocked.toLocaleString()}
        </span>
      ) : (
        <span className="text-slate-400">0</span>
      ),
  },
  {
    key: "ageDays",
    label: "Age in Stock",
    render: (row) => {
      const tierColor =
        row.tier === "green"
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : row.tier === "yellow"
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-rose-50 text-rose-700 border-rose-200";

      return (
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${tierColor} group-hover:border-white/30 group-hover:bg-white/20 group-hover:text-white`}
        >
          {row.ageDays} Days
        </span>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    render: (row) => {
      if (row.status === "Healthy") {
        return (
          <span className="inline-flex items-center rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 group-hover:bg-white/20 group-hover:text-white">
            Healthy
          </span>
        );
      }
      if (row.status === "Attention") {
        return (
          <span className="inline-flex items-center rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 group-hover:bg-white/20 group-hover:text-white">
            Attention
          </span>
        );
      }
      return (
        <span className="inline-flex items-center rounded-md bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800 group-hover:bg-white/20 group-hover:text-white">
          Critical Risk
        </span>
      );
    },
  },
  {
    key: "warehouse",
    label: "Warehouse",
  },
  {
    key: "zone",
    label: "Zone",
  },
  {
    key: "rack",
    label: "Rack",
  },
  {
    key: "zoneChangeIn",
    label: "Zone Change In",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
];

export function StockAgingTable({
  data = defaultStockAgingData,
  pageSize = 10,
  onView,
  onAdjust,
  onLocation,
  onDownload,
}: StockAgingTableProps) {
  return (
    <PaginatedTable<StockAgingItem>
      data={data}
      columns={columns}
      pageSize={pageSize}
      minWidth="2300px"
      actionsLabel="Action"
      renderActions={(row, notify) => (
        <ActionButtonGroup aria-label={`Actions for product ${row.id}`}>
          <ActionButton
            label="View Product Details"
            icon={Eye}
            className="!rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              onView?.(row);
              notify(`Viewing product: ${row.productName} (Age: ${row.ageDays} Days)`);
            }}
          />
          <ActionButton
            label="Reallocate / Adjust Stock"
            icon={SlidersHorizontal}
            className="!rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              onAdjust?.(row);
              notify(`Reallocating batch ${row.batchNo}`);
            }}
          />
          <ActionButton
            label="View Location"
            icon={MapPin}
            className="!rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              onLocation?.(row);
              notify(`Location: ${row.warehouse} > ${row.zone} > ${row.rack}`);
            }}
          />
          <ActionButton
            label="Download Item Report"
            icon={Download}
            className="!rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              onDownload?.(row);
              notify(`Exporting aging record for ${row.productName}`);
            }}
          />
        </ActionButtonGroup>
      )}
    />
  );
}

export default StockAgingTable;

