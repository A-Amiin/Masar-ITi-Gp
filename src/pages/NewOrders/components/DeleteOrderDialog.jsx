import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteNewOrder } from "@/services/newOrders.service"

export default function DeleteOrderDialog({
  open,
  onOpenChange,
  order,
}) {
  if (!order) return null

  const handleDelete = async () => {
    await deleteNewOrder(order.id)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>حذف الطلب</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          هل أنت متأكد أنك تريد حذف هذا الطلب؟  
          هذا الإجراء لا يمكن التراجع عنه.
        </p>

        <div className="flex justify-start gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            حذف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}