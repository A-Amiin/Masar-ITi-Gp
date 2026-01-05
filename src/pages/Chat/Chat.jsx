import { useEffect, useState } from "react"
import {
  listenToMessages,
  sendMessage,
} from "@/services/chat.service"

import ChatWindow from "./components/ChatWindow"

const CHAT_ID = "chat_001"
const CURRENT_USER_ID = "AGENT_ID_FROM_AUTH"

export default function Chat() {
  const [messages, setMessages] = useState([])

  // ✅ Listen مباشرة على chat_001
  useEffect(() => {
    const unsub = listenToMessages(CHAT_ID, setMessages)
    return () => unsub()
  }, [])

  const handleSend = async (content) => {
    await sendMessage({
      chatId: CHAT_ID,
      senderId: CURRENT_USER_ID,
      content,
    })
  }

  return (
    <div className="h-[calc(100vh-64px)]" dir="rtl">
      <ChatWindow
        selectedChat={{ id: CHAT_ID }}
        messages={messages}
        currentUserId={CURRENT_USER_ID}
        onSendMessage={handleSend}
      />
    </div>
  )
}
