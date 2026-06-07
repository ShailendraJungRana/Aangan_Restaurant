import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { foodApi } from '@/services/api';
import { normalizeFood } from '@/lib/food';

export function useFoodsQuery(category) {
  const params = category && category !== 'all' && category !== 'recommended'
    ? { category }
    : {};

  return useQuery({
    queryKey: queryKeys.foods.list(category),
    queryFn: () => foodApi.getAll(params),
    select: (data) => (Array.isArray(data) ? data : []).map(normalizeFood),
  });
}

export function useFoodCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.foods.categories,
    queryFn: () => foodApi.getCategories(),
    select: (data) =>
      (Array.isArray(data) ? data : []).map((c) => c.toLowerCase()),
  });
}
