"use client";

import { ClipboardList, Package, Truck, Printer } from "lucide-react";
import { ActionButton } from "@/components/ui/buttons/action-button";
import { ActionButtonGroup } from "@/components/ui/buttons/action-button-group";

type StockInRow = {
  id: number;
  productName: string;
  batchNo: string;
  material: string;
  received: number;
  issued: number;
  blocked: number;
  shipable: number;
  pkgQty: number;
  agingZone: string;
  agingChange: string;
};

type RequisitionRow = {
  id: number;
  labelColor: "green" | "purple";
  lcNo: string;
  poNo: string;
  reqType: string;
  customer: string;
  reqDate: string;
  dueDate: string;
  requester: string;
  product: number;
  quantity: number;
  status: "Issued" | "Received";
  actions?: Array<"clipboard" | "package" | "truck" | "print">;
};

const stockInData: StockInRow[] = [
  {
    id: 264,
    productName: "Test000 48 Silver Male",
    batchNo: "B20260902-00039",
    material: "Poly",
    received: 10000,
    issued: 0,
    blocked: 0,
    shipable: 10000,
    pkgQty: 1000,
    agingZone: "3 Days",
    agingChange: "178 Days",
  },
  {
    id: 263,
    productName: "Test000 47 Silver Male",
    batchNo: "B20260902-00039",
    material: "Poly",
    received: 10000,
    issued: 0,
    blocked: 0,
    shipable: 10000,
    pkgQty: 1000,
    agingZone: "3 Days",
    agingChange: "178 Days",
  },
  {
    id: 262,
    productName: "Test000 46 Silver Male",
    batchNo: "B20260902-00039",
    material: "Poly",
    received: 10000,
    issued: 0,
    blocked: 0,
    shipable: 10000,
    pkgQty: 1000,
    agingZone: "3 Days",
    agingChange: "178 Days",
  },
  {
    id: 261,
    productName: "Test000 45 Silver Male",
    batchNo: "B20260902-00039",
    material: "Poly",
    received: 10000,
    issued: 500,
    blocked: 0,
    shipable: 9500,
    pkgQty: 950,
    agingZone: "3 Days",
    agingChange: "178 Days",
  },
  {
    id: 260,
    productName: "Test000 44 Silver Male",
    batchNo: "B20260902-00039",
    material: "Poly",
    received: 10000,
    issued: 5000,
    blocked: 0,
    shipable: 5000,
    pkgQty: 500,
    agingZone: "3 Days",
    agingChange: "178 Days",
  },
];

const requisitionData: RequisitionRow[] = [
  {
    id: 25,
    labelColor: "green",
    lcNo: "Replacement.",
    poNo: "Replacement",
    reqType: "Partial(7)",
    customer: "MAF",
    reqDate: "02-09-26",
    dueDate: "-",
    requester: "Super Admin",
    product: 10,
    quantity: 100000,
    status: "Issued",
    actions: ["clipboard", "package", "truck", "print"],
  },
  {
    id: 24,
    labelColor: "green",
    lcNo: "2",
    poNo: "200",
    reqType: "Partial(1)",
    customer: "POU HUNG",
    reqDate: "01-09-26",
    dueDate: "-",
    requester: "Tashdik",
    product: 7,
    quantity: 100,
    status: "Issued",
    actions: ["clipboard", "package", "truck", "print"],
  },
  {
    id: 23,
    labelColor: "purple",
    lcNo: "1",
    poNo: "100",
    reqType: "Partial(1)",
    customer: "Alex Smith",
    reqDate: "01-09-26",
    dueDate: "-",
    requester: "Tashdik",
    product: 7,
    quantity: 145,
    status: "Received",
    actions: ["clipboard", "truck", "print"],
  },
  {
    id: 22,
    labelColor: "purple",
    lcNo: "45245456",
    poNo: "4645645",
    reqType: "Partial(1)",
    customer: "POU HUNG",
    reqDate: "01-09-26",
    dueDate: "-",
    requester: "Super Admin",
    product: 10,
    quantity: 47691,
    status: "Received",
    actions: ["clipboard", "truck", "print"],
  },
  {
    id: 21,
    labelColor: "purple",
    lcNo: "2435242",
    poNo: "3453455",
    reqType: "Partial(2)",
    customer: "MAF",
    reqDate: "31-08-26",
    dueDate: "-",
    requester: "Super Admin",
    product: 10,
    quantity: 6040,
    status: "Received",
    actions: ["clipboard", "truck", "print"],
  },
];



function StatusPill({ status }: { status: "Issued" | "Received" }) {
  const styles =
    status === "Issued"
      ? "bg-emerald-500"
      : "bg-indigo-500";

  return (
    <span className={`inline-block rounded-md px-3.5 py-1.5 text-xs font-semibold text-white ${styles}`}>
      {status}
    </span>
  );
}

function LabelCheck({ color }: { color: "green" | "purple" }) {
  const styles =
    color === "green"
      ? "bg-emerald-100 text-emerald-600"
      : "bg-indigo-500 text-white";

  return (
    <span className={`flex h-5.5 w-5.5 items-center justify-center rounded-full text-xs ${styles}`}>
      ✓
    </span>
  );
}

export default function InventoryTables() {
  return (
    <div className="bg-[var(--color-bg)]">
      {/* Recent FG Stock In */}
      <div className="rounded-xl bg-[var(--color-bg)] overflow-hidden">
        <div className="flex items-center justify-between py-4">
          <div className="bg-white h-7 w-auto px-3 flex items-center justify-center rounded-md shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">Recent FG Stock In</h2>
          </div>
          <button
            type="button"
            className="rounded-md bg-indigo-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-600 transition-colors"
          >
            + New
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead className="bg-slate-100">
              <tr>
                {[
                  "ID",
                  "Product Name",
                  "Batch No",
                  "Material",
                  "Received",
                  "Issued",
                  "Blocked",
                  "Shipable",
                  "Pkg Qty",
                  "Location",
                  "Aging Zone",
                  "Aging Change",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap border-b border-slate-100 px-5 py-3.5 text-left text-xs font-bold text-slate-900"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockInData.map((row) => (
                <tr key={row.id} className="group border-b border-slate-100 last:border-b-0 hover:bg-[#476ab8]">
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800 group-hover:text-white">{row.id}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.productName}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.batchNo}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.material}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.received}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800 group-hover:text-white">{row.issued}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.blocked}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.shipable}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.pkgQty}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <a href="#" className="text-blue-500 underline">
                      View
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-emerald-500">
                    {row.agingZone}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.agingChange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Requisition For Shipment */}
      <div className="rounded-xl bg-[var(--color-bg)] overflow-hidden mt-4">
        <div className="flex items-center justify-between py-4">
          <div className="bg-white h-7 w-auto px-3 flex items-center justify-center rounded-md shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">Requsition For Shipment</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead className="bg-slate-100">
              <tr>
                {[
                  "ID",
                  "Label",
                  "LC No",
                  "PO No",
                  "Req. Type",
                  "Customer",
                  "Req. Date",
                  "Due Date",
                  "Requester",
                  "Product",
                  "Quantity",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap border-b border-slate-100 px-5 py-3.5 text-left text-xs font-bold text-slate-900"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requisitionData.map((row) => (
                <tr key={row.id} className="group border-b border-slate-100 last:border-b-0 hover:bg-[#476ab8]">
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.id}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <LabelCheck color={row.labelColor} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.lcNo}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.poNo}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-slate-700 group-hover:text-white">
                    {row.reqType}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.customer}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.reqDate}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.dueDate}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.requester}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.product}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-700 group-hover:text-white">{row.quantity}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <ActionButtonGroup aria-label={`Actions for requisition ${row.id}`}>
                      <ActionButton label="Packing List" icon={ClipboardList} />
                      {row.status.toLowerCase() === "issued" && (
                        <ActionButton label="Delivery Requisition" icon={Package} />
                      )}
                      <ActionButton label="Delivery Details" icon={Truck} />
                      <ActionButton label="Print Details" icon={Printer} />
                    </ActionButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}