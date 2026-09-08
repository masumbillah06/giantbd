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

interface RackRecord {
  id: number;
  name: string;
  code: string;
  subZone: string;
  description: string;
}

const rackData: RackRecord[] = [
  {
    id: 7,
    name: "Rack_1",
    code: "-",
    subZone: "Solimuddin Market",
    description: "-",
  },
  {
    id: 6,
    name: "Rack 2",
    code: "12313",
    subZone: "College Gate",
    description: "-",
  },
  {
    id: 5,
    name: "Rack 1",
    code: "1234",
    subZone: "College Gate",
    description: "-",
  },
  {
    id: 4,
    name: "rack4",
    code: "-",
    subZone: "SubZone2",
    description: "-",
  },
  {
    id: 3,
    name: "Rack3",
    code: "-",
    subZone: "SubZone2",
    description: "-",
  },
  {
    id: 2,
    name: "Rack2",
    code: "-",
    subZone: "SubZone1",
    description: "-",
  },
  {
    id: 1,
    name: "Rack1",
    code: "-",
    subZone: "SubZone1",
    description: "-",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<RackRecord>[] = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "subZone", label: "Sub Zone" },
  { key: "description", label: "Description" },
];

export default function RackPage() {
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
                title="Rack"
                items={[
                  { label: "Attribute", href: "/attribute/category" },
                  { label: "Rack", href: "/attribute/rack" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<RackRecord>
                data={rackData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for rack ${row.id}`}>
                    <ActionButton label="View Rack" icon={Eye} />
                    <ActionButton label="Edit Rack" icon={PenSquareIcon} />
                    <ActionButton label="Delete Rack" icon={Trash2} />
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