import * as React from "react";
import { Tooltip } from "@base-ui/react/tooltip";
import { cx } from "./action-button";

interface ActionButtonGroupProps {
  children: React.ReactNode;
  /** Extra classes merged onto the wrapping element. */
  className?: string;
  /** Accessible name for the toolbar. Defaults to "Actions". */
  "aria-label"?: string;
}

/**
 * Lays out a row of `ActionButton`s with consistent spacing.
 *
 * Marked `role="group"` so assistive tech announces it as a single
 * toolbar of related actions (e.g. the actions column in a table row)
 * rather than a list of unrelated buttons.
 */
export function ActionButtonGroup({
  children,
  className,
  "aria-label": ariaLabel = "Actions",
}: ActionButtonGroupProps) {
  return (
    <Tooltip.Provider delay={100} closeDelay={100}>
      <div
        role="group"
        aria-label={ariaLabel}
        className={cx("inline-flex items-center gap-1.5", className)}
      >
        {children}
      </div>
    </Tooltip.Provider>
  );
}
