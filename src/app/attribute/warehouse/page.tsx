"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { warehouseData, columns, type WarehouseRecord } from "@/lib/attribute-data/warehouse-data";

export default function WarehousePage() {
  return (
    <CrudPageTemplate<WarehouseRecord>
      title="Warehouse"
      breadcrumbLabel="Warehouse"
      data={warehouseData}
      columns={columns}
      minWidth="900px"
      onNew={() => console.log("Create new warehouse")}
      onEdit={(row) => console.log("Edit warehouse", row.id)}
      onDelete={(row) => console.log("Delete warehouse", row.id)}
      onView={(row) => console.log("View warehouse", row.id)}
    />
  );
}