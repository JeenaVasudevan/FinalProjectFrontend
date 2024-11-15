import { useState } from 'react';
import { Link } from 'react-router-dom';


export const RestaurantCard = ({ restaurant }) => {
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
                        {'★'.repeat(Math.floor(restaurant?.rating|| 5))}
                        <span className="text-gray-400">
                            {'★'.repeat(5 - Math.floor(restaurant?.rating || 5))}
                        </span>
                    </span>
                    <span className="ml-2 text-gray-600 text-sm">
                        {restaurant?.rating?.toFixed(1)}
                    </span>
                </div>
                <div className="mt-4 flex justify-end">
                    <Link to={`/restaurant/${restaurant?._id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            More Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export const CartCard = ({ item, onUpdateQuantity, onDeleteItem }) => {
    const [quantity, setQuantity] = useState(item.quantity);
  
    const handleChangeQuantity = (e) => {
      setQuantity(Number(e.target.value));
    };
  
    const handleUpdate = () => {
      if (quantity > 0) {
        onUpdateQuantity(item.menuItem._id, quantity);
      }
    };
  
    const handleDelete = () => {
      onDeleteItem(item.menuItem._id);
    };
  
    return (
      <div className="flex justify-between items-center bg-white p-4 mb-4 rounded-md shadow-md">
        <div className="flex items-center">
          <img
            src={item.menuItem.image}
            alt={item.menuItem.name}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="ml-4">
            <h3 className="font-semibold">{item.menuItem.name}</h3>
            <p className="text-sm text-gray-600">{item.menuItem.description}</p>
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={quantity}
            onChange={handleChangeQuantity}
            min="1"
            className="w-16 p-2 border rounded-md"
          />
          <button
            onClick={handleUpdate}
            className="ml-4 bg-blue-500 text-white py-1 px-4 rounded-md"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="ml-4 bg-red-500 text-white py-1 px-4 rounded-md"
          >
            Delete
          </button>
        </div>
        <div className="text-right">
          <p className="font-semibold">
            ${item.menuItem.price * quantity.toFixed(2)}
          </p>
        </div>
      </div>
    );
  };