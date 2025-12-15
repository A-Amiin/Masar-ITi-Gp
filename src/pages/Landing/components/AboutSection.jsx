import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Package, Users } from "lucide-react"

export default function AboutSection() {
  return (
    <section
      dir="rtl"
      className="py-16 px-6"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2
          className="text-3xl font-bold mb-3"
          style={{ color: "var(--brand-primary)" }}
        >
          عن تطبيق مسار
        </h2>
        <p
          className="text-lg"
          style={{ color: "var(--brand-gray)" }}
        >
          منصة شاملة لإدارة مندوبي التوصيل والعملاء والمهام والطرق بذكاء وفعالية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <Card className="shadow-md hover:shadow-lg transition">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <MapPin
                size={40}
                style={{ color: "var(--brand-cyan)" }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              تتبع لحظي
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--brand-gray)" }}
            >
              معرفة موقع المندوبين والطلبات في الوقت الفعلي على الخريطة التفاعلية
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="shadow-md hover:shadow-lg transition">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Package
                size={40}
                style={{ color: "var(--brand-amber)" }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              توزيع المهام الذكي
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--brand-gray)" }}
            >
              توزيع تلقائي للطلبات على المندوبين حسب الموقع والحمولة والأولوية
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="shadow-md hover:shadow-lg transition">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <Users
                size={40}
                style={{ color: "var(--brand-primary)" }}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              إدارة المندوبين
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--brand-gray)" }}
            >
              تتبع وإدارة فريق التوصيل بالكامل في مكان واحد مع تقارير أداء تفصيلية
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}