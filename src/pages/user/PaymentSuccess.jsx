import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
     
      const verifyPayment = async () => {
        try {
          const response = await axiosInstance.post("/payment/success", { sessionId });
          if (response.data.orderId) {
            setSuccess(true);
            setLoading(false);
            navigate(`/user/order/${response.data.orderId}`);
          } else {
            setError("Order creation failed.");
            setLoading(false);
          }
        } catch (error) {
          setError("There was an error processing the payment.");
          setLoading(false);
        }
      };

      verifyPayment();
    } else {
      setError("Session ID not found.");
      setLoading(false);
    }
  }, [location, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {success ? <p>Your payment was successful!</p> : <p>Payment failed. Please try again.</p>}
    </div>
  );
};

export default PaymentSuccess;
