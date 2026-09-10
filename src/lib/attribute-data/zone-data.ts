import type { ColumnDef } from "@/components/tables/ReusableTable.types";

export interface ZoneRecord {
  id: number;
  name: string;
  code: string;
  warehouse: string;
  description: string;
}

export const zoneData: ZoneRecord[] = [
  {
    id: 3,
    name: "Mirpur 1",
    code: "-",
    warehouse: "Mirpur",
    description: "-",
  },
  {
    id: 2,
    name: "Tongi Zone",
    code: "1234",
    warehouse: "Gazipur",
    description: "-",
  },
  {
    id: 1,
    name: "Zone1",
    code: "-",
    warehouse: "WarehouseFG",
    description: "-",
  },
];

export const columns: ColumnDef<ZoneRecord>[] = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "warehouse", label: "Warehouse" },
  { key: "description", label: "Description" },
];

