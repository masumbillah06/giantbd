"use client";

import React from "react";
import { FormActionBar, type FormActionBarProps } from "@/components/ui/form-action-bar";

export type StockOutActionsProps = FormActionBarProps;

export function StockOutActions(props: StockOutActionsProps) {
  return (
    <FormActionBar
      submitLabel="Create"
      loadingLabel="Processing..."
      {...props}
    />
  );
}

export default StockOutActions;
