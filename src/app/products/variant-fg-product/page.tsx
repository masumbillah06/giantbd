"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import { useMemo, useState } from "react";
import Pagination from "@/components/ui/pagination";
import { Eye, PenSquareIcon, Trash2 } from "lucide-react";
import ReusableTable from "@/components/tables/ReusableTable";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import type { ColumnDef } from "@/components/tables/ReusableTable.types";
import FilterCard from "@/components/ui/filter-card";
import {
  variantProducts,
  type VariantProduct,
} from "@/lib/product-data/product-data";

// ── constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
};

// ── column definitions ───────────────────────────────────────────────────────
const columns: ColumnDef<VariantProduct>[] = [
  { key: "masterProduct", label: "Master Product" },
  { key: "material",      label: "Material" },
  { key: "sku",           label: "SKU" },
  { key: "modelNo",       label: "Model No" },
  { key: "size",          label: "Size" },
  { key: "color",         label: "Color" },
  { key: "gender",        label: "Gender" },
  { key: "uom",           label: "UOM" },
  { key: "productsPerPacket", label: "Products/Packet" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={
          row.status === "active"
            ? "font-medium capitalize text-emerald-600"
            : "font-medium capitalize text-rose-500"
        }
      >
        {row.status}
      </span>
    ),
  },
];

// ── page component ───────────────────────────────────────────────────────────
export default function VariantFGProductPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(variantProducts.length / PAGE_SIZE));

  // Slice the full dataset to show only the current page's rows
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return variantProducts.slice(start, start + PAGE_SIZE);
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
                  { label: "Product", href: "/products/variant-fg-product" },
                  { label: "Variant FG Product", href: "/products/variant-fg-product" },
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
              <ReusableTable<VariantProduct>
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
                minWidth="1400px"
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
