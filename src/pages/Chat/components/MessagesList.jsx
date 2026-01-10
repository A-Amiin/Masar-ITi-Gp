import { useEffect, useRef } from "react"
import { Check, CheckCheck } from "lucide-react"

function formatDayLabel(date) {
  const today = new Date()
  const msgDate = new Date(date)

  const isToday =
    msgDate.toDateString() === today.toDateString()

  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  const isYesterday =
    msgDate.toDateString() === yesterday.toDateString()

  if (isToday) return "Today"
  if (isYesterday) return "Yesterday"

  return msgDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function MessagesList({ messages, currentUserId }) {
  const bottomRef = useRef(null)
  let lastDate = null

  // ✅ Auto scroll جوه الشات فقط
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId

        const msgDate = msg.timestamp?.toDate
          ? msg.timestamp.toDate()
          : null

        const showDateSeparator =
          msgDate &&
          (!lastDate ||
            lastDate.toDateString() !== msgDate.toDateString())

        if (msgDate) lastDate = msgDate

        return (
          <div key={msg.id} className="space-y-2">
            {/* ===== Date Separator ===== */}
            {showDateSeparator && (
              <div className="flex justify-center my-2">
                <span className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                  {formatDayLabel(msgDate)}
                </span>
              </div>
            )}

            {/* ===== Message ===== */}
            <div
              className={`flex ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 text-sm
                  ${
                    isMe
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground"
                  }
                `}
              >
                <div className="flex items-end gap-2">
                  {/* Message Text */}
                  <span>{msg.content}</span>

                  {/* Time + Status */}
                  <div className="flex items-center gap-1">
                    {/* Timestamp */}
                    <span className="text-[10px] opacity-70 whitespace-nowrap">
                      {msgDate
                        ? msgDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>

                    {/* ✔ Sent / Delivered / Seen (للأدمن بس) */}
                    {isMe && (
                      <>
                        {!msg.delivered && (
                          <Check size={14} className="opacity-70" />
                        )}

                        {msg.delivered && !msg.seen && (
                          <CheckCheck size={14} className="opacity-70" />
                        )}

                        {msg.seen && (
                          <CheckCheck
                            size={14}
                            className="text-blue-400"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div ref={bottomRef} />
    </div>
  )
}