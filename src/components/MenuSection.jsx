import React, { useState, useEffect } from "react";
// import { MenuItem } from "@/entities/MenuItem";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
import { Plus, ShoppingCart } from "lucide-react";

const categories = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snacks', label: 'Snacks' }
];

// Mock menu items data
const mockMenuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    description: "Aromatic rice dish with tender chicken and exotic spices",
    price: 15.99,
    category: "lunch",
    image_url: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Butter Chicken",
    description: "Creamy and rich curry with tender chicken pieces",
    price: 18.99,
    category: "dinner",
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato mixture",
    price: 12.99,
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
    price: 11.99,
    category: "dinner",
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Aloo Paratha",
    description: "Whole wheat flatbread stuffed with spiced potatoes",
    price: 9.99,
    category: "breakfast",
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
  }
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('recommended');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setMenuItems(mockMenuItems);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading menu items:', error);
      setLoading(false);
    }
  };

  const filteredItems = activeCategory === 'recommended' 
    ? menuItems.slice(0, 6) 
    : menuItems.filter(item => item.category === activeCategory);

  const addToCart = async (item) => {
    // Cart functionality would be implemented here
    console.log('Added to cart:', item);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-semibold text-lg tracking-wide mb-2">
            FOODS MENU
          </p>
          <h2 className="text-4xl font-bold text-stone-900 mb-6">
            Choose Your Best Menus
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex justify-end mb-8">
            <button className="text-emerald-600 hover:text-emerald-700 underline">
              See All Products →
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-stone-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-stone-200 rounded w-3/4" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                  <div className="h-3 bg-stone-200 rounded w-2/3" />
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-stone-200 rounded w-16" />
                    <div className="h-10 bg-stone-200 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image_url || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{item.name}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      ${item.price}
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}