import { Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutGrid, Users, User, MapPin, Box, ShoppingCart, FileText, MessageSquare, Settings, LogOut, ChevronLeft, UserPlus, Inbox, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import LogoutConfirmDialog from "@/components/components/LogoutConfirmDialog"
import useAuthStore from "@/store/authStore"

const menuItems = [
  { label: "لوحة التحكم", icon: LayoutGrid, route: "/dashboard" },
  { label: "إضافة مستخدم", icon: UserPlus, route: "/add-user" },
  { label: "المندوبين", icon: Users, route: "/agents" },
  { label: "العملاء", icon: User, route: "/customers" },
  { label: "توزيع المهام", icon: MapPin, route: "/tasks" },
  { label: "المخزون", icon: Box, route: "/inventory" },
  { label: "الطلبات", icon: ShoppingCart, route: "/orders" },
  { label: "التقارير", icon: FileText, route: "/reports" },
  { label: "الدردشة", icon: MessageSquare, route: "/chat" },
  { label: "طلبات الدعم", icon: Inbox, route: "/issues" },
  { label: "طلبات التوظيف", icon: Briefcase, route: "/premium-users" },
  { label: "الإعدادات", icon: Settings, route: "/settings" },
]

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const [logoutOpen, setLogoutOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <>
      <aside
        className={cn(
          "flex flex-col h-full border-l border-border dark:border-gray-800 bg-white dark:bg-background transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-border dark:border-muted-dark">
          {!collapsed && <span className="text-lg font-semibold">مسار</span>}

          <Button
            className="bg-accent hover:bg-accent/80 p-2 rounded-md"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <ChevronLeft
              className={cn(
                "w-5 h-5 transition-transform",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location.pathname === item.route

            return (
              <Link
                key={index}
                to={item.route}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm transition",
                  collapsed ? "justify-center" : "gap-3",
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-muted dark:hover:bg-muted-dark"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-border dark:border-muted-dark">
          <button
            onClick={() => setLogoutOpen(true)}
            className={cn(
              "w-full flex items-center px-4 py-3 rounded-xl text-sm transition",
              collapsed ? "justify-center" : "gap-3",
              "text-muted-foreground hover:bg-muted dark:hover:bg-muted-dark"
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && "تسجيل الخروج"}
          </button>
        </div>
      </aside>

      {/* Logout Dialog */}
      <LogoutConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={handleLogout}
      />
    </>
  )
}

export default Sidebar