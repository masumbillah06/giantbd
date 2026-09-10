"use client";

import React, { useMemo } from "react";
import { MatrixTable, type MatrixPeriodColumn } from "@/components/ui/matrix-table";
import type { MonthlyDeliveryItem, MonthInfo } from "@/lib/product-data/monthly-delivery-data";

export interface MonthlyMatrixTableProps {
  currentMonth: MonthInfo;
  items: MonthlyDeliveryItem[];
}

export function MonthlyMatrixTable({
  currentMonth,
  items,
}: MonthlyMatrixTableProps) {
  const columns = useMemo<MatrixPeriodColumn[]>(
    () =>
      Array.from({ length: currentMonth.daysCount }, (_, i) => {
        const id = String(i + 1).padStart(2, "0");
        return {
          id,
          label: id,
          minWidth: "min-w-[42px]",
        };
      }),
    [currentMonth.daysCount]
  );

  return (
    <MatrixTable<MonthlyDeliveryItem>
      columns={columns}
      items={items}
      primaryHeader="Factory"
      secondaryHeader="Item"
      totalPosition="start"
      minWidth="1400px"
      emptyMessage="No delivery records found for this month or applied filter."
      getGroupKey={(item) => item.material}
      getSubGroupKey={(item) => item.factory}
      getPrimaryLabel={(item) => item.factory}
      getSecondaryLabel={(item) => item.item}
      getColorLabel={(item) => item.color}
      getQuantities={(item) => item.dailyQuantities}
      getItemId={(item) => item.id}
    />
  );
}

export default MonthlyMatrixTable;

