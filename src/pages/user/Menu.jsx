import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { MenuCard } from "../../components/user/MenuCard";

export const Menu = () => {
    const [url] = useState("/menuItems/all-menus");
    const [menus, loading, error] = useFetch(url);

    return (
        <div>
            {loading ? (
                <p className="text-gray-500">Loading menu items...</p>
            ) : (
                <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {Array.isArray(menus) && menus.map((menu) => (
                        <MenuCard key={menu._id} menu={menu} />
                    ))}
                </div>
            )}
            {error && <p className="text-red-500">Error loading menus: {error.message}</p>}
        </div>
    );
};
