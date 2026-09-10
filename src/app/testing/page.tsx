"use client";

import { useState } from "react";
import { ClipboardList, Package, Printer, Truck } from "lucide-react";
import ReusableTable from "@/components/tables/ReusableTable";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { LabelCheck, StatusPill } from "@/components/tables/cell-badges";
import type { ColumnDef } from "@/components/tables/ReusableTable.types";

interface Requisition {
  id: string;
  labelColor: "green" | "purple";
  lcNo: string;
  poNo: string;
  reqType: string;
  customer: string;
  reqDate: string;
  dueDate: string;
  requester: string;
  product: string;
  quantity: string;
  status: "Issued" | "Received";
}

const requisitionData: Requisition[] = [
  {
    id: "REQ-1001",
    labelColor: "green",
    lcNo: "LC-2201",
    poNo: "PO-8841",
    reqType: "Export",
    customer: "Northwind Textiles",
    reqDate: "2026-08-01",
    dueDate: "2026-08-15",
    requester: "A. Rahman",
    product: "Cotton Yarn 30s",
    quantity: "1,200 kg",
    status: "Issued",
  },
  {
    id: "REQ-1002",
    labelColor: "purple",
    lcNo: "LC-2202",
    poNo: "PO-8842",
    reqType: "Local",
    customer: "Delta Garments",
    reqDate: "2026-08-03",
    dueDate: "2026-08-20",
    requester: "S. Karim",
    product: "Polyester Fabric",
    quantity: "800 m",
    status: "Received",
  },
  {
    id: "REQ-1003",
    labelColor: "green",
    lcNo: "LC-2203",
    poNo: "PO-8843",
    reqType: "Export",
    customer: "Orion Apparel",
    reqDate: "2026-08-05",
    dueDate: "2026-08-25",
    requester: "M. Islam",
    product: "Denim Roll",
    quantity: "400 m",
    status: "Issued",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<Requisition>[] = [
  { key: "labelColor", label: "Label", render: (row) => <LabelCheck color={row.labelColor} /> },
  { key: "lcNo", label: "LC No" },
  { key: "poNo", label: "PO No" },
  {
    key: "reqType",
    label: "Req. Type",
    cellClassName:
      "whitespace-nowrap px-5 py-3.5 text-sm font-medium text-slate-700 group-hover:text-white",
  },
  { key: "customer", label: "Customer" },
  { key: "reqDate", label: "Req. Date" },
  { key: "dueDate", label: "Due Date" },
  { key: "requester", label: "Requester" },
  { key: "product", label: "Product" },
  { key: "quantity", label: "Quantity" },
  { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
];

export default function RequisitionsPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="bg-[var(--color-bg)] p-6">
      <ReusableTable<Requisition>
        data={requisitionData}
        columns={columns}
        onSelectionChange={(ids) => setSelectedIds(ids as string[])}
        renderActions={(row) => (
          <ActionButtonGroup aria-label={`Actions for requisition ${row.id}`}>
            <ActionButton label="Packing List" icon={ClipboardList} />
            {row.status.toLowerCase() === "issued" && (
              <ActionButton label="Delivery Requisition" icon={Package} />
            )}
            <ActionButton label="Delivery Details" icon={Truck} />
            <ActionButton label="Print Details" icon={Printer} />
          </ActionButtonGroup>
        )}
        minWidth="1200px"
      />

      <p className="mt-4 text-sm text-slate-500">
        Selected IDs: {selectedIds.length > 0 ? selectedIds.join(", ") : "none"}
      </p>
    </div>
  );
}
