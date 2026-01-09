import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

const statusMap = {
  new: { label: "جديد", className: "bg-blue-500 text-white" },
  reviewed: { label: "قيد المراجعة", className: "bg-yellow-400 text-white" },
  accepted: { label: "مقبول", className: "bg-green-500 text-white" },
  rejected: { label: "مرفوض", className: "bg-red-500 text-white" },
}

const ViewJoinDialog = ({ open, onOpenChange, item }) => {
  if (!open || !item) return null

  const status = statusMap[item.status] ?? statusMap.new

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-w-md">
        <DialogHeader>
          <DialogTitle>تفاصيل طلب الانضمام</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2 text-right">
          <Info label="الاسم" value={item.name} highlight />
          <Info label="رقم الهاتف" value={item.phone} />
          <Info label="المحافظة" value={item.city} />

          <div>
            <p className="text-sm text-muted-foreground mb-1">الحالة</p>
            <Badge className={status.className}>{status.label}</Badge>
          </div>

          <Info
            label="تاريخ التقديم"
            value={
              item.createdAt
                ? format(item.createdAt.toDate(), "PPpp")
                : "-"
            }
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewJoinDialog

const Info = ({ label, value, highlight }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={highlight ? "font-semibold text-primary" : "font-medium"}>
      {value ?? "-"}
    </p>
  </div>
)