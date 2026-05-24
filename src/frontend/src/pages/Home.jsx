import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import BannerSlider from "../components/BannerSlider";
import FoodCard from "../components/FoodCard";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { MdDeliveryDining, MdTimer, MdStar } from "react-icons/md";

/**
 * Home Page
 * Features: Banner slider, featured food items, feature highlights.
 */
const Home = () => {
  const [banners, setBanners] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, foodsRes] = await Promise.all([
          API.get("/api/banners"),
          API.get("/api/foods"),
        ]);
        setBanners(bannersRes.data);
        setFoods(foodsRes.data);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: <MdDeliveryDining className="text-3xl" />,
      title: "Fast Delivery",
      desc: "Get your food delivered in 30 mins",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: <MdStar className="text-3xl" />,
      title: "Best Quality",
      desc: "Fresh ingredients, always",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <MdTimer className="text-3xl" />,
      title: "Easy Ordering",
      desc: "Order in just a few taps",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <BannerSlider banners={banners} />
      </section>

      {/* Features Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-orange-50 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-lg`}
              >
                {feat.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{feat.title}</h3>
                <p className="text-sm text-slate-500">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <HiSparkles className="text-lg" />
              <span className="text-sm font-semibold uppercase tracking-wider">Popular</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Most Loved Dishes
            </h2>
          </div>
          <Link
            to="/menu"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl font-medium text-sm transition-colors"
          >
            View Full Menu
            <HiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] skeleton" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-2/3 skeleton" />
                  <div className="h-3 w-full skeleton" />
                  <div className="h-3 w-1/2 skeleton" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foods.slice(0, 8).map((food, i) => (
              <div
                key={food._id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl shadow-lg shadow-orange-200"
          >
            View Full Menu
            <HiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <MdDeliveryDining className="text-white text-lg" />
            </div>
            <span className="text-lg font-bold text-white">Foodie Express</span>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Foodie Express. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-slate-500">
            Delivering happiness, one meal at a time. 🍕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
