export default function ChatSidebar({
  chats,
  activeChatId,
  onSelect,
}) {
  return (
    <div className="w-[320px] border-l bg-card h-full overflow-y-auto">
      {chats.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          لا توجد محادثات
        </div>
      )}

      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat)}
          className={`w-full p-4 text-right border-b transition
            ${
              activeChatId === chat.id
                ? "bg-primary/10 border-primary"
                : "hover:bg-muted"
            }
          `}
        >
          <div className="font-semibold">محادثة العميل</div>
          <div className="text-xs text-muted-foreground">
            {chat.id}
          </div>
        </button>
      ))}
    </div>
  )
}
