"use client";

import Breadcrumb from "@/components/ui/breadcrumb";
import TableToolbar from "@/components/ui/table-toolbar";
import PaginatedTable from "@/components/ui/tables/paginated-table";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { PenSquareIcon, Trash2 } from "lucide-react";
import {
  PERMISSION_DATA,
  permissionColumns,
  type PermissionRecord,
} from "@/lib/product-data/permission-data";

export default function PermissionPage() {
  return (
    <>
      {/* ── Breadcrumb Bar with Table Toolbar ── */}
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
          <TableToolbar />
        </div>
      </div>

      {/* ── Permission Matrix Table ── */}
      <div className="mt-4">
        <PaginatedTable<PermissionRecord>
          data={PERMISSION_DATA}
          columns={permissionColumns}
          pageSize={10}
          minWidth="1650px"
          actionsLabel="Actions"
          noticeDuration={3000}
          renderActions={(row, notify) => (
            <ActionButtonGroup aria-label={`Actions for module ${row.moduleName}`}>
              <ActionButton
                label="Edit Permission"
                icon={PenSquareIcon}
                onClick={() => {
                  notify(`Editing permissions for "${row.moduleName}"`);
                }}
              />
              <ActionButton
                label="Delete Permission"
                icon={Trash2}
                variant="danger"
                onClick={() => {
                  notify(`Deleted permissions for "${row.moduleName}"`);
                }}
              />
            </ActionButtonGroup>
          )}
        />
      </div>
    </>
  );
}