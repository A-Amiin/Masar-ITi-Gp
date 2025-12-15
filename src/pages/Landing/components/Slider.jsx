import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { handleNavClick } from '@/utils/scroll'

const heroSlides = [
  {
    id: 1,
    title: 'نظام ذكي لإدارة المندوبين',
    subtitle: 'حوّل عملياتك اللوجستية إلى تجربة سلسة وفعالة مع نظام مسار المتكامل',
    buttonText: 'إبدأ الان',
    buttonLink: '#start',
    bgGradient: 'linear-gradient(180deg, #0D47A1 0%, #00ACC1 100%)',
    buttonColor: '#FFC107',
    buttonTextColor: '#000000',
    hasImage: true,
  },
  {
    id: 2,
    title: 'تتبع مباشر وتوزيع مهام ذكي',
    subtitle: 'اعرف موقع كل مندوب وكل طلب في الوقت الفعلي، ووزّع المهام تلقائياً بذكاء',
    buttonText: 'شاهد المميزات',
    buttonLink: '#features',
    bgGradient: 'linear-gradient(180deg, #0D47A1 0%, #00ACC1 100%)',
    buttonColor: '#FFC107',
    buttonTextColor: '#000000',
    hasImage: false,
  },
  {
    id: 3,
    title: 'كل التقارير في مكان واحد',
    subtitle: 'احصل على تحليلات شاملة وتقارير مفصلة تساعدك على اتخاذ قرارات أذكى',
    buttonText: 'طلب تجربة',
    buttonLink: '#trial',
    bgGradient: 'linear-gradient(180deg, #0D47A1 0%, #00ACC1 100%)',
    buttonColor: '#FFFFFF',
    buttonTextColor: '#000000',
    hasImage: false,
  },
]

const Slider = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="w-full h-screen"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full flex items-center justify-center bg-center bg-cover"
              style={{
                background: slide.bgGradient,
              }}
            >
              <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 animate-fade-in">
                {slide.hasImage && (
                  <>
                    <div className="md:w-1/2 text-white text-center md:text-left">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-slide-up">
                        {slide.title}
                      </h1>
                      <p className="text-xl sm:text-2xl md:text-3xl mb-6 animate-slide-up-delay">
                        {slide.subtitle}
                      </p>
                      <a
                        href={slide.buttonLink}
                        onClick={(e) => handleNavClick(e, slide.buttonLink)}
                        className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        style={{
                          backgroundColor: slide.buttonColor,
                          color: slide.buttonTextColor,
                        }}
                      >
                        {slide.buttonText}
                      </a>
                    </div>
                    <div className="md:w-1/2 flex justify-end">
                      <img src="/slide.png" alt="slide image" className="w-auto h-100 object-contain" />
                    </div>
                  </>
                )}

                {!slide.hasImage && (
                  <div className="text-white text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-slide-up">
                      {slide.title}
                    </h1>
                    <p className="text-xl sm:text-2xl md:text-3xl mb-6 animate-slide-up-delay">
                      {slide.subtitle}
                    </p>
                    <a
                      href={slide.buttonLink}
                      onClick={(e) => handleNavClick(e, slide.buttonLink)}
                      className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                      style={{
                        backgroundColor: slide.buttonColor,
                        color: slide.buttonTextColor,
                      }}
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-slide-up-delay { animation: slide-up 0.8s ease-out 0.2s both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in, .animate-slide-up, .animate-slide-up-delay { animation: none; }
        }
        .swiper-pagination-bullet { background-color: rgba(255,255,255,0.5); }
        .swiper-pagination-bullet-active { background-color: #FFC107; }
        .swiper-button-next, .swiper-button-prev { color: #FFFFFF; }
        .swiper-button-next:hover, .swiper-button-prev:hover { color: #FFC107; }
      `}</style>
    </section>
  )
}

export default Slider