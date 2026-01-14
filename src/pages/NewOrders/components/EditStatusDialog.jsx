import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { updateOrderStatus } from "@/services/newOrders.service"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const STATUSES = [
  { key: "warehouse", label: "المستودع" },
  { key: "on_the_way", label: "في الطريق" },
  { key: "delivered", label: "تم التوصيل" },
  { key: "cancelled", label: "ملغي" },
]

export default function EditStatusDialog({ open, onOpenChange, order }) {
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (order) {
      reset({ status: order.status })
    }
  }, [order])

  const onSubmit = async (data) => {
    if (!order?.id) return

    await updateOrderStatus(order.id, data.status)
    onOpenChange(false)
  }

  if (!open || !order) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-[350px] p-6 space-y-4">
        <h2 className="font-semibold text-lg">
          تعديل حالة الطلب
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <select
            {...register("status", { required: true })}
            className="w-full border rounded p-2"
          >
            {STATUSES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>

            <Button type="submit">
              حفظ
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}