import { useState, useEffect } from "react";
import API from "../api/axios";
import FoodCard from "../components/FoodCard";
import { HiSearch, HiOutlineAdjustments } from "react-icons/hi";

/**
 * Menu Page
 * Full listing of food items with category filter and search.
 */
const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch food items with filters
  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory !== "All") params.category = activeCategory;
        if (search) params.search = search;

        const { data } = await API.get("/api/foods", { params });
        setFoods(data);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [activeCategory, search]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get("/api/foods/categories/list");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Our Menu
          </h1>
          <p className="text-orange-100 mb-6">
            Explore our wide variety of delicious dishes
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/95 backdrop-blur-sm rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-1.5 text-slate-500 mr-2">
            <HiOutlineAdjustments className="text-lg" />
            <span className="text-sm font-medium whitespace-nowrap">Filter:</span>
          </div>
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === "All"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white text-slate-600 hover:bg-orange-50 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {[...Array(8)].map((_, i) => (
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
        ) : foods.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              No dishes found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {foods.map((food, i) => (
              <div
                key={food._id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
