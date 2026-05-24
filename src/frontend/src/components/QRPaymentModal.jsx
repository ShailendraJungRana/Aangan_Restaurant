import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { HiOutlineX, HiCheckCircle } from "react-icons/hi";
import API from "../api/axios";
import toast from "react-hot-toast";

/**
 * QRPaymentModal component
 * Displays a QR code for simulated payment after order confirmation.
 * QR data includes order number and total amount.
 */
const QRPaymentModal = ({ order, onClose, onPaymentComplete }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // QR code data — in a real app this would encode a payment gateway URL
  const qrData = JSON.stringify({
    orderNo: order.orderNo,
    amount: order.totalPrice,
    currency: "USD",
    merchant: "Foodie Express",
    payTo: "foodie-express@pay",
  });

  /**
   * Simulate payment: marks order as paid via API.
   */
  const handlePayment = async () => {
    setIsPaying(true);
    try {
      await API.put(`/api/orders/${order._id}/pay`);
      setIsPaid(true);
      toast.success("Payment successful! 🎉");
      setTimeout(() => {
        if (onPaymentComplete) onPaymentComplete();
      }, 2000);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isPaid ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
        {/* Close Button */}
        {!isPaid && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <HiOutlineX className="text-xl" />
          </button>
        )}

        {isPaid ? (
          /* ---- Success State ---- */
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <HiCheckCircle className="text-5xl text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Payment Successful!
            </h3>
            <p className="text-slate-500 mb-1">
              Order <span className="font-semibold text-orange-600">{order.orderNo}</span>
            </p>
            <p className="text-sm text-slate-400">
              You will be redirected shortly...
            </p>
          </div>
        ) : (
          /* ---- QR Payment State ---- */
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                Scan to Pay
              </h3>
              <p className="text-slate-500 text-sm">
                Scan the QR code with your payment app
              </p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-orange-200">
                <QRCodeSVG
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin
                  fgColor="#1e293b"
                  bgColor="#ffffff"
                />
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Order Number</span>
                <span className="font-semibold text-slate-800">{order.orderNo}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Items</span>
                <span className="font-semibold text-slate-800">
                  {order.items?.length || 0} item(s)
                </span>
              </div>
              <div className="border-t border-orange-200 my-2" />
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">Total Amount</span>
                <span className="text-xl font-bold text-orange-600">
                  ${order.totalPrice?.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Simulate Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-green-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPaying ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                "✅ I've Completed Payment"
              )}
            </button>

            <p className="text-center text-xs text-slate-400 mt-3">
              This is a simulated payment for demo purposes
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default QRPaymentModal;
