export default function MessagesList({
  messages,
  currentUserId,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId

        return (
          <div
            key={msg.id}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm
              ${
                isMe
                  ? "ml-auto bg-primary text-white"
                  : "mr-auto bg-muted"
              }
            `}
          >
            {msg.content}
          </div>
        )
      })}
    </div>
  )
}
