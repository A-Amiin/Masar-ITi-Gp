import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

const ViewCustomerDialog = ({ open, onOpenChange, customer }) => {

  console.log(customer)
  if (!open || !customer) return null

  const avg =
    customer.visitsCount > 0
      ? customer.totalSpent / customer.visitsCount
      : 0

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) onOpenChange(false)
      }}
    >
      <DialogContent
        className="
          max-w-md
          bg-white dark:bg-zinc-900
          text-zinc-900 dark:text-zinc-100
          border border-zinc-200 dark:border-zinc-800
        "
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-right text-zinc-900 dark:text-zinc-100">
            تفاصيل العميل
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-right dark:text-zinc-400">
            عرض جميع معلومات العميل
          </p>
        </DialogHeader>

        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4 border-zinc-200 dark:border-zinc-800">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {customer.classification}
          </div>

          <div className="flex-1 text-right">
            <p className="font-semibold">{customer.name}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground justify-end dark:text-zinc-400">
              <MapPin className="w-4 h-4" />
              {customer.locationEn}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm py-4">
          <Info label="رقم الهاتف" value={customer.phone} />
          <Info label="نوع النشاط" value={customer.activity} />
          <Info label="نوع العميل" value={customer.type} />
          <Info label="تاريخ آخر زيارة" value={customer.lastVisit} />
          <Info label="عدد الزيارات" value={customer.visitsCount} />
          <Info
            label="إجمالي الإنفاق"
            value={`${customer.totalSpent} جنيه`}
            highlight
          />
        </div>

        {/* Average */}
        <div className="rounded-lg bg-yellow-100 dark:bg-yellow-900/30 p-4 text-right space-y-1">
          <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
            {avg} جنيه
          </p>
          <p className="text-sm text-muted-foreground dark:text-zinc-400">
            متوسط الشراء
          </p>
          <p className="text-xs text-muted-foreground dark:text-zinc-500">
            محسوب من إجمالي الإنفاق ({customer.totalSpent} جنيه)
            ÷ عدد الزيارات ({customer.visitsCount})
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewCustomerDialog

/* ---------- Helper ---------- */
const Info = ({ label, value, highlight }) => (
  <div className="text-right">
    <p className="text-muted-foreground dark:text-zinc-400">
      {label}
    </p>
    <p
      className={
        highlight
          ? "font-semibold text-blue-600 dark:text-blue-400"
          : "font-medium"
      }
    >
      {value}
    </p>
  </div>
)