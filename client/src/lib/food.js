const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || '';

export function getImageUrl(image) {
  if (!image) return null;
  if (image.startsWith('http')) return image;
  return `${API_BASE}${image.startsWith('/') ? image : `/${image}`}`;
}

export function normalizeFood(food) {
  return {
    id: food._id,
    _id: food._id,
    name: food.name,
    description: food.description,
    price: food.price,
    category: (food.category || '').toLowerCase(),
    image_url: getImageUrl(food.image),
    image: food.image,
    isAvailable: food.isAvailable ?? true,
  };
}

export function normalizeBanner(banner) {
  return {
    id: banner._id,
    title: banner.title || 'Welcome to Aangan',
    subtitle: banner.subtitle || '',
    description: banner.subtitle || '',
    image: getImageUrl(banner.image),
  };
}
