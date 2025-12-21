import { LogOut, User } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAdminUser } from "@/hooks/useAdminUser"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useInitTheme from "@/hooks/useInitTheme"
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
        <img src="/masar-logo.png" alt="logo" className="h-20" />
      </div>

      {/* Right */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Dark mode switch */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
            
          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>

            <div className="leading-tight text-right">
              <p className="text-sm font-medium text-foreground">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Admin
              </p>
            </div>
          </div>

        </div>
      )}
    </header>
  )
}

export default AppNavbar