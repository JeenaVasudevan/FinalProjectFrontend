import React from "react";
import { Link } from "react-router-dom";

export const MenuCard = ({ menu }) => {
    return (
        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden w-80 mx-auto transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <figure>
                <img
                    src={menu?.image || "https://img.freepik.com/premium-photo/round-pizza-with-cheese-ham-basil-tomatoes-spices-wooden-kitchen-board-around-decoration-with-vegetables-spices-side-view-dark-background_923894-4823.jpg"}
                    alt={menu?.name}
                    className="w-full h-48 object-cover"
                />
            </figure>
            <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800">{menu?.name}</h2>
                <p className="text-gray-600 mt-1">Category: {menu?.category}</p>
                <p className="text-gray-600 mt-1">{menu?.description}</p>
                <p className="text-gray-600 mt-1">Price: ${menu?.price?.toFixed(2)}</p>
                <div className="mt-4 flex justify-end">
                    <Link to={`/menu/${menu._id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            More Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
