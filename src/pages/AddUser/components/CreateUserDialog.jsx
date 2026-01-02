import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { customerSchema } from "@/schemas/customer.schema"

export function CreateUserDialog({ open, onOpenChange, create }) {
  
  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      nameAr: "",
      nameEn: "",
      phone: "",
    },
  })
  
  const onSubmit = (data) => {
    const payload = {
      ...data,
    }
    
    create(payload)
    onOpenChange(false)
    form.reset()
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-3xl
          [&>button]:left-4
          [&>button]:right-auto
        "
      >
        <DialogHeader>
          <DialogTitle className="text-right">
            إضافة مستخدم جديد
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            dir="rtl"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="nameAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم العميل (عربي)</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nameEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم العميل (إنجليزي)</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>رقم الهاتف</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="col-span-2 flex justify-end gap-2 pt-4">
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
        </Form>
      </DialogContent>
    </Dialog>
  )
}