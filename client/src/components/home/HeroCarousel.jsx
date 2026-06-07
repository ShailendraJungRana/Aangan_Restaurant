import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBannersQuery } from '@/hooks/queries/useBannersQuery';
import { ROUTES } from '@/constants/routes';

export default function HeroCarousel() {
  const navigate = useNavigate();
  const { data: carouselData = [], isLoading } = useBannersQuery();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCurrentSlide(0);
  }, [carouselData.length]);

  useEffect(() => {
    if (carouselData.length === 0) return undefined;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [carouselData.length]);

  if (isLoading || carouselData.length === 0) {
    return (
      <div className="relative bg-gradient-to-r from-emerald-50 to-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="h-64 lg:h-96 bg-stone-200 animate-pulse rounded-2xl" />
        </div>
      </div>
    );
  }

  const slide = carouselData[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length,
    );
  };

  return (
    <div className="relative bg-gradient-to-r from-emerald-50 to-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-emerald-600 font-semibold text-lg tracking-wide">
                {slide.subtitle}
              </h2>
              <h1 className="text-4xl lg:text-6xl font-bold text-stone-900 leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg text-stone-600 max-w-lg leading-relaxed">
                {slide.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate(ROUTES.ORDER_NOW)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Order Now
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ORDER_NOW)}
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
              >
                View Menu
              </button>
            </div>

            <div className="flex space-x-2 pt-4">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[400px] lg:h-[500px] object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-700 p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-700 p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
