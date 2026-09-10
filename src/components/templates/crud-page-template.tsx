"use client";

import React, { useState, useMemo } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import TableToolbar from "@/components/ui/table-toolbar";
import PaginatedTable from "@/components/tables/paginated-table";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { Eye, PenSquareIcon, Trash2 } from "lucide-react";
import type { ColumnDef, RowBase } from "@/components/tables/ReusableTable.types";

export interface CrudBreadcrumbItem {
  label: string;
  href: string;
}

export interface CrudPageTemplateProps<T extends RowBase> {
  title?: string;
  breadcrumbLabel?: string;
  breadcrumbItems?: CrudBreadcrumbItem[];
  data: T[];
  columns: ColumnDef<T>[];
  minWidth?: string;
  withShell?: boolean;
  withTopBar?: boolean;
  searchFilterKeys?: Array<keyof T>;
  pageSize?: number;
  actionsLabel?: string;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onNew?: () => void;
  onReload?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  newButtonLabel?: string;
  customActions?: (row: T) => React.ReactNode;
}

export function CrudPageTemplate<T extends RowBase>({
  title = "",
  breadcrumbLabel,
  breadcrumbItems,
  data,
  columns,
  minWidth = "900px",
  withShell = false,
  withTopBar = true,
  searchFilterKeys,
  pageSize: initialPageSize = 10,
  actionsLabel = "Action",
  onView,
  onEdit,
  onDelete,
  onNew,
  onReload,
  onExport,
  onPrint,
  newButtonLabel,
  customActions,
}: CrudPageTemplateProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Array<T["id"]>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Resolved breadcrumbs
  const resolvedBreadcrumbs: CrudBreadcrumbItem[] = useMemo(() => {
    if (breadcrumbItems) return breadcrumbItems;
    return [
      { label: "Attribute", href: "/attribute/category" },
      { label: breadcrumbLabel || title, href: "#" },
    ];
  }, [breadcrumbItems, breadcrumbLabel, title]);

  // Client-side search filtering
  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return data;
    const query = searchValue.toLowerCase();

    return data.filter((row) => {
      if (searchFilterKeys && searchFilterKeys.length > 0) {
        return searchFilterKeys.some((k) =>
          String(row[k] ?? "").toLowerCase().includes(query)
        );
      }
      return Object.values(row).some((val) =>
        String(val ?? "").toLowerCase().includes(query)
      );
    });
  }, [data, searchValue, searchFilterKeys]);

  const content = (
    <div className="space-y-4">
      {/* Top Bar: Breadcrumb + TableToolbar */}
      {withTopBar && (
        <div className="min-h-20 w-full flex flex-col md:flex-row justify-between items-center bg-white shadow-sm rounded-xl px-4 py-2 gap-2">
          <div className="w-full md:w-auto">
            <Breadcrumb title={title} items={resolvedBreadcrumbs} />
          </div>
          <div className="w-full md:w-auto flex-1 flex justify-end">
            <TableToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              searchPlaceholder={`Search ${title.toLowerCase()}...`}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              onReload={onReload}
              onExport={onExport}
              onPrint={onPrint}
              onNew={onNew}
              newButtonLabel={newButtonLabel || "New"}
            />
          </div>
        </div>
      )}

      {/* Table & Pagination Card */}
      <div className="mt-4">
        <PaginatedTable<T>
          data={filteredData}
          columns={columns}
          pageSize={pageSize}
          minWidth={minWidth}
          actionsLabel={actionsLabel}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          renderActions={(row) => {
            if (customActions) return customActions(row);
            return (
              <ActionButtonGroup aria-label={`Actions for ${title.toLowerCase()} ${row.id}`}>
                <ActionButton
                  label={`View ${title}`}
                  icon={Eye}
                  onClick={() => onView?.(row)}
                />
                <ActionButton
                  label={`Edit ${title}`}
                  icon={PenSquareIcon}
                  onClick={() => onEdit?.(row)}
                />
                <ActionButton
                  label={`Delete ${title}`}
                  icon={Trash2}
                  onClick={() => onDelete?.(row)}
                />
              </ActionButtonGroup>
            );
          }}
        />
      </div>
    </div>
  );

  if (withShell) {
    return <DashboardShell>{content}</DashboardShell>;
  }

  return content;
}

export default CrudPageTemplate;

