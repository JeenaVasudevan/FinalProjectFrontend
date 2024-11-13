import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/orders/:orderId`);
        setOrder(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Order #{order._id}</h1>
      <div>
        <h2 className="text-xl">Status: {order.status}</h2>
        <p>Total: ₹{order.totalAmount}</p>
        <p>Delivery Address: {order.deliveryAddress}</p>
        <h3 className="mt-4 text-lg">Items:</h3>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.menuItem.name} - Quantity: {item.quantity} - Price: ₹{item.menuItem.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
