"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "cn";

export interface PaginationProps {
  /** Current active page (1-indexed). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called with the new page number when the user navigates. */
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Reusable pagination bar.
 *
 * Layout (matches design):
 *   < Previous   1  2  ...  24   Next >   Go To [ ___ ] of 24  Go
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const [goToValue, setGoToValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const clamp = (n: number) => Math.min(Math.max(n, 1), totalPages);

  const handlePrev = () => onPageChange(clamp(currentPage - 1));
  const handleNext = () => onPageChange(clamp(currentPage + 1));

  const handleGo = () => {
    const parsed = parseInt(goToValue, 10);
    if (!isNaN(parsed)) {
      onPageChange(clamp(parsed));
      setGoToValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleGo();
  };

  /**
   * Build the visible page numbers.
   * Always shows: first page, last page, current page, and the page right
   * before/after current. Gaps are represented as "...".
   *
   * Example (totalPages=24, currentPage=1): [1, 2, "...", 24]
   */
  const buildPages = (): (number | "...")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = new Set<number>();
    pages.add(1);
    pages.add(totalPages);
    pages.add(clamp(currentPage));
    pages.add(clamp(currentPage - 1));
    pages.add(clamp(currentPage + 1));

    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result: (number | "...")[] = [];

    sorted.forEach((page, idx) => {
      if (idx > 0 && page - sorted[idx - 1] > 1) {
        result.push("...");
      }
      result.push(page);
    });

    return result;
  };

  const pages = buildPages();

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center gap-1 rounded-xl bg-white px-4 py-3 shadow-sm",
        className
      )}
    >
      {/* Previous */}
      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-sm text-slate-400 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition",
                page === currentPage
                  ? "bg-[#4B5EAA] text-white shadow"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="size-4" />
      </button>

      {/* Go To */}
      <div className="ml-3 flex items-center gap-2 border-l border-slate-200 pl-3">
        <span className="text-sm text-slate-500 whitespace-nowrap">Go To</span>
        <input
          ref={inputRef}
          type="number"
          min={1}
          max={totalPages}
          value={goToValue}
          onChange={(e) => setGoToValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-12 rounded-lg border border-slate-300 px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#4B5EAA]/40 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span className="text-sm text-slate-500 whitespace-nowrap">
          of {totalPages}
        </span>
        <button
          onClick={handleGo}
          className="rounded-lg bg-[#4B5EAA] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#3d4f96] active:translate-y-px disabled:opacity-50"
        >
          Go
        </button>
      </div>
    </div>
  );
}
