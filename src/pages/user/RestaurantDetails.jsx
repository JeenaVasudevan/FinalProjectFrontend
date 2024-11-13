import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurantDetails, isLoading] = useFetch(`/restaurant/restaurantDetails/${id}`);
    const [quantity, setQuantity] = useState({}); // To track quantity for each menu item

    const handleAddToCart = async (menuItemId) => {
        try {
            const qty = quantity[menuItemId] || 1; // Default to 1 if no quantity is set
            await axiosInstance.post("/cart/add", {
                menuItem: menuItemId, // Pass the menuItemId
                quantity: qty,        // Pass the selected quantity
            });
            toast.success("Menu item added to cart");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Login to add items to cart");
        }
    };

    const handleQuantityChange = (menuItemId, value) => {
        setQuantity((prev) => ({
            ...prev,
            [menuItemId]: value,
        }));
    };

    if (isLoading) {
        return <p className="text-center text-gray-500 mt-10">Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row gap-8 bg-white shadow-lg rounded-lg p-6">
                <div className="w-full sm:w-1/3">
                    <img 
                        src={restaurantDetails?.image || "https://www.restolacuisine.com/restaurants/restaurant-la-cuisine/website/images/Lacuisine_resto.jpg"} 
                        alt="Restaurant"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                <div className="w-full sm:w-2/3">
                    <h2 className="text-4xl font-bold text-gray-800">{restaurantDetails?.name}</h2>
                    <p className="mt-3 text-gray-700 text-lg">{restaurantDetails?.description}</p>
                    <p className="mt-4 text-gray-600"><strong>Cuisine:</strong> {restaurantDetails?.cuisine}</p>
                    <p className="mt-1 text-gray-600"><strong>Address:</strong> {restaurantDetails?.address}</p>

                    <h3 className="mt-8 text-2xl font-semibold text-gray-800">Menu Items</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                        {restaurantDetails?.menuItems?.map((menuItem) => (
                            <div key={menuItem._id} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 duration-200">
                                <img
                                    src={menuItem.image || "https://default-menu-item-image.jpg"}
                                    alt={menuItem.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{menuItem.name}</h3>
                                    <p className="text-gray-600 mt-2">{menuItem.description}</p>
                                    <p className="text-gray-800 font-medium mt-2">Price: ${menuItem.price}</p>

                                    {/* Quantity Input Field */}
                                    <div className="mt-4">
                                        <label htmlFor={`quantity-${menuItem._id}`} className="block text-gray-700">Quantity:</label>
                                        <input
                                            type="number"
                                            id={`quantity-${menuItem._id}`}
                                            value={quantity[menuItem._id] || 1}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(menuItem._id, Number(e.target.value))}
                                            className="mt-1 p-2 w-20 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <button 
                                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                        onClick={() => handleAddToCart(menuItem._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
