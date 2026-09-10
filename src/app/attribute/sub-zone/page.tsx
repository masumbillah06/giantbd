"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { subZoneData, columns, type SubZoneRecord } from "@/lib/attribute-data/sub-zone-data";

export default function SubZonePage() {
  return (
    <CrudPageTemplate<SubZoneRecord>
      title="Sub Zone"
      breadcrumbLabel="Sub Zone"
      data={subZoneData}
      columns={columns}
      minWidth="1000px"
      onNew={() => console.log("Create new sub zone")}
      onEdit={(row) => console.log("Edit sub zone", row.id)}
      onDelete={(row) => console.log("Delete sub zone", row.id)}
      onView={(row) => console.log("View sub zone", row.id)}
    />
  );
}