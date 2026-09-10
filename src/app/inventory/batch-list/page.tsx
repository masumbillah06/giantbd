"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import FilterCard from "@/components/ui/filter-card";
import BatchTable from "@/components/tables/batch-table";

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
};

export default function BatchListPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Sidebar user={user} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto p-5">
          {/* ── Breadcrumb Bar with NavChild Actions ── */}
          <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
            <div>
              <Breadcrumb
                title="Warehouse FG"
                items={[
                  { label: "Warehouse FG", href: "/inventory/batch-list" },
                  { label: "Batch List", href: "/inventory/batch-list" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>

          {/* ── Filter Card ── */}
          <div className="mt-4">
            <FilterCard />
          </div>

          {/* ── Batch Table with Pagination ── */}
          <div className="mt-4">
            <BatchTable pageSize={14} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}