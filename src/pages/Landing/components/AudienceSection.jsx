import { Card, CardContent } from "@/components/ui/card"
import { Truck, Building2, Check } from "lucide-react"

export default function AudienceSection() {
  return (
    <section
      dir="rtl"
      className="py-24 px-6"
      style={{ background: "var(--background)" }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--brand-primary)" }}
        >
          لمن مسار؟
        </h2>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--brand-gray)" }}
        >
          حلول مصممة خصيصًا لتلبية احتياجات جميع أطراف عملية التوصيل
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-0 border-none shadow-xl overflow-hidden"
                    style={{
              background:
                "linear-gradient(180deg, #00ACC1 0%, #0D47A1 100%)",
            }}>
          <CardContent
            className="p-8 md:p-10 text-white relative"
          >
            {/* Icon */}
            <div className="absolute top-6 right-6 bg-white/20 p-4 rounded-xl">
              <Truck size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-6 mt-15">
              لمندوبي التوصيل
            </h3>

            <ul className="space-y-4">
              {[
                "تطبيق سهل الاستخدام على الهاتف",
                "استلام المهام وتحديث الحالات بسرعة",
                "خرائط وتوجيهات دقيقة للعناوين",
                "تتبع الأرباح والمكافآت",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="text-amber-400 mt-1" size={20} />
                  <span className="text-sm md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* RIGHT – الشركات والمؤسسات */}
        <Card className="p-0 m-0 border-none shadow-xl overflow-hidden"
                    style={{
              background:
                "linear-gradient(180deg, #0D47A1 0%, #00ACC1 100%)",
            }}>
          <CardContent
            className="p-8 md:p-10 text-white relative"

          >
            {/* Icon */}
            <div className="absolute top-6 right-6 bg-white/20 p-4 rounded-xl">
              <Building2 size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-6 mt-15">
              للشركات والمؤسسات
            </h3>

            <ul className="space-y-4">
              {[
                "لوحة تحكم شاملة لإدارة جميع العمليات",
                "تقارير وتحليلات متقدمة لاتخاذ القرار",
                "إدارة فرق المندوبين بكفاءة عالية",
                "تحسين الأداء وخفض التكاليف التشغيلية",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="text-amber-400 mt-1" size={20} />
                  <span className="text-sm md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}