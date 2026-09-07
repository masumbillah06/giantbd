import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Sidebar, type SidebarUser } from "@/components/sidebar/sidebar"

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
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="flex h-20 w-full rounded-xl shadow flex-col justify-center overflow-hidden bg-white">
            <div className="px-4">
              <h1 className="text-lg font-semibold">User</h1>
              <div className="text-sm text-gray-500">
                User
              </div>
            </div>
          </div>
          <div>

          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}