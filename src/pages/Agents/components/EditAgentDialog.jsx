import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { updateAgent } from "@/services/agents.service"

export default function EditAgentDialog({ open, onOpenChange, agent }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameAr: "",
      phone: "",
      governorateAr: "",
      governorateEn: "",
    },
  })

  useEffect(() => {
    if (agent) {
      reset({
        nameAr: agent.nameAr ?? "",
        phone: agent.phone ?? "",
        governorateAr: agent.governorateAr ?? "",
        governorateEn: agent.governorateEn ?? "",
      })
    }
  }, [agent, reset])

  const onSubmit = async (values) => {
    try {
      await updateAgent(agent.id, {
        nameAr: values.nameAr,
        phone: values.phone,
        governorateAr: values.governorateAr,
        governorateEn: values.governorateEn,

        // 🔒 الإيميل ثابت
        email: agent.email ?? "",
      })

      onOpenChange(false)
    } catch (err) {
      console.error("UPDATE ERROR 👉", err)
      alert("حصل خطأ أثناء التعديل")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-w-2xl">
        <DialogHeader className="flex flex-col items-end text-right">
          <DialogTitle>تعديل مندوب</DialogTitle>
          <p className="text-sm text-muted-foreground">
            يمكنك تعديل الاسم ورقم الهاتف والمحافظة فقط
          </p>
        </DialogHeader>

        {!agent && (
          <div className="py-10 text-center text-muted-foreground">
            جاري تحميل البيانات...
          </div>
        )}

        {agent && (
          <>
            {/* Header */}
            <div className="flex items-center justify-end gap-4 border rounded-lg p-4 mt-4">
              <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                {agent.nameAr?.charAt(0)}
              </div>

              <div className="text-right">
                <div className="font-semibold">{agent.nameAr}</div>
                <div className="text-sm text-muted-foreground">
                  ID: {agent.id}
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 pt-6 text-right"
            >
              {/* ✅ اسم المندوب */}
              <Field label="اسم المندوب" error={errors.nameAr?.message}>
                <Input
                  {...register("nameAr", {
                    required: "الاسم مطلوب",
                  })}
                />
              </Field>

              {/* ✅ رقم الهاتف */}
              <Field label="رقم الهاتف" error={errors.phone?.message}>
                <Input
                  {...register("phone", {
                    required: "رقم الهاتف مطلوب",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "أرقام فقط",
                    },
                  })}
                />
              </Field>

              {/* ❌ الإيميل عرض فقط */}
              <Field label="البريد الإلكتروني">
                <Input value={agent.email || ""} disabled dir="ltr" />
              </Field>

              {/* ✅ المحافظة */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="المحافظة (عربي)">
                  <Input {...register("governorateAr")} />
                </Field>

                <Field label="المحافظة (إنجليزي)">
                  <Input {...register("governorateEn")} dir="ltr" />
                </Field>
              </div>

              {/* Read only stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <ReadOnly
                  label="تاريخ الانضمام"
                  value={
                    agent.createdAt?.toDate
                      ? agent.createdAt
                          .toDate()
                          .toLocaleDateString("en-GB")
                      : "-"
                  }
                />
                <ReadOnly
                  label="عدد العملاء"
                  value={agent.customersCount ?? "Not Assigned"}
                />
                <ReadOnly
                  label="عدد الطلبات"
                  value={agent.ordersCount ?? "Not Assigned"}
                />
              </div>

              <div className="flex gap-4 justify-end pt-4">
                <Button type="submit">حفظ</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

/* ===== Helpers ===== */
function Field({ label, error, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

function ReadOnly({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="text-muted-foreground text-sm">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}