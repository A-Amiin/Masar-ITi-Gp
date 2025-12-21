import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { customerSchema } from "@/schemas/customer.schema"
import { GeoPoint } from "firebase/firestore"
import { useCustomers } from "@/hooks/useCustomers"

export function CreateCustomerDialog({ open, onOpenChange, createCustomer }) {
  
  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      visitsCount: 0,
      totalSpent: 0,
      classification: "B",
      address: {
        lat: "",
        lng: "",
      },
    },
  })
  
  const onSubmit = (data) => {
    const payload = {
      ...data,
      address: new GeoPoint(
        Number(data.address.lat),
        Number(data.address.lng)
      ),
    }
    
    createCustomer(payload)
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
            إضافة عميل
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            dir="rtl"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {/* اسم عربي */}
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

            {/* اسم إنجليزي */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم العميل (إنجليزي)</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الهاتف */}
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

            {/* الموقع عربي */}
            <FormField
              control={form.control}
              name="locationAr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الموقع (عربي)</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الموقع إنجليزي */}
            <FormField
              control={form.control}
              name="locationEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الموقع (إنجليزي)</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* نوع العميل */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع العميل</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="عميل جديد">عميل جديد</SelectItem>
                      <SelectItem value="عميل محتمل">عميل محتمل</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* النشاط */}
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع النشاط التجاري</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="سوبر ماركت">سوبر ماركت</SelectItem>
                      <SelectItem value="كافيه">كافيه</SelectItem>
                      <SelectItem value="صيدلية">صيدلية</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* التصنيف */}
            <FormField
              control={form.control}
              name="classification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التصنيف</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* تاريخ الزيارة */}
            <FormField
              control={form.control}
              name="lastVisit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ آخر زيارة</FormLabel>
                  <Input type="date" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* عدد الزيارات */}
            <FormField
              control={form.control}
              name="visitsCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد الزيارات</FormLabel>
                  <Input type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* إجمالي الإنفاق */}
            <FormField
              control={form.control}
              name="totalSpent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>إجمالي الإنفاق (جنيه)</FormLabel>
                  <Input type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* العنوان (GeoPoint) */}
            <FormField
              control={form.control}
              name="address.lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <Input type="number" step="any" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.lng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <Input type="number" step="any" {...field} />
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