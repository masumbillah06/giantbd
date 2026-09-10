import React from "react";
import type { ColumnDef } from "@/components/tables-1/ReusableTable.types";

export interface MaterialRecord {
  id: number;
  name: string;
  description: string;
  status: string;
}

export const materialData: MaterialRecord[] = [
  {
    id: 6,
    name: "Fiber",
    description: "-",
    status: "Active",
  },
  {
    id: 5,
    name: "Poly",
    description: "-",
    status: "Active",
  },
  {
    id: 4,
    name: "Aluminium + Plastic",
    description: "-",
    status: "Active",
  },
  {
    id: 3,
    name: "TPR",
    description: "-",
    status: "Active",
  },
  {
    id: 2,
    name: "RUBBER",
    description: "-",
    status: "Active",
  },
  {
    id: 1,
    name: "IP",
    description: "-",
    status: "Active",
  },
];

export const columns: ColumnDef<MaterialRecord>[] = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={`font-medium capitalize ${
          row.status.toLowerCase() === "active" ? "text-emerald-600" : "text-muted-foreground"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

