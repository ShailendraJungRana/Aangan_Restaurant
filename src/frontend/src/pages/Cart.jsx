import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { HiArrowRight, HiOutlineShoppingBag } from "react-icons/hi";

/**
 * Cart Page
 * Lists all cart items with quantity controls and order summary.
 */
const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <HiOutlineShoppingBag className="text-4xl text-orange-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-slate-500 mb-6 text-center">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all"
        >
          Browse Menu
          <HiArrowRight />
        </Link>
      </div>
    );
  }

  const deliveryFee = 2.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + deliveryFee + tax;

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Your Cart
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {cartItems.length} item(s)
            </p>
          </div>
          <button
            onClick={clearCart}
            className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-orange-50 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-800">Total</span>
                    <span className="text-xl font-bold text-orange-600">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <HiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
