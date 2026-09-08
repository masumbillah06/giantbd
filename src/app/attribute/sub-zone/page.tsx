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

interface SubZoneRecord {
  id: number;
  name: string;
  code: string;
  zone: string;
  description: string;
}

const subZoneData: SubZoneRecord[] = [
  {
    id: 4,
    name: "Solimuddin Market",
    code: "-",
    zone: "Mirpur 1",
    description: "-",
  },
  {
    id: 3,
    name: "College Gate",
    code: "1234",
    zone: "Tongi Zone",
    description: "-",
  },
  {
    id: 2,
    name: "SubZone2",
    code: "-",
    zone: "Zone1",
    description: "-",
  },
  {
    id: 1,
    name: "SubZone1",
    code: "-",
    zone: "Zone1",
    description: "-",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<SubZoneRecord>[] = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "zone", label: "Zone" },
  { key: "description", label: "Description" },
];

export default function SubZonePage() {
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
                title="Sub Zone"
                items={[
                  { label: "Attribute", href: "/attribute/category" },
                  { label: "Sub Zone", href: "/attribute/sub-zone" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<SubZoneRecord>
                data={subZoneData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for sub zone ${row.id}`}>
                    <ActionButton label="View Sub Zone" icon={Eye} />
                    <ActionButton label="Edit Sub Zone" icon={PenSquareIcon} />
                    <ActionButton label="Delete Sub Zone" icon={Trash2} />
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