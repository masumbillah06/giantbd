"use client";

import React from "react";
import { Download, Printer, RotateCcw, Plus, Search } from "lucide-react";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { cn } from "@/lib/utils";

export interface TableToolbarProps {
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  onReload?: () => void;
  onExport?: () => void;
  onPrint?: () => void;
  onNew?: () => void;
  newButtonLabel?: string;
  showSearch?: boolean;
  showExport?: boolean;
  showReload?: boolean;
  showPrint?: boolean;
  showPageSize?: boolean;
  showNew?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search records...",
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50, 100],
  onReload,
  onExport,
  onPrint,
  onNew,
  newButtonLabel = "New",
  showSearch = true,
  showExport = true,
  showReload = true,
  showPrint = true,
  showPageSize = true,
  showNew = true,
  children,
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        "min-h-16 w-full flex flex-wrap items-center justify-end gap-3 px-4 py-2.5",
        className
      )}
    >
      {/* Search Bar */}
      {showSearch && (
        <div className="relative w-64 max-w-full">
          <input
            type="text"
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/80 pl-9 pr-3 py-1.5 text-xs text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#476ab8] focus:bg-white focus:ring-1 focus:ring-[#476ab8]"
          />
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      )}

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {showExport && (
          <ActionButton
            label="Download/Export"
            icon={Download}
            onClick={onExport}
          />
        )}
        {showReload && (
          <ActionButton
            label="Reload Data"
            icon={RotateCcw}
            onClick={onReload}
          />
        )}
        {showPrint && (
          <ActionButton
            label="Print List"
            icon={Printer}
            onClick={onPrint}
          />
        )}

        {showPageSize && (
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none transition-colors cursor-pointer hover:border-slate-300 focus:border-[#476ab8] focus:ring-1 focus:ring-[#476ab8]"
            >
              {pageSizeOptions.map((sz) => (
                <option key={sz} value={sz}>
                  {sz} / page
                </option>
              ))}
            </select>
          </div>
        )}

        {showNew && (
          <button
            type="button"
            onClick={onNew}
            className="flex items-center gap-1.5 rounded-lg bg-[#476ab8] hover:bg-[#3b5998] px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={14} />
            {newButtonLabel}
          </button>
        )}

        {children}
      </div>
    </div>
  );
}

export default TableToolbar;

