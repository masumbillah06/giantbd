"use client";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb"
import NavCh from "@/components/ui/nav-child"
import { useState } from "react";
import { Eye, PenSquareIcon, Trash2 } from "lucide-react";
import ReusableTable from "@/components/tables/ReusableTable";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import type { ColumnDef } from "@/components/tables/ReusableTable.types";

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

export default function UserPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <>
      <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
        <div>
          <Breadcrumb
            title="User"
            items={[
              { label: "User", href: "/user" }
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
    </>
  )
}