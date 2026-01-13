import { Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="bg-[#212121] text-gray-300 pt-16"
    >
      <div className="container max-w-6xl mx-auto px-6">

        {/* Top */}
        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              {/* <span className="text-brand-cyan">●</span>
              مسار */}
                <a href="#home">
                  <img src="/masar-logo.png" alt="Masar Logo" className="h-20 relative -top-5"/>
                </a>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              نظام متكامل لإدارة مندوبي التوصيل والمبيعات
              بذكاء وفعالية
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              {[
                "عن التطبيق",
                "المميزات",
                "كن مندوب",
                "تحميل التطبيق",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-white transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">تابعنا</h4>

            <div className="flex gap-4">
              <SocialIcon icon={<Instagram />} />
              <SocialIcon icon={<Twitter />} />
              <SocialIcon icon={<Facebook />} />
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="pb-6 text-center text-sm text-gray-400">
          © 2026 Masar | مسار. جميع الحقوق محفوظة
        </div>

      </div>
    </footer>
  )
}

function SocialIcon({ icon }) {
  return (
    <div
      className="
        w-12 h-12
        flex items-center justify-center
        rounded-xl
        bg-white/10
        hover:bg-white/20
        transition
        cursor-pointer
      "
    >
      {icon}
    </div>
  )
}