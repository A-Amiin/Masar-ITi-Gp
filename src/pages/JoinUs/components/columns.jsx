import { Badge } from "@/components/ui/badge"
import TableRowActions from "./TableRowActions"

export const getColumns = (onView, onDelete, onChangeStatus) => [
  {
    accessorKey: "name",
    header: () => <div className="text-center">الاسم</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center">رقم الهاتف</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.phone}</div>
    ),
  },
  {
    accessorKey: "city",
    header: () => <div className="text-center">المحافظة</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.city}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">الحالة</div>,
    cell: ({ row }) => {
      const map = {
        new: { label: "جديد", className: "bg-blue-500 text-white" },
        reviewed: { label: "قيد المراجعة", className: "bg-yellow-400 text-white" },
        accepted: { label: "مقبول", className: "bg-green-500 text-white" },
        rejected: { label: "مرفوض", className: "bg-red-500 text-white" },
      }

      const status = map[row.original.status] ?? map.new

      return (
        <div className="flex justify-center">
          <Badge className={status.className}>{status.label}</Badge>
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
          {date ? date.toLocaleString("ar-EG") : "-"}
        </div>
      )
    },
  },
  {
  id: "actions",
  header: () => <div className="text-center">الإجراءات</div>,
  cell: ({ row }) => (
    <TableRowActions
      row={row}
      onView={onView}
      onDelete={onDelete}
      onChangeStatus={onChangeStatus}
    />
  ),
}
]