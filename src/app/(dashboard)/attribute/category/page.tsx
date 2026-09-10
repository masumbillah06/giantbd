"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { categoryData, columns, type CategoryRecord } from "@/lib/attribute-data/category-data";

export default function CategoryPage() {
  return (
    <CrudPageTemplate<CategoryRecord>
      title="Category"
      breadcrumbLabel="Category"
      data={categoryData}
      columns={columns}
      minWidth="800px"
      onNew={() => console.log("Create new category")}
      onEdit={(row) => console.log("Edit category", row.id)}
      onDelete={(row) => console.log("Delete category", row.id)}
      onView={(row) => console.log("View category", row.id)}
    />
  );
}