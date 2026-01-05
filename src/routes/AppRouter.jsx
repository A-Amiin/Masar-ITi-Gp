import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Landing from "@/pages/Landing/Landing";
import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import AddUser from "@/pages/AddUser/AddUser";
import Agents from "@/pages/Agents/Agents";
import Customers from "@/pages/Customers/Customers";
import Tasks from "@/pages/Tasks/Tasks";
import Inventory from "@/pages/Inventory/Inventory";
import Orders from "@/pages/Orders/Orders";
import Reports from "@/pages/Reports/Reports";
import Chat from "@/pages/Chat/Chat";
import Issues from "@/pages/Issues/Issues";
import Settings from "@/pages/Settings/Settings";
import NotFound from "@/pages/NotFound/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
