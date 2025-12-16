import { Card } from "@/components/ui/card"

const DownloadApp = () => {
  return (
    <section
      dir="rtl"
      className="
        relative overflow-hidden py-24 px-6
        bg-[linear-gradient(180deg,#0D47A1_0%,#00ACC1_100%)]
      "
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center text-white mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          حمل التطبيق الآن
        </h2>
        <p className="text-white/80 text-lg">
          ابدأ رحلتك في إدارة التوصيل الاحترافية – متاح على جميع الأجهزة
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-2 items-center">

        {/* Cards */}
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <div className="w-full max-w-md space-y-4">
            {/* Google Play */}
            <Card className="flex justify-between px-6 py-4 rounded-2xl shadow-lg">
              <div>
                <p className="text-xs text-muted-foreground">
                  احصل عليه من
                </p>
                <p className="font-semibold">Google Play</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <img src="/Icon.png" alt="Google Play" className="w-6 h-6"/>
              </div>
            </Card>

            {/* App Store */}
            <Card className="flex justify-between px-6 py-4 rounded-2xl shadow-lg">
              <div>
                <p className="text-xs text-muted-foreground">
                  حمل من
                </p>
                <p className="font-semibold">App Store</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <img src="/Icon (1).png" alt="App Store" className="w-6 h-6"/>
              </div>
            </Card>
          </div>
        </div>

        {/* Phones */}
        <div className="relative hidden md:flex justify-center">
          <img
            src="/Container.png"
            alt="App preview"
            className="
              absolute left-10 top-5 w-60
              -rotate-12 opacity-90
            "/>

          <img
            src="/Container-1.png"
            alt="App preview"
            className="
              relative w-72 rotate-6
              drop-shadow-2xl
              "/>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-48 h-48 rounded-full border border-white/10" />
      <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full border border-white/10" />
    </section>
  )
}

export default DownloadApp