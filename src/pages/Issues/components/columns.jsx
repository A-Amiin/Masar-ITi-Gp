import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClassificationBadge } from "./ClassificationBadge"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export const getColumns = (onView, onDelete) => {
  return [
    {
      accessorKey: "name",
      header: () => <div className="text-center">اسم العميل</div>,
      cell: ({ row }) => <div className="text-center font-medium">{row.original.name}</div>,
    },
    {
      accessorKey: "phone",
      header: () => <div className="text-center">الهاتف</div>,
      cell: ({ row }) => <div className="text-center">{row.original.phone}</div>,
    },
    {
      accessorKey: "activity",
      header: () => <div className="text-center">نوع النشاط</div>,
      cell: ({ row }) => <div className="text-center">{row.original.activity}</div>,
    },
    {
      accessorKey: "type",
      header: () => <div className="text-center">نوع العميل</div>,
      cell: ({ row }) => <div className="text-center">{row.original.type}</div>,
    },
    {
      accessorKey: "classification",
      header: () => <div className="text-center">التصنيف</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <ClassificationBadge value={row.original.classification} />
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">الإجراءات</div>,
      cell: ({ row }) => {
        const [openDialog, setOpenDialog] = useState(false)

        return (
          <div className="flex justify-center gap-2">
            {/* زر العرض */}
            <Button size="icon" variant="ghost" onClick={() => onView?.(row.original)}>
              <Eye className="w-4 h-4" />
            </Button>

            {/* زر الحذف */}
            <Button size="icon" variant="ghost" onClick={() => setOpenDialog(true)}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>

            {/* Dialog التأكيد */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent className="
                max-w-3xl
                [&>button]:left-4
                [&>button]:right-auto
              ">
                <DialogHeader>
                  <DialogTitle className="text-right">تأكيد الحذف</DialogTitle>
                </DialogHeader>
                <p className="text-right py-4">
                  هل أنت متأكد أنك تريد حذف العميل "{row.original.name}"؟
                </p>

                <DialogFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                    إلغاء
                  </Button>
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
}