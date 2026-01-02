import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  agentSchema,
  agentDefaultValues,
} from "@/schemas/agent.schema"
import { addRepresentative } from "@/services/agents.service"

export default function AddAgentDialog({ open, onOpenChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(agentSchema),
    defaultValues: agentDefaultValues,
  })

  const onSubmit = async (values) => {
    try {
      await addRepresentative(values)
      reset()
      onOpenChange(false)
    } catch (e) {
      console.error(e)
      alert("في مشكلة أثناء الحفظ – شوف الـ console")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-w-3xl">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold">إضافة مندوب</h2>
          <p className="text-sm text-muted-foreground">
            ادخل معلومات المندوب الجديد لإنشاء حساب
          </p>
        </div>

        {/* Image upload */}
        <div className="flex items-center gap-4 pt-4">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <Upload className="text-muted-foreground" />
          </div>
          <div>
            <Button variant="outline" size="sm" type="button">
              رفع من الجهاز
            </Button>
            <p className="text-xs text-muted-foreground">
              يمكنك رفع صورة بصيغة PNG أو JPG والحد الأقصى 5MB
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 pt-4"
        >
          <Field label="الاسم (عربي)" error={errors.nameAr?.message}>
            <Input {...register("nameAr")} placeholder="الاسم باللغة العربية" />
          </Field>

          <Field label="الاسم (إنجليزي)" error={errors.nameEn?.message}>
            <Input {...register("nameEn")} placeholder="الاسم باللغة الإنجليزية" />
          </Field>

          <Field label="رقم الهاتف" error={errors.phone?.message}>
            <Input {...register("phone")} placeholder="+20 100 123 4567" />
          </Field>

          <Field label="رقم الشركة" error={errors.companyId?.message}>
            <Input {...register("companyId")} placeholder="EMP-2024-001" />
          </Field>

          <Field label="البريد الإلكتروني" error={errors.email?.message} full>
            <Input {...register("email")} placeholder="agent@masar.com" />
            <p className="text-xs text-muted-foreground">
              اتركه فارغًا لإنشاء بريد إلكتروني تلقائيًا
            </p>
          </Field>

          <Field label="المحافظة (عربي)" error={errors.governorateAr?.message}>
            <Input {...register("governorateAr")} placeholder="المحافظة باللغة العربية" />
          </Field>

          <Field label="المحافظة (إنجليزي)" error={errors.governorateEn?.message}>
            <Input {...register("governorateEn")} placeholder="المحافظة باللغة الإنجليزية" />
          </Field>

          <Field label="عدد العملاء">
            <Input type="number" {...register("customersCount")} />
          </Field>

          <Field label="عدد الطلبات">
            <Input type="number" {...register("ordersCount")} />
          </Field>

          {/* Actions */}
          <div className="col-span-2 flex justify-end gap-2 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>
            <Button type="submit">حفظ</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ---------- Helper ---------- */
function Field({ label, error, full, children }) {
  return (
    <div className={`space-y-1 ${full ? "col-span-2" : ""}`}>
      <label className="text-sm">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
