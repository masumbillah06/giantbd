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

interface UserRecord {
  id: number;
  name: string;
  permission: number;

}

const requisitionData: UserRecord[] =  [
  {
    id: 8,
    name: "Mehedi",
    permission: 5
  },
  {
    id: 7,
    name: "MASUM BILLAH",
    permission: 5
  },
  {
    id: 6,
    name: "test_user",
    permission: 5
  },
  {
    id: 5,
    name: "Tashdik",
    permission: 5
  },
  {
    id: 4,
    name: "Super Admin",
    permission: 5
  },
  {
    id: 2,
    name: "Super Admin",
    permission: 5
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<UserRecord>[] = [
  { key: "name", label: "Name" },
  { key: "permission", label: "Permission" },
  
];

export default function Dashboard() {
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
                title="Role"
                items={[  
                  { label: "Role", href: "/role" }
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<UserRecord>
                data={requisitionData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for user ${row.id}`}>
                    <ActionButton label="View User" icon={Eye} />
                    <ActionButton label="Edit User" icon={PenSquareIcon} />
                    <ActionButton label="Delete User" icon={Trash2} />
                  </ActionButtonGroup>
                )}
                minWidth="1200px"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}