import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("token");
  const [status, setStatus] = useState("processing");
  const navigate = useNavigate();

  useEffect(() => {
    const capturePayment = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = axios.post(`/api/Payment/capture-order/${orderId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setStatus("success");
          setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setStatus("failed");
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error.response?.data); 

        setStatus("failed");
      }
    };

    if (orderId) capturePayment();
  }, [orderId, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white rounded-xl shadow-2xl p-10 max-w-md text-center">
        {status === "processing" && (
          <>
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              Processing your payment...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we confirm your transaction.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-green-600 mt-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you for your payment. Redirecting to your dashboard...
            </p>-
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold text-red-600 mt-4">
              Payment Failed
            </h2>
            <p className="text-gray-600 mt-2">
              Something went wrong. Please try again or contact support.
            </p>
            <button
              onClick={() => navigate("/offers")}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
