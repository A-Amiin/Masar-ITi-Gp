import { Eye, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const getColumns = (onView, onDelete, onMarkReviewed) => [
  {
    accessorKey: "name",
    header: "الاسم",
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
    cell: ({ row }) => (
      <div className="text-center">{row.original.phone}</div>
    ),
  },
  {
    accessorKey: "city",
    header: "المحافظة",
    cell: ({ row }) => (
      <div className="text-center">{row.original.city}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const map = {
        new: { label: "جديد", variant: "destructive" },
        reviewed: { label: "قيد المراجعة", variant: "secondary" },
        accepted: { label: "مقبول", variant: "default" },
        rejected: { label: "مرفوض", variant: "outline" },
      }

      const status = map[row.original.status] ?? map.new

      return (
        <div className="flex justify-center">
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "التاريخ",
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
    header: "الإجراءات",
    cell: ({ row }) => {
      const handleView = async () => {
        if (row.original.status === "new") {
          await onMarkReviewed(row.original.id)
        }
        onView(row.original)
      }

      return (
        <div className="flex justify-center gap-2">
          <Button size="icon" variant="ghost" onClick={handleView}>
            <Eye className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      )
    },
  },
]