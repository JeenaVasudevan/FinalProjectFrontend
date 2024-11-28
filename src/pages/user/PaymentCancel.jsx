import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Payment Failed or Canceled</h1>
      <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p>Your payment was not processed successfully. Please try again or contact support if the issue persists.</p>

        <button
          onClick={() => navigate("/cart")}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-4"
        >
          Return to Cart
        </button>
        
        <button
          onClick={() => navigate("/address")}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 mt-2"
        >
          Change Delivery Address
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
