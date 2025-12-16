import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "سارة أحمد",
    role: "شركة لوجستيات",
    text: "واجهة سهلة واحترافية، والدعم الفني ممتاز. أنصح به بشدة لأي شركة توصيل.",
  },
  {
    name: "خالد السعيد",
    role: "متجر إلكتروني",
    text: "التتبع المباشر جعل عملاءنا أكثر رضا، ومندوبينا أصبحوا أكثر إنتاجية.",
  },
  {
    name: "فاطمة علي",
    role: "مؤسسة النقل الذكي",
    text: "التقارير والإحصائيات ساعدتنا على تحسين أدائنا بنسبة 40% خلال شهرين فقط.",
  },
  {
    name: "أحمد محمد",
    role: "شركة التوصيل السريع",
    text: "مسار غير طريقة عملنا بالكامل. الآن ندير أكثر من 200 مندوب بسهولة.",
  },
]

const TestimonialsSection = () => {
  return (
    <section
      dir="rtl"
      className="py-20 px-6 bg-muted/40 dark:bg-muted-dark/20"
    >
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          آراء عملائنا
        </h2>
        <p className="text-muted-foreground dark:text-muted-foreground-dark">
          ماذا يقول عملاؤنا عن مسار
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {testimonials.map((item, index) => (
          <Card
            key={index}
            className="
              rounded-2xl border bg-white dark:bg-background
              shadow-md hover:shadow-lg transition
            "
          >
            <CardContent className="p-6 flex flex-col h-full">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#FFC107] text-[#FFC107] dark:fill-yellow-400 dark:text-yellow-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark text-center leading-relaxed mb-6">
                {item.text}
              </p>

              <div className="border-t border-border dark:border-muted-dark pt-4 mt-auto text-center">
                <p className="font-semibold text-foreground dark:text-foreground-dark">{item.name}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
                  {item.role}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection