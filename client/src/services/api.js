const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed: ${response.status}`);
  }

  return data;
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export const foodApi = {
  getAll: (params = {}) => {
    const search = new URLSearchParams(params).toString();
    return api.get(`/foods${search ? `?${search}` : ''}`);
  },
  getById: (id) => api.get(`/foods/${id}`),
  getCategories: () => api.get('/foods/categories/list'),
};

export const orderApi = {
  create: (order) => api.post('/orders', order),
  getAll: () => api.get('/orders'),
  markPaid: (id) => api.put(`/orders/${id}/pay`),
};

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (user) => api.post('/auth/register', user),
};

export const bannerApi = {
  getAll: () => api.get('/banners'),
};

export default api;
