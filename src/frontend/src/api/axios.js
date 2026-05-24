import axios from "axios";

/**
 * Axios instance configured with base URL.
 * In development, Vite proxy forwards /api to localhost:5000.
 * In production, update baseURL to your deployed backend URL.
 */
const API = axios.create({
  baseURL: "",  // Uses Vite proxy in dev
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor:
 * Automatically attach JWT token from localStorage to every request.
 */
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Response interceptor:
 * Handle 401 errors by clearing token (auto logout).
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
    }
    return Promise.reject(error);
  }
);

export default API;
