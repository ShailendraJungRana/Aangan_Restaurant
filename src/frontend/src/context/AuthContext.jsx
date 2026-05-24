import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

/**
 * Custom hook to access auth state and actions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * AuthProvider
 * Manages admin authentication state with JWT persistence.
 */
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if a valid token exists and fetch admin profile
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      API.get("/api/auth/me")
        .then((res) => {
          setAdmin(res.data);
        })
        .catch(() => {
          localStorage.removeItem("adminToken");
          setAdmin(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  /**
   * Login admin with email and password.
   * Stores JWT in localStorage.
   */
  const login = async (email, password) => {
    const { data } = await API.post("/api/auth/login", { email, password });
    localStorage.setItem("adminToken", data.token);
    setAdmin(data);
    return data;
  };

  /**
   * Logout admin — clear token and state.
   */
  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
