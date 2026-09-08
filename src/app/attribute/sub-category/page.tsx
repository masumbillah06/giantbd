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

interface SubCategoryRecord {
  id: number;
  name: string;
  category: string;
  description: string;
  status: string;
}

const subCategoryData: SubCategoryRecord[] = [
  {
    id: 1,
    name: "Smartphones",
    category: "Electronics",
    description: "iOS and Android smartphones, parts, and mobile accessories.",
    status: "active",
  },
  {
    id: 2,
    name: "Men's Casual Shirts",
    category: "Clothing & Apparel",
    description: "Cotton casual shirts, formal shirts, and polo t-shirts.",
    status: "active",
  },
  {
    id: 3,
    name: "Cookware Sets",
    category: "Home & Kitchen",
    description: "Non-stick pots, pans, and cooking utensil sets.",
    status: "active",
  },
  {
    id: 4,
    name: "Skincare",
    category: "Beauty & Personal Care",
    description: "Moisturizers, sunscreens, serums, and facial cleansers.",
    status: "active",
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Sports & Outdoors",
    description: "Lightweight and breathable athletic running footwear.",
    status: "active",
  },
  {
    id: 6,
    name: "Notebooks & Diaries",
    category: "Office Supplies",
    description: "Hardcover and spiral notebooks with ruled and blank pages.",
    status: "active",
  },
];

// Only the columns between ID and Actions are declared here.
const columns: ColumnDef<SubCategoryRecord>[] = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "description", label: "Description" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span className="font-medium capitalize text-emerald-600">{row.status}</span>
    ),
  },
];

export default function SubCategoryPage() {
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
                title="Sub Category"
                items={[
                  { label: "Attribute", href: "/attribute/category" },
                  { label: "Sub Category", href: "/attribute/sub-category" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<SubCategoryRecord>
                data={subCategoryData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for sub category ${row.id}`}>
                    <ActionButton label="View Sub Category" icon={Eye} />
                    <ActionButton label="Edit Sub Category" icon={PenSquareIcon} />
                    <ActionButton label="Delete Sub Category" icon={Trash2} />
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