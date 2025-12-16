import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactUs() {
  return (
    <section dir="rtl" className="py-16 bg-white">
      <div className="container max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-brand-primary">
            تواصل معنا
          </h2>
          <p className="text-brand-gray">
            نحن هنا للإجابة على استفساراتك ومساعدتك في البدء
          </p>
        </div>

        {/* Form */}
        <Card className="border-0 w-full">
          <CardContent className="p-6 space-y-4">
            <Input placeholder="رجاءً اكتب اسمك الكامل" />
            <Input type="email" placeholder="email@example.com" />
            <Input placeholder="+966 XX XXX XXXX" />
            <Textarea rows={4} placeholder="اكتب رسالتك هنا..." />

            <Button className="w-full bg-brand-primary hover:opacity-90">
              إرسال الرسالة
            </Button>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="
                    container mx-auto rounded-2xl border
                    bg-[linear-gradient(135deg,rgba(13,71,161,0.05)_0%,rgba(0,172,193,0.05)_100%)]
                    dark:bg-[linear-gradient(135deg,rgba(13,71,161,0.12)_0%,rgba(0,172,193,0.12)_100%)]
                    border-[#0D47A133] dark:border-muted-dark
                ">
          <CardContent className="p-6 space-y-4">

            <InfoItem
              icon={<Mail className="text-brand-primary" />}
              title="البريد الإلكتروني"
              value="info@masar.app"
            />

            <InfoItem
              icon={<Phone className="text-brand-cyan" />}
              title="الهاتف"
              value="+02010 1234 5678"
            />

            <InfoItem
              icon={<MapPin className="text-brand-amber" />}
              title="العنوان"
              value="القرية التكنولوجية، المعادي، مصر"
            />

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

function InfoItem({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-md bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-sm text-brand-gray">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}