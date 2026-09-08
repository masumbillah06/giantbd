"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { ColumnDef, ReusableTableProps, RowBase } from "./ReusableTable.types";

/**
 * Generic, reusable data table.
 *
 * Column order is always:
 *   Checkbox -> ID -> (columns prop, in order) -> Actions
 *
 * Selection is uncontrolled by default (the component manages its own
 * state internally) but reports every change via `onSelectionChange`.
 * Pass `selectedIds` if you want to drive selection from a parent.
 */
export default function ReusableTable<T extends RowBase>({
  data,
  columns,
  onSelectionChange,
  renderActions,
  actionsLabel = "Action",
  minWidth = "1200px",
  selectedIds,
  emptyState,
}: ReusableTableProps<T>) {
  const [internalSelected, setInternalSelected] = useState<Set<T["id"]>>(new Set());
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const isControlled = selectedIds !== undefined;
  const selected = useMemo(
    () => (isControlled ? new Set(selectedIds) : internalSelected),
    [isControlled, selectedIds, internalSelected]
  );

  const allIds = useMemo(() => data.map((row) => row.id), [data]);
  const selectedCount = allIds.filter((id) => selected.has(id)).length;
  const isAllSelected = data.length > 0 && selectedCount === data.length;
  const isIndeterminate = selectedCount > 0 && selectedCount < data.length;

  // Native checkboxes only support the indeterminate visual state via the DOM API.
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const commitSelection = (next: Set<T["id"]>) => {
    if (!isControlled) {
      setInternalSelected(next);
    }
    onSelectionChange?.(Array.from(next));
  };

  const handleToggleAll = (event: ChangeEvent<HTMLInputElement>) => {
    commitSelection(event.target.checked ? new Set(allIds) : new Set());
  };

  const handleToggleRow = (id: T["id"]) => (event: ChangeEvent<HTMLInputElement>) => {
    const next = new Set(selected);
    if (event.target.checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    commitSelection(next);
  };

  const getCellValue = (row: T, column: ColumnDef<T>) => {
    if (column.render) return column.render(row);
    const value = row[column.key];
    return value as unknown as string | number | null | undefined;
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full border-collapse" style={{ minWidth }}>
        <thead className="bg-slate-100">
          <tr>
            <th className="w-12 whitespace-nowrap border-b border-slate-100 px-5 py-3.5 text-left">
              <input
                ref={headerCheckboxRef}
                type="checkbox"
                aria-label="Select all rows"
                className="h-4 w-4 rounded border-slate-300 accent-indigo-500"
                checked={isAllSelected}
                onChange={handleToggleAll}
              />
            </th>
            <th className="whitespace-nowrap border-b border-slate-100 px-5 py-3.5 text-left text-xs font-bold text-slate-900">
              ID
            </th>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={
                  column.headerClassName ??
                  "whitespace-nowrap border-b border-slate-100 px-5 py-3.5 text-left text-xs font-bold text-slate-900"
                }
              >
                {column.label}
              </th>
            ))}
            <th className="whitespace-nowrap border-b border-slate-100 px-5 py-3.5 text-left text-xs font-bold text-slate-900">
              {actionsLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 3}
                className="px-5 py-8 text-center text-sm text-slate-500"
              >
                {emptyState ?? "No records found."}
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const isRowSelected = selected.has(row.id);
              return (
                <tr
                  key={row.id}
                  className="group border-b border-slate-100 last:border-b-0 hover:bg-[#476ab8]"
                >
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${row.id}`}
                      className="h-4 w-4 rounded border-slate-300 accent-indigo-500"
                      checked={isRowSelected}
                      onChange={handleToggleRow(row.id)}
                    />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">
                    {row.id}
                  </td>
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={
                        column.cellClassName ??
                        "whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white"
                      }
                    >
                      {getCellValue(row, column)}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    {renderActions?.(row)}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
