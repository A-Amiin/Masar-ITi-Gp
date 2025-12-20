import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClassificationBadge } from "./ClassificationBadge"

export const getColumns = (onView, onDelete) => [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-center">اسم العميل</div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => (
      <div className="text-center">الهاتف</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.phone}</div>
    ),
  },
  {
    accessorKey: "activity",
    header: () => (
      <div className="text-center">نوع النشاط</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.activity}</div>
    ),
  },
  {
    accessorKey: "type",
    header: () => (
      <div className="text-center">نوع العميل</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.type}</div>
    ),
  },
  {
    accessorKey: "classification",
    header: () => (
      <div className="text-center">التصنيف</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ClassificationBadge value={row.original.classification} />
      </div>
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="text-center">الإجراءات</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onView?.(row.original)}
        >
          <Eye className="w-4 h-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onDelete?.(row.original.id)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    ),
  },
]