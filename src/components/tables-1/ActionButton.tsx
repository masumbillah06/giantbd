import type { ComponentType, ReactNode } from "react";

interface ActionButtonProps {
  label: string;
  icon: ComponentType<{ className?: string }>;
  onClick?: () => void;
}

/**
 * Small icon-only button used inside a table's Actions column.
 * `label` is exposed via `title`/`aria-label` for accessibility since
 * no visible text is shown.
 */
export function ActionButton({ label, icon: Icon, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white/20 hover:text-white group-hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

interface ActionButtonGroupProps {
  children: ReactNode;
  "aria-label"?: string;
}

/** Lays out a row of ActionButtons with consistent spacing. */
export function ActionButtonGroup({ children, ...rest }: ActionButtonGroupProps) {
  return (
    <div className="flex items-center gap-1" {...rest}>
      {children}
    </div>
  );
}
