"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { sidebarNav } from "@/lib/sidebar-nav-data";
import { SidebarNavItem } from "./sidebar-nav-item";

export type SidebarUser = {
  name: string;
  email: string;
  avatarUrl?: string;
};

type SidebarProps = {
  user: SidebarUser;
  onLogout?: () => void;
  logoSrc?: string;
  logoHref?: string;
};

export function Sidebar({
  user,
  onLogout,
  logoSrc,
  logoHref = "/dashboard",
}: SidebarProps) {
  const pathname = usePathname();
  const initial = user.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <aside className="flex h-screen w-[272px] flex-col bg-white text-slate-900">
      {/* Header — fixed */}
      <div className="shrink-0 border-b border-white/[0.07] px-5 py-4">
        <Link
          href={logoHref}
          className="flex items-center gap-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/70"
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Company logo"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-md object-contain"
            />
          ) : (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#E8A33D] text-sm font-semibold text-slate-900">
              FG
            </span>
          )}
          <span className="truncate text-[15px] font-semibold tracking-tight">
            Warehouse FG
          </span>
        </Link>
      </div>

      {/* Navigation — the ONLY scrollable region */}
      <nav
        aria-label="Main navigation"
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-3"
      >
        <div className="space-y-0.5">
          {sidebarNav.map((item) => (
            <SidebarNavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>

      {/* Footer — fixed */}
      <div className="shrink-0 border-t border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-sm font-medium text-[#E8EAF0]">
              {initial}
            </span>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#E8EAF0]">
              {user.name}
            </p>
            <p className="truncate text-xs text-[#8891A3]">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            aria-label="Log out"
            title="Log out"
            className="shrink-0 rounded-md p-2 text-[#AEB6C6] transition-colors hover:bg-white/[0.06] hover:text-[#E8EAF0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33D]/70"
          >
            <LogOut size={17} strokeWidth={2} />
          </button>
        </div>
      </div>
    </aside>
  );
}