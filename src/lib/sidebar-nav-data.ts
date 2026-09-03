import type { LucideIcon } from "lucide-react";
import {
  Warehouse,
  Package,
  Users,
  Tags,
  Shield,
  KeyRound,
  UserCircle2,
} from "lucide-react";

export type NavItem = {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavItem[];
};

export const sidebarNav: NavItem[] = [
  {
    label: "Warehouse FG",
    icon: Warehouse,
    children: [
      { label: "Dashboard", href: "/warehouse-fg/dashboard" },
      { label: "Stock In", href: "/warehouse-fg/stock-in" },
      { label: "Stock Out", href: "/warehouse-fg/stock-out" },
      { label: "Out List", href: "/warehouse-fg/out-list" },
      { label: "Batch List", href: "/warehouse-fg/batch-list" },
      {
        label: "FG Report",
        children: [
          { label: "Weekly Delivery", href: "/warehouse-fg/fg-report/weekly-delivery" },
          { label: "Monthly Delivery", href: "/warehouse-fg/fg-report/monthly-delivery" },
          { label: "Delivery Summary", href: "/warehouse-fg/fg-report/delivery-summary" },
          {
            label: "Stock Aging",
            children: [
              { label: "Green", href: "/warehouse-fg/fg-report/stock-aging/green" },
              { label: "Yellow", href: "/warehouse-fg/fg-report/stock-aging/yellow" },
              { label: "Red", href: "/warehouse-fg/fg-report/stock-aging/red" },
            ],
          },
          { label: "FG Master Stock", href: "/warehouse-fg/fg-report/fg-master-stock" },
          { label: "Location Wise Stock", href: "/warehouse-fg/fg-report/location-wise-stock" },
          { label: "Batch Product List", href: "/warehouse-fg/fg-report/batch-product-list" },
          { label: "FG Current Stock", href: "/warehouse-fg/fg-report/fg-current-stock" },
          { label: "Stock Ledger", href: "/warehouse-fg/fg-report/stock-ledger" },
        ],
      },
    ],
  },
  {
    label: "Products",
    icon: Package,
    children: [
      { label: "Master FG Product", href: "/products/master-fg-product" },
      { label: "Variant FG Product", href: "/products/variant-fg-product" },
    ],
  },
  {
    label: "CRM",
    icon: Users,
    children: [{ label: "Buyer", href: "/crm/buyer" }],
  },
  {
    label: "Attribute",
    icon: Tags,
    children: [
      { label: "Category", href: "/attribute/category" },
      { label: "Sub Category", href: "/attribute/sub-category" },
      { label: "Material", href: "/attribute/material" },
      { label: "Color", href: "/attribute/color" },
      { label: "Warehouse", href: "/attribute/warehouse" },
      { label: "Zone", href: "/attribute/zone" },
      { label: "Sub Zone", href: "/attribute/sub-zone" },
      { label: "Rack", href: "/attribute/rack" },
    ],
  },
  { label: "Role", href: "/role", icon: Shield },
  { label: "Permission", href: "/permission", icon: KeyRound },
  { label: "User", href: "/user", icon: UserCircle2 },
];