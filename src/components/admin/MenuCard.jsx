import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const AdminMenuCard = ({ menu, onUpdateMenuItems }) => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    name: menu?.name || '',
    description: menu?.description || '',
    price: menu?.price || '',
    image: menu?.image || '',
    category: menu?.category || ''
  });

  const adminRoutes = {
    create: "/admin/menu/create",
    update: `/admin/menu/update/${menu?._id}`,
    delete: `/admin/menu/delete/${menu?._id}`,
  };

  const handleCreateClick = () => setShowCreateForm(true);

  const handleUpdateClick = () => {
    setShowEditForm(true);
    setFormData({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      image: menu.image,
      category: menu.category
    });
  };

  const handleDeleteClick = async () => {
    try {
      await axiosInstance.delete(`/menu/delete/${menu._id}`);
      toast.success('Menu item deleted successfully!');
      onUpdateMenuItems(menu._id); // Update parent list on delete
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/menu/create', formData);
      if (response.data.success) {
        toast.success('Menu item created successfully!');
        onUpdateMenuItems(response.data.data); // Pass new menu item to parent
        setShowCreateForm(false); // Hide form on successful creation
      }
    } catch (error) {
      console.error('Error creating menu item:', error);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/menu/update/${menu._id}`, formData);
      if (response.data.success) {
        toast.success('Menu item updated successfully!');
        onUpdateMenuItems(response.data.data); // Pass updated menu item to parent
        setShowEditForm(false); // Hide form on successful edit
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

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
          <h2 className="text-xl font-semibold mb-4">Create Menu Item</h2>
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
          <h2 className="text-xl font-semibold mb-4">Edit Menu Item</h2>
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
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="mb-2 w-full p-2 border rounded-md"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="mb-2 w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
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