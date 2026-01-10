export default function ChatSidebar({
  representatives = [],
  activeChatId,
  onSelect,
}) {
  return (
    <aside className="w-72 border-l bg-background flex flex-col">
      <div className="p-4 font-semibold border-b">
        الدردشة
      </div>

      <div className="flex-1 overflow-y-auto">
        {representatives.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">
            لا يوجد مناديب
          </div>
        )}

        {representatives.map((rep) => (
          <button
            key={rep.id}
            onClick={() => onSelect(rep)}
            className={`w-full text-right px-4 py-3 border-b hover:bg-muted
              ${activeChatId === rep.id ? "bg-muted" : ""}
            `}
          >
            <div className="font-medium">
              {rep.nameAr}
            </div>
            <div className="text-xs text-muted-foreground">
              {rep.email}
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}