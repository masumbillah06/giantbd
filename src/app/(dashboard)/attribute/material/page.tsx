"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { materialData, columns, type MaterialRecord } from "@/lib/attribute-data/material-data";

export default function MaterialPage() {
  return (
    <CrudPageTemplate<MaterialRecord>
      title="Material"
      breadcrumbLabel="Material"
      data={materialData}
      columns={columns}
      minWidth="800px"
      onNew={() => console.log("Create new material")}
      onEdit={(row) => console.log("Edit material", row.id)}
      onDelete={(row) => console.log("Delete material", row.id)}
      onView={(row) => console.log("View material", row.id)}
    />
  );
}