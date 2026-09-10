"use client";

import React from "react";
import PaginatedTable from "./paginated-table";
import type { ColumnDef } from "./ReusableTable.types";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { Eye, SlidersHorizontal, MapPin, Gauge, Download } from "lucide-react";
import { batchData as defaultBatchData, type BatchItem } from "@/lib/product-data/batch-data";

export interface BatchTableProps {
  data?: BatchItem[];
  pageSize?: number;
  onView?: (item: BatchItem) => void;
  onAdjust?: (item: BatchItem) => void;
  onLocation?: (item: BatchItem) => void;
  onStatus?: (item: BatchItem) => void;
  onDownload?: (item: BatchItem) => void;
}

// ── Column definitions ────────────────────────────────────────────────────────
const columns: ColumnDef<BatchItem>[] = [
  {
    key: "batchId",
    label: "Batch ID",
    cellClassName: "whitespace-nowrap px-5 py-2 text-sm text-slate-950 group-hover:text-white font-medium",
  },
  {
    key: "stockInDate",
    label: "Stock In Date",
  },
  {
    key: "productName",
    label: "Product Name",
    cellClassName: "whitespace-nowrap px-5 py-2 text-sm text-slate-950 group-hover:text-white font-medium",
  },
  {
    key: "material",
    label: "Material",
  },
  {
    key: "quantity",
    label: "Quantity",
  },
  {
    key: "pkgQty",
    label: "Pkg Qty",
  },
  {
    key: "createdBy",
    label: "Created By",
  },
  {
    key: "productionDate",
    label: "Production Date",
  },
];

export function BatchTable({
  data = defaultBatchData,
  pageSize = 14,
  onView,
  onAdjust,
  onLocation,
  onStatus,
  onDownload,
}: BatchTableProps) {
  return (
    <PaginatedTable<BatchItem>
      data={data}
      columns={columns}
      pageSize={pageSize}
      minWidth="1200px"
      actionsLabel="Action"
      renderActions={(row, notify) => (
        <ActionButtonGroup aria-label={`Actions for batch ${row.batchId}`}>
          <ActionButton
            label="View Batch Details"
            icon={Eye}
            className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
            onClick={() => {
              onView?.(row);
              notify(`Viewing batch ${row.batchId}`);
            }}
          />
          <ActionButton
            label="Adjust / Configure Batch"
            icon={SlidersHorizontal}
            className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
            onClick={() => {
              onAdjust?.(row);
              notify(`Adjusting batch ${row.batchId}`);
            }}
          />
          <ActionButton
            label="View Location"
            icon={MapPin}
            className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
            onClick={() => {
              onLocation?.(row);
              notify(`Location for batch ${row.batchId}: Warehouse FG Zone A`);
            }}
          />
          <ActionButton
            label="Batch Status / Gauge"
            icon={Gauge}
            className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
            onClick={() => {
              onStatus?.(row);
              notify(`Status for batch ${row.batchId}: Optimal`);
            }}
          />
          <ActionButton
            label="Download / Export Batch"
            icon={Download}
            className="!rounded-full border border-slate-200/80 bg-white hover:bg-slate-100 text-slate-700"
            onClick={() => {
              onDownload?.(row);
              notify(`Downloading report for batch ${row.batchId}...`);
            }}
          />
        </ActionButtonGroup>
      )}
    />
  );
}

export default BatchTable;
