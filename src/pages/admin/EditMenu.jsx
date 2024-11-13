/*import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

export const EditMenu = () => {
    const { menuId } = useParams();
    const navigate = useNavigate();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedFood, setUpdatedFood] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        isVeg: true,
    });

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await axiosInstance.get(`/menuItems/menuDetails/${menuId}`);
                setFood(response.data.data);
                setUpdatedFood({
                    name: response.data.data.name,
                    description: response.data.data.description,
                    price: response.data.data.price,
                    image: response.data.data.image,
                    category: response.data.data.category,
                    isVeg: response.data.data.isVeg,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [menuId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFood((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedFood((prev) => ({ ...prev, image: reader.result })); // Set Base64 string
            };
            reader.readAsDataURL(file); // Convert image to Base64
        }
    };

    const updateFood = async () => {
        try {
            const response = await axiosInstance.put(`/menuItems/update/${menuId}`, updatedFood);
            navigate(`/menu/${menuId}`); // Navigate to the updated menu item details page
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='p-5'>
            <h2 className='text-xl font-bold mb-4'>Edit Food Item</h2>

            <input 
                type='text' 
                name='name' 
                placeholder='Food Name' 
                value={updatedFood.name} 
                onChange={handleChange} 
                className='border p-2 rounded w-full mb-2' 
            />
            <input 
                type='text' 
                name='description' 
                placeholder='Description' 
                value={updatedFood.description} 
                onChange={handleChange} 
                className='border p-2 rounded w-full mb-2' 
            />
            <input 
                type='number' 
                name='price' 
                placeholder='Price' 
                value={updatedFood.price} 
                onChange={handleChange} 
                className='border p-2 rounded w-full mb-2' 
            />
            <input 
                type='file' 
                accept='image/*' 
                onChange={handleFileChange} 
                className='border p-2 rounded w-full mb-2'
            />
            <select 
                name='category' 
                value={updatedFood.category} 
                onChange={handleChange} 
                className='border p-2 rounded w-full mb-2'
            >
                <option value=''>Select Category</option>
                <option value='Appetizer'>Appetizer</option>
                <option value='Main Course'>Main Course</option>
                <option value='Dessert'>Dessert</option>
            </select>
            <label className='block mb-2'>
                <input 
                    type='checkbox' 
                    name='isVeg' 
                    checked={updatedFood.isVeg} 
                    onChange={(e) => setUpdatedFood({ ...updatedFood, isVeg: e.target.checked })} 
                />
                Vegetarian
            </label>
            <div className='flex justify-end'>
                <button 
                    onClick={updateFood} 
                    className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2'
                >
                    Update
                </button>
                <button 
                    onClick={() => navigate(`/menu/${menuId}`)} 
                    className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
*/
