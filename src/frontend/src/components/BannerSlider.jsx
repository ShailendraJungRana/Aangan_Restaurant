import { useState, useEffect, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

/**
 * BannerSlider component — an auto-playing carousel for homepage banners.
 * Features: auto-advance, manual navigation, dot indicators, overlay text.
 */
const BannerSlider = ({ banners }) => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance every 5 seconds
  const nextSlide = useCallback(() => {
    if (banners.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
      setIsTransitioning(false);
    }, 300);
  }, [banners.length]);

  const prevSlide = () => {
    if (banners.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, banners.length]);

  if (!banners || banners.length === 0) {
    // Default fallback banner
    return (
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 h-[280px] sm:h-[380px] lg:h-[440px] flex items-center">
        <div className="relative z-10 px-8 sm:px-12 lg:px-16 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Delicious Food,
            <br />
            <span className="text-orange-100">Delivered Fast.</span>
          </h1>
          <p className="text-orange-100 text-base sm:text-lg mb-6">
            Order your favourite meals and get them delivered to your doorstep in minutes.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 text-[12rem] sm:text-[16rem] opacity-20 select-none">
          🍕
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-100">
      {/* Slides */}
      <div
        className={`relative h-[280px] sm:h-[380px] lg:h-[440px] transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {banners[current]?.image ? (
          <img
            src={banners[current].image}
            alt={banners[current].title || "Banner"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-orange-500 to-amber-500" />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        {/* Text Overlay */}
        {(banners[current]?.title || banners[current]?.subtitle) && (
          <div className="absolute inset-0 flex items-center px-8 sm:px-12 lg:px-16">
            <div className="max-w-xl">
              {banners[current]?.title && (
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
                  {banners[current].title}
                </h2>
              )}
              {banners[current]?.subtitle && (
                <p className="text-white/80 text-sm sm:text-lg drop-shadow">
                  {banners[current].subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <HiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <HiChevronRight className="text-xl" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === current
                  ? "w-6 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
