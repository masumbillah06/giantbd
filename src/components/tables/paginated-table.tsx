"use client";

import React from "react";
import ReusableTable from "./ReusableTable";
import type { ColumnDef, RowBase } from "./ReusableTable.types";
import Pagination from "@/components/ui/pagination";
import { useClientPagination } from "@/hooks/use-client-pagination";

export interface PaginatedTableProps<T extends RowBase> {
  data?: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  initialPage?: number;
  minWidth?: string;
  actionsLabel?: string;
  showActions?: boolean;
  showCheckbox?: boolean;
  showId?: boolean;
  idLabel?: string;
  emptyState?: React.ReactNode;
  renderActions?: (row: T, notify: (msg: string) => void) => React.ReactNode;
  selectedIds?: Array<T["id"]>;
  onSelectionChange?: (selectedIds: Array<T["id"]>) => void;
  noticeDuration?: number;
  className?: string;
}

const EMPTY_DATA: never[] = [];

/**
 * Common paginated data table component.
 * Integrates ReusableTable, client-side pagination, row selection, and action notice feedback.
 */
export function PaginatedTable<T extends RowBase>({
  data = EMPTY_DATA as T[],
  columns,
  pageSize = 10,
  initialPage = 1,
  minWidth = "1200px",
  actionsLabel = "Action",
  showActions,
  showCheckbox,
  showId,
  idLabel,
  emptyState,
  renderActions,
  selectedIds: controlledSelectedIds,
  onSelectionChange,
  noticeDuration = 3500,
  className = "space-y-4",
}: PaginatedTableProps<T>) {
  const {
    selectedIds: internalSelectedIds,
    setSelectedIds,
    currentPage,
    actionNotice,
    totalPages,
    pageData,
    handlePageChange,
    notify,
    clearNotice,
  } = useClientPagination<T>({
    data,
    pageSize,
    initialPage,
    noticeDuration,
  });

  const effectiveSelectedIds = controlledSelectedIds ?? internalSelectedIds;

  const handleSelectionChange = (ids: Array<T["id"]>) => {
    if (controlledSelectedIds === undefined) {
      setSelectedIds(ids);
    }
    onSelectionChange?.(ids);
  };

  return (
    <div className={className}>
      {/* Toast Feedback Notice */}
      {actionNotice && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-2.5 text-xs sm:text-sm text-blue-800 flex items-center justify-between">
          <span>{actionNotice}</span>
          <button
            type="button"
            onClick={clearNotice}
            className="text-xs font-semibold hover:opacity-75 cursor-pointer ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Reusable Table */}
      <div className="bg-[var(--color-bg)]">
        <ReusableTable<T>
          data={pageData}
          columns={columns}
          selectedIds={effectiveSelectedIds}
          onSelectionChange={handleSelectionChange}
          actionsLabel={actionsLabel}
          showActions={showActions}
          showCheckbox={showCheckbox}
          showId={showId}
          idLabel={idLabel}
          minWidth={minWidth}
          emptyState={emptyState}
          renderActions={renderActions ? (row) => renderActions(row, notify) : undefined}
        />
      </div>

      {/* Pagination Bar */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PaginatedTable;

