import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/order/orderDetails/${id}`, { withCredentials: true });
                setOrder(response.data.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : "Error fetching order details");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Order Details</h2>
            <h3>Order ID: {order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Delivery Address: {order.deliveryAddress}</p>
            <h4>Items:</h4>
            <ul>
                {order.items.map(item => (
                    <li key={item.menuItem._id}>
                        {item.menuItem.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};