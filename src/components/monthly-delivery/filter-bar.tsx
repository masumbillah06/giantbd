"use client";

import React, { useMemo } from "react";
import { DynamicFilterBar, type FilterConfig } from "@/components/ui/dynamic-filter-bar";
import { MONTHLY_FILTER_OPTIONS } from "@/lib/product-data/monthly-delivery-data";

export interface MonthlyFilterState {
  product: string;
  material: string;
  buyer: string;
  color: string;
  year: number;
}

export interface MonthlyFilterBarProps {
  filters: MonthlyFilterState;
  onChange: (filters: MonthlyFilterState) => void;
  productOptions?: string[];
  materialOptions?: string[];
  buyerOptions?: string[];
  colorOptions?: string[];
  yearOptions?: number[];
}

export function MonthlyFilterBar({
  filters,
  onChange,
  productOptions = MONTHLY_FILTER_OPTIONS.products,
  materialOptions = MONTHLY_FILTER_OPTIONS.materials,
  buyerOptions = MONTHLY_FILTER_OPTIONS.buyers,
  colorOptions = MONTHLY_FILTER_OPTIONS.colors,
  yearOptions = MONTHLY_FILTER_OPTIONS.years,
}: MonthlyFilterBarProps) {
  const config = useMemo<FilterConfig<MonthlyFilterState>[]>(
    () => [
      {
        key: "product",
        label: "Product",
        placeholder: "Filter by product...",
        options: productOptions,
        width: "min-w-[160px]",
      },
      {
        key: "material",
        label: "Material",
        placeholder: "Filter by material...",
        options: materialOptions,
        width: "min-w-[160px]",
      },
      {
        key: "buyer",
        label: "Buyer",
        placeholder: "Filter by buyer...",
        options: buyerOptions,
        width: "min-w-[160px]",
      },
      {
        key: "color",
        label: "Color",
        placeholder: "Filter by color...",
        options: colorOptions,
        width: "min-w-[150px]",
      },
      {
        key: "year",
        label: "Year",
        placeholder: "Year",
        options: yearOptions,
        type: "number",
        width: "min-w-[100px]",
      },
    ],
    [productOptions, materialOptions, buyerOptions, colorOptions, yearOptions]
  );

  return <DynamicFilterBar<MonthlyFilterState> filters={filters} config={config} onChange={onChange} />;
}

export default MonthlyFilterBar;
