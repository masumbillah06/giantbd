"use client";

import React from "react";
import PaginatedTable from "./paginated-table";
import type { ColumnDef } from "./ReusableTable.types";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { PenSquareIcon, Trash2 } from "lucide-react";
import {
  permissionData as defaultPermissionData,
  type PermissionRecord,
} from "@/lib/product-data/permission-data";

export interface PermissionTableProps {
  data?: PermissionRecord[];
  pageSize?: number;
  onEdit?: (record: PermissionRecord) => void;
  onDelete?: (record: PermissionRecord) => void;
}

const renderCheckOrDash = (active: boolean) => (
  <div className="flex items-center justify-center">
    {active ? (
      <span className="text-emerald-600 font-bold text-xs leading-none">✓</span>
    ) : (
      <span className="text-red-400 font-bold text-xs leading-none">-</span>
    )}
  </div>
);

// ── Column Definitions ────────────────────────────────────────────────────────
const columns: ColumnDef<PermissionRecord>[] = [
  {
    key: "moduleName",
    label: "Module Name",
    cellClassName: "whitespace-nowrap px-5 py-2.5 text-sm font-medium text-slate-900 group-hover:text-white text-left",
  },
  {
    key: "adjust",
    label: "Adjust",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.adjust),
  },
  {
    key: "approve",
    label: "Approve",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.approve),
  },
  {
    key: "challan",
    label: "Challan",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.challan),
  },
  {
    key: "create",
    label: "Create",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.create),
  },
  {
    key: "decide",
    label: "Decide",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.decide),
  },
  {
    key: "delete",
    label: "Delete",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.delete),
  },
  {
    key: "deliver",
    label: "Deliver",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.deliver),
  },
  {
    key: "export",
    label: "Export",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.export),
  },
  {
    key: "issue",
    label: "Issue",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.issue),
  },
  {
    key: "manage",
    label: "Manage",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.manage),
  },
  {
    key: "read",
    label: "Read",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.read),
  },
  {
    key: "receive",
    label: "Receive",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.receive),
  },
  {
    key: "reject",
    label: "Reject",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.reject),
  },
  {
    key: "relocate",
    label: "Relocate",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.relocate),
  },
  {
    key: "test",
    label: "Test",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.test),
  },
  {
    key: "test234234",
    label: "Test234234",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.test234234),
  },
  {
    key: "track",
    label: "Track",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.track),
  },
  {
    key: "update",
    label: "Update",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.update),
  },
  {
    key: "variant",
    label: "Variant",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.variant),
  },
  {
    key: "watch",
    label: "Watch",
    headerClassName: "whitespace-nowrap border-b border-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-900",
    cellClassName: "whitespace-nowrap px-3 py-2.5 text-center text-sm",
    render: (row) => renderCheckOrDash(row.watch),
  },
];

export function PermissionTable({
  data = defaultPermissionData,
  pageSize = 10,
  onEdit,
  onDelete,
}: PermissionTableProps) {
  return (
    <PaginatedTable<PermissionRecord>
      data={data}
      columns={columns}
      pageSize={pageSize}
      minWidth="1650px"
      actionsLabel="Actions"
      noticeDuration={3000}
      renderActions={(row, notify) => (
        <ActionButtonGroup aria-label={`Actions for module ${row.moduleName}`}>
          <ActionButton
            label="Edit Permission"
            icon={PenSquareIcon}
            onClick={() => {
              onEdit?.(row);
              notify(`Editing permissions for "${row.moduleName}"`);
            }}
          />
          <ActionButton
            label="Delete Permission"
            icon={Trash2}
            variant="danger"
            onClick={() => {
              onDelete?.(row);
              notify(`Deleted permissions for "${row.moduleName}"`);
            }}
          />
        </ActionButtonGroup>
      )}
    />
  );
}

export default PermissionTable;

