import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentVerification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const animationDelay = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(animationDelay);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin text-4xl mb-4">&#128230;</div>

        <p className="text-xl font-semibold mb-4">Payment Verification</p>
        <p className="text-gray-700">
          Thank you for your payment. Your order is Confirmed
        </p>
        <p className="text-gray-700 mt-2">
          You will be redirected to the home page shortly.
        </p>
      </div>
    </div>
  );
};

export default PaymentVerification;
