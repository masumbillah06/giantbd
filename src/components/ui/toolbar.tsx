"use client";

import { ChevronsUpDown } from "lucide-react";

const filters = [
  {
    label: "Filter by master...",
    width: "w-52",
  },
  {
    label: "Filter by material...",
    width: "w-48",
  },
  {
    label: "Filter by size...",
    width: "w-36",
  },
  {
    label: "Filter by color...",
    width: "w-40",
  },
  {
    label: "Filter by gender...",
    width: "w-40",
  },
];

export default function FilterCard() {
  return (
    <div className="bg-card flex flex-col gap-6 rounded-xl border p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div className="font-bold">Filters</div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className={`
                inline-flex h-6 ${filter.width}
                shrink-0 items-center justify-between gap-2
                whitespace-nowrap rounded-[5px]
                border border-primary
                bg-background
                px-4 py-2
                text-xs font-normal
                text-muted-foreground
                shadow-xs
                transition-all
                cursor-pointer
                hover:bg-accent
                hover:text-accent-foreground
                focus-visible:border-ring
                focus-visible:ring-[3px]
                focus-visible:ring-ring/50
                outline-none
              `}
            >
              <span className="truncate">{filter.label}</span>

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}