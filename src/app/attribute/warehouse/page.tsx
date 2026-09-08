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

interface WarehouseRecord {
  id: number;
  name: string;
  code: string;
  description: string;
}

const warehouseData: WarehouseRecord[] = [
  {
    id: 3,
    name: "Mirpur",
    code: "3242424",
    description: "-",
  },
  {
    id: 2,
    name: "Gazipur",
    code: "4573",
    description: "Gazipur Main branch",
  },
  {
    id: 1,
    name: "WarehouseFG",
    code: "-",
    description: "-",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<WarehouseRecord>[] = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "description", label: "Description" },
];

export default function WarehousePage() {
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
                title="Warehouse"
                items={[
                  { label: "Attribute", href: "/attribute/category" },
                  { label: "Warehouse", href: "/attribute/warehouse" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<WarehouseRecord>
                data={warehouseData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for warehouse ${row.id}`}>
                    <ActionButton label="View Warehouse" icon={Eye} />
                    <ActionButton label="Edit Warehouse" icon={PenSquareIcon} />
                    <ActionButton label="Delete Warehouse" icon={Trash2} />
                  </ActionButtonGroup>
                )}
                minWidth="900px"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}