import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { MenuCard } from '../../components/user/MenuCard';
import { RestaurantCard } from '../../components/user/Cards';


export const Home = () => {
    const [url] = useState('/menuItems/all-menus');
    const [menus, loading, error] = useFetch(url);

    const [restaurantUrl] = useState('/restaurant/all-restaurants');
    const [restaurants, restaurantLoading, restaurantError] = useFetch(restaurantUrl);

    return (
        <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 min-h-screen flex flex-col w-full">
            {/* Header Section */}
            <header className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white">
                    Welcome to Zestora
                </h1>
                <p className="text-lg sm:text-2xl lg:text-3xl font-medium text-white mt-3">
                    Discover flavors that make every meal an adventure!
                </p>
            </header>
            <main className="flex flex-col sm:flex-row px-4 sm:px-10 md:px-16 lg:px-24 gap-8 sm:gap-10 py-8">
                <div className="flex-1">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 text-center">
                        Uncover Culinary Treasures
                    </h2>
                    <p className="text-md sm:text-lg lg:text-xl text-white mb-6 text-center">
                        At Zestora, we bring you the most tantalizing dishes from local favorites and gourmet kitchens. Whatever you're craving, let us take your taste buds on a delicious journey.
                    </p>

                    {/* Menu Section */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Explore Our Menu</h3>
                        {loading ? (
                            <p className="text-white">Loading menu items...</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
                                {Array.isArray(menus) && menus.map((menu) => (
                                    <MenuCard key={menu._id} menu={menu} />
                                ))}
                            </div>
                        )}
                        {error && <p className="text-red-500">Error loading menus: {error.message}</p>}
                    </div>

                    {/* Restaurants Section */}
                    <h2 className="text-3xl font-semibold text-white mb-6 text-center">Explore Restaurants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16">
                        {restaurantLoading ? (
                            <p className="text-white">Loading restaurants...</p>
                        ) : (
                            Array.isArray(restaurants) && restaurants.map((restaurant) => (
                                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                            ))
                        )}
                    </div>
                    {restaurantError && <p className="text-red-500">Error loading restaurants: {restaurantError.message}</p>}
                </div>
            </main>
        </div>
    );
};
