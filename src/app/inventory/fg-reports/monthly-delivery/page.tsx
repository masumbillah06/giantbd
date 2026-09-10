"use client";

import DashboardShell from "@/components/layout/dashboard-shell";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import MonthlyDelivery from "@/components/monthly-delivery/monthly-delivery";

export default function MonthlyDeliveryPage() {
  return (
    <DashboardShell>
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
    </DashboardShell>
  );
}
