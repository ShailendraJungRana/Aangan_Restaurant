import { Link } from "react-router-dom";
import { HiOutlinePlus, HiStar } from "react-icons/hi";
import { useCart } from "../context/CartContext";

/**
 * FoodCard component — displays a single food item in the menu grid.
 * Features: image with overlay gradient, price badge, add-to-cart button.
 */
const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  // Generate a random rating between 4.0 and 5.0 for visual appeal
  const rating = (4 + Math.random()).toFixed(1);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-50">
      {/* Image Container */}
      <Link to={`/food/${food._id}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] bg-gradient-to-br from-orange-100 to-amber-50">
          {food.image ? (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">🍽️</span>
            </div>
          )}
        </div>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-orange-600 shadow-sm">
          {food.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <HiStar className="text-amber-400 text-sm" />
          <span className="text-xs font-medium text-slate-500">{rating}</span>
        </div>

        {/* Name */}
        <Link to={`/food/${food._id}`}>
          <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
            {food.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-slate-500 mb-3 line-clamp-2">
          {food.description}
        </p>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600">
            ${food.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(food)}
            className="w-9 h-9 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <HiOutlinePlus className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
