"use client";

import React from "react";

export interface StockOutActionsProps {
  onReset?: () => void;
  onPreview?: () => void;
  onCreate?: () => void;
  isLoading?: boolean;
}

export function StockOutActions({
  onReset,
  onPreview,
  onCreate,
  isLoading = false,
}: StockOutActionsProps) {
  return (
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs flex items-center justify-end gap-3">
      {/* Reset Button */}
      <button
        type="button"
        onClick={onReset}
        disabled={isLoading}
        className="min-w-[120px] px-8 py-2.5 rounded-lg border border-[#eab308] text-[#ca8a04] bg-white hover:bg-amber-50/70 text-sm font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reset
      </button>

      {/* Preview Button */}
      <button
        type="button"
        onClick={onPreview}
        disabled={isLoading}
        className="min-w-[120px] px-8 py-2.5 rounded-lg bg-[#489b6b] hover:bg-[#3d8559] text-white text-sm font-semibold transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Preview
      </button>

      {/* Create / Stock Out Button */}
      <button
        type="button"
        onClick={onCreate}
        disabled={isLoading}
        className="min-w-[120px] px-8 py-2.5 rounded-lg bg-[#5066be] hover:bg-[#4357a7] text-white text-sm font-semibold transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Create"}
      </button>
    </div>
  );
}

export default StockOutActions;

