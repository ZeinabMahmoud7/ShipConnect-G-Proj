// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CheckCircle, XCircle, Loader2 } from "lucide-react";
// import { useOffers } from "../context/OffersContext";

// export default function PaymentSuccess() {
//   const [searchParams] = useSearchParams();
//   const orderId = searchParams.get("token");
//   const offerId = searchParams.get("offerId");
//   const [status, setStatus] = useState("processing");
//   const navigate = useNavigate();
//   const { markOfferPaid } = useOffers();

//   useEffect(() => {
//     const capturePayment = async () => {
//       console.log("🔍 Starting payment capture...");
//       console.log("orderId:", orderId, "offerId:", offerId);

//       try {
//         const token = localStorage.getItem("token");
//         console.log("🔑 Auth Token:", token);

//         const response = await axios.post(
//           `/api/Payment/capture-order/${orderId}`,
//           null,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         console.log("✅ Payment Capture Response:", response);

//         if (response.status === 200) {
//           setStatus("success");

//           // ✅ Mark offer as paid
//           if (offerId) {
//             console.log(`💰 Marking offer ${offerId} as PAID`);
//             markOfferPaid(offerId);
//           }

//           setTimeout(() => navigate("/dashboard"), 3000);
//         } else {
//           console.warn("⚠️ Payment capture failed:", response.data);
//           setStatus("failed");
//         }
//       } catch (error) {
//         console.error("❌ Payment Capture Error:", error);

//         if (error.response) {
//           console.error("Response Data:", error.response.data);
//           console.error("Response Status:", error.response.status);
//           console.error("Response Headers:", error.response.headers);
//         } else if (error.request) {
//           console.error("No Response. Request object:", error.request);
//         } else {
//           console.error("Error Message:", error.message);
//         }

//         setStatus("failed");
//       }
//     };

//     if (orderId) capturePayment();
//   }, [orderId, navigate, offerId, markOfferPaid]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
//       <div className="bg-white rounded-xl shadow-2xl p-10 max-w-md text-center">
//         {status === "processing" && (
//           <>
//             <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto" />
//             <h2 className="text-2xl font-bold text-gray-800 mt-4">
//               Processing your payment...
//             </h2>
//             <p className="text-gray-500 mt-2">
//               Please wait while we confirm your transaction.
//             </p>
//           </>
//         )}

//         {status === "success" && (
//           <>
//             <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
//             <h2 className="text-2xl font-bold text-green-600 mt-4">
//               Payment Successful!
//             </h2>
//             <p className="text-gray-600 mt-2">
//               Thank you for your payment. Redirecting to your dashboard...
//             </p>
//           </>
//         )}

//         {status === "failed" && (
//           <>
//             <XCircle className="w-16 h-16 text-red-500 mx-auto" />
//             <h2 className="text-2xl font-bold text-red-600 mt-4">
//               Payment Failed
//             </h2>
//             <p className="text-gray-600 mt-2">
//               Something went wrong. Please check console for details.
//             </p>
//             <button
//               onClick={() => navigate("/offers")}
//               className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
//             >
//               Go Back
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react";
import { useOffers } from "../context/OffersContext";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("token");
  const offerId = searchParams.get("offerId");
  const [status, setStatus] = useState("processing");
  const navigate = useNavigate();
  const { markOfferPaid } = useOffers();

  useEffect(() => {
    const fakeSuccess = async () => {
      console.log("⚡ Simulating Payment Success for:", orderId, offerId);

    
      setStatus("success");

      if (offerId) {
        console.log(`💰 Marking offer ${offerId} as PAID`);
        markOfferPaid(offerId);
      }

      // بعد ثانيتين، يروح على صفحة الشات
      setTimeout(() => {
        navigate(`/chat/${offerId}`);
      }, 2000);
    };

    fakeSuccess();
  }, [orderId, offerId, markOfferPaid, navigate]);

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
              Redirecting you to chat...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
