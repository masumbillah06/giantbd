// ---------------------------------------------------------------------------
// Stock Out List — mock data
// Seeded directly from reference records & expanded with realistic stock out entries
// ---------------------------------------------------------------------------

import { Check } from "lucide-react";
import type { ColumnDef } from "@/components/tables/ReusableTable.types";

export type StockOutStatus = "Issued" | "Pending" | "Received";
export type StockOutLabel = "issued" | "pending" | "received";

export interface StockOutItem {
  id: number;
  label: StockOutLabel;
  lcNo: string;
  poNo: string;
  buyer: string;
  destination: string;
  reqCreatedBy: string;
  reqDate: string;
  products: number;
  status: StockOutStatus;
}

export const stockOutColumns: ColumnDef<StockOutItem>[] = [
  {
    key: "label",
    label: "Label",
    render: (row) => {
      if (row.label === "issued") {
        return (
          <span
            title="Issued"
            className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-emerald-50 text-emerald-600 border border-emerald-300"
          >
            <Check className="h-3 w-3 stroke-[2.5]" />
          </span>
        );
      }
      if (row.label === "pending") {
        return (
          <span
            title="Pending"
            className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-amber-50 text-amber-500 border border-amber-300 text-xs font-bold leading-none"
          >
            !
          </span>
        );
      }
      return (
        <span
          title="Received"
          className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-[#3b66c4] text-white"
        >
          <Check className="h-3 w-3 stroke-[2.5]" />
        </span>
      );
    },
  },
  {
    key: "lcNo",
    label: "LC No",
    cellClassName: "whitespace-nowrap px-5 py-2 text-sm text-slate-950 group-hover:text-white font-medium",
  },
  {
    key: "poNo",
    label: "PO No",
    cellClassName: "whitespace-nowrap px-5 py-2 text-sm text-slate-950 group-hover:text-white font-medium",
  },
  {
    key: "buyer",
    label: "Buyer",
  },
  {
    key: "destination",
    label: "Destination",
  },
  {
    key: "reqCreatedBy",
    label: "Req. Created By",
  },
  {
    key: "reqDate",
    label: "Req. Date",
  },
  {
    key: "products",
    label: "Products",
  },
  {
    key: "status",
    label: "Status",
    render: (row) => {
      if (row.status === "Issued") {
        return (
          <span className="inline-block min-w-[72px] text-center rounded-md bg-[#059669] px-3 py-1 text-xs font-medium text-white shadow-xs">
            Issued
          </span>
        );
      }
      if (row.status === "Pending") {
        return (
          <span className="inline-block min-w-[72px] text-center rounded-md bg-[#eab308] px-3 py-1 text-xs font-medium text-white shadow-xs">
            Pending
          </span>
        );
      }
      return (
        <span className="inline-block min-w-[72px] text-center rounded-md bg-[#3b66c4] px-3 py-1 text-xs font-medium text-white shadow-xs">
          Received
        </span>
      );
    },
  },
];

/**
 * Exact reference rows from the Stock Out List, ordered by ID descending.
 */
export const SEED_STOCKOUT_DATA: StockOutItem[] = [
  {
    id: 34,
    label: "issued",
    lcNo: "400",
    poNo: "500",
    buyer: "APEX",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "08-09-26",
    products: 7,
    status: "Issued",
  },
  {
    id: 33,
    label: "issued",
    lcNo: "24524525",
    poNo: "4562345",
    buyer: "APEX",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "08-09-26",
    products: 10,
    status: "Issued",
  },
  {
    id: 32,
    label: "pending",
    lcNo: "Lc1111",
    poNo: "Po111",
    buyer: "APEX",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "08-09-26",
    products: 10,
    status: "Pending",
  },
  {
    id: 31,
    label: "pending",
    lcNo: "2435242",
    poNo: "24352345",
    buyer: "MAF",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "08-09-26",
    products: 10,
    status: "Pending",
  },
  {
    id: 30,
    label: "pending",
    lcNo: "400",
    poNo: "500",
    buyer: "APEX",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "08-09-26",
    products: 7,
    status: "Pending",
  },
  {
    id: 29,
    label: "pending",
    lcNo: "33",
    poNo: "55",
    buyer: "Alex Smith",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "08-09-26",
    products: 7,
    status: "Pending",
  },
  {
    id: 28,
    label: "pending",
    lcNo: "400",
    poNo: "500",
    buyer: "APEX",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "08-09-26",
    products: 7,
    status: "Pending",
  },
  {
    id: 27,
    label: "pending",
    lcNo: "400",
    poNo: "500",
    buyer: "APEX",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "08-09-26",
    products: 7,
    status: "Pending",
  },
  {
    id: 26,
    label: "pending",
    lcNo: "400",
    poNo: "500",
    buyer: "APEX",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "08-09-26",
    products: 7,
    status: "Pending",
  },
  {
    id: 25,
    label: "received",
    lcNo: "Replacement",
    poNo: "Replacement",
    buyer: "MAF",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "02-09-26",
    products: 10,
    status: "Received",
  },
  {
    id: 24,
    label: "received",
    lcNo: "2",
    poNo: "200",
    buyer: "POU HUNG",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "01-09-26",
    products: 7,
    status: "Received",
  },
  {
    id: 23,
    label: "received",
    lcNo: "1",
    poNo: "100",
    buyer: "Alex Smith",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "01-09-26",
    products: 7,
    status: "Received",
  },
  {
    id: 22,
    label: "received",
    lcNo: "45245456",
    poNo: "4645645",
    buyer: "POU HUNG",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "01-09-26",
    products: 10,
    status: "Received",
  },
  {
    id: 21,
    label: "received",
    lcNo: "2435242",
    poNo: "3453455",
    buyer: "MAF",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "31-08-26",
    products: 10,
    status: "Received",
  },
  {
    id: 20,
    label: "issued",
    lcNo: "2342",
    poNo: "2345234",
    buyer: "POU HUNG",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "29-08-26",
    products: 10,
    status: "Issued",
  },
  {
    id: 19,
    label: "received",
    lcNo: "Lc0123456",
    poNo: "PO3472972",
    buyer: "POU HUNG",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "22-08-26",
    products: 2,
    status: "Received",
  },
  {
    id: 18,
    label: "received",
    lcNo: "Lc0123456",
    poNo: "PO3472972",
    buyer: "POU HUNG",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "22-08-26",
    products: 10,
    status: "Received",
  },
  {
    id: 17,
    label: "issued",
    lcNo: "LC-2026-901",
    poNo: "PO-77123",
    buyer: "APEX",
    destination: "Warehouse North",
    reqCreatedBy: "Tashdik",
    reqDate: "20-08-26",
    products: 5,
    status: "Issued",
  },
  {
    id: 16,
    label: "pending",
    lcNo: "LC-2026-902",
    poNo: "PO-77124",
    buyer: "MAF",
    destination: "Central Hub",
    reqCreatedBy: "Super Admin",
    reqDate: "18-08-26",
    products: 8,
    status: "Pending",
  },
  {
    id: 15,
    label: "received",
    lcNo: "LC-2026-880",
    poNo: "PO-66230",
    buyer: "Alex Smith",
    destination: "Export Dock 3",
    reqCreatedBy: "Tashdik",
    reqDate: "15-08-26",
    products: 12,
    status: "Received",
  },
  {
    id: 14,
    label: "issued",
    lcNo: "LC-2026-875",
    poNo: "PO-66215",
    buyer: "POU HUNG",
    destination: "Retail Outlet 1",
    reqCreatedBy: "Super Admin",
    reqDate: "12-08-26",
    products: 6,
    status: "Issued",
  },
  {
    id: 13,
    label: "pending",
    lcNo: "LC-2026-870",
    poNo: "PO-66200",
    buyer: "APEX",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "10-08-26",
    products: 4,
    status: "Pending",
  },
  {
    id: 12,
    label: "received",
    lcNo: "LC-2026-850",
    poNo: "PO-55100",
    buyer: "MAF",
    destination: "Warehouse North",
    reqCreatedBy: "Super Admin",
    reqDate: "05-08-26",
    products: 15,
    status: "Received",
  },
  {
    id: 11,
    label: "issued",
    lcNo: "LC-2026-840",
    poNo: "PO-55080",
    buyer: "POU HUNG",
    destination: "Client Center",
    reqCreatedBy: "Tashdik",
    reqDate: "01-08-26",
    products: 9,
    status: "Issued",
  },
  {
    id: 10,
    label: "pending",
    lcNo: "LC-2026-830",
    poNo: "PO-55060",
    buyer: "Alex Smith",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "28-07-26",
    products: 3,
    status: "Pending",
  },
  {
    id: 9,
    label: "received",
    lcNo: "LC-2026-820",
    poNo: "PO-44020",
    buyer: "APEX",
    destination: "Central Hub",
    reqCreatedBy: "Super Admin",
    reqDate: "25-07-26",
    products: 11,
    status: "Received",
  },
  {
    id: 8,
    label: "issued",
    lcNo: "LC-2026-810",
    poNo: "PO-44010",
    buyer: "MAF",
    destination: "Warehouse North",
    reqCreatedBy: "Tashdik",
    reqDate: "20-07-26",
    products: 8,
    status: "Issued",
  },
  {
    id: 7,
    label: "pending",
    lcNo: "LC-2026-800",
    poNo: "PO-44000",
    buyer: "POU HUNG",
    destination: "-",
    reqCreatedBy: "Super Admin",
    reqDate: "15-07-26",
    products: 6,
    status: "Pending",
  },
  {
    id: 6,
    label: "received",
    lcNo: "LC-2026-790",
    poNo: "PO-33090",
    buyer: "APEX",
    destination: "Export Dock 3",
    reqCreatedBy: "Tashdik",
    reqDate: "10-07-26",
    products: 14,
    status: "Received",
  },
  {
    id: 5,
    label: "issued",
    lcNo: "LC-2026-780",
    poNo: "PO-33080",
    buyer: "Alex Smith",
    destination: "Client Center",
    reqCreatedBy: "Super Admin",
    reqDate: "05-07-26",
    products: 7,
    status: "Issued",
  },
  {
    id: 4,
    label: "pending",
    lcNo: "LC-2026-770",
    poNo: "PO-33070",
    buyer: "MAF",
    destination: "-",
    reqCreatedBy: "Tashdik",
    reqDate: "01-07-26",
    products: 5,
    status: "Pending",
  },
  {
    id: 3,
    label: "received",
    lcNo: "LC-2026-760",
    poNo: "PO-22050",
    buyer: "POU HUNG",
    destination: "Central Hub",
    reqCreatedBy: "Super Admin",
    reqDate: "25-06-26",
    products: 10,
    status: "Received",
  },
  {
    id: 2,
    label: "issued",
    lcNo: "LC-2026-750",
    poNo: "PO-22040",
    buyer: "APEX",
    destination: "Warehouse North",
    reqCreatedBy: "Tashdik",
    reqDate: "20-06-26",
    products: 8,
    status: "Issued",
  },
  {
    id: 1,
    label: "received",
    lcNo: "LC-2026-740",
    poNo: "PO-22030",
    buyer: "Alex Smith",
    destination: "Retail Outlet 1",
    reqCreatedBy: "Super Admin",
    reqDate: "15-06-26",
    products: 12,
    status: "Received",
  },
];

export const stockOutData: StockOutItem[] = SEED_STOCKOUT_DATA;
export default stockOutData;

