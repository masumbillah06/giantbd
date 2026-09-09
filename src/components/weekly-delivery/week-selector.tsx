"use client";

import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WeekInfo } from "@/lib/product-data/weekly-delivery-data";

export interface WeekSelectorProps {
  weeks: WeekInfo[];
  selectedWeekId: string;
  onSelectWeek: (weekId: string) => void;
}

export function WeekSelector({
  weeks,
  selectedWeekId,
  onSelectWeek,
}: WeekSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active item into view on load
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(
        `[data-active="true"]`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedWeekId]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center gap-2 w-full pt-3"> 
      {/* Left Chevron Button */}
      <button
        type="button"
        onClick={() => handleScroll("left")}
        aria-label="Scroll weeks left"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer focus:outline-none"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Horizontal Scrollable Week List */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 flex-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {weeks.map((wk) => {
          const isActive = wk.id === selectedWeekId;
          return (
            <button
              key={wk.id}
              type="button"
              data-active={isActive ? "true" : "false"}
              onClick={() => onSelectWeek(wk.id)}
              className={`flex flex-col items-center justify-center min-w-[78px] px-2.5 py-1 rounded-lg border text-center transition-all cursor-pointer shrink-0 ${
                isActive
                  ? "bg-[#1d4ed8] border-[#1d4ed8] text-white shadow-xs font-semibold"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span className="text-xs font-semibold leading-tight">
                {wk.id}
              </span>
              <span
                className={`text-[10px] leading-tight mt-0.5 whitespace-nowrap ${
                  isActive ? "text-blue-100" : "text-slate-400"
                }`}
              >
                {wk.dateRange}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Chevron Button */}
      <button
        type="button"
        onClick={() => handleScroll("right")}
        aria-label="Scroll weeks right"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer focus:outline-none"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default WeekSelector;

