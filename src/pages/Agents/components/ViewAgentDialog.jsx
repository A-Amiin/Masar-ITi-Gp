import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function AvatarLarge({ name }) {
  return (
    <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-semibold">
      {name?.charAt(0)}
    </div>
  )
}

export default function ViewAgentDialog({ open, onOpenChange, agent }) {
  if (!agent) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {/* ===== Header ===== */}
        <DialogHeader className="text-right">
          <DialogTitle>تفاصيل المندوب</DialogTitle>
          <p className="text-sm text-muted-foreground">
            عرض جميع معلومات المندوب
          </p>
        </DialogHeader>

        {/* ===== Top Card ===== */}
        <div className="mt-4 flex items-center gap-4 rounded-lg border p-4">
          {/* Info (يمين) */}
          <div className="flex-1 text-right">
            <div className="font-semibold">{agent.nameAr}</div>
            <div className="text-sm text-muted-foreground">
              {agent.email || "-"}
            </div>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
              متصل
            </span>
          </div>

          {/* Avatar (يمين خالص) */}
          <AvatarLarge name={agent.nameAr} />
        </div>

        {/* ===== Details (THE FIX) ===== */}
        <div className="pt-6 grid grid-cols-2 gap-y-4 gap-x-8 justify-items-end text-right">
          <Detail label="رقم الهاتف" value={agent.phone || "-"} />
          <Detail label="رقم ID الشركة" value={agent.companyId || "-"} />
          <Detail label="المحافظة" value={agent.governorateAr || "-"} />
          <Detail
            label="تاريخ الانضمام"
            value={
              agent.createdAt?.toDate
                ? agent.createdAt.toDate().toLocaleDateString()
                : "-"
            }
          />
          <Detail label="عدد العملاء" value={agent.customersCount ?? 0} />
          <Detail label="عدد الطلبات" value={agent.ordersCount ?? 0} />
        </div>

        {/* ===== Action ===== */}
        <div className="pt-6">
          <Button onClick={() => onOpenChange(false)}>إغلاق</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Detail({ label, value }) {
  return (
    <div className="w-full text-right">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}