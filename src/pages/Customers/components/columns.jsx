import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClassificationBadge } from "./ClassificationBadge"

export const getColumns = () => [
  {
    accessorKey: "name",
    header: "اسم العميل",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "الهاتف",
  },
  {
    accessorKey: "activity",
    header: "نوع النشاط",
  },
  {
    accessorKey: "type",
    header: "نوع العميل",
  },
  {
    accessorKey: "classification",
    header: "التصنيف",
    cell: ({ row }) => (
      <ClassificationBadge value={row.original.classification} />
    ),
  },
  {
    id: "actions",
    header: "الإجراءات",
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