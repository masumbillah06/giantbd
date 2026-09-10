import type { ColumnDef } from "@/components/tables-1/ReusableTable.types";

export interface WarehouseRecord {
  id: number;
  name: string;
  code: string;
  description: string;
}

export const warehouseData: WarehouseRecord[] = [
  {
    id: 3,
    name: "Mirpur",
    code: "3242424",
    description: "-",
  },
  {
    id: 2,
    name: "Gazipur",
    code: "4573",
    description: "Gazipur Main branch",
  },
  {
    id: 1,
    name: "WarehouseFG",
    code: "-",
    description: "-",
  },
];

export const columns: ColumnDef<WarehouseRecord>[] = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "description", label: "Description" },
];

