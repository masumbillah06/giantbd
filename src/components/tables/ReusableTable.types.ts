import type { ReactNode } from "react";

/**
 * Any row rendered by ReusableTable must expose a stable, unique `id`.
 * This is what powers selection, React keys, and the Actions column.
 */
export interface RowBase {
  id: string | number;
}

/**
 * Describes one data column that sits between the built-in ID column
 * and the built-in Actions column.
 *
 * - `key`   identifies the field on the row (used as the React key and,
 *           when `render` is omitted, to read the cell value directly).
 * - `label` is the text shown in the column header.
 * - `render` lets you fully customize how a cell is displayed (badges,
 *           icons, links, etc.) instead of printing the raw value.
 * - `headerClassName` / `cellClassName` let you override the default
 *           whitespace/typography classes for a specific column when needed.
 */
export interface ColumnDef<T extends RowBase> {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

export interface ReusableTableProps<T extends RowBase> {
  /** Row data. Each row must have a unique `id`. */
  data: T[];
  /** Data columns rendered between the ID column and the Actions column. */
  columns: ColumnDef<T>[];
  /**
   * Called whenever the selection changes, with the full list of
   * currently selected row IDs.
   */
  onSelectionChange?: (selectedIds: Array<T["id"]>) => void;
  /**
   * Renders the content of the Actions cell for a given row.
   * If omitted, the Actions column is rendered empty.
   */
  renderActions?: (row: T) => ReactNode;
  /** Optional label for the Actions column header. Defaults to "Action". */
  actionsLabel?: string;
  /** Optional minimum width for the table (matches the original `min-w-[...]` behavior). */
  minWidth?: string;
  /** Optional controlled selection (uncontrolled by default). */
  selectedIds?: Array<T["id"]>;
  /** Optional empty-state content shown when `data` is empty. */
  emptyState?: ReactNode;
}
