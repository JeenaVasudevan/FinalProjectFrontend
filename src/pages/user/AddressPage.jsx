import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || []; // Access cart from state passed during navigation

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Validate address fields
    if (
      !address.fullName ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode
    ) {
      alert("Please fill in all address fields.");
      return;
    }

    // Store address in localStorage (optional) and redirect to payment page
    localStorage.setItem("address", JSON.stringify(address));

    // Pass cart and address to the payment page
    navigate("/user/payment", { state: { cart, address } });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Enter Delivery Address</h1>
      <form onSubmit={handleAddressSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Street Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Zip Code */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Address and Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default AddressPage;