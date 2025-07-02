import React, { useState } from 'react';
import { FaSearch, FaTimes, FaSlidersH, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MessageCircle, CheckCircle, XCircle, Search } from 'lucide-react';
const OffersShipping = () => {
  const [showModal, setShowModal] = useState(false);
 const [searchTerm, setSearchTerm] = useState('');
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-12">
      {/* Header */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 flex-wrap">
        
        <svg
          width="34"
          height="34"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <path
            d="M14.0435 6.402L13.2935 5.94225C12.5413 5.481 12.1655 5.25 11.75 5.25C11.3345 5.25 10.9588 5.481 10.2065 5.94225L9.4565 6.402C8.74475 6.8385 8.38925 7.05675 8.195 7.4085C8 7.761 8 8.18475 8 9.033V13.4318C8 14.8785 8 15.6015 8.4395 16.0507C8.879 16.5 9.5855 16.5 11 16.5H12.5C13.9145 16.5 14.621 16.5 15.0605 16.05C15.5 15.6015 15.5 14.8785 15.5 13.4325V9.033C15.5 8.18475 15.5 7.76025 15.305 7.4085C15.11 7.05675 14.7553 6.8385 14.0435 6.402Z"
            stroke="#204C80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.0001 5.33098C10.5209 4.87123 10.2351 4.62973 9.87286 4.53898C9.45286 4.43323 9.01186 4.55173 8.12911 4.78873L7.25011 5.02423C6.41536 5.24923 5.99761 5.36023 5.70811 5.63698C5.41786 5.91448 5.30536 6.30748 5.08111 7.09423L3.91561 11.1727C3.53311 12.5137 3.34111 13.1842 3.66661 13.713C3.94561 14.1667 5.06311 14.7255 6.12586 15"
            stroke="#204C80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.3712 7.49999C12.002 7.07999 12.5623 6.40724 12.9103 5.57024C13.6288 3.84149 13.1705 2.06774 11.888 1.60949C10.6047 1.15049 8.98175 2.17949 8.26325 3.90824C8.1467 4.18692 8.0585 4.47663 8 4.77299"
            stroke="#204C80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-primaryBlue font-bold text-2xl">Offers</span>
      </h2>

      {/* Search Input */}
   <div className="relative flex-grow min-w-[250px]">
          <input
            type="text"
            placeholder="Search For ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-primaryBlue rounded-full pl-10 pr-10 py-2 focus:outline-none"
          />
          <Search
            size={20}
            strokeWidth={1.5}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primaryBlue pointer-events-none"
          />
          <XCircle
            onClick={() => setSearchTerm('')}
            size={20}
            strokeWidth={1}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
          />
        </div>

      {/* Shipment Cards */}
      <div className="mt-6 space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <div>
              <div className="font-normal text-[#10233E] text-[28px]">Shipment from source to destination</div>
              <div className="text-[16px] text-[#10233E99] ">startUp Name</div>
            </div>
            <button
              onClick={openModal}
              className="bg-[#255C9C] text-white font-bold text-[16px] px-4 py-2 rounded-full hover:bg-[#10233E]"
            >
              + Add Offer
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-semibold text-[#153052] mb-6 flex items-center gap-2">
              📦 Shipment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center border rounded-full px-4 py-2">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <input
                  type="date"
                  className="w-full outline-none bg-transparent text-sm"
                  placeholder="Estimated Date"
                />
              </div>
              <div className="flex items-center border rounded-full px-4 py-2">
                <FaMoneyBillWave className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Placeholder text..."
                  className="w-full outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            <button
              className="bg-[#153052] w-full text-white py-2 rounded-full hover:bg-[#10233E]"
              onClick={closeModal}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersShipping;
