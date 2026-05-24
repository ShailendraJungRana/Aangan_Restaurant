import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { HiArrowLeft, HiStar, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

/**
 * FoodDetail Page
 * Shows full details of a single food item with add-to-cart controls.
 */
const FoodDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { data } = await API.get(`/api/foods/${id}`);
        setFood(data);
      } catch (error) {
        console.error("Failed to fetch food:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(food);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square skeleton rounded-2xl" />
          <div className="space-y-4 py-4">
            <div className="h-8 w-3/4 skeleton" />
            <div className="h-4 w-1/3 skeleton" />
            <div className="h-20 w-full skeleton" />
            <div className="h-10 w-1/2 skeleton" />
          </div>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl mb-4 block">😕</span>
        <h3 className="text-xl font-semibold text-slate-700">Food item not found</h3>
        <Link to="/menu" className="text-orange-500 hover:underline mt-2 inline-block">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-6 transition-colors"
        >
          <HiArrowLeft />
          <span className="text-sm font-medium">Back to Menu</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 shadow-xl">
            {food.image ? (
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[8rem]">🍽️</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold mb-3 w-fit">
              {food.category}
            </span>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
              {food.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className="text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-500">(4.8 • 120+ reviews)</span>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-6">
              {food.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-orange-600">
                ${food.price.toFixed(2)}
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-orange-50 text-slate-600 transition-colors cursor-pointer"
                >
                  <HiOutlineMinus />
                </button>
                <span className="w-12 text-center font-semibold text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-orange-50 text-slate-600 transition-colors cursor-pointer"
                >
                  <HiOutlinePlus />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                Add to Cart — ${(food.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: "🕐", label: "25-30 min" },
                { icon: "🔥", label: "Fresh" },
                { icon: "⭐", label: "Top Rated" },
              ].map((info, i) => (
                <div
                  key={i}
                  className="text-center p-3 bg-orange-50/50 rounded-xl"
                >
                  <span className="text-xl block mb-1">{info.icon}</span>
                  <span className="text-xs font-medium text-slate-600">
                    {info.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
