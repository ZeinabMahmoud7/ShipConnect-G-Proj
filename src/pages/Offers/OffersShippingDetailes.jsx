import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
export default function OffersShippingDetailes() {
  const [showModal, setShowModal] = useState(false);
  const [shipmentDate, setShipmentDate] = useState("");
  const [shipmentCost, setShipmentCost] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
const navigate = useNavigate();


const { id } = useParams();
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setShipmentDate("");
    setShipmentCost("");
    setShowConfirm(false);
  };

  const handleAddClick = () => {
    setShowConfirm(true);
  };

  const confirmAdd = () => {
    alert(`Added offer on ${shipmentDate} with cost $${shipmentCost}`);
    closeModal();
  };


  const [shipmentDetails, setShipmentDetails] = useState(null);
 
useEffect(() => {
  const fetchShipmentDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/Shipment/ShipmentDetails/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("oofferssDetailes",res.data);
      setShipmentDetails(res.data);
    } catch (err) {
      console.error("❌ Error fetching shipment details:", err);
    }
  };

  fetchShipmentDetails();
}, [id]);


  return (
    <div className="min-h-screen bg-[#E5E7EB] p-4 md:p-8">
        <div className="flex items-center space-x-2 text-gray-500 text-sm mb-6">
<div
  onClick={() => navigate('/dashboardShipping/offersShipping')}
  className="cursor-pointer w-fit"
>
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.25 8.5C21.25 8.5 12.75 14.7602 12.75 17C12.75 19.2397 21.25 25.5 21.25 25.5"
      stroke="#10233E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>

          <span className="font-bold text-primaryBlue text-[20px]">
            Transit ID <span className="text-[#10233E99] font-normal">#{shipmentDetails?.data?.code }</span>
          </span>
        </div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
        {/* Header */}
      

        {/* Sender Data */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#204C80] flex items-center space-x-2">
            <span><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5505 26.9167C5.58928 11.4792 14.0332 4.65191 19.0001 3.16675C23.967 4.65191 32.4109 11.4792 26.4497 26.9167C25.5504 26.4227 22.8001 25.4332 19.0001 25.4332C15.2001 25.4332 12.4499 26.4227 11.5505 26.9167Z" stroke="#204C80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M27.709 24.6337C29.9921 24.8442 32.7883 25.4633 34.8039 26.9168C34.8039 26.9168 35.632 19.1015 28.5006 17.4168M10.2923 24.6337C8.00913 24.8442 5.21297 25.4633 3.19738 26.9168C3.19738 26.9168 2.3693 19.1015 9.50063 17.4168M15.0423 30.0835C15.0423 30.0835 15.7026 34.0418 19.0006 34.8335C22.2987 34.0418 22.959 30.0835 22.959 30.0835M22.1673 14.2502C22.1673 13.4103 21.8337 12.6049 21.2398 12.011C20.6459 11.4171 19.8405 11.0835 19.0006 11.0835C18.1608 11.0835 17.3553 11.4171 16.7615 12.011C16.1676 12.6049 15.834 13.4103 15.834 14.2502C15.834 15.09 16.1676 15.8955 16.7615 16.4893C17.3553 17.0832 18.1608 17.4168 19.0006 17.4168C19.8405 17.4168 20.6459 17.0832 21.2398 16.4893C21.8337 15.8955 22.1673 15.09 22.1673 14.2502Z" stroke="#204C80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
            <span className="font-bold text-[28px] text-primaryBlue">Sender Data (Startup)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Startup Name</p>
               <p className="font-bold text-[#10233E] text-[20px]"> {shipmentDetails?.data?.companyName || "N/A"}</p>
               
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Phone Number</p>
              <p className="font-bold text-[#10233E] text-[20px]">+012004040598</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Destination Address</p>
              <p className="font-bold text-[#10233E] text-[20px]">  {shipmentDetails?.data?.destinationAddress || "N/A"}</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Email</p>
              <p className="font-bold text-[#10233E] text-[20px]">companyname@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Receiver Data */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#204C80] flex items-center space-x-2">
            <span><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5505 25.9167C4.58928 10.4792 13.0332 3.65191 18.0001 2.16675C22.967 3.65191 31.4109 10.4792 25.4497 25.9167C24.5504 25.4227 21.8001 24.4332 18.0001 24.4332C14.2001 24.4332 11.4499 25.4227 10.5505 25.9167Z" stroke="#204C80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.709 23.6337C28.9921 23.8442 31.7883 24.4633 33.8039 25.9168C33.8039 25.9168 34.632 18.1015 27.5006 16.4168M9.2923 23.6337C7.00913 23.8442 4.21297 24.4633 2.19738 25.9168C2.19738 25.9168 1.3693 18.1015 8.50063 16.4168M14.0423 29.0835C14.0423 29.0835 14.7026 33.0418 18.0006 33.8335C21.2987 33.0418 21.959 29.0835 21.959 29.0835M21.1673 13.2502C21.1673 12.4103 20.8337 11.6049 20.2398 11.011C19.6459 10.4171 18.8405 10.0835 18.0006 10.0835C17.1608 10.0835 16.3553 10.4171 15.7615 11.011C15.1676 11.6049 14.834 12.4103 14.834 13.2502C14.834 14.09 15.1676 14.8955 15.7615 15.4893C16.3553 16.0832 17.1608 16.4168 18.0006 16.4168C18.8405 16.4168 19.6459 16.0832 20.2398 15.4893C20.8337 14.8955 21.1673 14.09 21.1673 13.2502Z" stroke="#204C80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
            <span className="font-bold text-primaryBlue text-[28px]">Receiver Data</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Startup Name</p>
              <p className="font-bold text-[#10233E] text-[20px]">SwiftLogistic</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Phone Number</p>
              <p className="font-bold text-[#10233E] text-[20px]">+09172971271298</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Destination Address</p>
              <p className="font-bold text-[#10233E] text-[20px]">22 Nile St., Giza, Egypt</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Email</p>
              <p className="font-bold text-[#10233E] text-[20px]">companyname@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Shipment Data */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#204C80] flex items-center space-x-2">
            <span><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 34.8334C17.7048 34.8334 16.4667 34.3109 13.9919 33.2659C7.83117 30.6629 4.75 29.3598 4.75 27.1701V11.0834M19 34.8334C20.2952 34.8334 21.5333 34.3109 24.0081 33.2659C30.1688 30.6629 33.25 29.3598 33.25 27.1701V11.0834M19 34.8334V17.9788M9.5 19.0001L12.6667 20.5834M26.9167 6.33341L11.0833 14.2501M13.1828 15.3442L8.55792 13.1069C6.01983 11.8782 4.75 11.2639 4.75 10.2917C4.75 9.31958 6.01983 8.70525 8.55792 7.47658L13.1812 5.23933C16.0392 3.85708 17.4642 3.16675 19 3.16675C20.5358 3.16675 21.9624 3.85708 24.8172 5.23933L29.4421 7.47658C31.9802 8.70525 33.25 9.31958 33.25 10.2917C33.25 11.2639 31.9802 11.8782 29.4421 13.1069L24.8188 15.3442C21.9608 16.7264 20.5358 17.4167 19 17.4167C17.4642 17.4167 16.0376 16.7264 13.1828 15.3442Z" stroke="#204C80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
            <span className="font-bold text-primaryBlue text-[28px]">Shipment Data</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Shipment Type</p>
              <p className="font-bold text-[#10233E] text-[20px]"> {shipmentDetails?.data?.shipmentType || "N/A"}</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Quantity</p>
              <p className="font-bold text-[#10233E] text-[20px]"> {shipmentDetails?.data?.quantity || "N/A"} boxes</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Weight</p>
              <p className="font-bold text-[#10233E] text-[20px]">  {shipmentDetails?.data?.weightKg || "N/A"} kg</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Preferred Delivery Date</p>
              <p className="font-bold text-[#10233E] text-[20px]"> {shipmentDetails?.data?.requestedPickupDate?.slice(0, 10) || "N/A"}</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Shipping Speed</p>
              <p className="font-bold text-[#10233E] text-[20px]">Express</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Budget Range</p>
              <p className="font-bold text-[#10233E] text-[20px]"> {shipmentDetails?.data?.price ? `$${shipmentDetails.data.price}` : "N/A"}</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Preferred Vehicle Type</p>
              <p className="font-bold text-[#10233E] text-[20px]">Small Van</p>
            </div>
            <div className='my-4'>
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Packaging Options</p>
              <p className="font-bold text-[#10233E] text-[20px]">  {shipmentDetails?.data?.packagingOptions || "N/A"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-[#10233E99] text-[20px] mb-3 font-normal">Dimensions (L×W×H)</p>
              <p className="font-bold text-[#10233E] text-[20px]">  {shipmentDetails?.data?.dimensions?.replace(/x/g, ' × ') || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Add Offer Button */}
        <div className="flex justify-center">
          <button
            onClick={openModal}
            className="bg-[#204C80] flex items-center gap-1 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-[#1a3b66] transition"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.7365 5.29199C14.7365 4.77199 14.7365 4.51199 14.6795 4.29899C14.603 4.01473 14.4532 3.75554 14.2451 3.54739C14.0369 3.33925 13.7778 3.18944 13.4935 3.11299C12.9315 2.96299 12.0695 2.96299 11.5075 3.11299C11.2231 3.18929 10.9637 3.33903 10.7553 3.54718C10.547 3.75534 10.397 4.01461 10.3205 4.29899C10.2635 4.51199 10.2635 4.77199 10.2635 5.29199C10.2635 6.34599 10.2635 9.10899 9.9355 9.43599C9.6085 9.76399 6.8455 9.76399 5.7915 9.76399C5.2715 9.76399 5.0115 9.76399 4.7985 9.82099C4.51424 9.89744 4.25505 10.0472 4.04691 10.2554C3.83876 10.4635 3.68896 10.7227 3.6125 11.007C3.4625 11.569 3.4625 12.432 3.6125 12.993C3.7675 13.572 4.2195 14.023 4.7985 14.179C5.0115 14.236 5.2715 14.236 5.7915 14.236C6.8455 14.236 9.6085 14.236 9.9355 14.563C10.2635 14.891 10.2635 15.418 10.2635 16.473C10.2635 16.992 10.2635 19.488 10.3205 19.701C10.397 19.9853 10.5468 20.2444 10.7549 20.4526C10.9631 20.6607 11.2222 20.8105 11.5065 20.887C12.0685 21.037 12.9315 21.037 13.4925 20.887C13.7768 20.8105 14.0359 20.6607 14.2441 20.4526C14.4522 20.2444 14.602 19.9853 14.6785 19.701C14.7355 19.488 14.7355 16.992 14.7355 16.472C14.7355 15.418 14.7355 14.891 15.0625 14.563C15.3905 14.236 18.1535 14.236 19.2075 14.236C19.7275 14.236 19.9875 14.236 20.2005 14.179C20.4848 14.1025 20.7439 13.9527 20.9521 13.7446C21.1602 13.5364 21.31 13.2773 21.3865 12.993C21.5365 12.431 21.5365 11.569 21.3865 11.007C21.31 10.7227 21.1602 10.4635 20.9521 10.2554C20.7439 10.0472 20.4848 9.89744 20.2005 9.82099C19.9875 9.76399 19.7275 9.76399 19.2075 9.76399C18.1535 9.76399 15.3905 9.76399 15.0635 9.43599C14.7355 9.10899 14.7355 6.34599 14.7355 5.29199" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 Add Offer
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

                <h2 className="text-xl font-semibold text-[#153052] mb-6 flex items-center gap-2">
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C11.182 22 10.4 21.67 8.837 21.01C4.946 19.366 3 18.543 3 17.16V7M12 22C12.818 22 13.6 21.67 15.163 21.01C19.054 19.366 21 18.543 21 17.16V7M12 22V11.355M6 12L8 13M17 4L7 9M8.326 9.691L5.405 8.278C3.802 7.502 3 7.114 3 6.5C3 5.886 3.802 5.498 5.405 4.722L8.325 3.309C10.13 2.436 11.03 2 12 2C12.97 2 13.871 2.436 15.674 3.309L18.595 4.722C20.198 5.498 21 5.886 21 6.5C21 7.114 20.198 7.502 18.595 8.278L15.675 9.691C13.87 10.564 12.97 11 12 11C11.03 11 10.129 10.564 8.326 9.691Z" stroke="#204C80" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


        <span className="text-primaryBlue font-bold text-2xl"> Shipment Details</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#153052] mb-1">
                  Preferred Delivery Date *
                </label>
                <input
                  type="date"
                  value={shipmentDate}
                  onChange={(e) => setShipmentDate(e.target.value)}
                  className="w-full border border-[#255C9C] text-[#153052] bg-white rounded-full py-2 px-4 text-sm outline-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#153052] mb-1">
                  Budget Range *
                </label>
                <input
                  type="text"
                  placeholder="Enter cost..."
                  value={shipmentCost}
                  onChange={(e) => setShipmentCost(e.target.value)}
                  className="w-full border border-[#255C9C] text-[#153052] bg-white rounded-full py-2 px-4 text-sm outline-none"
                />
              </div>
            </div>

         {showConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
      <div className="space-y-4">
        <p className="text-center text-[#10233E] font-medium">
          Offer Added Successfully
        </p>
        <div className="flex gap-6 justify-center">
          <button
            onClick={confirmAdd}
            className="bg-primaryBlue flex items-center gap-2 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300 font-semibold text-base"
            style={{ minWidth: '110px' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M22.75 12.5C22.75 6.977 18.273 2.5 12.75 2.5C7.227 2.5 2.75 6.977 2.75 12.5C2.75 18.023 7.227 22.5 12.75 22.5C18.273 22.5 22.75 18.023 22.75 12.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.75 13.25C8.75 13.25 10.35 14.162 11.15 15.5C11.15 15.5 13.55 10.25 16.75 8.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Ok
          </button>

          <button
            onClick={closeModal}
            className="bg-gray-300 border border-primaryBlue text-[#10233E] px-8 py-3 rounded-full hover:bg-gray-400 transition-colors duration-300 font-semibold text-base flex items-center gap-2"
            style={{ minWidth: '110px' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M16.5 15.5L10.5 9.5M10.5 15.5L16.5 9.5M23.5 12.5C23.5 6.977 19.023 2.5 13.5 2.5C7.977 2.5 3.5 6.977 3.5 12.5C3.5 18.023 7.977 22.5 13.5 22.5C19.023 22.5 23.5 18.023 23.5 12.5Z"
                stroke="#204C80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{!showConfirm && (
  <button
    className="bg-[#255C9C] w-full text-white py-2 rounded-full hover:bg-[#10233E]"
    onClick={handleAddClick}
  >
    Add
  </button>
)}

          </div>
        </div>
      )}
    </div>
  );
}
