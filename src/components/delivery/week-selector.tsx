"use client";

import React from "react";
import { PeriodSelector } from "@/components/ui/period-selector";
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
  return (
    <PeriodSelector<WeekInfo>
      items={weeks}
      selectedId={selectedWeekId}
      onSelect={onSelectWeek}
      getItemLabel={(wk) => wk.id}
      getItemSubLabel={(wk) => wk.dateRange}
      minItemWidth="min-w-[78px]"
    />
  );
}

export default WeekSelector;

