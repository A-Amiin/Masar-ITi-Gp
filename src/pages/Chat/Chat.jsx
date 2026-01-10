import { useEffect, useState } from "react"
import { listenToMessages, sendMessage } from "@/services/chat.service"
import { listenToRepresentatives } from "@/services/representatives.service"

import ChatSidebar from "./components/ChatSidebar"
import ChatWindow from "./components/ChatWindow"

const CURRENT_USER_ID = "ADMIN"

export default function Chat() {
  const [representatives, setRepresentatives] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState([])

  /* ===== Load Representatives ===== */
  useEffect(() => {
    const unsub = listenToRepresentatives(setRepresentatives)
    return () => unsub()
  }, [])

  /* ===== Load Messages When Chat Changes ===== */
  useEffect(() => {
    if (!activeChat) return

    const unsub = listenToMessages(activeChat.id, setMessages)
    return () => unsub()
  }, [activeChat])

  /* ===== Send Message ===== */
  const handleSendMessage = async (content) => {
    if (!activeChat) return

    await sendMessage({
      chatId: activeChat.id,      // = representative.id
      senderId: "ADMIN",
      content,
    })
  }

  return (
    <div className="flex h-full" dir="rtl">
      {/* Sidebar */}
      <ChatSidebar
        representatives={representatives}
        activeChatId={activeChat?.id}
        onSelect={(rep) =>
          setActiveChat({
            id: rep.id,
            representative: rep,
          })
        }
      />

      {/* Chat Window */}
      <ChatWindow
        selectedChat={activeChat}
        messages={messages}
        currentUserId={CURRENT_USER_ID}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}