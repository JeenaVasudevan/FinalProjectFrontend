// src/StripeProvider.jsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_Publishable_Key);

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
