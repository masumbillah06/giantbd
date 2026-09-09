"use client";

import React from "react";
import type { YearSummaryData } from "@/lib/product-data/delivery-summary-data";

export interface DeliverySummaryTableProps {
  summaryData: YearSummaryData;
}

export function DeliverySummaryTable({ summaryData }: DeliverySummaryTableProps) {
  const { columns, rows, totals, grandTotal } = summaryData;

  const formatNumber = (n: number) => {
    return n.toLocaleString();
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      <table className="w-full min-w-[1300px] border-collapse text-left text-xs sm:text-sm">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-slate-200 bg-white">
            <th className="px-5 py-4 font-bold text-slate-900 text-xs sm:text-sm min-w-[120px]">
              Month
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-4 font-bold text-slate-800 text-xs whitespace-nowrap min-w-[110px]"
              >
                {col.label}
              </th>
            ))}
            <th className="px-5 py-4 font-bold text-slate-900 text-xs sm:text-sm min-w-[100px]">
              Total
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.month}
              className="border-b border-slate-100 bg-white hover:bg-slate-50/70 transition-colors"
            >
              <td className="px-5 py-3 font-semibold text-slate-800 text-xs sm:text-sm">
                {row.month}
              </td>
              {columns.map((col) => {
                const val = row.values[col.key] || 0;
                return (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-xs sm:text-sm text-slate-700 whitespace-nowrap font-normal"
                  >
                    {formatNumber(val)}
                  </td>
                );
              })}
              <td className="px-5 py-3 font-bold text-slate-900 text-xs sm:text-sm whitespace-nowrap">
                {formatNumber(row.total)}
              </td>
            </tr>
          ))}

          {/* Bottom TOTAL Row */}
          <tr className="border-t-2 border-slate-300 bg-white">
            <td className="px-5 py-3.5 font-bold text-slate-950 text-xs sm:text-sm tracking-wide">
              TOTAL
            </td>
            {columns.map((col) => (
              <td
                key={col.key}
                className="px-4 py-3.5 font-bold text-slate-950 text-xs sm:text-sm whitespace-nowrap"
              >
                {formatNumber(totals[col.key] || 0)}
              </td>
            ))}
            <td className="px-5 py-3.5 font-bold text-slate-950 text-xs sm:text-sm whitespace-nowrap">
              {formatNumber(grandTotal)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeliverySummaryTable;

