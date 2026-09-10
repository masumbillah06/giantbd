"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { zoneData, columns, type ZoneRecord } from "@/lib/attribute-data/zone-data";

export default function ZonePage() {
  return (
    <CrudPageTemplate<ZoneRecord>
      title="Zone"
      breadcrumbLabel="Zone"
      data={zoneData}
      columns={columns}
      minWidth="1000px"
      onNew={() => console.log("Create new zone")}
      onEdit={(row) => console.log("Edit zone", row.id)}
      onDelete={(row) => console.log("Delete zone", row.id)}
      onView={(row) => console.log("View zone", row.id)}
    />
  );
}