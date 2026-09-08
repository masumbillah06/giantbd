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

interface ZoneRecord {
  id: number;
  name: string;
  code: string;
  warehouse: string;
  description: string;
}

const zoneData: ZoneRecord[] = [
  {
    id: 3,
    name: "Mirpur 1",
    code: "-",
    warehouse: "Mirpur",
    description: "-",
  },
  {
    id: 2,
    name: "Tongi Zone",
    code: "1234",
    warehouse: "Gazipur",
    description: "-",
  },
  {
    id: 1,
    name: "Zone1",
    code: "-",
    warehouse: "WarehouseFG",
    description: "-",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<ZoneRecord>[] = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "warehouse", label: "Warehouse" },
  { key: "description", label: "Description" },
];

export default function ZonePage() {
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
                title="Zone"
                items={[
                  { label: "Attribute", href: "/attribute/category" },
                  { label: "Zone", href: "/attribute/zone" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<ZoneRecord>
                data={zoneData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for zone ${row.id}`}>
                    <ActionButton label="View Zone" icon={Eye} />
                    <ActionButton label="Edit Zone" icon={PenSquareIcon} />
                    <ActionButton label="Delete Zone" icon={Trash2} />
                  </ActionButtonGroup>
                )}
                minWidth="1000px"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}