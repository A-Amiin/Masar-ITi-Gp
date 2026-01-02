import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteAgent } from "@/services/agents.service"

export default function DeleteAgentDialog({
  open,
  onOpenChange,
  agent,
}) {
  if (!agent) return null

  const handleDelete = async () => {
    try {
      await deleteAgent(agent.id)
      onOpenChange(false)
    } catch (err) {
      console.error("DELETE ERROR 👉", err)
      alert("حصل خطأ أثناء الحذف")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-w-md text-right">
        {/* ===== Header (يمين + لون أسود) ===== */}
        <DialogHeader className="items-end text-right">
          <DialogTitle className="text-black text-base font-semibold">
            تأكيد الحذف
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            هل أنت متأكد من حذف هذا المندوب؟ لا يمكن التراجع عن هذا الإجراء.
          </p>
        </DialogHeader>

        {/* ===== Red Box ===== */}
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center justify-end gap-3">
            {/* Avatar (أول حاجة على اليمين) */}
            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {agent.nameAr?.charAt(0)}
            </div>

            {/* Name + Email */}
            <div className="text-right">
              <div className="font-medium">{agent.nameAr}</div>
              <div className="text-sm text-muted-foreground">
                {agent.email || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Actions (على الشمال) ===== */}
        <div className="mt-6 flex justify-start gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            حذف
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
