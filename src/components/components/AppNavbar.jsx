import { Link } from "react-router-dom"
import useInitTheme from "@/hooks/useInitTheme"
import { useAdminUser } from "@/hooks/useAdminUser"
import PopOver from "@/pages/Issues/components/PopOver"
import UserAvatarDialog from "@/components/components/UserAvatarDialog"
import ThemeToggle from "./ThemeToggle"

const AppNavbar = () => {
  const { user, loading } = useAdminUser()
  const { theme, toggleTheme } = useInitTheme();
  if (loading) return null
  
  return (
    <header className="
      container-2xl mx-auto px-4
      h-16 w-full
      border-b border-border dark:border-muted-dark
      bg-background dark:bg-background-dark
      flex items-center justify-between
    ">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="flex items-center gap-2">
        <img src="/masar-logo.png" alt="logo" className="h-20" />
        </Link>
      </div>

      {/* Right */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Issues */}
          <PopOver />
          {/* Dark mode switch */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
          {/* User Avatar */}
          <UserAvatarDialog user={user} />
        </div>
      )}
    </header>
  )
}

export default AppNavbar