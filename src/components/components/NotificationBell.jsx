import { Bell } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { listenToChatNotifications } from "@/services/chat.service"

const ADMIN_ID = "ADMIN_ID_FROM_AUTH"

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsub = listenToChatNotifications(
      ADMIN_ID,
      setNotifications
    )

    return () => unsub && unsub()
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="relative flex items-center justify-center h-9 w-9 rounded-full hover:bg-muted"
      >
        <Bell size={20} />

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-background border rounded-md shadow-lg z-50">
          {notifications.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground text-center">
              لا توجد إشعارات
            </p>
          ) : (
            notifications.map((n, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate(`/chat?chatId=${n.chatId}`)
                  setOpen(false)
                }}
                className="w-full text-right p-3 hover:bg-muted text-sm"
              >
                <div className="font-medium">
                  {n.representativeName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {n.content}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}