import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"
import { Send } from "lucide-react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

// ================= Schema =================
const joinSchema = z.object({
  name: z.string().min(3, "الاسم مطلوب"),
  phone: z
    .string()
    .min(10, "رقم الهاتف غير صحيح")
    .regex(/^[0-9+]+$/, "رقم الهاتف غير صحيح"),
  city: z.string().min(1, "اختر المحافظة"),
})

const JoinUs = () => {
  const form = useForm({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
    },
  })

  const onSubmit = async (values) => {
  try {
    await addDoc(collection(db, "join_us"), {
      name: values.name,
      phone: values.phone,
      city: values.city,
      isRead: false,
      status: "new",
      createdAt: serverTimestamp(),
    })

    form.reset()
    alert("تم إرسال الطلب بنجاح ")
  } catch (error) {
    alert("خطأ أثناء الإرسال ")
    console.error("Error adding document: ", error)
  }
}


  return (
    <section id="be-rep" dir="rtl" className="py-20 px-6 bg-white dark:bg-background">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-dark">
          عايز تشتغل مندوب؟
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-muted-foreground dark:text-muted-foreground-dark">
          انضم لشبكة مندوبينا واستمتع بمرونة العمل ودخل مميز
        </p>
      </div>

      {/* Card */}
      <Card className="container mx-auto rounded-2xl border
        bg-[linear-gradient(135deg,rgba(13,71,161,0.05)_0%,rgba(0,172,193,0.05)_100%)]
        dark:bg-[linear-gradient(135deg,rgba(13,71,161,0.12)_0%,rgba(0,172,193,0.12)_100%)]
        border-[#0D47A133] dark:border-muted-dark
      ">
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الكامل</FormLabel>
                    <FormControl>
                      <Input className="bg-white dark:bg-background" placeholder="ادخل اسمك الكامل" {...field} />
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
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input className="bg-white dark:bg-background" placeholder="+020 XX XXX XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المحافظة / المدينة</FormLabel>
                    <FormControl>
                      <Select
                        dir="rtl"
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-white dark:bg-background w-full">
                          <SelectValue placeholder="اختر المحافظة" />
                        </SelectTrigger>
                        <SelectContent dir="rtl" >
                          <SelectItem value="cairo">القاهرة</SelectItem>
                          <SelectItem value="giza">الجيزة</SelectItem>
                          <SelectItem value="alex">الإسكندرية</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold flex items-center gap-2"
              >
                قدم الآن
                <Send size={18} />
              </Button>
            </form>
          </Form>

          <div className="mt-10 border-t pt-6 text-sm text-muted-foreground dark:text-muted-foreground-dark">
            <h4 className="font-bold mb-3 text-foreground dark:text-foreground-dark">
              لماذا تنضم لمسار؟
            </h4>
            <ul className="space-y-2 list-disc pr-4 marker:text-[#00ACC1] text-muted-foreground">
              <li>مرونة في أوقات العمل</li>
              <li>دخل يومي مجزي</li>
              <li>تطبيق سهل ودعم فني متواصل</li>
              <li>مكافآت وحوافز شهرية</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default JoinUs