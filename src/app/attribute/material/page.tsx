"use client";
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar"
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb"
import NavCh from "@/components/ui/nav-child"
import { useState } from "react";
import { Eye, PenSquareIcon, Trash2 } from "lucide-react";
import ReusableTable from "@/components/tables-1/ReusableTable";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import type { ColumnDef } from "@/components/tables-1/ReusableTable.types";

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
}

interface MaterialRecord {
  id: number;
  name: string;
  description: string;
  status: string;
}

const materialData: MaterialRecord[] = [
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

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<MaterialRecord>[] = [
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

export default function MaterialPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Sidebar user={user} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header />
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
            <div>
              <Breadcrumb
                title="Material"
                items={[
                  { label: "Attribute", href: "/attribute/category" },
                  { label: "Material", href: "/attribute/material" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<MaterialRecord>
                data={materialData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for material ${row.id}`}>
                    <ActionButton label="View Material" icon={Eye} />
                    <ActionButton label="Edit Material" icon={PenSquareIcon} />
                    <ActionButton label="Delete Material" icon={Trash2} />
                  </ActionButtonGroup>
                )}
                minWidth="800px"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}