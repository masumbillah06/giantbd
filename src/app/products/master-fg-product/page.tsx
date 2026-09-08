"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import { useMemo, useState } from "react";
import Pagination from "@/components/ui/pagination";
import { AlertTriangle, Check, Eye, PenSquareIcon, Trash2 } from "lucide-react";
import ReusableTable from "@/components/tables-1/ReusableTable";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import type { ColumnDef } from "@/components/tables-1/ReusableTable.types";
import FilterCard from "@/components/ui/filter-card";
import {
  masterProducts,
  type MasterProduct,
} from "@/lib/product-data/master-data";

// ── constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
};

// ── column definitions ───────────────────────────────────────────────────────
const columns: ColumnDef<MasterProduct>[] = [
  { key: "masterProductName", label: "Master Product Name" },
  { key: "material",          label: "Material" },
  { key: "sku",               label: "SKU" },
  { key: "category",          label: "Category" },
  { key: "subCategory",       label: "Sub Category" },
  { key: "variants",          label: "Variants" },
  {
    key: "label",
    label: "Label",
    render: (row) =>
      row.label === "verified" ? (
        <span
          title="Verified"
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"
        >
          <Check className="h-4 w-4 stroke-[2.5]" />
        </span>
      ) : (
        <span
          title="Warning"
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-100 text-amber-600"
        >
          <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
        </span>
      ),
  },
];

// ── page component ───────────────────────────────────────────────────────────
export default function MasterFGProductPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(masterProducts.length / PAGE_SIZE));

  // Slice the full dataset to show only the current page's rows
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return masterProducts.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

  // Reset selection whenever the page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedIds([]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Sidebar user={user} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header />
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {/* ── breadcrumb bar ── */}
          <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
            <div>
              <Breadcrumb
                title="Product"
                items={[
                  { label: "Product", href: "/products/master-fg-product" },
                  { label: "Master FG Product", href: "/products/master-fg-product" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>

          {/* ── filter card ── */}
          <div className="mt-4">
            <FilterCard />
          </div>

          {/* ── table ── */}
          <div className="mt-4">
            <div className="bg-[var(--color-bg)]">
              <ReusableTable<MasterProduct>
                data={pageData}
                columns={columns}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                actionsLabel="Action"
                renderActions={(row) => (
                  <ActionButtonGroup aria-label={`Actions for product ${row.id}`}>
                    <ActionButton label="View Product" icon={Eye} />
                    <ActionButton label="Edit Product" icon={PenSquareIcon} />
                    <ActionButton label="Delete Product" icon={Trash2} />
                  </ActionButtonGroup>
                )}
                minWidth="1200px"
              />
            </div>
          </div>

          {/* ── pagination ── */}
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}