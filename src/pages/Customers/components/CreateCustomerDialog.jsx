import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { customerSchema } from "@/schemas/customer.schema"

import { useEffect, useState } from "react"

export function CreateCustomerDialog({ open, onOpenChange, createCustomer }) {
  const [areas, setAreas] = useState([])

  // 🔹 تحميل المناطق من public
  useEffect(() => {
    fetch("/areas.json")
      .then((res) => res.json())
      .then((data) => {
        const names = data.features.map(
          (feature) => feature.properties.SHYK_ENAME
        )
        setAreas(names)
      })
  }, [])

  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      visitsCount: 0,
      totalSpent: 0,
      classification: "B",

      type: "",
      activity: "",
      area: "",

    },
  })

  const onSubmit = (data) => {

    const payload = {
      ...data,
      // address: new GeoPoint(
      //   Number(data.address.lat),
      //   Number(data.address.lng)
      // ),
    }
    
    createCustomer(payload)

    createCustomer(data)

    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl [&>button]:left-4 [&>button]:right-auto">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة عميل</DialogTitle>
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

            {/* نوع العميل */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع العميل</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="عميل جديد">عميل جديد</SelectItem>
                      <SelectItem value="عميل محتمل">عميل محتمل</SelectItem>
                      <SelectItem value="عميل دائم">عميل دائم</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* النشاط (Input بدل Select) */}
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع النشاط التجاري</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* نوع النشاط التجاري */}
            <FormField
              control={form.control}
              name="activityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع النشاط التجاري</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع النشاط التجاري" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="جملة">جملة</SelectItem>
                      <SelectItem value="قطاعي">قطاعي</SelectItem>
                      <SelectItem value="جملة الجملة">جملة الجملة</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* اختيار المنطقة */}
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>اختيار المنطقة</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area, index) => (
                        <SelectItem key={index} value={area}>
                          {area}
                        </SelectItem>
                      ))}
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
                  <Select onValueChange={field.onChange} value={field.value}>
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

            {/* تاريخ آخر زيارة */}
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
                  <FormLabel>إجمالي الإنفاق</FormLabel>
                  <Input type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
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