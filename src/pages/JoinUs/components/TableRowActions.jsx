import { cn } from "@/lib/utils"
import { useState } from "react"
import { Eye, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

function TableRowActions({ row, onView, onDelete, onChangeStatus }) {
  const [openDelete, setOpenDelete] = useState(false)

  const handleView = () => {
    onView(row.original)

    if (row.original.status === "new") {
      onChangeStatus(row.original.id, "reviewed")
    }
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

      {/* Edit */}
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
                (row.original.status === "accepted" && status.value !== "accepted") ||
                (row.original.status === "rejected" && status.value !== "rejected")

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
        onClick={() => setOpenDelete(true)}
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>

      {/* Confirm Delete */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="max-w-sm [&>button]:left-4 [&>button]:right-auto">
          <DialogHeader>
            <DialogTitle className="text-right">تأكيد الحذف</DialogTitle>
          </DialogHeader>

          <p className="py-4 text-right">
            هل أنت متأكد أنك تريد حذف
            <strong> {row.original.name} </strong>؟
          </p>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(row.original.id)
                setOpenDelete(false)
              }}
            >
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TableRowActions