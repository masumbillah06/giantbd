import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "active"
    | "inactive"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "tier-red"
    | "tier-yellow"
    | "tier-green"
    | "outline";
  size?: "sm" | "md";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-slate-100 text-slate-700 border-slate-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-slate-100 text-slate-500 border-slate-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  "tier-red": "bg-red-100 text-red-800 border-red-300 font-semibold",
  "tier-yellow": "bg-amber-100 text-amber-800 border-amber-300 font-semibold",
  "tier-green": "bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold",
  outline: "bg-transparent text-slate-700 border-slate-300",
};

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border font-medium transition-colors",
        variantStyles[variant],
        sizeClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;

