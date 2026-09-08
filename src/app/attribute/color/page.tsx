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

interface ColorRecord {
  id: number;
  name: string;
  description: string;
  status: string;
}

const colorData: ColorRecord[] = [
  {
    id: 9,
    name: "White",
    description: "-",
    status: "Active",
  },
  {
    id: 8,
    name: "Silver",
    description: "Mate silver color",
    status: "Active",
  },
  {
    id: 7,
    name: "DKT-N0 DYE",
    description: "-",
    status: "Active",
  },
  {
    id: 6,
    name: "FIRE BLACK",
    description: "-",
    status: "Active",
  },
  {
    id: 5,
    name: "BROWN/N13A WHITE",
    description: "-",
    status: "Active",
  },
  {
    id: 4,
    name: "DKT-A27A GREEN",
    description: "-",
    status: "Active",
  },
  {
    id: 3,
    name: "DKT-N01A GREY",
    description: "-",
    status: "Active",
  },
  {
    id: 2,
    name: "DKT-CO7A RED",
    description: "-",
    status: "Active",
  },
  {
    id: 1,
    name: "RED",
    description: "—",
    status: "—",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<ColorRecord>[] = [
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

export default function ColorPage() {
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
                title="Color"
                items={[
                  { label: "Attribute", href: "/attribute/category" },
                  { label: "Color", href: "/attribute/color" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<ColorRecord>
                data={colorData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for color ${row.id}`}>
                    <ActionButton label="View Color" icon={Eye} />
                    <ActionButton label="Edit Color" icon={PenSquareIcon} />
                    <ActionButton label="Delete Color" icon={Trash2} />
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