import AppNavbar from "@/components/components/AppNavbar"
import Sidebar from "@/components/components/Sidebar"
import { Outlet } from "react-router-dom"

const NAVBAR_HEIGHT = "64px"

const DashboardLayout = () => {
  return (
    <div dir="rtl" className="h-screen bg-gray-100 dark:bg-background">
      
      {/* Navbar */}
      <header
        className="
          fixed top-0 inset-x-0 z-50
          h-16
          bg-white dark:bg-background
          border-b border-border dark:border-muted-dark
          shadow-sm
        "
      >
        <AppNavbar />
      </header>

      {/* Layout under navbar */}
      <div
        className="flex pt-16 h-full"
      >
        {/* Sidebar */}
        <div
          className="
            fixed top-16 bottom-0 right-0
            flex flex-col border-l border-border dark:border-gray-700
          "
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main
          className="
            mr-64
            flex-1
            p-6
            overflow-y-auto
            h-[calc(100vh-4rem)]
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout