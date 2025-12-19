import { Sun, Moon } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <div dir="ltr" className="flex items-center gap-2">
      <Sun
        className={`w-4 h-4 transition ${
          theme === "light"
            ? "text-yellow-500"
            : "text-muted-foreground"
        }`}
      />

      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="
          data-[state=checked]:bg-primary
          data-[state=unchecked]:bg-muted
        "
      />

      <Moon
        className={`w-4 h-4 transition ${
          theme === "dark"
            ? "text-blue-400"
            : "text-muted-foreground"
        }`}
      />
    </div>
  )
}