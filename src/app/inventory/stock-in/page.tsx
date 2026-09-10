import DashboardShell from "@/components/layout/dashboard-shell";
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb";
import BasicInfo from "@/components/stock-in/basic-info";
import Documents from "@/components/stock-in/documents";
import Remarks from "@/components/stock-in/remarks";
import StockInActions from "@/components/stock-in/stock-in-actions";
import StockInProvider from "@/components/stock-in/stock-in-context";

export default function StockInPage() {
  return (
    <DashboardShell>
      <div>
        <Breadcrumb
          title="Warehouse FG"
          items={[
            { label: "Warehouse FG", href: "/inventory/stock-in" },
            { label: "Stock In", href: "/inventory/stock-in" },
          ]}
        />
      </div>
      <StockInProvider>
        <div className="mt-5 space-y-5 pb-8">
          <BasicInfo />
          <Documents />
          <Remarks />
          <StockInActions />
        </div>
      </StockInProvider>
    </DashboardShell>
  );
}