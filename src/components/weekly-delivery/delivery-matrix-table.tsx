"use client";

import React, { useMemo } from "react";
import { MatrixTable, type MatrixPeriodColumn } from "@/components/ui/matrix-table";
import type { DeliveryItem, WeekInfo } from "@/lib/product-data/weekly-delivery-data";

export interface DeliveryMatrixTableProps {
  currentWeek: WeekInfo;
  items: DeliveryItem[];
}

export function DeliveryMatrixTable({
  currentWeek,
  items,
}: DeliveryMatrixTableProps) {
  const columns = useMemo<MatrixPeriodColumn[]>(
    () =>
      currentWeek.days.map((d) => ({
        id: d.dayNumber,
        label: d.dayNumber,
        subLabel: d.dayName,
      })),
    [currentWeek.days]
  );

  return (
    <MatrixTable<DeliveryItem>
      columns={columns}
      items={items}
      primaryHeader="Buyer"
      secondaryHeader="Product"
      totalPosition="end"
      minWidth="1000px"
      emptyMessage="No delivery records found for this week or applied filter."
      getGroupKey={(item) => item.material}
      getSubGroupKey={(item) => item.buyer}
      getPrimaryLabel={(item) => item.buyer}
      getSecondaryLabel={(item) => item.product}
      getColorLabel={(item) => item.color}
      getQuantities={(item) => item.dailyQuantities}
      getItemId={(item) => item.id}
    />
  );
}

export default DeliveryMatrixTable;
