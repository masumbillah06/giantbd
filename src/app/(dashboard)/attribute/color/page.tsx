"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { colorData, columns, type ColorRecord } from "@/lib/attribute-data/color-data";

export default function ColorPage() {
  return (
    <CrudPageTemplate<ColorRecord>
      title="Color"
      breadcrumbLabel="Color"
      data={colorData}
      columns={columns}
      minWidth="800px"
      onNew={() => console.log("Create new color")}
      onEdit={(row) => console.log("Edit color", row.id)}
      onDelete={(row) => console.log("Delete color", row.id)}
      onView={(row) => console.log("View color", row.id)}
    />
  );
}