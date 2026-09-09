"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import MonthlyDelivery from "@/components/monthly-delivery/monthly-delivery";

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
};

export default function MonthlyDeliveryPage() {
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
                  { label: "Warehouse FG", href: "/inventory/fg-reports/monthly-delivery" },
                  { label: "FG Report", href: "/inventory/fg-reports/monthly-delivery" },
                  { label: "Monthly Delivery", href: "/inventory/fg-reports/monthly-delivery" },
                ]}
              />
            </div>
            <div>
              <NavCh />
            </div>
          </div>

          {/* ── Monthly Delivery Components ── */}
          <div className="mt-4">
            <MonthlyDelivery />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
