import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar"
import Breadcrumb from "@/components/ui/breadcrumbs/breadcrumb"

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
                { label: "Warehouse FG", href: "/inventory/stock-out" },
                { label: "Stock Out", href: "/inventory/stock-out" },
              ]}
            />

          </div>
          
        </main> 
        <Footer />
      </div>
    </div>
  )
}