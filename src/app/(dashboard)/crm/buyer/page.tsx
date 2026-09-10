"use client";

import React from "react";
import { CrudPageTemplate } from "@/components/templates/crud-page-template";
import { customerData, columns, type CustomerRecord } from "@/lib/attribute-data/buyer-data";

export default function BuyerPage() {
  return (
    <CrudPageTemplate<CustomerRecord>
      title="CRM"
      breadcrumbLabel="Customer"
      breadcrumbItems={[
        { label: "CRM", href: "/crm/buyer" },
        { label: "Customer", href: "/crm/buyer" },
      ]}
      data={customerData}
      columns={columns}
      minWidth="1200px"
      newButtonLabel="New Customer"
      onNew={() => console.log("Create new customer")}
      onEdit={(row) => console.log("Edit customer", row.id)}
      onDelete={(row) => console.log("Delete customer", row.id)}
      onView={(row) => console.log("View customer", row.id)}
    />
  );
}