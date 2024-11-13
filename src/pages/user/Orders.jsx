import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance'; // assuming you've configured axios for API calls
import { useNavigate } from 'react-router-dom'; // For navigation

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch orders when the component loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/order'); // Assuming your backend has this endpoint
        setOrders(response.data.data); // Save the fetched orders in state
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Navigate to the order details page
  const viewOrderDetails = (orderId) => {
    navigate(`/user/orderDetails/${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>
      
      {loading ? (
        <div className="text-center">Loading your orders...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p className="text-center">You have no orders yet.</p>
          ) : (
            <div>
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order._id} className="border p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                        <p>Status: <span className="font-medium">{order.status}</span></p>
                        <p>Total: ₹{order.totalAmount}</p>
                      </div>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => viewOrderDetails(order._id)}
                      >
                        View Details
                      </button>
                    </div>
                    <div className="mt-2">
                      <p>Delivery Address: {order.deliveryAddress}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

