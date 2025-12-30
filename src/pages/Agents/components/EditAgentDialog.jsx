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


export default function EditAgentDialog({
  open,
  onOpenChange,
  agent,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      email: "",
      governorateAr: "",
      governorateEn: "",
    },
  })

  useEffect(() => {
    if (agent) {
      reset({
        phone: agent.phone ?? "",
        email: agent.email ?? "",
        governorateAr: agent.governorateAr ?? "",
        governorateEn: agent.governorateEn ?? "",
      })
    }
  }, [agent, reset])

  const onSubmit = async (values) => {
    try {
      await updateAgent(agent.id, values)
      onOpenChange(false)
    } catch (err) {
      console.error("UPDATE ERROR 👉", err)
      alert("حصل خطأ أثناء التعديل")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-w-2xl">
        {/* ===== Header (يمين فعلي) ===== */}
        <DialogHeader className="flex flex-col items-end text-right">
          <DialogTitle>تعديل مندوب</DialogTitle>
          <p className="text-sm text-muted-foreground">
            يمكنك تعديل رقم الهاتف والإيميل والمحافظة فقط
          </p>
        </DialogHeader>

        {!agent && (
          <div className="py-10 text-center text-muted-foreground">
            جاري تحميل البيانات...
          </div>
        )}

        {agent && (
          <>
          <div
  dir="rtl"
  className="flex items-center justify-end gap-4 border rounded-lg p-4 mt-4"
>
  {/* Avatar – على اليمين */}
  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
    {agent.nameAr?.charAt(0)}
  </div>

  {/* Name + ID – بعده مباشرة */}
  <div className="text-right">
    <div className="font-semibold">{agent.nameAr}</div>
    <div className="text-sm text-muted-foreground">
      ID: {agent.companyId || "-"}
    </div>
  </div>
</div>

            {/* ===== Form ===== */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 pt-6 text-right"
            >
              <Field label="رقم الهاتف" error={errors.phone?.message}>
                <Input
                  {...register("phone", {
                    required: "رقم الهاتف مطلوب",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "رقم الهاتف أرقام فقط",
                    },
                  })}
                />
              </Field>

              <Field label="البريد الإلكتروني" error={errors.email?.message}>
                <Input
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "بريد إلكتروني غير صالح",
                    },
                  })}
                  dir="ltr"
                  className="text-right"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="المحافظة (عربي)"
                  error={errors.governorateAr?.message}
                >
                  <Input
                    {...register("governorateAr", {
                      required: "المحافظة مطلوبة",
                      pattern: {
                        value: /^[\u0600-\u06FF\s]+$/,
                        message: "حروف عربية فقط",
                      },
                    })}
                  />
                </Field>

                <Field
                  label="المحافظة (إنجليزي)"
                  error={errors.governorateEn?.message}
                >
                  <Input
                    {...register("governorateEn", {
                      required: "المحافظة مطلوبة",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "حروف إنجليزية فقط",
                      },
                    })}
                    dir="ltr"
                    className="text-right"
                  />
                </Field>
              </div>

              {/* ===== Read Only ===== */}
              <div className="grid grid-cols-3 gap-4 pt-4 text-right">
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
                  value={agent.customersCount ?? 0}
                />
                <ReadOnly
                  label="عدد الطلبات"
                  value={agent.ordersCount ?? 0}
                />
              </div>

              {/* ===== Actions (شمال فعلي) ===== */}
<div className="flex gap-4 justify-end pt-4">
  <Button
    type="submit"
    variant="default"
  >
    حفظ
  </Button>
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
