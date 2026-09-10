"use client";

import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import NavCh from "@/components/ui/nav-child";
import PermissionTable from "@/components/tables/permission-table";

export default function PermissionPage() {
  return (
    <>
      {/* ── Breadcrumb Bar with NavChild Toolbar ── */}
      <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
        <div>
          <Breadcrumb
            title="Permission"
            items={[
              { label: "Permission", href: "/permission" },
            ]}
          />
        </div>
        <div>
          <NavCh />
        </div>
      </div>

      {/* ── Permission Matrix Table ── */}
      <div className="mt-4">
        <PermissionTable pageSize={10} />
      </div>
    </>
  );
}