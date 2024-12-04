import React, { useEffect, useState } from "react";
import { CartCard } from "../../components/user/Cards";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
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

  const proceedToCheckout = () => {
    if (!cart || cart.items.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      return;
    }

    navigate("/user/address", { state: { cart } }); 
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
                <button
                  onClick={proceedToCheckout}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cart;