"use client";

import React, { useMemo } from "react";
import { DynamicFilterBar, type FilterConfig } from "@/components/ui/dynamic-filter-bar";
import { FILTER_OPTIONS } from "@/lib/product-data/weekly-delivery-data";

export interface FilterState {
  product: string;
  material: string;
  buyer: string;
  color: string;
  year: number;
}

export interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  productOptions?: string[];
  materialOptions?: string[];
  buyerOptions?: string[];
  colorOptions?: string[];
  yearOptions?: number[];
}

export function FilterBar({
  filters,
  onChange,
  productOptions = FILTER_OPTIONS.products,
  materialOptions = FILTER_OPTIONS.materials,
  buyerOptions = FILTER_OPTIONS.buyers,
  colorOptions = FILTER_OPTIONS.colors,
  yearOptions = FILTER_OPTIONS.years,
}: FilterBarProps) {
  const config = useMemo<FilterConfig<FilterState>[]>(
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

  return <DynamicFilterBar<FilterState> filters={filters} config={config} onChange={onChange} />;
}

export default FilterBar;
