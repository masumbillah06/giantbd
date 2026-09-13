"use client";

import React, { useState, useMemo } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import TableToolbar from "@/components/ui/table-toolbar";
import PaginatedTable from "@/components/tables/paginated-table";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { Eye, PenSquareIcon, Trash2 } from "lucide-react";
import type {
  ColumnDef,
  RowBase,
  RowId,
  SortConfig,
  SortDirection,
} from "@/components/tables/ReusableTable.types";

export interface CrudBreadcrumbItem {
  label: string;
  href: string;
}

export interface CrudPageTemplateProps<
  T extends RowBase,
  TId extends string | number = RowId<T>
> {
  title?: string;
  breadcrumbLabel?: string;
  breadcrumbItems?: CrudBreadcrumbItem[];
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T) => TId;

  // Pagination Mode
  paginationMode?: "client" | "server";
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  // Async / API state
  isLoading?: boolean;
  isReloading?: boolean;
  error?: string | Error | React.ReactNode | null;
  onRetry?: () => void;

  // Sorting
  sortConfig?: SortConfig | null;
  onSortChange?: (field: string, direction: SortDirection) => void;

  // Layout & Search
  minWidth?: string;
  withShell?: boolean;
  withTopBar?: boolean;
  searchFilterKeys?: Array<keyof T>;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  debounceMs?: number;
  pageSize?: number;
  actionsLabel?: string;

  // Selection
  selectedIds?: Array<TId>;
  onSelectionChange?: (selectedIds: Array<TId>) => void;

  // Actions
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

export function CrudPageTemplate<
  T extends RowBase,
  TId extends string | number = RowId<T>
>({
  title = "",
  breadcrumbLabel,
  breadcrumbItems,
  data,
  columns,
  getRowId,
  paginationMode = "client",
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
  isReloading = false,
  error = null,
  onRetry,
  sortConfig = null,
  onSortChange,
  minWidth = "900px",
  withShell = false,
  withTopBar = true,
  searchFilterKeys,
  searchValue: controlledSearchValue,
  onSearchChange: controlledOnSearchChange,
  debounceMs,
  pageSize: initialPageSize = 10,
  actionsLabel = "Action",
  selectedIds: controlledSelectedIds,
  onSelectionChange,
  onView,
  onEdit,
  onDelete,
  onNew,
  onReload,
  onExport,
  onPrint,
  newButtonLabel,
  customActions,
}: CrudPageTemplateProps<T, TId>) {
  const [internalSelectedIds, setInternalSelectedIds] = useState<Array<TId>>([]);
  const [internalSearchValue, setInternalSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(initialPageSize);

  const selectedIds = controlledSelectedIds ?? internalSelectedIds;
  const handleSelectionChange = (ids: Array<TId>) => {
    if (controlledSelectedIds === undefined) {
      setInternalSelectedIds(ids);
    }
    onSelectionChange?.(ids);
  };

  const isServer = paginationMode === "server";
  const activeSearchValue = controlledSearchValue ?? internalSearchValue;

  const handleSearchChange = (val: string) => {
    if (controlledOnSearchChange) {
      controlledOnSearchChange(val);
    } else {
      setInternalSearchValue(val);
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    onPageSizeChange?.(size);
  };

  // Resolved breadcrumbs
  const resolvedBreadcrumbs: CrudBreadcrumbItem[] = useMemo(() => {
    if (breadcrumbItems) return breadcrumbItems;
    return [
      { label: "Attribute", href: "/attribute/category" },
      { label: breadcrumbLabel || title, href: "#" },
    ];
  }, [breadcrumbItems, breadcrumbLabel, title]);

  // Client-side search filtering (only when in client mode)
  const filteredData = useMemo(() => {
    if (isServer) return data;
    if (!activeSearchValue.trim()) return data;
    const query = activeSearchValue.toLowerCase();

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
  }, [isServer, data, activeSearchValue, searchFilterKeys]);

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
              searchValue={activeSearchValue}
              onSearchChange={handleSearchChange}
              debounceMs={debounceMs ?? (isServer ? 350 : 0)}
              searchPlaceholder={`Search ${title.toLowerCase()}...`}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              onReload={onReload}
              onExport={onExport}
              onPrint={onPrint}
              onNew={onNew}
              newButtonLabel={newButtonLabel || "New"}
              isLoading={isLoading}
              isReloading={isReloading}
            />
          </div>
        </div>
      )}

      {/* Table & Pagination Card */}
      <div className="mt-4">
        <PaginatedTable<T, TId>
          data={filteredData}
          columns={columns}
          getRowId={getRowId}
          mode={paginationMode}
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={onPageChange}
          isLoading={isLoading}
          error={error}
          onRetry={onRetry}
          sortConfig={sortConfig}
          onSortChange={onSortChange}
          minWidth={minWidth}
          actionsLabel={actionsLabel}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          renderActions={(row) => {
            if (customActions) return customActions(row);
            const rowId = getRowId ? getRowId(row) : (row.id ?? "");
            return (
              <ActionButtonGroup aria-label={`Actions for ${title.toLowerCase()} ${rowId}`}>
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
