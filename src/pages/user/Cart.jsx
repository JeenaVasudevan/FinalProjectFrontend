import React, { useEffect, useState } from "react";
import { CartCard } from "../../components/user/Cards";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart/fetch");
        setCart(response.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      const response = await axiosInstance.put(`/cart/update/${id}`, { quantity });
      setCart(response.data.data);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axiosInstance.delete(`/cart/delete/${id}`);
      setCart(response.data.data);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Step 1: Check if cart is valid and not empty
      if (!cart || !cart.items || cart.items.length === 0) {
        alert("Your cart is empty. Please add items to your cart before proceeding.");
        setLoading(false);
        return;
      }
  
      // Step 2: Call backend to create Stripe checkout session
      const paymentResponse = await axiosInstance.post('/payment/create-checkout-session', { cart });
  
      // Step 3: Load Stripe and redirect to checkout
      const { sessionId } = paymentResponse.data;
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_Key);
  
      if (sessionId) {
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId,
        });
  
        if (stripeError) {
          setError(stripeError.message);
          setLoading(false);
          return;
        }
  
        // Step 4: After successful payment, clear cart and navigate to success page
        const handlePaymentSuccess = () => {
          setCart({ items: [], totalPrice: 0 }); // Clear the cart
          navigate('/user/payment/success'); // Redirect to the success page
        };  
        handlePaymentSuccess();
      } else {
        setError("Session creation failed.");
        setLoading(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('There was an issue processing your payment.');
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cart ? (
        <div>
          {cart.items.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <div>
              {cart.items.map((item) => (
                <CartCard
                  key={item.menuItem._id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onDeleteItem={handleDeleteItem}
                />
              ))}
              <div className="mt-4">
                <p className="text-lg font-semibold">
                  Total Price: ₹{cart.totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                {/* Checkout Button */}
                <button
                  onClick={handlePayment}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                  disabled={loading} // Disable while loading
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default Cart;
