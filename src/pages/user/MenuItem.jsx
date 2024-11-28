import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const MenuItem = () => {
    const { menuId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [menuDetails, setMenuDetails] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchMenuDetails = async () => {
            if (!menuId) {
                setError("Invalid menu ID in URL");
                setIsLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get(`/menuItems/menuDetails/${menuId}`);
                if (response.data.success) {
                    setMenuDetails(response.data.data);
                } else {
                    setError(response.data.message || "Failed to fetch menu item details");
                }
            } catch (err) {
                setError(err?.response?.data?.message || "Error fetching menu item details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMenuDetails();
    }, [menuId]);

    const handleAddToCart = async () => {
        if (!menuDetails) {
            toast.error("Menu details are not loaded yet");
            return;
        }

        try {
            const response = await axiosInstance.post("/cart/add", {
                menuItem: menuDetails._id,
                quantity: quantity,    
            });

            if (response.data.success) {
                toast.success("Menu item added to cart");
            } else {
                toast.error(response.data.message || "Login to add items to cart");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login to add items to cart");
        }
    };

    if (isLoading) return <p>Loading menu item details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden w-full">
            <img
                src={menuDetails?.image || "https://img.freepik.com/premium-photo/round-pizza-with-cheese-ham-basil-tomatoes-spices-wooden-kitchen-board-around-decoration-with-vegetables-spices-side-view-dark-background_923894-4823.jpg"}
                alt={menuDetails?.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-5">
                <h3 className="text-xl font-semibold">{menuDetails?.name}</h3>
                <p className="text-gray-600 mt-2">{menuDetails?.description}</p>
                <p className="text-gray-600 mt-2">
                    <strong>Price:</strong> ${menuDetails?.price?.toFixed(2)}
                </p>
                
                {/* Quantity Input Field */}
                <div className="mt-4">
                    <label htmlFor="quantity" className="block text-gray-700">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        min="1"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="mt-1 p-2 w-20 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
