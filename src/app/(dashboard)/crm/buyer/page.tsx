"use client";

import React, { useState, useMemo } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";
import TableToolbar from "@/components/ui/table-toolbar";
import PaginatedTable from "@/components/ui/tables/paginated-table";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { Eye, PenSquareIcon, Trash2 } from "lucide-react";
import {
  customerData,
  columns,
  type CustomerRecord,
} from "@/lib/attribute-data/buyer-data";

export default function BuyerPage() {
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return customerData;
    const query = searchValue.toLowerCase();
    return customerData.filter((row) =>
      Object.values(row).some((val) =>
        String(val ?? "").toLowerCase().includes(query)
      )
    );
  }, [searchValue]);

  return (
    <>
      <div className="min-h-20 w-full flex justify-between items-center bg-white shadow-sm rounded-xl">
        <div>
          <Breadcrumb
            title="CRM"
            items={[
              { label: "CRM", href: "/crm/buyer" },
              { label: "Customer", href: "/crm/buyer" },
            ]}
          />
        </div>
        <div>
          <TableToolbar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onNew={() => console.log("Create new customer")}
            newButtonLabel="New Customer"
          />
        </div>
      </div>

      <div className="mt-4">
        <PaginatedTable<CustomerRecord>
          data={filteredData}
          columns={columns}
          pageSize={pageSize}
          minWidth="1200px"
          actionsLabel="Action"
          renderActions={(row) => (
            <ActionButtonGroup aria-label={`Actions for customer ${row.id}`}>
              <ActionButton
                label="View Customer"
                icon={Eye}
                onClick={() => console.log("View customer", row.id)}
              />
              <ActionButton
                label="Edit Customer"
                icon={PenSquareIcon}
                onClick={() => console.log("Edit customer", row.id)}
              />
              <ActionButton
                label="Delete Customer"
                icon={Trash2}
                onClick={() => console.log("Delete customer", row.id)}
              />
            </ActionButtonGroup>
          )}
        />
      </div>
    </>
  );
}