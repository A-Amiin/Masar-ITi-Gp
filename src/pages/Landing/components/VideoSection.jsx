import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section id="intro" className="py-16 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-dark mb-4">
          شاهد كيف يعمل مسار
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          فيديو توضيحي يشرح جميع مميزات النظام في دقائق
        </p>

        <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <div className="bg-linear-to-b from-blue-800 to-cyan-500 w-full h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <button className="text-white hover:scale-110 transition-transform">
              <Play size={64} />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 text-right text-white max-w-xs">
            <h3 className="font-bold text-lg sm:text-xl">نظام مسار - شرح شامل</h3>
            <p className="text-sm sm:text-base">تعرف على كيفية استخدام النظام بكل سهولة</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;