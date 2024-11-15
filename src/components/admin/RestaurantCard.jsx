import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';


export const AdminRestaurantCard = ({ restaurant, onUpdateRestaurants }) => {
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({
        name: restaurant?.name || '',
        address: restaurant?.address || '',
        contactNumber: restaurant?.contactNumber || '',
        cuisine: restaurant?.cuisine || '',
        image: restaurant?.image || ''
    });

    const handleCreateClick = () => setShowCreateForm(true);

    const handleUpdateClick = () => {
        setShowEditForm(true);
        setFormData({
            name: restaurant.name,
            address: restaurant.address,
            contactNumber: restaurant.contactNumber,
            cuisine: restaurant.cuisine,
            image: restaurant.image
        });
    };

    const handleDeleteClick = async () => {
        try {
            await axiosInstance.delete(`/restaurant/delete/${restaurant._id}`);
            toast.success('Restaurant deleted successfully!'); // Toast on delete success
            onUpdateRestaurants(restaurant._id); // Update parent list on delete
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/restaurant/create', formData);
            if (response.data.success) {
                toast.success('Restaurant created successfully!'); // Toast on create success
                onUpdateRestaurants(response.data.data); // Pass new restaurant to parent
                setShowCreateForm(false); // Hide form on successful creation
            }
        } catch (error) {
            console.error('Error creating restaurant:', error);
        }
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/restaurant/update/${restaurant._id}`, formData);
            if (response.data.success) {
                toast.success('Restaurant updated successfully!'); // Toast on update success
                onUpdateRestaurants(response.data.data); // Pass updated restaurant to parent
                setShowEditForm(false); // Hide form on successful edit
            }
        } catch (error) {
            console.error('Error updating restaurant:', error);
        }
    };

    return (
        <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden w-80 mx-auto transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <figure>
                <img
                    src={restaurant?.image || "https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt={restaurant?.name}
                    className="w-full h-48 object-cover"
                />
            </figure>
            <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800">{restaurant?.name}</h2>
                <p className="text-gray-600 mt-1">Cuisine: {restaurant?.cuisine}</p>
                <div className="flex items-center mt-2">
                    <span className="text-yellow-400">
                        {'★'.repeat(Math.floor(restaurant?.rating || 5))}
                        <span className="text-gray-400">
                            {'★'.repeat(5 - Math.floor(restaurant?.rating || 5))}
                        </span>
                    </span>
                    <span className="ml-2 text-gray-600 text-sm">
                        {restaurant?.rating?.toFixed(1)}
                    </span>
                </div>
                <div className="mt-4 flex justify-between space-x-2">
                    <button
                        onClick={handleCreateClick}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Create
                    </button>

                    <button
                        onClick={handleUpdateClick}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                        Update
                    </button>

                    <button
                        onClick={handleDeleteClick}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Create Form */}
            {showCreateForm && (
                <form onSubmit={handleSubmitCreate} className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <h2 className="text-xl font-semibold mb-4">Create Restaurant</h2>
                    {renderFormInputs()}
                    <div className="flex justify-end space-x-2">
                        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                            Save
                        </button>
                        <button onClick={() => setShowCreateForm(false)} className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Edit Form */}
            {showEditForm && (
                <form onSubmit={handleSubmitEdit} className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <h2 className="text-xl font-semibold mb-4">Edit Restaurant</h2>
                    {renderFormInputs()}
                    <div className="flex justify-end space-x-2">
                        <button type="submit" className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                            Update
                        </button>
                        <button onClick={() => setShowEditForm(false)} className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );

    function renderFormInputs() {
        return (
            <>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    className="mb-2 w-full p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                    className="mb-2 w-full p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                    required
                    className="mb-2 w-full p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    placeholder="Cuisine"
                    required
                    className="mb-2 w-full p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    required
                    className="mb-2 w-full p-2 border rounded-md"
                />
            </>
        );
    }
};
