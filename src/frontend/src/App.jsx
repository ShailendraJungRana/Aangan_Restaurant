import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Layout
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import FoodDetail from "./pages/FoodDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ManageFoods from "./pages/admin/ManageFoods";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageBanners from "./pages/admin/ManageBanners";

/**
 * App — Root component with routing, context providers, and toast notifications.
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              className: "toast-custom",
              style: {
                borderRadius: "12px",
                background: "#1e293b",
                color: "#f8fafc",
                fontSize: "14px",
                padding: "12px 16px",
              },
              success: {
                iconTheme: {
                  primary: "#f97316",
                  secondary: "#fff",
                },
              },
            }}
          />

          {/* Public Navbar */}
          <Navbar />

          <Routes>
            {/* ====== Public Routes ====== */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/food/:id" element={<FoodDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* ====== Admin Routes ====== */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              {/* Nested admin routes rendered via <Outlet /> in Dashboard */}
              <Route path="foods" element={<ManageFoods />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="banners" element={<ManageBanners />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
