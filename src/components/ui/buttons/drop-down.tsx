"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const options = [10, 20, 30, 50, 100, 200];

export default function Dropdown() {
  const [selected, setSelected] = useState(10);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-20">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span>{selected}</span>

        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`flex w-full items-center px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                selected === option
                  ? "bg-blue-50 font-medium text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
