"use client";

import React from "react";
import PaginatedTable from "./paginated-table";
import type { ColumnDef } from "./ReusableTable.types";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { Eye, SlidersHorizontal, MapPin, Download } from "lucide-react";
import {
  batchProductData as defaultBatchProductData,
  type BatchProductItem,
} from "@/lib/product-data/batch-product-data";

export interface BatchProductTableProps {
  data?: BatchProductItem[];
  pageSize?: number;
  onView?: (item: BatchProductItem) => void;
  onAdjust?: (item: BatchProductItem) => void;
  onLocation?: (item: BatchProductItem) => void;
  onDownload?: (item: BatchProductItem) => void;
}

// ── Column definitions ────────────────────────────────────────────────────────
const columns: ColumnDef<BatchProductItem>[] = [
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
    key: "material",
    label: "Material",
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
    key: "subCategory",
    label: "Sub Category",
    render: (row) => <span className="capitalize">{row.subCategory}</span>,
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
    key: "batchNo",
    label: "Batch / Lot No",
    render: (row) => (
      <span className="inline-flex items-center rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-medium text-indigo-700 group-hover:border-white/30 group-hover:bg-white/20 group-hover:text-white">
        {row.batchNo}
      </span>
    ),
  },
  {
    key: "received",
    label: "Received",
    headerClassName:
      "whitespace-nowrap border-b border-slate-100 px-5 py-2 text-right text-xs font-bold text-slate-900",
    cellClassName:
      "whitespace-nowrap px-5 py-2 text-right text-sm text-slate-950 group-hover:text-white font-medium tabular-nums",
    render: (row) => row.received.toLocaleString(),
  },
  {
    key: "issued",
    label: "Issued",
    headerClassName:
      "whitespace-nowrap border-b border-slate-100 px-5 py-2 text-right text-xs font-bold text-slate-900",
    cellClassName:
      "whitespace-nowrap px-5 py-2 text-right text-sm text-slate-950 group-hover:text-white tabular-nums",
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
        <span>0</span>
      ),
  },
  {
    key: "shipable",
    label: "Shipable",
    headerClassName:
      "whitespace-nowrap border-b border-slate-100 px-5 py-2 text-right text-xs font-bold text-slate-900",
    cellClassName:
      "whitespace-nowrap px-5 py-2 text-right text-sm text-slate-950 group-hover:text-white tabular-nums",
    render: (row) => row.shipable.toLocaleString(),
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
    key: "subZone",
    label: "Sub Zone",
  },
  {
    key: "rack",
    label: "Rack",
  },
  {
    key: "ageDays",
    label: "Age (Days)",
    render: (row) => (
      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 group-hover:bg-white/20 group-hover:text-white">
        {row.ageDays}
      </span>
    ),
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

export function BatchProductTable({
  data = defaultBatchProductData,
  pageSize = 10,
  onView,
  onAdjust,
  onLocation,
  onDownload,
}: BatchProductTableProps) {
  return (
    <PaginatedTable<BatchProductItem>
      data={data}
      columns={columns}
      pageSize={pageSize}
      minWidth="2200px"
      actionsLabel="Action"
      renderActions={(row, notify) => (
        <ActionButtonGroup aria-label={`Actions for product ${row.id}`}>
          <ActionButton
            label="View Product Details"
            icon={Eye}
            className="!rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              onView?.(row);
              notify(`Viewing product: ${row.productName} (${row.batchNo})`);
            }}
          />
          <ActionButton
            label="Adjust Batch Item"
            icon={SlidersHorizontal}
            className="!rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              onAdjust?.(row);
              notify(`Adjusting stock for: ${row.productName}`);
            }}
          />
          <ActionButton
            label="View Location"
            icon={MapPin}
            className="!rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              onLocation?.(row);
              notify(
                `Location: ${row.warehouse} > ${row.zone} > ${row.subZone} > ${row.rack}`
              );
            }}
          />
          <ActionButton
            label="Download Item Report"
            icon={Download}
            className="!rounded-full border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-100"
            onClick={() => {
              onDownload?.(row);
              notify(`Downloading item report for batch ${row.batchNo}...`);
            }}
          />
        </ActionButtonGroup>
      )}
    />
  );
}

export default BatchProductTable;
