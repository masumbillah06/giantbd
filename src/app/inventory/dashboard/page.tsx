import InventoryTables from "@/components/dashboard/inventory-tables"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar"
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb"
import { ChartBarDefault } from "@/components/ui/dashboard/bar-chart"
import { ChartPieDonut } from "@/components/ui/dashboard/donut-chart"
import { ChartLineMultiple } from "@/components/ui/dashboard/line-chart"
import { ChartPieSimple } from "@/components/ui/dashboard/pie-chart"
import StatCard from "@/components/ui/dashboard/stat-card"

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
}

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Sidebar user={user} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto p-5">
          <div>
            <Breadcrumb
              title="Warehouse FG"
              items={[
                { label: "Warehouse FG", href: "/inventory/dashboard" },
                { label: "Dashboard", href: "/inventory/dashboard" },
              ]}
            />

          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard title="Daily In" value="0" unit="Pairs" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Weekly In" value="30" unit="Pairs" breakdown="1 Bat | 1 Mas | 2 Var" trend="up" />
            <StatCard title="Monthly In" value="148,016" unit="Pairs" breakdown="5 Bat | 3 Mas | 28 Var" trend="up" />
            <StatCard title="Yearly In" value="21,795,941" unit="Pairs" breakdown="41 Bat | 12 Mas | 271 Var" trend="up" />
            <StatCard title="Total In" value="21,795,941" unit="Pairs" breakdown="41 Bat | 12 Mas | 271 Var" trend="up" />
            <StatCard title="Daily Out" value="0" unit="Pairs" breakdown="0 Bat | 0 Mas | 0 Var" trend="down" />
            <StatCard title="Weekly Out" value="519" unit="Pairs" breakdown="3 Bat | 2 Mas | 4 Var" trend="down" />
            <StatCard title="Monthly Out" value="735" unit="Pairs" breakdown="4 Bat | 3 Mas | 12 Var" trend="down" />
            <StatCard title="Yearly Out" value="147,126" unit="Pairs" breakdown="27 Bat | 11 Mas | 92 Var" trend="down" />
            <StatCard title="Total Out" value="147,126" unit="Pairs" breakdown="27 Bat | 11 Mas | 92 Var" trend="down" />
          </div>
          {/* Main Inventory Trends Chart */}
          <div className="mt-4 h-[340px] w-full">
            <ChartLineMultiple />
          </div>

          {/* Inventory Breakdown Charts */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:h-[280px]">
            <div className="h-[280px] lg:h-full w-full">
              <ChartBarDefault />
            </div>
            <div className="h-[280px] lg:h-full w-full">
              <ChartPieDonut />
            </div>
            <div className="h-[280px] lg:h-full w-full">
              <ChartPieSimple />
            </div>
          </div>
          <div className="mt-4">
            <InventoryTables />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}