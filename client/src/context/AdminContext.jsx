import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if admin is authenticated on mount
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = (password) => {
    // Default admin password - in production, this should be stored securely on backend
    const adminPassword = "admin123"; // Change this to your desired password
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
  };

  // Check authentication
  const checkAuth = () => {
    return localStorage.getItem("adminAuthenticated") === "true";
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, isLoading, login, logout, checkAuth }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};

