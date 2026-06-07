import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useFoodsQuery } from '@/hooks/queries/useFoodsQuery';
import { useCreateOrderMutation } from '@/hooks/mutations/useCreateOrderMutation';
import { Plus, Minus, ShoppingCart, X } from 'lucide-react';
import qrImage from '@/assets/QR.jpg';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snacks', label: 'Snacks' },
];

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';

export default function OrderNow() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [placedOrderNo, setPlacedOrderNo] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const { data: menuItems = [], isLoading, isError, error } =
    useFoodsQuery(activeCategory);
  const createOrder = useCreateOrderMutation();

  const filteredItems = menuItems.filter((item) => item.isAvailable);

  const getItemQuantity = (itemId) =>
    cartItems.filter((item) => item.id === itemId).length;

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const uniqueCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const handleAddToCart = (item) => addToCart(item);
  const handleRemoveFromCart = (itemId) => removeFromCart(itemId);

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowOrderForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!orderDetails.name.trim()) errors.name = 'Name is required';
    if (!orderDetails.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderDetails.email)) {
      errors.email = 'Enter a valid email';
    }
    if (!orderDetails.address.trim()) errors.address = 'Address is required';
    if (!orderDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(orderDetails.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      customerName: orderDetails.name.trim(),
      customerEmail: orderDetails.email.trim(),
      customerPhone: orderDetails.phone.trim(),
      deliveryAddress: orderDetails.address.trim(),
      items: uniqueCartItems.map((item) => ({
        food: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || '',
      })),
      totalPrice: total,
    };

    createOrder.mutate(payload, {
      onSuccess: (data) => {
        setPlacedOrderNo(data.orderNo);
        setShowOrderForm(false);
        setShowQR(true);
      },
      onError: (err) => {
        alert(err.message || 'Failed to place order');
      },
    });
  };

  const handleCloseForm = () => {
    setShowOrderForm(false);
    setOrderDetails({ name: '', email: '', address: '', phone: '' });
    setFormErrors({});
  };

  const handleCloseQR = () => {
    setShowQR(false);
    setPlacedOrderNo(null);
    clearCart();
    setOrderDetails({ name: '', email: '', address: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Order Now</h1>
          <p className="text-stone-600">Choose your favorite dishes and place your order</p>
        </div>

        {isError && (
          <p className="text-red-600 mb-4">
            {error?.message || 'Failed to load menu. Start the server with npm run dev in the server folder.'}
          </p>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg h-64 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredItems.map((item) => {
                  const quantity = getItemQuantity(item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={item.image_url || PLACEHOLDER_IMAGE}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-stone-900 mb-2">{item.name}</h3>
                          <p className="text-stone-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-2xl font-bold text-emerald-600">
                            Rs {item.price}
                          </div>
                          <div className="flex items-center gap-3">
                            {quantity > 0 && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFromCart(item.id)}
                                  className="bg-stone-200 hover:bg-stone-300 text-stone-700 p-2 rounded-full transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold text-stone-900 min-w-[24px] text-center">
                                  {quantity}
                                </span>
                              </>
                            )}
                            <button
                              type="button"
                              onClick={() => handleAddToCart(item)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              {quantity > 0 ? 'Add More' : 'Add'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg sticky top-4 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Cart
                </h2>
                <span className="bg-emerald-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {cartItems.length}
                </span>
              </div>

              {uniqueCartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                  <p className="text-stone-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
                    {uniqueCartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-stone-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-stone-900">{item.name}</h4>
                          <p className="text-sm text-stone-600">
                            Rs {item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(item)}
                            className="text-emerald-600 hover:text-emerald-700 p-1"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-stone-200 pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold text-stone-700">Total:</span>
                      <span className="font-bold text-emerald-600 text-xl">Rs {total}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleOrder}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                      Place Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg">
            <button
              type="button"
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold mb-4 text-stone-900">Order Details</h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={orderDetails.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    formErrors.name ? 'border-red-500' : 'border-stone-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={orderDetails.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    formErrors.email ? 'border-red-500' : 'border-stone-300'
                  }`}
                  placeholder="you@example.com"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={orderDetails.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    formErrors.phone ? 'border-red-500' : 'border-stone-300'
                  }`}
                  placeholder="98XXXXXXXX"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-1">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={orderDetails.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${
                    formErrors.address ? 'border-red-500' : 'border-stone-300'
                  }`}
                  placeholder="Enter your delivery address"
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={createOrder.isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                {createOrder.isPending ? 'Placing order...' : 'Confirm Order & Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full relative shadow-lg text-center">
            <button
              type="button"
              onClick={handleCloseQR}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-2 text-emerald-600">Order Placed!</h3>
            {placedOrderNo && (
              <p className="text-sm font-medium text-stone-700 mb-2">
                Order #: <span className="text-emerald-700">{placedOrderNo}</span>
              </p>
            )}
            <div className="text-left mb-4 text-sm text-stone-600 bg-stone-50 p-3 rounded-lg">
              <p className="font-semibold text-stone-900 mb-1">Delivery Details:</p>
              <p>
                <span className="font-medium">Name:</span> {orderDetails.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {orderDetails.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {orderDetails.address}
              </p>
            </div>
            <p className="text-stone-700 mb-4">
              Scan the QR code to pay <br />
              <span className="font-semibold text-xl text-emerald-600">Rs {total}</span>
            </p>
            <img
              src={qrImage}
              alt="QR Code"
              className="w-48 h-48 mx-auto mb-4 rounded-lg border-2 border-stone-200"
            />
            <button
              type="button"
              onClick={handleCloseQR}
              className="w-full mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
