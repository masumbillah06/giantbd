"use client";

import React, { useState, useMemo } from "react";
import { DeliveryFilterBar, type DeliveryFilterState } from "./filter-bar";
import MonthSelector from "./month-selector";
import MonthlyMatrixTable from "./monthly-matrix-table";
import {
  MONTHS_LIST,
  MONTHLY_DELIVERY_ITEMS,
  MONTHLY_FILTER_OPTIONS,
  type MonthlyDeliveryItem,
} from "@/lib/product-data/monthly-delivery-data";

export interface MonthlyDeliveryProps {
  initialMonthId?: string;
  initialData?: MonthlyDeliveryItem[];
}

export function MonthlyDelivery({
  initialMonthId = "09",
  initialData = MONTHLY_DELIVERY_ITEMS,
}: MonthlyDeliveryProps) {
  const [selectedMonthId, setSelectedMonthId] = useState<string>(initialMonthId);
  const [filters, setFilters] = useState<DeliveryFilterState>({
    product: "",
    material: "",
    buyer: "",
    color: "",
    year: 2026,
  });

  const currentMonth = useMemo(
    () => MONTHS_LIST.find((m) => m.id === selectedMonthId) || MONTHS_LIST[8],
    [selectedMonthId]
  );

  // Filter items matching active month and dropdown filters
  const filteredItems = useMemo(() => {
    return initialData.filter((item) => {
      if (item.monthId !== selectedMonthId) return false;
      if (filters.year && item.year !== filters.year) return false;
      if (filters.product && item.item !== filters.product) return false;
      if (filters.material && item.material !== filters.material) return false;
      if (filters.buyer && item.factory !== filters.buyer) return false;
      if (filters.color && item.color !== filters.color) return false;
      return true;
    });
  }, [initialData, selectedMonthId, filters]);

  return (
    <div className="space-y-4">
      {/* ── Top Card: Filters & Horizontal Month Carousel ── */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
        {/* Row 1: Dropdown Filters */}
        <DeliveryFilterBar
          filters={filters}
          onChange={setFilters}
          productOptions={MONTHLY_FILTER_OPTIONS.products}
          materialOptions={MONTHLY_FILTER_OPTIONS.materials}
          buyerOptions={MONTHLY_FILTER_OPTIONS.buyers}
          colorOptions={MONTHLY_FILTER_OPTIONS.colors}
          yearOptions={MONTHLY_FILTER_OPTIONS.years}
        />

        {/* Row 2: Month Slider */}
        <MonthSelector
          months={MONTHS_LIST}
          selectedMonthId={selectedMonthId}
          onSelectMonth={setSelectedMonthId}
        />
      </div>

      {/* ── Table Card: Grouped Monthly Delivery Matrix ── */}
      <MonthlyMatrixTable
        currentMonth={currentMonth}
        items={filteredItems}
      />
    </div>
  );
}

export default MonthlyDelivery;

