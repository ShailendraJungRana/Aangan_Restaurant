import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { bannerApi } from '@/services/api';
import { normalizeBanner } from '@/lib/food';

const FALLBACK_BANNERS = [
  {
    id: 'fallback-1',
    title: 'Authentic Indian Cuisine',
    subtitle: 'Experience the Rich Flavors of India',
    description:
      'Discover our traditional recipes passed down through generations.',
    image:
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop',
  },
  {
    id: 'fallback-2',
    title: 'Farm Fresh Ingredients',
    subtitle: 'From Garden to Your Plate',
    description: 'We source the freshest ingredients from local farms.',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
  },
];

export function useBannersQuery() {
  return useQuery({
    queryKey: queryKeys.banners.all,
    queryFn: () => bannerApi.getAll(),
    select: (data) => {
      const banners = (Array.isArray(data) ? data : []).map(normalizeBanner);
      return banners.length > 0 ? banners : FALLBACK_BANNERS;
    },
  });
}
