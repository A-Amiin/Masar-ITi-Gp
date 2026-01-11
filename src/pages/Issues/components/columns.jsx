import MessageActions from "@/components/components/MessageAction"
import { Badge } from "@/components/ui/badge"

export const getColumns = (onView, onDelete, handleMarkRead) => [{
  accessorKey: "name",
  header: () => <div className="text-center">الاسم</div>,
  cell: ({ row }) => (
    <div className="text-center font-medium">
      {row.original.name}
    </div>
  ),
},
{
  accessorKey: "phone",
  header: () => <div className="text-center">الموبايل</div>,
  cell: ({ row }) => (
    <div className="text-center">
      {row.original.phone}
    </div>
  ),
},
{
  accessorKey: "email",
  header: () => <div className="text-center">الإيميل</div>,
  cell: ({ row }) => (
    <div className="text-center text-sm">
      {row.original.email}
    </div>
  ),
},
{
  accessorKey: "message",
  header: () => <div className="text-center">الرسالة</div>,
  cell: ({ row }) => (
    <div className="max-w-62.5 truncate text-center text-sm">
      {row.original.message}
    </div>
  ),
},
{
  accessorKey: "status",
  header: () => <div className="text-center">الحالة</div>,
  cell: ({ row }) => {
    const isRead = row.original.isRead

    return (
      <div className="flex justify-center">
        <Badge
          variant={
            isRead === false
              ? "destructive"
              : isRead === true
                ? "secondary"
                : "default"
          }
        >
          {isRead === false ? "جديدة" : "مقروءة"}
        </Badge>
      </div>
    )
  },
},
{
  accessorKey: "createdAt",
  header: () => <div className="text-center">التاريخ</div>,
  cell: ({ row }) => {
    const date = row.original.createdAt?.toDate?.()

    return (
      <div className="text-center text-xs">
        {date
          ? date.toLocaleString("ar-EG")
          : "-"}
      </div>
    )
  },
},
{
  id: "actions",
  header: () => <div className="text-center">الإجراءات</div>,
  cell: ({ row }) => (
    <MessageActions
      row={row}
      onView={onView}
      onDelete={onDelete}
      handleMarkRead={handleMarkRead}
    />
  ),
},
]