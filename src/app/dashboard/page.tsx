import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar"

const user: SidebarUser = {
  name: "Masum Billah",
  email: "masum@example.com",
}

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <h1>Dashboard</h1>
        </main>
        <Footer />
      </div>
    </div>
  )
}