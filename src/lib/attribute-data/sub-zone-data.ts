import type { ColumnDef } from "@/components/tables-1/ReusableTable.types";

export interface SubZoneRecord {
  id: number;
  name: string;
  code: string;
  zone: string;
  description: string;
}

export const subZoneData: SubZoneRecord[] = [
  {
    id: 4,
    name: "Solimuddin Market",
    code: "-",
    zone: "Mirpur 1",
    description: "-",
  },
  {
    id: 3,
    name: "College Gate",
    code: "1234",
    zone: "Tongi Zone",
    description: "-",
  },
  {
    id: 2,
    name: "SubZone2",
    code: "-",
    zone: "Zone1",
    description: "-",
  },
  {
    id: 1,
    name: "SubZone1",
    code: "-",
    zone: "Zone1",
    description: "-",
  },
];

export const columns: ColumnDef<SubZoneRecord>[] = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "zone", label: "Zone" },
  { key: "description", label: "Description" },
];

