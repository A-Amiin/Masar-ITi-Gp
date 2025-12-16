import { Card, CardContent } from "@/components/ui/card"
import { Boxes, BarChart3, Share2, MapPinned, Users, Smartphone, ShieldCheck, Clock   } from "lucide-react"

const features = [
  {
    title: "إدارة المخزون",
    desc: "تتبع المنتجات والكميات",
    icon: Boxes,
  },
  {
    title: "تقارير شاملة",
    desc: "إحصائيات وتحليلات مفصلة للأداء",
    icon: BarChart3,
  },
  {
    title: "توزيع ذكي",
    desc: "خوارزميات متطورة لتوزيع الطلبات",
    icon: Share2,
  },
  {
    title: "التتبع المباشر",
    desc: "موقع دقيق لكل مندوب ومهمة",
    icon: MapPinned,
  },
  {
    title: "إدارة العملاء",
    desc: "قاعدة بيانات شاملة للعملاء",
    icon: Users,
  },
  {
    title: "تطبيق موبايل",
    desc: "تطبيقات سهلة للمندوبين",
    icon: Smartphone,
  },
  {
    title: "أمان متقدم",
    desc: "حماية البيانات والمعلومات",
    icon: ShieldCheck,
  },
  {
    title: "جدولة المهام",
    desc: "تخطيط وجدولة الطلبات بفعالية",
    icon: Clock ,
  },
]

export default function FeatureSection() {
  return (
    <section
      id="features"
      dir="rtl"
      className="py-20 px-6 bg-white"
    >
      {/* Header */}
      <div className="text-center mb-14">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--brand-primary)" }}
        >
          المميزات
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--brand-gray)" }}
        >
          حلول متقدمة تساعدك على إدارة عملياتك اللوجستية باحترافية
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card
              key={index}
              className="bg-[#f2f2f2] border-none shadow-sm hover:shadow-md transition"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Icon
                    size={36}
                    style={{ color: "var(--brand-cyan)" }}
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--brand-gray)" }}
                >
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}