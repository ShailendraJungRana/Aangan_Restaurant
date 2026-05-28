import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useFoodsQuery } from '@/hooks/queries/useFoodsQuery';
import { Plus } from 'lucide-react';

const categories = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snacks', label: 'Snacks' },
];

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop';

export default function MenuSection() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('recommended');
  const [showAllProducts, setShowAllProducts] = useState(false);

  const queryCategory =
    activeCategory === 'recommended' || showAllProducts ? 'all' : activeCategory;

  const { data: menuItems = [], isLoading, isError, error } = useFoodsQuery(
    showAllProducts ? 'all' : queryCategory,
  );

  const getFilteredItems = () => {
    const available = menuItems.filter((item) => item.isAvailable);
    if (showAllProducts) return available;
    if (activeCategory === 'recommended') return available.slice(0, 6);
    return available.filter((item) => item.category === activeCategory);
  };

  const filteredItems = getFilteredItems();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-semibold text-lg tracking-wide mb-2">
            FOODS MENU
          </p>
          <h2 className="text-4xl font-bold text-stone-900 mb-6">
            Choose Your Best Menus
          </h2>

          {!showAllProducts && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.id);
                    setShowAllProducts(false);
                  }}
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
          )}

          <div className="flex justify-end mb-8">
            {!showAllProducts ? (
              <button
                type="button"
                onClick={() => setShowAllProducts(true)}
                className="text-emerald-600 hover:text-emerald-700 underline font-medium transition-colors"
              >
                See All Menus →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowAllProducts(false);
                  setActiveCategory('recommended');
                }}
                className="text-emerald-600 hover:text-emerald-700 underline font-medium transition-colors"
              >
                Show Less ←
              </button>
            )}
          </div>
        </div>

        {isError && (
          <p className="text-center text-red-600 mb-6">
            {error?.message || 'Failed to load menu. Is the server running?'}
          </p>
        )}

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-stone-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-stone-200 rounded w-3/4" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                  <div className="h-10 bg-stone-200 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-stone-500">
            No menu items yet. Run <code className="bg-stone-100 px-2 py-1 rounded">npm run seed</code> in the server folder.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image_url || PLACEHOLDER_IMAGE}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{item.name}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-emerald-600">Rs {item.price}</div>
                    <button
                      type="button"
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
