import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const LogoutConfirmDialog = ({ open, onOpenChange, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="
          max-w-sm
          text-right
          [&>button]:left-4
          [&>button]:right-auto
        "
      >
        <DialogHeader dir="rtl" className="flex flex-col items-start gap-2">
          <DialogTitle>تأكيد تسجيل الخروج</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            هل أنت متأكد أنك تريد تسجيل الخروج من الحساب؟
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-start gap-2 pt-4">
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            تسجيل الخروج
          </Button>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutConfirmDialog