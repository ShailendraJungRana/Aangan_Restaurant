import { useState, useEffect } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { HiSearch, HiOutlineEye, HiOutlineX } from "react-icons/hi";

/**
 * ManageOrders — Admin order management.
 * Features: search by orderNo, filter by status, update order/payment status.
 */
const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter !== "All") params.status = statusFilter;

      const { data } = await API.get("/api/orders", { params });
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  // Search on Enter
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchOrders();
    }
  };

  // Update order status
  const handleStatusChange = async (orderId, field, value) => {
    try {
      await API.put(`/api/orders/${orderId}`, { [field]: value });
      toast.success(`${field === "orderStatus" ? "Order" : "Payment"} status updated`);
      fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, [field]: value });
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Preparing: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
    Paid: "bg-green-100 text-green-700",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Orders</h2>
          <p className="text-sm text-slate-500">{orders.length} orders</p>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search order no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full sm:w-56 pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 skeleton rounded-xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <span className="text-5xl mb-4 block">📦</span>
          <p className="text-slate-500">No orders found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Order No
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="font-mono font-semibold text-sm text-orange-600">
                        {order.orderNo}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-slate-800">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-slate-400">{order.customerEmail}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-sm text-slate-800">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, "paymentStatus", e.target.value)
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer focus:outline-none ${
                          statusColors[order.paymentStatus]
                        }`}
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, "orderStatus", e.target.value)
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer focus:outline-none ${
                          statusColors[order.orderStatus]
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 rounded-lg hover:bg-orange-50 text-orange-500 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <HiOutlineEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800">
                Order Details
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
              >
                <HiOutlineX className="text-lg" />
              </button>
            </div>

            {/* Order Info */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Order Number</span>
                <span className="font-mono font-bold text-orange-600">
                  {selectedOrder.orderNo}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">
                  Customer Info
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-slate-500">Name:</p>
                  <p className="text-slate-800">{selectedOrder.customerName}</p>
                  <p className="text-slate-500">Email:</p>
                  <p className="text-slate-800">{selectedOrder.customerEmail}</p>
                  <p className="text-slate-500">Phone:</p>
                  <p className="text-slate-800">{selectedOrder.customerPhone}</p>
                  <p className="text-slate-500">Address:</p>
                  <p className="text-slate-800">{selectedOrder.deliveryAddress}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">
                  Items
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-600">
                        {item.quantity}× {item.name}
                      </span>
                      <span className="font-medium text-slate-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Total</span>
                  <span className="text-xl font-bold text-orange-600">
                    ${selectedOrder.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 text-sm">
                <span
                  className={`px-3 py-1 rounded-lg font-medium ${
                    statusColors[selectedOrder.paymentStatus]
                  }`}
                >
                  {selectedOrder.paymentStatus}
                </span>
                <span
                  className={`px-3 py-1 rounded-lg font-medium ${
                    statusColors[selectedOrder.orderStatus]
                  }`}
                >
                  {selectedOrder.orderStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
