import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

// Validation Schema
const contactFormSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب ويجب أن يكون على الأقل حرفين"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الهاتف غير صالح"),
  message: z.string().min(5, "الرسالة يجب أن تحتوي على 5 أحرف على الأقل"),
})

export default function ContactUs() {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    }
  })

  const onSubmit = (values) => {
    console.log(values)
    alert("تم إرسال الرسالة بنجاح!")
    form.reset()
  }

  return (
    <section dir="rtl" className="py-16 bg-white">
      <div className="container max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-brand-primary">تواصل معنا</h2>
          <p className="text-brand-gray">
            نحن هنا للإجابة على استفساراتك ومساعدتك في البدء
          </p>
        </div>

        <Card className="border-0 w-full">
          <CardContent className="p-6 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم الكامل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="رجاءً اكتب اسمك الكامل"
                          {...field}
                          aria-invalid={!!form.formState.errors.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                          aria-invalid={!!form.formState.errors.email}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          dir="rtl"
                          type="tel"
                          placeholder="+20 XX XXX XXXX"
                          {...field}
                          aria-invalid={!!form.formState.errors.phone}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرسالة</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="اكتب رسالتك هنا..."
                          {...field}
                          aria-invalid={!!form.formState.errors.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-brand-primary hover:opacity-90"
                >
                  إرسال الرسالة
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card
          className="
            container mx-auto rounded-2xl border
            bg-[linear-gradient(135deg,rgba(13,71,161,0.05)_0%,rgba(0,172,193,0.05)_100%)]
            dark:bg-[linear-gradient(135deg,rgba(13,71,161,0.12)_0%,rgba(0,172,193,0.12)_100%)]
            border-[#0D47A133] dark:border-muted-dark
          "
        >
          <CardContent className="p-6 space-y-4">
            <InfoItem icon={<Mail className="text-brand-primary" />} title="البريد الإلكتروني" value="info@masar.app" />
            <InfoItem icon={<Phone className="text-brand-cyan" />} title="الهاتف" value="+02010 1234 5678" />
            <InfoItem icon={<MapPin className="text-brand-amber" />} title="العنوان" value="القرية التكنولوجية، المعادي، مصر" />
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card className="bg-brand-primary text-white">
          <CardHeader>
            <CardTitle className="text-center">ساعات العمل</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-1 text-sm">
            <p>الأحد - الخميس: 9:00 ص – 5:00 م</p>
            <p className="opacity-80">الجمعة - السبت: مغلق</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function InfoItem({ icon, title, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-white shadow-sm">{icon}</div>
      <div>
        <p className="text-sm text-brand-gray">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}