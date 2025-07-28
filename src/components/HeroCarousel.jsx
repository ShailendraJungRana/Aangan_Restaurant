import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselData = [
  {
    id: 1,
    title: "Authentic Indian Cuisine",
    subtitle: "Experience the Rich Flavors of India",
    description: "Discover our traditional recipes passed down through generations, crafted with love and the finest ingredients.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Farm Fresh Ingredients",
    subtitle: "From Garden to Your Plate",
    description: "We source the freshest ingredients directly from local farms to ensure the highest quality in every dish.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Special Weekend Offers",
    subtitle: "Delicious Deals Every Weekend",
    description: "Join us for our weekend specials featuring exclusive dishes and amazing discounts for the whole family.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  return (
    <div className="relative bg-gradient-to-r from-emerald-50 to-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-emerald-600 font-semibold text-lg tracking-wide">
                {carouselData[currentSlide].subtitle}
              </h2>
              <h1 className="text-4xl lg:text-6xl font-bold text-stone-900 leading-tight">
                {carouselData[currentSlide].title}
              </h1>
              <p className="text-lg text-stone-600 max-w-lg leading-relaxed">
                {carouselData[currentSlide].description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Order Now
              </button>
              <button 
                type="button"
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
              >
                View Menu
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex space-x-2 pt-4">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={carouselData[currentSlide].image}
                alt={carouselData[currentSlide].title}
                className="w-full h-[400px] lg:h-[500px] object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-700 p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
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