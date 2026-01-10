import ChatHeader from "./ChatHeader"
import MessagesList from "./MessagesList"
import MessageForm from "./MessageForm"

export default function ChatWindow({
  selectedChat,
  messages,
  currentUserId,
  onSendMessage,
}) {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        اختر مندوب لبدء المحادثة
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader representative={selectedChat.representative} />

      <MessagesList
        messages={messages}
        currentUserId={currentUserId}
      />

      <MessageForm onSend={onSendMessage} />
    </div>
  )
}