"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/sidebar-nav-data";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** True if this item or any descendant matches the current path. */
function branchIsActive(item: NavItem, pathname: string): boolean {
  if (item.href === pathname) return true;
  return item.children?.some((child) => branchIsActive(child, pathname)) ?? false;
}

type SidebarNavItemProps = {
  item: NavItem;
  pathname: string;
  level?: number;
};

export function SidebarNavItem({ item, pathname, level = 0 }: SidebarNavItemProps) {
  const hasChildren = !!item.children?.length;
  const isActiveBranch = branchIsActive(item, pathname);
  const isExactActive = item.href === pathname;

  // Derive the default from the active branch without synchronously updating
  // state in an effect; preserve any explicit choice made by the user.
  const [userOpen, setUserOpen] = useState<boolean | undefined>(undefined);
  const open = userOpen ?? isActiveBranch;

  const Icon = item.icon;
  // Indent each nesting level; level 0 keeps the icon column aligned.
  const paddingLeft = 8 + level * 2;

  const rowClasses = cx(
    "group flex w-full items-center gap-2.5 rounded-md py-2 text-sm transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/70",
    isExactActive
      ? "bg-[#E8A33D]/12 text-slate-900 font-medium"
      : isActiveBranch
        ? "text-slate-900 font-medium hover:bg-black/[0.04]"
        : "text-slate-900 hover:bg-black/[0.04] hover:text-slate-900"
  );

  if (!hasChildren) {
    return (
      <div>
        <Link
          href={item.href ?? "#"}
          aria-current={isExactActive ? "page" : undefined}
          className={rowClasses}
          style={{ paddingLeft, paddingRight: 12 }}
        >
          <div className="bg-white border border-slate-300 rounded-xl p-1">
            {Icon && <Icon color="#476ab8" size={20} strokeWidth={2} className="shrink-0" />}
          </div>
          <span className="truncate">{item.label}</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setUserOpen(!open)}
        aria-expanded={open}
        className={cx(rowClasses, "justify-between")}
        style={{ paddingLeft, paddingRight: 12 }}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <div className="bg-white border border-slate-300 rounded-xl p-1">
            {Icon && <Icon color="#476ab8" size={20} strokeWidth={2} className="shrink-0" />}
          </div>
          <span className="truncate">{item.label}</span>
        </span>
        {open ? (
          <ChevronDown size={15} className="shrink-0 opacity-60" />
        ) : (
          <ChevronRight size={15} className="shrink-0 opacity-60" />
        )}
      </button>

      {/* Grid-rows trick animates to an unknown content height smoothly. */}
      <div
        className={cx(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cx(
              "relative mt-0.5 space-y-2.5 border-0 border-white/[0.07]",
              "ml-[var(--rail)]"
            )}
            style={{ ["--rail" as string]: `${paddingLeft + 4}px` }}
          >
            {item.children!.map((child) => (
              <SidebarNavItem
                key={child.label}
                item={child}
                pathname={pathname}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}