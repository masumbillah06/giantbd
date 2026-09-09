"use client";

import React, { useMemo } from "react";
import type { DeliveryItem, WeekInfo } from "@/lib/product-data/weekly-delivery-data";

export interface DeliveryMatrixTableProps {
  currentWeek: WeekInfo;
  items: DeliveryItem[];
}

export function DeliveryMatrixTable({
  currentWeek,
  items,
}: DeliveryMatrixTableProps) {
  const days = currentWeek.days;

  // Group items by material, then by buyer
  const groupedData = useMemo(() => {
    // Map material -> list of items
    const materialsMap: Record<string, DeliveryItem[]> = {};

    items.forEach((item) => {
      if (!materialsMap[item.material]) {
        materialsMap[item.material] = [];
      }
      materialsMap[item.material].push(item);
    });

    return materialsMap;
  }, [items]);

  // Calculate grand totals across all materials
  const grandDailyTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    days.forEach((d) => {
      totals[d.dayNumber] = 0;
    });

    items.forEach((item) => {
      days.forEach((d) => {
        const val = item.dailyQuantities[d.dayNumber] || 0;
        totals[d.dayNumber] += val;
      });
    });

    const sum = Object.values(totals).reduce((a, b) => a + b, 0);
    return { daily: totals, total: sum };
  }, [items, days]);

  const materialsList = Object.keys(groupedData);

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-xs">
      <table className="w-full min-w-[1000px] border-collapse text-left text-xs sm:text-sm">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-slate-200 bg-white">
            <th className="px-5 py-3.5 font-bold text-slate-800 text-xs sm:text-sm w-44">
              Buyer
            </th>
            <th className="px-5 py-3.5 font-bold text-slate-800 text-xs sm:text-sm w-44">
              Product
            </th>
            <th className="px-5 py-3.5 font-bold text-slate-800 text-xs sm:text-sm w-36">
              Color
            </th>

            {/* 6 Work Days (Sat - Thu) */}
            {days.map((day) => (
              <th
                key={day.dayNumber}
                className="px-4 py-2.5 text-center font-bold text-slate-800"
              >
                <div className="text-xs text-slate-700 font-semibold">{day.dayName}</div>
                <div className="text-xs text-slate-900 font-bold mt-0.5">
                  {day.dayNumber}
                </div>
              </th>
            ))}

            <th className="px-5 py-3.5 text-center font-bold text-slate-900 w-28">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {materialsList.length === 0 ? (
            <tr>
              <td
                colSpan={days.length + 4}
                className="px-6 py-12 text-center text-sm text-slate-400 font-medium"
              >
                No delivery records found for this week or applied filter.
              </td>
            </tr>
          ) : (
            materialsList.map((material) => {
              const materialItems = groupedData[material];

              // Group material items by buyer for subtotals
              const buyersMap: Record<string, DeliveryItem[]> = {};
              materialItems.forEach((item) => {
                if (!buyersMap[item.buyer]) {
                  buyersMap[item.buyer] = [];
                }
                buyersMap[item.buyer].push(item);
              });

              // Material totals
              const materialDailyTotals: Record<string, number> = {};
              days.forEach((d) => {
                materialDailyTotals[d.dayNumber] = 0;
              });
              materialItems.forEach((item) => {
                days.forEach((d) => {
                  materialDailyTotals[d.dayNumber] +=
                    item.dailyQuantities[d.dayNumber] || 0;
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

                  {/* Buyer Rows and Buyer Subtotals */}
                  {Object.keys(buyersMap).map((buyer) => {
                    const buyerItems = buyersMap[buyer];

                    // Calculate Buyer daily totals
                    const buyerDailyTotals: Record<string, number> = {};
                    days.forEach((d) => {
                      buyerDailyTotals[d.dayNumber] = 0;
                    });
                    buyerItems.forEach((item) => {
                      days.forEach((d) => {
                        buyerDailyTotals[d.dayNumber] +=
                          item.dailyQuantities[d.dayNumber] || 0;
                      });
                    });
                    const buyerSum = Object.values(buyerDailyTotals).reduce(
                      (a, b) => a + b,
                      0
                    );

                    return (
                      <React.Fragment key={buyer}>
                        {/* Data Rows for this Buyer */}
                        {buyerItems.map((item) => {
                          const itemTotal = days.reduce(
                            (acc, d) =>
                              acc + (item.dailyQuantities[d.dayNumber] || 0),
                            0
                          );

                          return (
                            <tr
                              key={item.id}
                              className="border-b border-slate-100 bg-white hover:bg-slate-50/60 transition-colors"
                            >
                              <td className="px-5 py-2.5 text-xs sm:text-sm text-slate-800">
                                {item.buyer}
                              </td>
                              <td className="px-5 py-2.5 text-xs sm:text-sm text-slate-800">
                                {item.product}
                              </td>
                              <td className="px-5 py-2.5 text-xs sm:text-sm text-slate-600">
                                {item.color}
                              </td>

                              {/* Daily quantities */}
                              {days.map((day) => {
                                const q = item.dailyQuantities[day.dayNumber];
                                return (
                                  <td
                                    key={day.dayNumber}
                                    className="px-4 py-2.5 text-center text-xs sm:text-sm text-slate-800"
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

                              {/* Item Total */}
                              <td className="px-5 py-2.5 text-center font-bold text-slate-900 text-xs sm:text-sm">
                                {itemTotal > 0 ? itemTotal : "—"}
                              </td>
                            </tr>
                          );
                        })}

                        {/* Buyer Subtotal Row */}
                        <tr className="border-b border-slate-100 bg-[#fffbeb]/70 border-l-4 border-l-amber-400">
                          <td className="px-5 py-2.5 font-bold text-amber-900 text-xs sm:text-sm">
                            {buyer} Total
                          </td>
                          <td className="px-5 py-2.5" />
                          <td className="px-5 py-2.5" />

                          {/* Daily values */}
                          {days.map((day) => (
                            <td
                              key={day.dayNumber}
                              className="px-4 py-2.5 text-center font-bold text-amber-900 text-xs sm:text-sm"
                            >
                              {buyerDailyTotals[day.dayNumber] || 0}
                            </td>
                          ))}

                          {/* Buyer Total */}
                          <td className="px-5 py-2.5 text-center font-bold text-amber-900 text-xs sm:text-sm">
                            {buyerSum}
                          </td>
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

                    {/* Daily values */}
                    {days.map((day) => (
                      <td
                        key={day.dayNumber}
                        className="px-4 py-2.5 text-center font-bold text-emerald-900 text-xs sm:text-sm"
                      >
                        {materialDailyTotals[day.dayNumber] || 0}
                      </td>
                    ))}

                    {/* Material Total */}
                    <td className="px-5 py-2.5 text-center font-bold text-emerald-900 text-xs sm:text-sm">
                      {materialSum}
                    </td>
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

              {/* Grand daily totals */}
              {days.map((day) => (
                <td
                  key={day.dayNumber}
                  className="px-4 py-3 text-center font-bold text-emerald-950 text-xs sm:text-sm"
                >
                  {grandDailyTotals.daily[day.dayNumber] || 0}
                </td>
              ))}

              {/* Grand Total Sum */}
              <td className="px-5 py-3 text-center font-bold text-emerald-950 text-xs sm:text-sm">
                {grandDailyTotals.total}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryMatrixTable;

