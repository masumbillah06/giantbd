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

interface CategoryRecord {
  id: number;
  name: string;
  description: string;
}

const categoryData: CategoryRecord[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Devices, gadgets, components, and electronic accessories.",
  },
  {
    id: 2,
    name: "Clothing & Apparel",
    description: "Men's, women's, and children's fashion wear and accessories.",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    description: "Furniture, appliances, kitchen essentials, and home decor.",
  },
  {
    id: 4,
    name: "Beauty & Personal Care",
    description: "Cosmetics, skincare, haircare, and personal hygiene products.",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    description: "Athletic gear, fitness equipment, and outdoor recreational items.",
  },
  {
    id: 6,
    name: "Office Supplies",
    description: "Stationery, desk organizers, paper products, and writing tools.",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<CategoryRecord>[] = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
];

export default function CategoryPage() {
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
                title="Category"
                items={[
                  { label: "Attribute", href: "/attribute/category" },
                  { label: "Category", href: "/attribute/category" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<CategoryRecord>
                data={categoryData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for category ${row.id}`}>
                    <ActionButton label="View Category" icon={Eye} />
                    <ActionButton label="Edit Category" icon={PenSquareIcon} />
                    <ActionButton label="Delete Category" icon={Trash2} />
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
  )
}