import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "../../config/axiosInstance";

const PaymentCheckout = () => {
  const { state } = useLocation(); // Retrieve state passed from AddressPage
  const navigate = useNavigate();

  const cart = state?.cart || { items: [], totalPrice: 0 };
  const address = state?.address || null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cart.items || cart.items.length === 0) {
      navigate("/cart", { replace: true }); // Ensure cart has items
    } else if (!address) {
      navigate("/address", { replace: true }); // Redirect to address page if missing
    }
  }, [cart, address, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const paymentResponse = await axiosInstance.post(
        `/payment/create-checkout-session`,
        { cart }
      );
      const { sessionId } = paymentResponse.data;

      if (!sessionId) {
        setError("Failed to create checkout session.");
        return;
      }

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_Key);
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId
      });

      if (stripeError) {
        setError(stripeError.message);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("There was an issue processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering if cart or address is missing
  if (!cart.items || !address) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Payment Checkout</h1>
      <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
        <div>
          <p>{address.fullName}</p>
          <p>{address.phone}</p>
          <p>
            {address.street}, {address.city}, {address.state} - {address.zipCode}
          </p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>

      {cart.items && cart.items.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <ul>
            {cart.items.map((item) => (
              <li key={item.menuItem._id} className="mb-2">
                {item.menuItem.name} - ₹{item.menuItem.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold mt-4">
            Total Price: ₹{cart.totalPrice.toFixed(2)}
          </p>
        </div>
      )}

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default PaymentCheckout;