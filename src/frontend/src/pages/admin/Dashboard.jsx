import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";
import {
  HiOutlineViewGrid,
  HiOutlineCollection,
  HiOutlineClipboardList,
  HiOutlinePhotograph,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiTrendingUp,
  HiCurrencyDollar,
  HiShoppingCart,
  HiCollection,
} from "react-icons/hi";
import { MdDeliveryDining } from "react-icons/md";

/**
 * Admin Dashboard — Layout wrapper with sidebar navigation.
 * Renders child routes via <Outlet />.
 */
const Dashboard = () => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ foods: 0, orders: 0, revenue: 0, pending: 0 });

  const navItems = [
    { name: "Overview", path: "/admin", icon: HiOutlineViewGrid },
    { name: "Manage Foods", path: "/admin/foods", icon: HiOutlineCollection },
    { name: "Manage Orders", path: "/admin/orders", icon: HiOutlineClipboardList },
    { name: "Manage Banners", path: "/admin/banners", icon: HiOutlinePhotograph },
  ];

  // Fetch stats for overview
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [foodsRes, ordersRes] = await Promise.all([
          API.get("/api/foods"),
          API.get("/api/orders"),
        ]);
        const orders = ordersRes.data;
        setStats({
          foods: foodsRes.data.length,
          orders: orders.length,
          revenue: orders
            .filter((o) => o.paymentStatus === "Paid")
            .reduce((sum, o) => sum + o.totalPrice, 0),
          pending: orders.filter((o) => o.orderStatus === "Pending").length,
        });
      } catch (error) {
        console.error("Stats fetch error:", error);
      }
    };
    fetchStats();
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;
  const isOverview = location.pathname === "/admin";

  const statCards = [
    {
      label: "Total Foods",
      value: stats.foods,
      icon: HiCollection,
      color: "from-blue-500 to-indigo-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Total Orders",
      value: stats.orders,
      icon: HiShoppingCart,
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      label: "Revenue",
      value: `$${stats.revenue.toFixed(2)}`,
      icon: HiCurrencyDollar,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "Pending Orders",
      value: stats.pending,
      icon: HiTrendingUp,
      color: "from-rose-500 to-pink-500",
      bg: "bg-rose-50",
      text: "text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 transform transition-transform duration-300 lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/50">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
              <MdDeliveryDining className="text-white text-xl" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">Foodie Express</h2>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden ml-auto text-slate-400 hover:text-white cursor-pointer"
            >
              <HiOutlineX className="text-xl" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? "bg-orange-500/15 text-orange-400"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="text-lg" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User + Logout */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {admin?.name?.[0] || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {admin?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {admin?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
            >
              <HiOutlineLogout className="text-lg" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <HiOutlineMenu className="text-xl text-slate-600" />
              </button>
              <h1 className="text-lg font-semibold text-slate-800">
                {navItems.find((n) => isActive(n.path))?.name || "Dashboard"}
              </h1>
            </div>
            <Link
              to="/"
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              View Store →
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {isOverview ? (
            /* Overview Stats */
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center`}>
                        <card.icon className={`text-xl ${card.text}`} />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{card.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    to="/admin/foods"
                    className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    <HiOutlineCollection className="text-xl text-blue-600" />
                    <span className="font-medium text-blue-700 text-sm">
                      Manage Foods
                    </span>
                  </Link>
                  <Link
                    to="/admin/orders"
                    className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors"
                  >
                    <HiOutlineClipboardList className="text-xl text-orange-600" />
                    <span className="font-medium text-orange-700 text-sm">
                      View Orders
                    </span>
                  </Link>
                  <Link
                    to="/admin/banners"
                    className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                  >
                    <HiOutlinePhotograph className="text-xl text-purple-600" />
                    <span className="font-medium text-purple-700 text-sm">
                      Manage Banners
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
