import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";
import qrImage from "../assets/QR.jpg";

// Mock menu items data (same as MenuSection)
const mockMenuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    description: "Aromatic rice dish with tender chicken and exotic spices",
    price: 360,
    category: "lunch",
    image_url: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Butter Chicken",
    description: "Creamy and rich curry with tender chicken pieces",
    price: 250,
    category: "dinner",
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato mixture",
    price: 180,
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with aromatic spices",
    price: 14.99,
    category: "snacks",
    image_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked to perfection",
    price: 230,
    category: "dinner",
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Aloo Paratha",
    description: "Whole wheat flatbread stuffed with spiced potatoes",
    price: 100,
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    name: "Chicken Tikka Masala",
    description: "Grilled chicken in creamy tomato sauce",
    price: 280,
    category: "dinner",
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    name: "Vegetable Biryani",
    description: "Fragrant rice with mixed vegetables and spices",
    price: 180,
    category: "lunch",
    image_url: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop"
  },
  {
    id: 9,
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes",
    price: 25,
    category: "snacks",
    image_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop"
  }
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snacks', label: 'Snacks' }
];

export default function OrderNow() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Get quantity of item in cart
  const getItemQuantity = (itemId) => {
    return cartItems.filter(item => item.id === itemId).length;
  };
  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // Filter menu items by category
  const filteredItems = activeCategory === 'all' 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === activeCategory);

  // Handle add to cart
  const handleAddToCart = (item) => {
    addToCart(item);
  };

  // Handle remove from cart
  const handleRemoveFromCart = (itemId) => {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      removeFromCart(itemId);
    }
  };

  // Handle order button click - show form
  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowOrderForm(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!orderDetails.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!orderDetails.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!orderDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(orderDetails.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Close form modal and show QR code
      setShowOrderForm(false);
      setShowQR(true);
      setOrderConfirmed(true);
    }
  };

  // Handle close order form modal
  const handleCloseForm = () => {
    setShowOrderForm(false);
    setOrderDetails({ name: '', address: '', phone: '' });
    setFormErrors({});
  };

  // Handle close QR modal
  const handleCloseQR = () => {
    setShowQR(false);
    setOrderConfirmed(false);
    // Optionally clear order details and cart
    setOrderDetails({ name: '', address: '', phone: '' });
  };

  // Get unique cart items with quantities
  const uniqueCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Order Now</h1>
          <p className="text-stone-600">Choose your favorite dishes and place your order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
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

            {/* Menu Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredItems.map((item) => {
                const quantity = getItemQuantity(item.id);
                return (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-stone-900 mb-2">{item.name}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-emerald-600">
                          Rs {item.price.toFixed(2)}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {quantity > 0 && (
                            <>
                              <button
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
          </div>

          {/* Cart Sidebar */}
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
                  <p className="text-sm text-stone-400 mt-2">Add items to get started</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6">
                    {uniqueCartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-stone-900">{item.name}</h4>
                          <p className="text-sm text-stone-600">Rs {item.price.toFixed(2)} × {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold min-w-[20px] text-center">{item.quantity}</span>
                          <button
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
                      <span className="font-bold text-emerald-600 text-xl">Rs {total.toFixed(2)}</span>
                    </div>
                    
                    <button
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

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg">
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-bold mb-4 text-stone-900">Order Details</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name Field */}
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

              {/* Phone Field */}
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
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              {/* Address Field */}
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

              {/* Order Summary */}
              <div className="bg-stone-50 p-4 rounded-lg">
                <h4 className="font-semibold text-stone-900 mb-2">Order Summary</h4>
                <div className="space-y-1 text-sm text-stone-600">
                  {uniqueCartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-200">
                  <span className="font-bold text-stone-900">Total:</span>
                  <span className="font-bold text-emerald-600 text-lg">Rs {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Confirm Order & Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full relative shadow-lg text-center">
            <button
              onClick={handleCloseQR}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-2 text-emerald-600">Order Placed!</h3>
            <div className="text-left mb-4 text-sm text-stone-600 bg-stone-50 p-3 rounded-lg">
              <p className="font-semibold text-stone-900 mb-1">Delivery Details:</p>
              <p><span className="font-medium">Name:</span> {orderDetails.name}</p>
              <p><span className="font-medium">Phone:</span> {orderDetails.phone}</p>
              <p><span className="font-medium">Address:</span> {orderDetails.address}</p>
            </div>
            <p className="text-stone-700 mb-4">
              Scan the QR code to pay <br />
              <span className="font-semibold text-xl text-emerald-600">Rs {total.toFixed(2)}</span>
            </p>
            <img src={qrImage} alt="QR Code" className="w-48 h-48 mx-auto mb-4 rounded-lg border-2 border-stone-200" />
            <p className="text-xs text-stone-500 mb-4">Use Khalti / eSewa / IMEpay or any scanner app.</p>
            <button
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

