"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { subCategoryData, columns, type SubCategoryRecord } from "@/lib/attribute-data/sub-category-data";

export default function SubCategoryPage() {
  return (
    <CrudPageTemplate<SubCategoryRecord>
      title="Sub Category"
      breadcrumbLabel="Sub Category"
      data={subCategoryData}
      columns={columns}
      minWidth="1000px"
      onNew={() => console.log("Create new sub category")}
      onEdit={(row) => console.log("Edit sub category", row.id)}
      onDelete={(row) => console.log("Delete sub category", row.id)}
      onView={(row) => console.log("View sub category", row.id)}
    />
  );
}