"use client";

import { ClipboardList, Package, Truck, Printer } from "lucide-react";

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
  actions: Array<"clipboard" | "package" | "truck" | "print">;
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

function ActionIcon({ type }: { type: "clipboard" | "package" | "truck" | "print" }) {
  const iconClass = "h-4 w-4 text-slate-500";
  const icon =
    type === "clipboard" ? (
      <ClipboardList className={iconClass} />
    ) : type === "package" ? (
      <Package className={iconClass} />
    ) : type === "truck" ? (
      <Truck className={iconClass} />
    ) : (
      <Printer className={iconClass} />
    );

  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
    >
      {icon}
    </button>
  );
}

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
                <tr key={row.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.id}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.productName}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.batchNo}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.material}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.received}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.issued}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.blocked}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.shipable}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.pkgQty}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <a href="#" className="text-blue-500 underline">
                      View
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-emerald-500">
                    {row.agingZone}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.agingChange}</td>
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
                <tr key={row.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.id}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <LabelCheck color={row.labelColor} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-blue-500">{row.lcNo}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-blue-500">{row.poNo}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm font-medium text-blue-500">
                    {row.reqType}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.customer}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.reqDate}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.dueDate}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.requester}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.product}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm text-slate-800">{row.quantity}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-sm">
                    <div className="flex gap-2">
                      {row.actions.map((action, i) => (
                        <ActionIcon key={i} type={action} />
                      ))}
                    </div>
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