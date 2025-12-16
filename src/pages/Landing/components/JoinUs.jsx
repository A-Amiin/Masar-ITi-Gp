import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

/* ================= Schema ================= */
const joinSchema = z.object({
    name: z.string().min(3, "الاسم مطلوب"),
    phone: z
        .string()
        .min(10, "رقم الهاتف غير صحيح")
        .regex(/^[0-9+]+$/, "رقم الهاتف غير صحيح"),
    city: z.string().min(1, "اختر المحافظة"),
})

const JoinUs = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(joinSchema),
    })

    const onSubmit = (data) => {
        console.log("Form Data 👉", data)
    }

    return (
        <section dir="rtl" className="py-20 px-6 bg-white dark:bg-background">
            {/* Header */}
            <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary-dark">
                    عايز تشتغل مندوب؟
                </h2>
                <p className="text-lg max-w-2xl mx-auto text-muted-foreground dark:text-muted-foreground-dark">
                    انضم لشبكة مندوبينا واستمتع بمرونة العمل ودخل مميز
                </p>
            </div>

            {/* Card */}
            <Card
                className="
                    container mx-auto rounded-2xl border
                    bg-[linear-gradient(135deg,rgba(13,71,161,0.05)_0%,rgba(0,172,193,0.05)_100%)]
                    dark:bg-[linear-gradient(135deg,rgba(13,71,161,0.12)_0%,rgba(0,172,193,0.12)_100%)]
                    border-[#0D47A133] dark:border-muted-dark
                ">
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block mb-2 font-medium">
                                الاسم الكامل
                            </label>
                            <Input
                                className="bg-white dark:bg-background-dark"
                                placeholder="ادخل اسمك الكامل"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                رقم الهاتف
                            </label>
                            <Input
                                className="bg-white dark:bg-background-dark"
                                placeholder="+020 XX XXX XXXX"
                                {...register("phone")}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                المحافظة / المدينة
                            </label>

                            <Select dir="rtl" onValueChange={(value) => setValue("city", value)}>
                                <SelectTrigger className="w-full bg-white dark:bg-background-dark">
                                    <SelectValue placeholder="اختر المحافظة" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-background-dark">
                                    <SelectItem value="cairo">القاهرة</SelectItem>
                                    <SelectItem value="giza">الجيزة</SelectItem>
                                    <SelectItem value="alex">الإسكندرية</SelectItem>
                                </SelectContent>
                            </Select>

                            {errors.city && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold flex items-center gap-2"
                        >
                            قدم الآن
                            <Send size={18} />
                        </Button>
                    </form>

                    {/* Why join */}
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
