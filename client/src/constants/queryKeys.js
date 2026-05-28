export const queryKeys = {
  foods: {
    all: ['foods'],
    list: (category) => ['foods', 'list', category ?? 'all'],
    detail: (id) => ['foods', 'detail', id],
    categories: ['foods', 'categories'],
  },
  banners: {
    all: ['banners'],
  },
  orders: {
    all: ['orders'],
  },
  health: ['health'],
};
