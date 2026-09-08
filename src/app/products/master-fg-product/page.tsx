"use client";
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar"
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb"
import NavCh from "@/components/ui/nav-child"
import { useState } from "react";
import Pagination from "@/components/ui/pagination";
import { ClipboardList, Eye, Pencil, PenSquareIcon, Trash2 } from "lucide-react";
import ReusableTable from "@/components/tables-1/ReusableTable";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import type { ColumnDef } from "@/components/tables-1/ReusableTable.types";
import FilterCard from "@/components/ui/filter-card";

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
}

interface UserRecord {
  id: number;
  name: string;
  role: string;
  gender: string;
  phone: string;
  email: string;
  status: string;
}

const requisitionData: UserRecord[] =  [
  {
    id: 8,
    name: "Mehedi",
    role: "super_admin",
    gender: "male",
    phone: "",
    email: "hassanmehedi685@gmail.com",
    status: "active",
  },
  {
    id: 7,
    name: "MASUM BILLAH",
    role: "super_admin",
    gender: "male",
    phone: "",
    email: "mbmasum06@gmail.com",
    status: "active",
  },
  {
    id: 6,
    name: "test_user",
    role: "role_test_td",
    gender: "male",
    phone: "",
    email: "tashdikurrahman29@gmail.com",
    status: "active",
  },
  {
    id: 5,
    name: "Tashdik",
    role: "super_admin",
    gender: "male",
    phone: "",
    email: "trk.ice153@gmail.com",
    status: "active",
  },
  {
    id: 4,
    name: "Super Admin",
    role: "super_admin",
    gender: "-",
    phone: "",
    email: "temp354700@gmail.com",
    status: "active",
  },
  {
    id: 2,
    name: "Super Admin",
    role: "super_admin",
    gender: "male",
    phone: "",
    email: "trendsbirdwpbk@gmail.com",
    status: "active",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<UserRecord>[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "gender", label: "Gender" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span className="font-medium capitalize text-emerald-600">{row.status}</span>
    ),
  },
];

export default function Dashboard() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 24; // replace with real total when API is wired up

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Sidebar user={user} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header />
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
            <div>
              <Breadcrumb
                title="Product"
                items={[
                  { label: "Product", href: "/products/master-fg-product" },
                  { label: "Master FG Product", href: "/products/master-fg-product" }
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <FilterCard />
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
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}