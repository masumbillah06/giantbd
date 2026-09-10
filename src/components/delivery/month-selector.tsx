"use client";

import React from "react";
import { PeriodSelector } from "@/components/ui/period-selector";
import type { MonthInfo } from "@/lib/product-data/monthly-delivery-data";

export interface MonthSelectorProps {
  months: MonthInfo[];
  selectedMonthId: string;
  onSelectMonth: (monthId: string) => void;
}

export function MonthSelector({
  months,
  selectedMonthId,
  onSelectMonth,
}: MonthSelectorProps) {
  return (
    <PeriodSelector<MonthInfo>
      items={months}
      selectedId={selectedMonthId}
      onSelect={onSelectMonth}
      getItemLabel={(m) => m.name}
      getItemSubLabel={(m) => m.numberString}
      minItemWidth="min-w-[85px]"
    />
  );
}

export default MonthSelector;

