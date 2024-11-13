import React, { useState } from "react";
import { RestaurantCard } from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";

export const Restaurants = () => {
    const [url, setUrl] = useState("/restaurant/all-restaurants");
    const [restaurants = [], loading, error] = useFetch(url);

    return (
        <div>
            {loading ? (
                <p className="text-gray-500">Loading restaurants...</p>
            ) : (
                <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {Array.isArray(restaurants) && restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                    ))}
                </div>
            )}

            {error && <p className="text-red-500">Error loading restaurants: {error.message}</p>}
        </div>
    );
};
