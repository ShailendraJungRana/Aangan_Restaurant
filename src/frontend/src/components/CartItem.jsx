import { HiOutlinePlus, HiOutlineMinus, HiOutlineTrash } from "react-icons/hi";
import { useCart } from "../context/CartContext";

/**
 * CartItem component — displays a single item in the cart page.
 * Features: quantity stepper, remove button, line total.
 */
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-orange-50 hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            🍽️
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-800 truncate">{item.name}</h3>
        <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <HiOutlineMinus className="text-sm" />
          </button>
          <span className="w-8 text-center font-semibold text-slate-800 text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="w-7 h-7 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <HiOutlinePlus className="text-sm" />
          </button>
        </div>
      </div>

      {/* Line Total + Remove */}
      <div className="flex flex-col items-end gap-2">
        <span className="font-bold text-orange-600">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeFromCart(item._id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
        >
          <HiOutlineTrash className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
