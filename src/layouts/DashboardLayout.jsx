import Sidebar from "@/components/components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gray-100 dark:bg-background">
    <div className="w-full bg-black text-white dark:bg-slate-900 shadow-md p-4">
      Header
    </div>
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside dir="rtl"
      className="
        bg-white dark:bg-background-dark
        border-l border-border dark:border-muted-dark
        flex flex-col
      ">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  </div>
  );
};

export default DashboardLayout;