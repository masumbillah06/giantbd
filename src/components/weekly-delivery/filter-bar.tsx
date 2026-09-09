"use client";

import React from "react";
import { ChevronsUpDown } from "lucide-react";
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
  const updateField = (field: keyof FilterState, value: string | number) => {
    onChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2.5">
      {/* Product Filter */}
      <div className="relative min-w-[160px]">
        <select
          value={filters.product}
          onChange={(e) => updateField("product", e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 pr-8 text-xs text-slate-700 focus:border-[#476ab8] focus:outline-none focus:ring-1 focus:ring-[#476ab8] cursor-pointer"
        >
          <option value="">Filter by product...</option>
          {productOptions.map((prod) => (
            <option key={prod} value={prod}>
              {prod}
            </option>
          ))}
        </select>
        <ChevronsUpDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>

      {/* Material Filter */}
      <div className="relative min-w-[160px]">
        <select
          value={filters.material}
          onChange={(e) => updateField("material", e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 pr-8 text-xs text-slate-700 focus:border-[#476ab8] focus:outline-none focus:ring-1 focus:ring-[#476ab8] cursor-pointer"
        >
          <option value="">Filter by material...</option>
          {materialOptions.map((mat) => (
            <option key={mat} value={mat}>
              {mat}
            </option>
          ))}
        </select>
        <ChevronsUpDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>

      {/* Buyer Filter */}
      <div className="relative min-w-[160px]">
        <select
          value={filters.buyer}
          onChange={(e) => updateField("buyer", e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 pr-8 text-xs text-slate-700 focus:border-[#476ab8] focus:outline-none focus:ring-1 focus:ring-[#476ab8] cursor-pointer"
        >
          <option value="">Filter by buyer...</option>
          {buyerOptions.map((buy) => (
            <option key={buy} value={buy}>
              {buy}
            </option>
          ))}
        </select>
        <ChevronsUpDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>

      {/* Color Filter */}
      <div className="relative min-w-[150px]">
        <select
          value={filters.color}
          onChange={(e) => updateField("color", e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 pr-8 text-xs text-slate-700 focus:border-[#476ab8] focus:outline-none focus:ring-1 focus:ring-[#476ab8] cursor-pointer"
        >
          <option value="">Filter by color...</option>
          {colorOptions.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
        <ChevronsUpDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>

      {/* Year Filter */}
      <div className="relative min-w-[100px]">
        <select
          value={filters.year}
          onChange={(e) => updateField("year", Number(e.target.value))}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 pr-8 text-xs text-slate-700 focus:border-[#476ab8] focus:outline-none focus:ring-1 focus:ring-[#476ab8] cursor-pointer font-medium"
        >
          {yearOptions.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
        <ChevronsUpDown
          size={14}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

export default FilterBar;

