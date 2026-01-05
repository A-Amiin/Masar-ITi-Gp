import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

const ViewIssueDialog = ({ open, onOpenChange, issue }) => {
  if (!open || !issue) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) onOpenChange(false)
      }}
    >
      <DialogContent className="
        max-w-md
        bg-white dark:bg-zinc-900
        text-zinc-900 dark:text-zinc-100
        border border-zinc-200 dark:border-zinc-800
      ">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-right">
            تفاصيل الرسالة
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-right">
            عرض جميع معلومات الرسالة
          </p>
        </DialogHeader>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-y-4 text-right py-2">
          <Info label="الاسم" value={issue.name} highlight />
          <Info label="البريد الإلكتروني" value={issue.email} />
          <Info label="رقم الهاتف" value={issue.phone} />
          <Info label="الحالة" value={issue.status} />
          <Info label="تم قراءتها" value={issue.isRead ? "نعم" : "لا"} />
          <Info label="تاريخ الارسال" value={issue.createdAt ? format(issue.createdAt.toDate(), "PPpp") : "-"} />
        </div>

        {/* Message */}
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md text-right">
          <p className="text-sm text-muted-foreground mb-2">الرسالة:</p>
          <p className="font-medium">{issue.message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewIssueDialog

/* ---------- Helper ---------- */
const Info = ({ label, value, highlight }) => (
  <div className="text-right">
    <p className="text-muted-foreground text-sm">{label}</p>
    <p className={highlight ? "font-semibold text-blue-600 dark:text-blue-400" : "font-medium"}>
      {value ?? "-"}
    </p>
  </div>
)