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

interface CustomerRecord {
  id: number;
  customerName: string;
  customerLocations: string;
  createdOn: string;
  lastUpdated: string;
}

const customerData: CustomerRecord[] = [
  {
    id: 8,
    customerName: "Mehedi",
    customerLocations: "Dhaka, Bangladesh",
    createdOn: "2024-01-15",
    lastUpdated: "2024-02-10",
  },
  {
    id: 7,
    customerName: "MASUM BILLAH",
    customerLocations: "Chittagong, Bangladesh",
    createdOn: "2024-01-18",
    lastUpdated: "2024-02-12",
  },
  {
    id: 6,
    customerName: "Test User",
    customerLocations: "Sylhet, Bangladesh",
    createdOn: "2024-02-01",
    lastUpdated: "2024-02-15",
  },
  {
    id: 5,
    customerName: "Tashdik",
    customerLocations: "Dhaka, Bangladesh",
    createdOn: "2024-02-05",
    lastUpdated: "2024-02-20",
  },
  {
    id: 4,
    customerName: "Super Admin",
    customerLocations: "Rajshahi, Bangladesh",
    createdOn: "2024-02-10",
    lastUpdated: "2024-02-22",
  },
  {
    id: 2,
    customerName: "Global Imports Ltd",
    customerLocations: "Khulna, Bangladesh",
    createdOn: "2024-02-14",
    lastUpdated: "2024-02-25",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<CustomerRecord>[] = [
  { key: "customerName", label: "Customer Name" },
  { key: "customerLocations", label: "Customer Locations" },
  { key: "createdOn", label: "Created On" },
  { key: "lastUpdated", label: "Last Updated" },
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
              <ReusableTable<CustomerRecord>
                data={customerData}
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