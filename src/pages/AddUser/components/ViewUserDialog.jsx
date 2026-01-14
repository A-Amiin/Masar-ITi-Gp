import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const ViewUserDialog = ({ open, onOpenChange, user }) => {
  if (!open || !user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm [&>button]:left-4 [&>button]:right-auto">
        <DialogHeader>
          <DialogTitle className="text-right">
            تفاصيل المستخدم
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-right">
          <Info label="الاسم العربي" value={user.nameAr} />
          <Info label="الاسم الإنجليزي" value={user.nameEn} />
          <Info label="البريد الإلكتروني" value={user.email} />
          <Info label="رقم الهاتف" value={user.phone} />
          <Info label="الدور" value={user.role} />
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

export default ViewUserDialog

const Info = ({ label, value }) => (
  <div>
    <p className="text-muted-foreground text-sm">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
)