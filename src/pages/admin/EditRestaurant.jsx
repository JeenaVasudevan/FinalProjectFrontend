/*import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';


export const EditRestaurant = () => {
    const { id } = useParams(); // Get the restaurant ID from the URL
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatedRestaurant, setUpdatedRestaurant] = useState({
        name: '',
        description: '',
        place: '',
        image: '',
        category: 'veg',
    });

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axiosInstance.get(`/restaurantDetails/${id}`);
                setRestaurant(response.data.data);
                setUpdatedRestaurant({
                    name: response.data.data.name,
                    description: response.data.data.description,
                    place: response.data.data.address,
                    image: response.data.data.image,
                    category: response.data.data.cuisine,
                });
            } catch (err) {
                setError('Error fetching restaurant details');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRestaurant((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUpdatedRestaurant((prev) => ({ ...prev, image: reader.result }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/update/${id}`, updatedRestaurant);
            alert(response.data.message);
            navigate('/admin/restaurants'); // Redirect to restaurant list
        } catch (err) {
            setError('Error updating restaurant');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='p-5'>
            <h2 className='text-2xl font-bold mb-4'>Edit Restaurant</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    placeholder='Restaurant Name'
                    value={updatedRestaurant.name}
                    onChange={handleChange}
                    className='border p-2 rounded w-full mb-2'
                />
                <input
                    type='text'
                    name='description'
                    placeholder='Description'
                    value={updatedRestaurant.description}
                    onChange={handleChange}
                    className='border p-2 rounded w-full mb-2'
                />
                <input
                    type='text'
                    name='place'
                    placeholder='Location'
                    value={updatedRestaurant.place}
                    onChange={handleChange}
                    className='border p-2 rounded w-full mb-2'
                />
                <input
                    type='file'
                    name='image'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='border p-2 rounded w-full mb-2'
                />
                <select
                    name='category'
                    value={updatedRestaurant.category}
                    onChange={handleChange}
                    className='border p-2 rounded w-full mb-4'
                >
                    <option value='veg'>Veg</option>
                    <option value='non-veg'>Non-Veg</option>
                </select>
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2'
                    >
                        Save Changes
                    </button>
                    <button
                        type='button'
                        onClick={() => navigate('/admin/restaurants')}
                        className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

*/