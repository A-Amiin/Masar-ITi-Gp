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
        اختر محادثة لبدء الشات
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      <ChatHeader chatId={selectedChat.id} />

      <MessagesList
        messages={messages}
        currentUserId={currentUserId}
      />

      <MessageForm onSend={onSendMessage} />
    </div>
  )
}
