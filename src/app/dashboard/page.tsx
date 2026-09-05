import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar"
import { ChartLineMultiple } from "@/components/ui/dashboard/line-chart"
import StatCard from "@/components/ui/dashboard/stat-card"

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Sidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <h1>Dashboard</h1>
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
            <ChartLineMultiple  />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}