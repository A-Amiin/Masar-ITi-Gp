export default function ChatHeader({ chatId }) {
  return (
    <div className="border-b p-4 text-right">
      <div className="font-semibold">محادثة العميل</div>
      <div className="text-xs text-muted-foreground">
        {chatId}
      </div>
    </div>
  )
}
