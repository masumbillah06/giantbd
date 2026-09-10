"use client";

import React, { useState, useMemo } from "react";
import { DeliveryFilterBar, type DeliveryFilterState } from "./filter-bar";
import WeekSelector from "./week-selector";
import WeeklyMatrixTable from "./weekly-matrix-table";
import {
  WEEKS_LIST,
  DELIVERY_ITEMS,
  FILTER_OPTIONS,
  type DeliveryItem,
} from "@/lib/product-data/weekly-delivery-data";

export interface WeeklyDeliveryProps {
  initialWeekId?: string;
  initialData?: DeliveryItem[];
}

export function WeeklyDelivery({
  initialWeekId = "WK-36",
  initialData = DELIVERY_ITEMS,
}: WeeklyDeliveryProps) {
  const [selectedWeekId, setSelectedWeekId] = useState<string>(initialWeekId);
  const [filters, setFilters] = useState<DeliveryFilterState>({
    product: "",
    material: "",
    buyer: "",
    color: "",
    year: 2026,
  });

  const currentWeek = useMemo(
    () => WEEKS_LIST.find((w) => w.id === selectedWeekId) || WEEKS_LIST[WEEKS_LIST.length - 1],
    [selectedWeekId]
  );

  // Filter items matching active week and dropdown filters
  const filteredItems = useMemo(() => {
    return initialData.filter((item) => {
      if (item.weekId !== selectedWeekId) return false;
      if (filters.year && item.year !== filters.year) return false;
      if (filters.product && item.product !== filters.product) return false;
      if (filters.material && item.material !== filters.material) return false;
      if (filters.buyer && item.buyer !== filters.buyer) return false;
      if (filters.color && item.color !== filters.color) return false;
      return true;
    });
  }, [initialData, selectedWeekId, filters]);

  return (
    <div className="space-y-4">
      {/* ── Top Card: Filters & Horizontal Week Carousel ── */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
        {/* Row 1: Dropdown Filters */}
        <DeliveryFilterBar
          filters={filters}
          onChange={setFilters}
          productOptions={FILTER_OPTIONS.products}
          materialOptions={FILTER_OPTIONS.materials}
          buyerOptions={FILTER_OPTIONS.buyers}
          colorOptions={FILTER_OPTIONS.colors}
          yearOptions={FILTER_OPTIONS.years}
        />

        {/* Row 2: Week Slider */}
        <WeekSelector
          weeks={WEEKS_LIST}
          selectedWeekId={selectedWeekId}
          onSelectWeek={setSelectedWeekId}
        />
      </div>

      {/* ── Table Card: Grouped Delivery Matrix ── */}
      <WeeklyMatrixTable
        currentWeek={currentWeek}
        items={filteredItems}
      />
    </div>
  );
}

export default WeeklyDelivery;

