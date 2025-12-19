import { useState } from "react";
import AppNavbar from "@/components/components/AppNavbar";
import Sidebar from "@/components/components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div dir="rtl" className="h-screen bg-gray-100 dark:bg-background">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-white dark:bg-background border-b border-border dark:border-muted-dark shadow-sm">
        <AppNavbar />
      </header>

      {/* Layout under navbar */}
      <div className="flex pt-16 h-full transition-all duration-300">
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-4rem)] transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;