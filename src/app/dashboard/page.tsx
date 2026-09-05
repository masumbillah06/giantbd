import InventoryTables from "@/components/dashboard/inventory-tables"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar"
import Breadcrumb from "@/components/ui/breadcrumb"
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
        <main className="min-h-0 flex-1 overflow-y-auto p-6">
          {/* <h1>Dashboard</h1> */}
          <div>
            <Breadcrumb />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="down" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
            <StatCard title="Total Users" value={1000} unit="users" breakdown="0 Bat | 0 Mas | 0 Var" trend="up" />
          </div>
          <div className="mt-4 h-[400px] w-full rounded-lg border bg-card p-4">
            <ChartLineMultiple />
          </div>
          <div className="mt-4 h-[500px] w-full flex justify-between items-center rounded-lg border bg-card p-4 gap-5">
            <div className="w-[33%] h-full">
              <ChartBarDefault />
            </div>
            <div className="w-[33%] h-full">
              <ChartPieDonut />
            </div>
            <div className="w-[33%] h-full">
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