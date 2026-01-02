import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export const getColumns = (onView, onDelete) => [
  {
    accessorKey: "nameAr",
    header: () => <div className="text-center">الاسم</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.nameAr}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">البريد</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center">الهاتف</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.phone}</div>
    ),
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center">الدور</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.role}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">الإجراءات</div>,
    cell: ({ row }) => {
      const [openDialog, setOpenDialog] = useState(false)

      return (
        <div className="flex justify-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => onView(row.original)}>
            <Eye className="w-4 h-4" />
          </Button>

          <Button size="icon" variant="ghost" onClick={() => setOpenDialog(true)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-right">
                  تأكيد الحذف
                </DialogTitle>
              </DialogHeader>

              <p className="text-right py-4">
                هل أنت متأكد من حذف المستخدم "{row.original.nameAr}"؟
              </p>

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  إلغاء
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete(row.original.id)
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