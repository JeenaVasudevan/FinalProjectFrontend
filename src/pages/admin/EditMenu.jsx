import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { AdminMenuCard } from "../../components/admin/MenuCard";

export const EditMenu = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axiosInstance.get("/menuItems/all-menus");
                setMenus(response.data.data || []);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetchMenus();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Menus</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menus.map((menu) => (
                        <AdminMenuCard key={menu._id} menu={menu} />
                    ))}
                </div>
            </div>
        </div>
    );
};
