"use client";

import React from "react";
import { TableToolbar, type TableToolbarProps } from "@/components/ui/table-toolbar";

export type NavChProps = TableToolbarProps;

export default function NavCh(props: NavChProps) {
  return <TableToolbar {...props} />;
}
