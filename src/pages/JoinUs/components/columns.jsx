import { Eye, Trash2, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export const getColumns = (onView, onDelete, onChangeStatus) => [
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
          await onChangeStatus(row.original.id, "reviewed")
        }
        onView(row.original)
      }

      const statuses = [
        { value: "new", label: "جديد" },
        { value: "reviewed", label: "قيد المراجعة" },
        { value: "accepted", label: "مقبول" },
        { value: "rejected", label: "مرفوض" },
      ]

      return (
        <div className="flex justify-center gap-2">
          {/* View */}
          <Button size="icon" variant="ghost" onClick={handleView}>
            <Eye className="w-4 h-4" />
          </Button>

          {/* Edit Status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <Pencil className="w-4 h-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-40 p-2">
              <div className="flex flex-col gap-1">
                {statuses.map((status) => {
                  const disableChange =
                    (row.original.status === "accepted" &&
                      status.value !== "accepted") ||
                    (row.original.status === "rejected" &&
                      status.value !== "rejected")

                  return (
                    <Button
                      key={status.value}
                      className={cn(
                        "justify-start text-sm",
                        status.value === "new" && "bg-blue-500 text-white",
                        status.value === "reviewed" && "bg-yellow-400 text-white",
                        status.value === "accepted" && "bg-green-500 text-white",
                        status.value === "rejected" && "bg-red-500 text-white"
                      )}
                      disabled={disableChange}
                      onClick={async () => {
                        await onChangeStatus(row.original.id, status.value)
                      }}
                    >
                      {status.label}
                    </Button>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>


          {/* Delete */}
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