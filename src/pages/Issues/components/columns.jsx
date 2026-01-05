import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
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
  cell: ({ row }) => {
    const [openDialog, setOpenDialog] = useState(false)

    const handleView = async () => {
      if (!row.original.isRead) {
        await handleMarkRead?.(row.original.id)
      }
      onView?.(row.original.id)
    }


    return (
      <div className="flex justify-center gap-2">
        {/* View */}
        <Button size="icon" variant="ghost" onClick={handleView}>
          <Eye className="w-4 h-4" />
        </Button>

        {/* Delete */}
        <Button size="icon" variant="ghost" onClick={() => setOpenDialog(true)}>
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>

        {/* Confirm Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>تأكيد الحذف</DialogTitle>
            </DialogHeader>

            <p className="py-4">
              هل أنت متأكد أنك تريد حذف رسالة
              <strong> {row.original.name} </strong>؟
            </p>

            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setOpenDialog(false)}>إلغاء</Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete?.(row.original.id)
                  setOpenDialog(false)
                }}
              >
                حذف
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
},
]