import React, { useEffect, useState } from 'react';
import { AdminRestaurantCard } from '../../components/admin/RestaurantCard';
import { axiosInstance } from '../../config/axiosInstance';

export const EditRestaurant = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                // Corrected path based on your backend routes
                const response = await axiosInstance.get('/restaurant/all-restaurants');
                setRestaurants(response.data.data || []);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Restaurants</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map((restaurant) => (
                        <AdminRestaurantCard key={restaurant._id} restaurant={restaurant} />
                    ))}
                </div>
            </div>
        </div>
    );
};