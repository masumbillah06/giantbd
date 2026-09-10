"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { rackData, columns, type RackRecord } from "@/lib/attribute-data/rack-data";

export default function RackPage() {
  return (
    <CrudPageTemplate<RackRecord>
      title="Rack"
      breadcrumbLabel="Rack"
      data={rackData}
      columns={columns}
      minWidth="1000px"
      onNew={() => console.log("Create new rack")}
      onEdit={(row) => console.log("Edit rack", row.id)}
      onDelete={(row) => console.log("Delete rack", row.id)}
      onView={(row) => console.log("View rack", row.id)}
    />
  );
}