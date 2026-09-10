"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      leftIcon,
      rightIcon,
      size = "sm",
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "py-1.5 text-xs",
      md: "py-2 text-sm",
      lg: "py-2.5 text-base",
    }[size];

    const paddingLeft = leftIcon ? "pl-9" : "px-3";
    const paddingRight = rightIcon ? "pr-9" : "px-3";

    return (
      <div className={cn("relative inline-block w-full", wrapperClassName)}>
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400",
            "outline-none transition-all focus:border-[#476ab8] focus:bg-white focus:ring-1 focus:ring-[#476ab8]",
            "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60",
            sizeClasses,
            paddingLeft,
            paddingRight,
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

