import React from "react";
import { FaUtensils, FaMapMarkerAlt, FaLeaf, FaSmile } from "react-icons/fa";

export const About = () => {
    return (
        <div className="container mx-auto px-6 py-10 text-gray-800">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">About Zestora</h1>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12">
                At Zestora, we believe in providing not only the best flavors but also the finest experiences. We are committed to bringing quality, taste, and health together in a single meal.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <FaUtensils className="text-blue-600 text-5xl mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Quality Meals</h3>
                    <p className="text-gray-600">
                        Carefully crafted recipes, using only high-quality ingredients, ensure each meal delights you.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <FaMapMarkerAlt className="text-blue-600 text-5xl mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Local & Fresh</h3>
                    <p className="text-gray-600">
                        We source fresh, local ingredients to support our communities and deliver the best flavors.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <FaLeaf className="text-blue-600 text-5xl mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Sustainable Practices</h3>
                    <p className="text-gray-600">
                        We’re committed to environmentally responsible sourcing and operations to build a greener world.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <FaSmile className="text-blue-600 text-5xl mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Customer Delight</h3>
                    <p className="text-gray-600">
                        Your satisfaction is our priority! We strive to create memorable experiences with every meal.
                    </p>
                </div>
            </div>
        </div>
    );
};
