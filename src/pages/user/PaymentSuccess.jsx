import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axiosInstance.get(`/payment/success?session_id=${sessionId}`);
        if (response.data.success) {
          setPaymentStatus("Payment was successful!");
        } else {
          setPaymentStatus("Payment failed or was not confirmed.");
        }
      } catch (err) {
        console.error("Error confirming payment:", err);
        setPaymentStatus("An error occurred while confirming payment.");
      }
    };

    if (sessionId) verifyPayment();
  }, [sessionId]);

  return (
    <div className="container mx-auto px-4 py-6 text-center">
      <h1 className="text-2xl font-semibold mb-4">Payment Status</h1>
      {paymentStatus ? (
        <p className={`text-lg ${paymentStatus.includes("successful") ? "text-green-500" : "text-red-500"}`}>
          {paymentStatus}
        </p>
      ) : (
        <p>Loading payment status...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;