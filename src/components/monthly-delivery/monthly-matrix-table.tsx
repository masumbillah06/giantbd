"use client";

import React, { useMemo } from "react";
import type { MonthlyDeliveryItem, MonthInfo } from "@/lib/product-data/monthly-delivery-data";

export interface MonthlyMatrixTableProps {
  currentMonth: MonthInfo;
  items: MonthlyDeliveryItem[];
}

export function MonthlyMatrixTable({
  currentMonth,
  items,
}: MonthlyMatrixTableProps) {
  // Generate list of day strings e.g. ["01", "02", ..., "30"]
  const days = useMemo(() => {
    return Array.from({ length: currentMonth.daysCount }, (_, i) => {
      return String(i + 1).padStart(2, "0");
    });
  }, [currentMonth.daysCount]);

  // Group items by material -> factory
  const groupedData = useMemo(() => {
    const materialsMap: Record<string, MonthlyDeliveryItem[]> = {};

    items.forEach((item) => {
      if (!materialsMap[item.material]) {
        materialsMap[item.material] = [];
      }
      materialsMap[item.material].push(item);
    });

    return materialsMap;
  }, [items]);

  // Grand totals across all materials
  const grandDailyTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    days.forEach((d) => {
      totals[d] = 0;
    });

    items.forEach((item) => {
      days.forEach((d) => {
        const val = item.dailyQuantities[d] || 0;
        totals[d] += val;
      });
    });

    const sum = Object.values(totals).reduce((a, b) => a + b, 0);
    return { daily: totals, total: sum };
  }, [items, days]);

  const materialsList = Object.keys(groupedData);

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      <table className="w-full min-w-[1400px] border-collapse text-left text-xs sm:text-sm">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-slate-200 bg-white">
            <th className="px-5 py-3.5 font-bold text-slate-800 text-xs sm:text-sm w-44">
              Factory
            </th>
            <th className="px-5 py-3.5 font-bold text-slate-800 text-xs sm:text-sm w-44">
              Item
            </th>
            <th className="px-5 py-3.5 font-bold text-slate-800 text-xs sm:text-sm w-36">
              Color
            </th>
            <th className="px-4 py-3.5 text-center font-bold text-slate-900 w-24">
              Total
            </th>

            {/* All Days in Month (01, 02, ... 30/31) */}
            {days.map((day) => (
              <th
                key={day}
                className="px-3 py-3 text-center font-bold text-slate-800 text-xs min-w-[42px]"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {materialsList.length === 0 ? (
            <tr>
              <td
                colSpan={days.length + 4}
                className="px-6 py-12 text-center text-sm text-slate-400 font-medium"
              >
                No delivery records found for this month or applied filter.
              </td>
            </tr>
          ) : (
            materialsList.map((material) => {
              const materialItems = groupedData[material];

              // Group material items by factory
              const factoriesMap: Record<string, MonthlyDeliveryItem[]> = {};
              materialItems.forEach((item) => {
                if (!factoriesMap[item.factory]) {
                  factoriesMap[item.factory] = [];
                }
                factoriesMap[item.factory].push(item);
              });

              // Material totals
              const materialDailyTotals: Record<string, number> = {};
              days.forEach((d) => {
                materialDailyTotals[d] = 0;
              });
              materialItems.forEach((item) => {
                days.forEach((d) => {
                  materialDailyTotals[d] += item.dailyQuantities[d] || 0;
                });
              });
              const materialSum = Object.values(materialDailyTotals).reduce(
                (a, b) => a + b,
                0
              );

              return (
                <React.Fragment key={material}>
                  {/* Material Group Header Row */}
                  <tr className="border-t border-slate-100 bg-white">
                    <td
                      colSpan={days.length + 4}
                      className="px-5 py-3 font-bold text-slate-900 text-sm"
                    >
                      {material}
                    </td>
                  </tr>

                  {/* Factory Rows and Subtotals */}
                  {Object.keys(factoriesMap).map((factory) => {
                    const factoryItems = factoriesMap[factory];

                    // Factory daily totals
                    const factoryDailyTotals: Record<string, number> = {};
                    days.forEach((d) => {
                      factoryDailyTotals[d] = 0;
                    });
                    factoryItems.forEach((item) => {
                      days.forEach((d) => {
                        factoryDailyTotals[d] += item.dailyQuantities[d] || 0;
                      });
                    });
                    const factorySum = Object.values(factoryDailyTotals).reduce(
                      (a, b) => a + b,
                      0
                    );

                    return (
                      <React.Fragment key={factory}>
                        {/* Data Rows for this Factory */}
                        {factoryItems.map((item) => {
                          const itemTotal = days.reduce(
                            (acc, d) => acc + (item.dailyQuantities[d] || 0),
                            0
                          );

                          return (
                            <tr
                              key={item.id}
                              className="border-b border-slate-100 bg-white hover:bg-slate-50/60 transition-colors"
                            >
                              <td className="px-5 py-2.5 text-xs sm:text-sm text-slate-800">
                                {item.factory}
                              </td>
                              <td className="px-5 py-2.5 text-xs sm:text-sm text-slate-800">
                                {item.item}
                              </td>
                              <td className="px-5 py-2.5 text-xs sm:text-sm text-slate-600">
                                {item.color}
                              </td>

                              {/* Item Total (Col 4) */}
                              <td className="px-4 py-2.5 text-center font-bold text-slate-900 text-xs sm:text-sm">
                                {itemTotal > 0 ? itemTotal : "—"}
                              </td>

                              {/* Daily quantities */}
                              {days.map((day) => {
                                const q = item.dailyQuantities[day];
                                return (
                                  <td
                                    key={day}
                                    className="px-3 py-2.5 text-center text-xs sm:text-sm text-slate-800"
                                  >
                                    {q !== undefined && q > 0 ? (
                                      <span className="font-medium text-slate-900">
                                        {q}
                                      </span>
                                    ) : (
                                      <span className="text-slate-300 font-normal">
                                        —
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}

                        {/* Factory Subtotal Row */}
                        <tr className="border-b border-slate-100 bg-[#fffbeb]/70 border-l-4 border-l-amber-400">
                          <td className="px-5 py-2.5 font-bold text-amber-900 text-xs sm:text-sm">
                            {factory} Total
                          </td>
                          <td className="px-5 py-2.5" />
                          <td className="px-5 py-2.5" />

                          {/* Factory Total Sum (Col 4) */}
                          <td className="px-4 py-2.5 text-center font-bold text-amber-900 text-xs sm:text-sm">
                            {factorySum}
                          </td>

                          {/* Factory Daily Values */}
                          {days.map((day) => (
                            <td
                              key={day}
                              className="px-3 py-2.5 text-center font-bold text-amber-900 text-xs sm:text-sm"
                            >
                              {factoryDailyTotals[day] || 0}
                            </td>
                          ))}
                        </tr>
                      </React.Fragment>
                    );
                  })}

                  {/* Material Subtotal Row */}
                  <tr className="border-b border-slate-200 bg-[#f0fdf4]/70 border-l-4 border-l-emerald-500">
                    <td className="px-5 py-2.5 font-bold text-emerald-900 text-xs sm:text-sm">
                      {material} Total
                    </td>
                    <td className="px-5 py-2.5" />
                    <td className="px-5 py-2.5" />

                    {/* Material Total Sum (Col 4) */}
                    <td className="px-4 py-2.5 text-center font-bold text-emerald-900 text-xs sm:text-sm">
                      {materialSum}
                    </td>

                    {/* Material Daily Values */}
                    {days.map((day) => (
                      <td
                        key={day}
                        className="px-3 py-2.5 text-center font-bold text-emerald-900 text-xs sm:text-sm"
                      >
                        {materialDailyTotals[day] || 0}
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              );
            })
          )}

          {/* Grand Total Row */}
          {materialsList.length > 0 && (
            <tr className="bg-[#dcfce7]/80 border-l-4 border-l-emerald-600">
              <td className="px-5 py-3 font-bold text-emerald-950 text-xs sm:text-sm">
                Grand Total
              </td>
              <td className="px-5 py-3" />
              <td className="px-5 py-3" />

              {/* Grand Total Sum (Col 4) */}
              <td className="px-4 py-3 text-center font-bold text-emerald-950 text-xs sm:text-sm">
                {grandDailyTotals.total}
              </td>

              {/* Grand Daily Values */}
              {days.map((day) => (
                <td
                  key={day}
                  className="px-3 py-3 text-center font-bold text-emerald-950 text-xs sm:text-sm"
                >
                  {grandDailyTotals.daily[day] || 0}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyMatrixTable;

