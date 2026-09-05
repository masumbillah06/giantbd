import React, { ReactNode } from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export interface StatBreakdownItem {
  label: string;
  value: string | number;
}

export interface StatCardProps {
  /** Title / label at the top-left (e.g. "Daily In") */
  title: ReactNode;
  /** Primary metric value (e.g. 0 or "1,250") */
  value: string | number;
  /** Optional unit placed directly beside the value (e.g. "Pairs", "Kg", "Items") */
  unit?: string;
  /**
   * Breakdown details shown at the bottom.
   * - Array: `[{ label: "Bat", value: 0 }, { label: "Mas", value: 0 }, { label: "Var", value: 0 }]`
   * - String: `"0 Bat | 0 Mas | 0 Var"`
   * - ReactNode: Custom JSX elements
   */
  breakdown?: StatBreakdownItem[] | ReactNode;
  /**
   * Trend direction for the indicator icon in top-right.
   * - 'up': Green arrow up (default)
   * - 'down': Red arrow down
   * - 'neutral': Gray horizontal dash
   * - 'none': No trend icon
   */
  trend?: "up" | "down" | "neutral" | "none";
  /** Override with any custom icon or ReactNode at top-right */
  icon?: ReactNode;
  /** Custom CSS class for trend icon color (e.g. "text-emerald-500", "text-blue-500") */
  trendColorClass?: string;
  /** Custom CSS class for the main container */
  className?: string;
  /** Optional click handler if the card is interactive */
  onClick?: () => void;
}

export default function StatCard({
  title,
  value,
  unit,
  breakdown,
  trend = "up",
  icon,
  trendColorClass,
  className = "",
  onClick,
}: StatCardProps) {
  // Render the top-right indicator / icon
  const renderTrendIcon = () => {
    if (icon) return icon;

    if (trend === "none") return null;

    const 
    defaultColor =
      trendColorClass ||
      (trend === "up"
        ? "text-emerald-500"
        : trend === "down"
        ? "text-rose-500"
        : "text-slate-400");

    if (trend === "up") {
      return (
        <ArrowUp
          className={`h-5 w-5 stroke-[2.2] transition-transform ${defaultColor}`}
          aria-label="Trending up"
        />
      );
    }

    if (trend === "down") {
      return (
        <ArrowDown
          className={`h-5 w-5 stroke-[2.2] transition-transform ${defaultColor}`}
          aria-label="Trending down"
        />
      );
    }

    return (
      <Minus
        className={`h-5 w-5 stroke-[2.2] ${defaultColor}`}
        aria-label="Neutral trend"
      />
    );
  };

  // Render bottom breakdown line
  const renderBreakdown = () => {
    if (!breakdown) return null;

    if (Array.isArray(breakdown)) {
      return (
        <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-[13px] font-medium text-slate-500">
          {breakdown.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-slate-300">|</span>}
              <span>
                {item.value} {item.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      );
    }

    // Direct string or custom ReactNode
    if (typeof breakdown === "string") {
      return (
        <p className="text-xs sm:text-[13px] font-medium text-slate-500">
          {breakdown}
        </p>
      );
    }

    return breakdown;
  };

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-4 shadow-sm transition-all hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Top row: Title and Trend Icon */}
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm sm:text-md font-medium text-slate-800">
          {title}
        </h4>
        <div className="flex items-center justify-center shrink-0">
          {renderTrendIcon()}
        </div>
      </div>

      {/* Middle: Primary Value + Unit */}
      <div className="mt-3.5 sm:mt-7 flex items-baseline gap-1.5">
        <span className="text-md sm:text-lg font-bold tracking-tight text-slate-900">
          {value}
        </span>
        {unit && (
          <span className="text-base sm:text-lg font-bold text-slate-900">
            {unit}
          </span>
        )}
      </div>

      {/* Bottom: Breakdown / Subtitle */}
      {breakdown && <div className="mt-0 sm:mt-0">{renderBreakdown()}</div>}
    </div>
  );
}

