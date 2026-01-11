import { Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

function MessageActions({ row, onView, onDelete, handleMarkRead }) {
  const [openDialog, setOpenDialog] = useState(false)

  const handleView = async () => {
    if (!row.original.isRead) {
      await handleMarkRead?.(row.original.id)
    }
    onView?.(row.original.id)
  }

  return (
    <div className="flex justify-center gap-2">
      <Button size="icon" variant="ghost" onClick={handleView}>
        <Eye className="w-4 h-4" />
      </Button>

      <Button size="icon" variant="ghost" onClick={() => setOpenDialog(true)}>
        <Trash2 className="w-4 h-4 text-red-500" />
      </Button>

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
}
export default MessageActions