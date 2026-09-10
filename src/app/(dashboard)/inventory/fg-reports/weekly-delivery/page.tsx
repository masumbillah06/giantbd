"use client";

import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import WeeklyDelivery from "@/components/delivery/weekly-delivery";

export default function WeeklyDeliveryPage() {
  return (
    <>
      {/* ── Breadcrumb Bar with NavChild Actions ── */}
      <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
        <div>
          <Breadcrumb
            title="Warehouse FG"
            items={[
              { label: "Warehouse FG", href: "/inventory/fg-reports/weekly-delivery" },
              { label: "FG Report", href: "/inventory/fg-reports/weekly-delivery" },
              { label: "Weekly Delivery", href: "/inventory/fg-reports/weekly-delivery" },
            ]}
          />
        </div>
        <div>
          <NavCh />
        </div>
      </div>

      {/* ── Weekly Delivery Components ── */}
      <div className="mt-4">
        <WeeklyDelivery />
      </div>
    </>
  );
}
